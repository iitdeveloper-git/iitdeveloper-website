#!/usr/bin/env python3
"""Compare original source/assets and rendered homepage against the locked inventory."""
import argparse
from collections import Counter
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[2]
BASELINE = json.loads((ROOT / 'docs/homepage-content-baseline.json').read_text())

class RenderedInventory(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.skip = 0
        self.section = -1
        self.current = 'Header / navigation'
        self.texts, self.links, self.media, self.metadata = [], [], [], []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ('script', 'style'):
            self.skip += 1
        if tag == 'section':
            self.section += 1
            self.current = BASELINE['sections'][self.section] if self.section < len(BASELINE['sections']) else 'Added section'
        if tag == 'footer':
            self.current = 'Footer'
        if tag in ('meta', 'link') and (tag == 'meta' or a.get('rel') != 'stylesheet'):
            self.metadata.append([tag, a])
        if tag == 'a':
            self.links.append({'section': self.current, 'href': a.get('href'), 'label': a.get('aria-label', '')})
        if tag in ('img', 'video', 'source', 'canvas'):
            self.media.append({'section': self.current, 'tag': tag, 'src': a.get('src', ''), 'alt': a.get('alt', '')})

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.skip -= 1

    def handle_data(self, data):
        if not self.skip and data.strip():
            self.texts.append({'section': self.current, 'text': data.strip()})

def tokens(items):
    return Counter(json.dumps(item, sort_keys=True, ensure_ascii=False) for item in items)

def seo_tokens(items):
    """Ignore build-only preloads and the host used for generated image URLs."""
    from urllib.parse import urlsplit
    stable = []
    for tag, attrs in items:
        if tag == 'link' and attrs.get('rel') == 'preload':
            continue
        attrs = attrs.copy()
        if attrs.get('property') == 'og:image' or attrs.get('name') == 'twitter:image':
            url = urlsplit(attrs.get('content', ''))
            attrs['content'] = url.path
        stable.append([tag, attrs])
    return tokens(stable)

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--html', type=Path, help='HTML captured from the running homepage.')
    args = parser.parse_args()
    errors = []
    reviewed = json.loads((ROOT / 'docs/homepage-reviewed-visual-changes.json').read_text())
    for group in ('protectedFiles', 'assets'):
        for file, expected in BASELINE[group].items():
            p = ROOT / file
            actual = hashlib.sha256(p.read_bytes()).hexdigest() if p.exists() else None
            if actual != expected:
                visual = reviewed.get(file, {})
                if actual and actual == visual.get('sha256'):
                    print(f'REVIEWED VISUAL CHANGE: {file}: {visual["reason"]}')
                else:
                    errors.append(f'Original file changed or missing: {file}')
        print(f"Checked {len(BASELINE[group])} original {group} hashes")
    page = (ROOT / 'frontend/src/app/page.tsx').read_text()
    names = '|'.join(BASELINE['components'])
    components = re.findall(r'<(' + names + r')\s*/>', page)
    if components != BASELINE['components']:
        errors.append('Original homepage component list/order changed')
    print(f"Checked {len(BASELINE['sections'])} original sections, Header, and Footer")
    if args.html:
        current = RenderedInventory()
        current.feed(args.html.read_text())
        if current.section + 1 != len(BASELINE['sections']):
            errors.append('Original rendered section count changed')
        for key in ('texts', 'links', 'media', 'metadata'):
            compare = seo_tokens if key == 'metadata' else tokens
            missing = compare(BASELINE[key]) - compare(getattr(current, key))
            if missing:
                errors.append(f'{key}: {sum(missing.values())} original items missing/modified: ' + str(list(missing)[:4]))
            print(f"Checked {len(BASELINE[key])} original rendered {key} items")
    else:
        print('LIMITATION: rendered checks skipped; provide --html')
    if errors:
        print('\nFAIL:\n' + '\n'.join(errors), file=sys.stderr)
        return 1
    print('PASS: protected source (with documented visual exceptions), assets, brand definitions, and original composition preserved' + ('; rendered content preserved' if args.html else ''))
    return 0

if __name__ == '__main__':
    sys.exit(main())

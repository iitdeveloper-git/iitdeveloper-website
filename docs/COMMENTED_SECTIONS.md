# Commented sections register

This file tracks temporarily disabled website sections and how to restore them.

## Team section — disabled 14 October 2026

Reason: hide the Team page, all Team navigation options, and direct URL access.

| File | Commented or changed part |
| --- | --- |
| `frontend/src/app/team/page.tsx` | All original imports, member data, statistics, culture content, and page JSX are preserved as line comments. The active server component calls `notFound()`. |
| `frontend/src/components/layout/Navigation.tsx` | Team submenu entry commented out for desktop and mobile. Original Company URL commented out; Company now links to `/about`. |
| `frontend/src/components/layout/Footer.tsx` | Team entry in the Company links commented out. |
| `frontend/src/app/about/page.tsx` | Entire “Meet The Team” link/button commented out using a JSX comment. |
| `frontend/src/app/careers/page.tsx` | Entire “Meet The Team” link/button commented out using a JSX comment. |

### Preserved link snippets

Original Company navigation URL and submenu entry:

```tsx
href: '/team',
{ label: 'Team', href: '/team' },
```

Original footer entry:

```tsx
{ label: 'Team', href: '/team' },
```

Original CTA on both About and Careers:

```tsx
              <Link href="/team">
                <Button size="lg" variant="neon" className="">
                  Meet The Team
                </Button>
              </Link>
```

### URL behavior

`/team`, `/team/`, and `/team?anything=value` return HTTP 404. Unmatched paths below `/team/` also return 404. The original page is commented out at source level, so its member data and UI are excluded from the executable page code. The sitemap already omitted `/team` and needs no change.

These changes take effect on the local development server immediately and on the public website after deploying this version.

### Restoration

1. In `frontend/src/app/team/page.tsx`, remove the active `notFound` import, replacement `TeamPage` function, and comment headers. Remove the leading `// ` (or `//` on blank lines) from every line of the preserved original page, including the original `'use client'` directive.
2. In Navigation, restore the commented `href: '/team'`, remove the replacement `href: '/about'`, and uncomment the Team submenu entry.
3. Uncomment the Team footer entry.
4. Remove the enclosing JSX comments from the About and Careers Team CTAs.
5. Verify `/team` renders, all restored links work, and update this register with the restoration date. Deploy to restore public access.

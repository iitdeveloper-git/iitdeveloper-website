/**
 * Server-side GitHub metadata fetcher for the Open Source page.
 * Public REST API, no token, cached at the edge via Next's fetch cache.
 * Fails soft: any error/rate-limit returns null so the page never blocks
 * on GitHub and never shows fabricated numbers.
 */

export interface RepoMeta {
  stars: number;
  forks: number;
  license: string | null;
  latestRelease: string | null;
  updatedAt: string | null;
}

const GITHUB_API = 'https://api.github.com';

async function safeFetchJson(url: string): Promise<any | null> {
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/vnd.github+json' },
      // Revalidate hourly — GitHub metadata doesn't need to be real-time.
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function getRepoMeta(owner: string, repo: string): Promise<RepoMeta | null> {
  const data = await safeFetchJson(`${GITHUB_API}/repos/${owner}/${repo}`);
  if (!data) return null;

  const release = await safeFetchJson(`${GITHUB_API}/repos/${owner}/${repo}/releases/latest`);

  return {
    stars: typeof data.stargazers_count === 'number' ? data.stargazers_count : 0,
    forks: typeof data.forks_count === 'number' ? data.forks_count : 0,
    license: data.license?.spdx_id && data.license.spdx_id !== 'NOASSERTION' ? data.license.name : null,
    latestRelease: release?.tag_name ?? null,
    updatedAt: data.pushed_at ?? null,
  };
}

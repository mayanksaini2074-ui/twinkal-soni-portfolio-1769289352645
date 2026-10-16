import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { IPortfolioLink, IResumeData } from "@/types/portfolio";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Values resumes/parsers use when a link does not exist. They must never
// become an href, otherwise the portfolio shows a dead link button.
const PLACEHOLDER_URL_VALUES = new Set([
  '#', '-', '--', '_', '.', 'n/a', 'n.a.', 'na', 'nil', 'none', 'null', 'undefined',
  'tbd', 'tba', 'not provided', 'not available', 'not applicable', 'no link',
  'no url', 'link', 'url', 'website', 'coming soon', 'private', 'confidential',
  'example.com', 'http://example.com', 'https://example.com', 'your-link-here',
]);

// Only these schemes may be rendered as an href (blocks javascript:, data:, etc.)
const ALLOWED_URL_SCHEMES = new Set(['http', 'https', 'mailto', 'tel', 'sms']);

const URL_SCHEME_PATTERN = /^([a-z][a-z0-9+-]*):/i;
const BARE_DOMAIN_PATTERN = /^[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,}(?::\d+)?(?:[/?#].*)?$/i;

/**
 * Turns a raw link value into a safe, usable href.
 * Returns an empty string when the value is missing, a placeholder, or not a
 * real URL, so callers can use the result to decide whether to render a link.
 */
export function normalizeExternalUrl(value?: string | null): string {
  const url = (value ?? '')
    // Strip control characters so obfuscated schemes (e.g. "java\tscript:") cannot slip through
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim()
    // Resume text often wraps links in brackets/quotes or ends them with punctuation
    .replace(/^[<("'[]+/, '')
    .replace(/[>)"'\].,;]+$/, '')
    .trim();

  if (!url || PLACEHOLDER_URL_VALUES.has(url.toLowerCase())) {
    return '';
  }

  if (url.startsWith('//')) {
    return `https:${url}`;
  }

  const scheme = url.match(URL_SCHEME_PATTERN)?.[1]?.toLowerCase();
  if (scheme) {
    return ALLOWED_URL_SCHEMES.has(scheme) ? url : '';
  }

  if (BARE_DOMAIN_PATTERN.test(url)) {
    return `https://${url}`;
  }

  return '';
}

const LINK_LABELS: Record<string, string> = {
  'instagram.com': 'Instagram', 'behance.net': 'Behance', 'dribbble.com': 'Dribbble',
  'linkedin.com': 'LinkedIn', 'github.com': 'GitHub', 'gitlab.com': 'GitLab',
  'pinterest.com': 'Pinterest', 'youtube.com': 'YouTube', 'youtu.be': 'YouTube',
  'vimeo.com': 'Vimeo', 'tiktok.com': 'TikTok', 'twitter.com': 'Twitter', 'x.com': 'X',
  'facebook.com': 'Facebook', 'medium.com': 'Medium', 'substack.com': 'Substack',
  'figma.com': 'Figma', 'notion.so': 'Notion', 'notion.site': 'Notion',
};

export function normalizePortfolioLinks(value: unknown): IPortfolioLink[] {
  if (!Array.isArray(value)) return [];
  const links: IPortfolioLink[] = [];
  const seen = new Set<string>();
  for (const item of value) {
    if (!item || typeof item !== 'object' || typeof item.url !== 'string') continue;
    const normalized = normalizeExternalUrl(item.url);
    if (!/^https?:\/\//i.test(normalized) || /[\s\\]/.test(normalized)) continue;
    let url: URL;
    try {
      url = new URL(normalized);
    } catch {
      continue;
    }
    if (!url.hostname || url.username || url.password) continue;
    if (seen.has(url.href)) continue;
    seen.add(url.href);
    const host = url.hostname.replace(/^www\./, '');
    const platform = Object.entries(LINK_LABELS).find(([domain]) => host === domain || host.endsWith(`.${domain}`))?.[1];
    const label = typeof item.label === 'string' ? item.label.replace(/\s+/g, ' ').trim() : '';
    links.push({ label: label || platform || host, url: url.href });
  }
  return links;
}

export function getPersonalLinks(personalInfo: IResumeData['personalInfo']): IPortfolioLink[] {
  return normalizePortfolioLinks([
    ...normalizePortfolioLinks(personalInfo.links),
    { url: personalInfo.linkedin },
    { url: personalInfo.github },
  ]);
}

export function getProjectLinks(project: IResumeData['projects'][number]): IPortfolioLink[] {
  return normalizePortfolioLinks([
    ...normalizePortfolioLinks(project.links),
    { label: 'View project', url: project.link },
    { url: project.github },
  ]);
}

/**
 * Normalizes the profile links so sections only render a LinkedIn/GitHub link
 * when the user actually provided a usable URL.
 */
export function sanitizePersonalLinks(
  personalInfo: IResumeData['personalInfo']
): IResumeData['personalInfo'] {
  return {
    ...personalInfo,
    linkedin: normalizeExternalUrl(personalInfo.linkedin),
    github: normalizeExternalUrl(personalInfo.github),
    ...(personalInfo.links !== undefined ? { links: normalizePortfolioLinks(personalInfo.links) } : {}),
  };
}

/**
 * Normalizes project links so "View Live"/"Source" buttons only render when
 * the user actually provided a usable URL.
 */
export function sanitizeProjectLinks(
  projects: IResumeData['projects']
): IResumeData['projects'] {
  return (projects || []).map((project) => ({
    ...project,
    link: normalizeExternalUrl(project.link),
    github: normalizeExternalUrl(project.github),
    ...(project.links !== undefined ? { links: normalizePortfolioLinks(project.links) } : {}),
  }));
}

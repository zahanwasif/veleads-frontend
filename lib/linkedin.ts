// Shared by the LinkedIn profile forms (client) and /api/report-request (server).

const HANDLE = /^[a-z0-9\-_%]{3,100}$/i;

/** Turns "linkedin.com/in/jane-smith/?utm=x" into a canonical profile URL. Returns null if it isn't a profile link. */
export function normalizeLinkedInProfile(input: string): { url: string; handle: string } | null {
  let value = input.trim();
  if (!value) return null;
  value = value.replace(/^[a-z]+:\/\//i, '');
  value = value.replace(/^([a-z]{2,3}\.)?(www\.)?linkedin\.com/i, '');
  const match = value.match(/^\/in\/([^/?#]+)/i);
  if (!match) return null;
  const handle = decodeURIComponent(match[1]).toLowerCase();
  if (!HANDLE.test(match[1])) return null;
  return { url: `https://www.linkedin.com/in/${match[1].toLowerCase()}`, handle };
}

// Shared by the hero form (client) and /api/report-request (server).

const HOSTNAME = /^(?=.{4,253}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/;
const BLOCKED_SUFFIXES = ['.local', '.localhost', '.internal', '.lan', '.home', '.corp', '.test', '.invalid', '.example'];

/** Turns "https://www.Acme.com/pricing" into "acme.com". Returns null if it isn't a public domain name. */
export function normalizeDomain(input: string): string | null {
  let value = input.trim().toLowerCase();
  if (!value) return null;
  value = value.replace(/^[a-z]+:\/\//, '');
  value = value.split(/[/?#]/)[0];
  value = value.replace(/:\d+$/, '').replace(/\.$/, '');
  value = value.replace(/^www\./, '');
  if (!HOSTNAME.test(value)) return null;
  if (BLOCKED_SUFFIXES.some((s) => value.endsWith(s))) return null;
  return value;
}

export const CALENDLY_CONFIGURE_HINT =
  "Set NEXT_PUBLIC_CALENDLY_URL in your environment to your Calendly event link.";

const CALENDLY_HOST_SUFFIX = "calendly.com";

export function getCalendlyUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim();
  if (!raw) return null;
  try {
    const u = new URL(raw);
    if (!u.hostname.endsWith(CALENDLY_HOST_SUFFIX)) return null;
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    return u.href.replace(/\/$/, "");
  } catch {
    return null;
  }
}

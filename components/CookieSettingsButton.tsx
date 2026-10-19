'use client';

// Reopens HubSpot's cookie banner so visitors can change their consent later.
// Only rendered where the HubSpot tracking script loads (production with a portal ID set).
const hubSpotActive = process.env.NODE_ENV === 'production' && !!process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;

type HubSpotQueue = { push: (command: unknown[]) => void };

export function CookieSettingsButton({ className = '' }: { className?: string }) {
  if (!hubSpotActive) return null;
  return (
    <button
      type="button"
      onClick={() => {
        const w = window as unknown as { _hsp?: HubSpotQueue | unknown[] };
        const queue = (w._hsp = w._hsp || []) as HubSpotQueue;
        queue.push(['showBanner']);
      }}
      className={`underline-offset-4 transition-opacity hover:underline hover:opacity-80 ${className}`}
    >
      Cookie settings
    </button>
  );
}

import type { Lead } from './lead';
import type { OfferId } from './offers';

// Sends website leads to the HubSpot form, using the public Forms submission API (free, no API key).
// Submitting with the visitor's `hubspotutk` cookie links the contact to their page views from the tracking script.

export type LeadForHubSpot = Omit<Lead, 'domain' | 'linkedinUrl' | 'offer'> & {
  offer: OfferId;
  domain?: string;
  linkedinUrl?: string;
};

export type HubSpotContext = {
  /** Value of the `hubspotutk` cookie set by the HubSpot tracking script. */
  hutk?: string;
  pageUri?: string;
  pageName?: string;
  ipAddress?: string;
};

// Website option labels mapped to the internal values of the HubSpot dropdown properties.
const ROLE_VALUES: Record<Lead['role'], string> = {
  'Founder / CEO': 'founder_ceo',
  'Sales or growth lead': 'sales_growth_lead',
  Other: 'other',
};
const DEAL_SIZE_VALUES: Record<NonNullable<Lead['dealSize']>, string> = {
  'Under $5k': 'under_5k',
  '$5k – $20k': '5k_20k',
  '$20k+': '20k_plus',
  'Not sure': 'not_sure',
};
const TIMELINE_VALUES: Record<NonNullable<Lead['timeline']>, string> = {
  'This month': 'this_month',
  'This quarter': 'this_quarter',
  'Just exploring': 'just_exploring',
};

export function hubSpotFormConfig() {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formId = process.env.HUBSPOT_FORM_ID;
  return portalId && formId ? { portalId, formId } : null;
}

function splitName(fullName: string) {
  const [first, ...rest] = fullName.trim().split(/\s+/);
  return { firstname: first, lastname: rest.join(' ') };
}

export function hubSpotFields(lead: LeadForHubSpot) {
  const { firstname, lastname } = splitName(lead.fullName);
  const values: Record<string, string | undefined> = {
    firstname,
    lastname: lastname || undefined,
    email: lead.email,
    website: lead.domain ? `https://${lead.domain}` : undefined,
    hs_linkedin_url: lead.linkedinUrl,
    veleads_role: ROLE_VALUES[lead.role],
    veleads_deal_size: lead.dealSize ? DEAL_SIZE_VALUES[lead.dealSize] : undefined,
    veleads_timeline: lead.timeline ? TIMELINE_VALUES[lead.timeline] : undefined,
    veleads_offer: lead.offer,
  };
  return Object.entries(values)
    .filter((entry): entry is [string, string] => !!entry[1])
    .map(([name, value]) => ({ objectTypeId: '0-1', name, value }));
}

export async function submitToHubSpot(lead: LeadForHubSpot, context: HubSpotContext) {
  const config = hubSpotFormConfig();
  if (!config) return { skipped: true as const };

  const res = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${config.portalId}/${config.formId}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        fields: hubSpotFields(lead),
        context: Object.fromEntries(Object.entries(context).filter(([, v]) => v)),
      }),
      signal: AbortSignal.timeout(8000),
    },
  );
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`HubSpot form submission failed (${res.status}) ${detail.slice(0, 500)}`);
  }
  return { skipped: false as const };
}

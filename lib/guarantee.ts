// The Guaranteed Meetings offer, in one place. Every page that quotes a price, a deadline
// or the guarantee reads it from here, so the numbers never drift apart.

export const OFFER_NAME = 'Guaranteed Meetings';
export const OFFER_PATH = '/guaranteed-meetings';

/** Qualified meetings guaranteed in every 30-day cycle after go-live. */
export const MEETINGS_PER_CYCLE = 8;
export const CYCLE_DAYS = 30;

export const LINKEDIN_LIVE_DAY = 3;
/** Email is live and the first guarantee cycle starts. */
export const EMAIL_LIVE_DAY = 21;

export const ONBOARDING_FEE = 2000;
export const MONTHLY_FEE = 2500;
export const MIN_MONTHS = 3;

/** Paid back for every qualified meeting short of the guarantee in a cycle. */
export const REFUND_PER_MEETING = Math.round(MONTHLY_FEE / MEETINGS_PER_CYCLE);
/** Days after a cycle ends that a refund is paid. */
export const REFUND_DAYS = 7;

/** Paid back from the onboarding fee for each week a go-live deadline is missed. */
export const LATE_REFUND_PER_WEEK = 500;
export const LATE_REFUND_CAP = 2000;

export const NEW_FOUNDERS_PER_MONTH = 5;
/** The first founders get the onboarding fee waived in exchange for a case study, testimonial and logo. */
export const FOUNDING_SPOTS = 3;

/** Minimum annual deal size (annual contract value) to qualify for the guarantee. */
export const MIN_DEAL_SIZE = 10_000;
export const MIN_REACHABLE_ACCOUNTS = 1000;

export const usd = (n: number) => `$${n.toLocaleString('en-US')}`;

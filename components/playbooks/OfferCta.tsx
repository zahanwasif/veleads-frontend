import { offers, type OfferId } from '@/lib/offers';
import { BookCallLink } from '../BookCallLink';
import { DomainForm } from '../DomainForm';

// A free-offer form placed inside a playbook. Each one needs its own `id` so the input ids stay unique.
export function OfferCta({
  offer,
  id,
  title,
  body,
}: {
  offer: OfferId;
  id: string;
  title: string;
  body: string;
}) {
  return (
    <section
      aria-label={title}
      className="not-prose my-12 flex flex-col items-start gap-5 rounded-xl bg-inverse-bg p-6 text-inverse-text sm:p-8"
    >
      <div className="flex flex-col gap-2">
        <span className="heading-3">{title}</span>
        <p className="text-inverse-text-muted">{body}</p>
      </div>
      <DomainForm offerId={offer} inputId={id} />
      {/* The booking link defaults to dark purple text, so lift it to mint on this dark card. */}
      <p className="text-sm text-inverse-text-muted [&>a]:text-accent [&>span]:text-accent">
        {offers[offer].note} Prefer to talk? <BookCallLink />
      </p>
    </section>
  );
}

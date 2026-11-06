import type { Metadata } from 'next';
import { CaseStudy } from '@/components/CaseStudy';
import { Comparison } from '@/components/Comparison';
import { FAQ } from '@/components/FAQ';
import { ForWho } from '@/components/ForWho';
import { Guarantee } from '@/components/Guarantee';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { Offer } from '@/components/Offer';
import { PageShell } from '@/components/PageShell';
import { Services } from '@/components/Services';
import { MEETINGS_PER_CYCLE, OFFER_NAME, OFFER_PATH } from '@/lib/guarantee';

const title = `${OFFER_NAME}: ${MEETINGS_PER_CYCLE} sales calls a month, or cash back | Veleads`;
const description =
  `LinkedIn and outbound for B2B founders with $10k+ deals. Live in 3 days, then ${MEETINGS_PER_CYCLE} qualified sales calls every 30 days, or cash back for each one we miss.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: OFFER_PATH },
  openGraph: { title, description, url: OFFER_PATH },
  twitter: { title, description },
};

export default function GuaranteedMeetings() {
  return (
    <PageShell>
      <Hero variant="offer" />
      <Guarantee />
      <HowItWorks />
      <Services variant="offer" />
      <Offer />
      <CaseStudy />
      <ForWho />
      <Comparison />
      <FAQ variant="offer" />
    </PageShell>
  );
}

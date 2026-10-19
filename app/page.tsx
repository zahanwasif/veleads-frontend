import { CaseStudy } from '@/components/CaseStudy';
import { Comparison } from '@/components/Comparison';
import { FAQ } from '@/components/FAQ';
import { ForWho } from '@/components/ForWho';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { Offer } from '@/components/Offer';
import { PageShell } from '@/components/PageShell';
import { Services } from '@/components/Services';
import { SignalMarquee } from '@/components/SignalMarquee';

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <CaseStudy />
      <SignalMarquee />
      <ForWho />
      <Services />
      <HowItWorks />
      <Offer />
      <Comparison />
      <FAQ />
    </PageShell>
  );
}

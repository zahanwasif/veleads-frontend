import { CaseStudy } from '@/components/CaseStudy';
import { FAQ } from '@/components/FAQ';
import { ForWho } from '@/components/ForWho';
import { Guarantee } from '@/components/Guarantee';
import { Hero } from '@/components/Hero';
import { PageShell } from '@/components/PageShell';
import { Services } from '@/components/Services';
import { SignalMarquee } from '@/components/SignalMarquee';
import { WaysToWork } from '@/components/WaysToWork';

// The homepage introduces Veleads to founders. Guaranteed Meetings is sold on /guaranteed-meetings.
export default function Home() {
  return (
    <PageShell>
      <Hero />
      <Guarantee />
      <CaseStudy />
      <SignalMarquee />
      <Services />
      <ForWho />
      <WaysToWork />
      <FAQ />
    </PageShell>
  );
}

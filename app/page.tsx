import { CaseStudy } from '@/components/CaseStudy';
import { Comparison } from '@/components/Comparison';
import { FAQ } from '@/components/FAQ';
import { ForWho } from '@/components/ForWho';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { Navigation } from '@/components/Navigation';
import { Offer } from '@/components/Offer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Services } from '@/components/Services';
import { SignalMarquee } from '@/components/SignalMarquee';

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-surface text-text selection:bg-brand selection:text-on-brand">
      <ScrollReveal />
      <Navigation />
      <main className="w-full max-w-full overflow-x-clip">
        <Hero />
        <CaseStudy />
        <SignalMarquee />
        <ForWho />
        <Services />
        <HowItWorks />
        <Offer />
        <Comparison />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

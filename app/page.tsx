'use client';

import { CustomCursor } from '@/components/CustomCursor';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { Navigation } from '@/components/Navigation';
import { ProblemSection } from '@/components/ProblemSection';
import { SolutionSection } from '@/components/SolutionSection';
export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-main text-dark selection:bg-dark selection:text-white">
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <HowItWorks />
        <FinalCTA />
      </main>
      <Footer />
    </div>);

}
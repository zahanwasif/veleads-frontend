'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useState } from 'react';
export function SolutionSection() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
  {
    id: 'sdrs',
    label: 'For SDRs',
    headline: 'Stop switching tabs. Start booking meetings.',
    body: 'VeLeads gives SDRs one place to find leads, build sequences, and run outreach across every channel — without ever leaving the platform. Spend less time managing tools and more time having actual conversations with prospects.',
    bullets: [
    'Find and enrich leads matching your ICP in minutes',
    'Build multi-channel sequences inside one workflow',
    'Get notified the moment a lead opens, replies, or engages']

  },
  {
    id: 'teams',
    label: 'For Sales Teams',
    headline: 'Run coordinated outreach at scale — without the chaos.',
    body: 'VeLeads gives your entire sales team one connected platform to run multi-channel campaigns, track every lead, and flag opportunities automatically. No more disconnected tools, no more leads falling through the cracks between channels.',
    bullets: [
    'One workflow for the entire team to build and run outreach',
    'Full visibility of every lead across every channel in real time',
    'Automatic opportunity flagging so nothing slips through']

  },
  {
    id: 'founders',
    label: 'For Founders',
    headline: 'Build pipeline without building a sales team.',
    body: 'VeLeads lets founders run sophisticated multi-channel outreach without hiring SDRs. Set up your workflow once and let the platform find, qualify, and engage your ideal customers automatically — while you stay focused on closing.',
    bullets: [
    'Automated lead discovery and enrichment based on your ICP',
    'Sequences that follow up and adapt on their own',
    'Know exactly which leads are warm and ready to close']

  },
  {
    id: 'managers',
    label: 'For Sales Managers',
    headline: 'Full visibility of every lead. Zero micromanaging.',
    body: 'VeLeads gives sales managers a live view of every lead across every channel and every rep. See which sequences are performing, which leads are hot, and where your pipeline is leaking — all without asking your team for updates.',
    bullets: [
    'Live pipeline view across all reps and all active channels',
    'Workflow performance analytics to see what is working',
    'Automatic hot lead flagging and real-time alerts']

  }];

  return (
    <section id="solutions" className="py-[60px] md:py-[100px] bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            margin: '-100px'
          }}
          transition={{
            duration: 0.5
          }}
          className="mb-12 text-center">
          
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#A0A0A0] mb-4 font-medium">
            SOLUTIONS
          </p>
          <h2 className="text-4xl md:text-[40px] font-bold tracking-tight text-[#0F0F0F] mb-6">
            Built for every person on your sales team
          </h2>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto leading-[1.6] font-light">
            Whether you are an SDR running cold outreach or a founder building
            pipeline from scratch — VeLeads was made for you
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {tabs.map((tab, i) =>
          <button
            key={tab.id}
            onClick={() => setActiveTab(i)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === i ? 'bg-white text-[#0F0F0F] border border-[#E5E5E5] shadow-[0px_2px_12px_rgba(0,0,0,0.06)]' : 'bg-[#F9F9F7] text-[#6B6B6B] border border-transparent hover:bg-[#F0F0F0]'}`}>
            
              {tab.label}
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div className="max-w-[800px] mx-auto relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              exit={{
                opacity: 0
              }}
              transition={{
                duration: 0.3
              }}
              className="absolute inset-0">
              
              <h3 className="text-[28px] font-bold text-[#0F0F0F] mb-6">
                {tabs[activeTab].headline}
              </h3>
              <p className="text-[16px] text-[#6B6B6B] leading-[1.6] font-light mb-8">
                {tabs[activeTab].body}
              </p>
              <ul className="space-y-4">
                {tabs[activeTab].bullets.map((bullet, i) =>
                <li key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-[#0F0F0F] mr-4 shrink-0 stroke-[1.5] mt-0.5" />
                    <span className="text-[15px] text-[#0F0F0F]">{bullet}</span>
                  </li>
                )}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>);

}
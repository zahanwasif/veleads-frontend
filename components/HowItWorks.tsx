'use client';

import { motion } from 'framer-motion';
import { Fragment } from 'react';
import { CampaignBuilderCanvas } from './CampaignBuilderCanvas';
export function HowItWorks() {
  const steps = [
  {
    num: '01',
    title: 'Find & Enrich',
    desc: 'Discover and enrich prospects matching your ICP'
  },
  {
    num: '02',
    title: 'Qualify & Research',
    desc: 'Score leads and gather context automatically'
  },
  {
    num: '03',
    title: 'Build Your Workflow',
    desc: 'Define your sequence, assign channels, set timing'
  },
  {
    num: '04',
    title: 'Detect Opportunities',
    desc: 'Track engagement and flag hot leads automatically'
  }];

  return (
    <section
      id="how-it-works"
      className="py-[60px] md:py-[100px] bg-[#F9F9F7] overflow-hidden">
      
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
          className="mb-16 text-center">
          
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#A0A0A0] mb-4 font-medium">
            HOW IT WORKS
          </p>
          <h2 className="text-4xl md:text-[40px] font-bold tracking-tight text-[#0F0F0F] mb-6">
            From cold prospect to closed deal in one workflow
          </h2>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto leading-[1.6] font-light">
            Four steps. One platform. Zero manual work.
          </p>
        </motion.div>

        {/* Horizontal Step Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, i) =>
          <motion.div
            key={i}
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
              duration: 0.4,
              delay: i * 0.15
            }}
            className="flex flex-col items-start">
            
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2.5 h-2.5 rotate-45 bg-[#0F0F0F]" />
                <p className="text-[11px] text-[#A0A0A0] font-medium">
                  {step.num}
                </p>
              </div>
              <h4 className="text-[18px] font-bold text-[#0F0F0F] mb-2">
                {step.title}
              </h4>
              <p className="text-[14px] text-[#6B6B6B] leading-[1.6]">
                {step.desc}
              </p>
            </motion.div>
          )}
        </div>

        {/* Campaign Builder Canvas */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40
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
            duration: 0.8
          }}
          className="w-full">
          
          <CampaignBuilderCanvas />
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{
            opacity: 0
          }}
          whileInView={{
            opacity: 1
          }}
          viewport={{
            once: true,
            margin: '-100px'
          }}
          transition={{
            duration: 0.5,
            delay: 0.4
          }}
          className="flex items-center justify-center space-x-3 mt-12">
          
          {['Conditional Logic', 'Multi-Channel', 'Auto-Nurture'].map(
            (pill, i) =>
            <Fragment key={pill}>
                <div className="bg-white border border-[#E5E5E5] rounded-full px-4 py-1.5 text-xs text-[#6B6B6B]">
                  {pill}
                </div>
                {i < 2 && <span className="text-[#A0A0A0] text-xs">·</span>}
              </Fragment>

          )}
        </motion.div>
      </div>
    </section>);

}
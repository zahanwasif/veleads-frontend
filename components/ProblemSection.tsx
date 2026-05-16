'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, EyeOff, Layers } from 'lucide-react';
export function ProblemSection() {
  const problems = [
  {
    id: '01',
    title: 'Too Many Tools',
    desc: 'You need Apollo for prospecting data, Expandi or Dux-Soup for LinkedIn automation, Twilio or WATI for WhatsApp outreach, and Outreach or Salesloft for email sequences. Five tools. Five logins. Five bills. And nothing talks to each other.',
    icon: Layers
  },
  {
    id: '02',
    title: 'Leads Fall Through the Cracks',
    desc: 'Without a connected workflow, follow-ups get missed, cold leads go cold forever, and your pipeline leaks silently. There is no system keeping every lead moving forward across every channel.',
    icon: AlertTriangle
  },
  {
    id: '03',
    title: 'No Single View',
    desc: 'You have no idea where each lead stands across all your channels at any given moment. Reporting is a mess of spreadsheets and disconnected dashboards that never tell the full story.',
    icon: EyeOff
  }];

  return (
    <section id="problem" className="py-[60px] md:py-[100px] bg-white">
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
            THE PROBLEM
          </p>
          <h2 className="text-4xl md:text-[40px] font-bold tracking-tight text-[#0F0F0F] mb-6">
            Your sales stack was not built to work together
          </h2>
          <p className="text-lg text-[#6B6B6B] max-w-3xl mx-auto leading-[1.6] font-light">
            B2B sales teams are stitching together 4 or 5 tools just to run one
            outreach campaign — and leads are still falling through the cracks
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((prob, i) =>
          <motion.div
            key={prob.id}
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
              margin: '-50px'
            }}
            transition={{
              duration: 0.5,
              delay: i * 0.2
            }}
            className="bg-white border border-[#E5E5E5] p-8 rounded-[24px] shadow-[0px_2px_12px_rgba(0,0,0,0.06)] hover:-translate-y-[3px] hover:shadow-[0px_8px_32px_rgba(0,0,0,0.10)] transition-all duration-300 group flex flex-col">
            
              <div className="mb-8 relative">
                <prob.icon className="w-6 h-6 text-[#1A1A1A] stroke-[1.5]" />
                <span className="absolute top-0 right-0 text-xs font-medium text-[#A0A0A0]">
                  {prob.id}
                </span>
              </div>
              <h3 className="text-[18px] font-bold text-[#0F0F0F] mb-4">
                {prob.title}
              </h3>
              <p className="text-[#6B6B6B] text-[15px] leading-[1.6] font-light">
                {prob.desc}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}
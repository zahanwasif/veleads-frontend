'use client';

import { BookDemoButton } from '@/components/BookDemoButton';
import { motion } from 'framer-motion';
import { DotGrid } from './DotGrid';
export function FinalCTA() {
  return (
    <section
      id="get-started"
      className="relative py-[120px] bg-[#0F0F0F] overflow-hidden flex items-center justify-center">
      
      {/* Dark theme dot grid */}
      <DotGrid color="#FFFFFF" opacity={0.04} speed={60} />

      <div className="max-w-[1200px] w-full mx-auto px-6 relative z-10 text-center">
        <motion.h2
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.6
          }}
          className="text-[40px] md:text-[56px] font-bold tracking-tight text-white mb-6 leading-[1.1]">
          
          Your pipeline won&apos;t build itself. Ours will.
        </motion.h2>

        <motion.p
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.6,
            delay: 0.3
          }}
          className="text-[18px] text-[#A0A0A0] max-w-2xl mx-auto mb-10 leading-[1.6] font-light">
          
          The smarter way for B2B sales teams to find, engage, and close —
          without the complexity.
        </motion.p>

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
            once: true
          }}
          transition={{
            duration: 0.6,
            delay: 0.6
          }}
          className="flex flex-col items-center">
          
          <BookDemoButton
            variant="light"
            className="px-10 py-4 text-[18px] mb-8"
          />
        </motion.div>

        <motion.div
          initial={{
            opacity: 0
          }}
          whileInView={{
            opacity: 1
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.6,
            delay: 0.9
          }}
          className="flex items-center justify-center space-x-2 text-[13px] text-[#A0A0A0]">
          
          <span>No credit card required</span>
          <span>·</span>
          <span>Setup in 5 minutes</span>
          <span>·</span>
          <span>Cancel anytime</span>
        </motion.div>
      </div>
    </section>);

}
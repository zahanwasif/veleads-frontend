'use client';

import { BookDemoButton } from '@/components/BookDemoButton';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
export function Hero() {
  const headlineWords =
  'The Multi-Channel Sales Engagement Platform Built for B2B Teams'.split(' ');
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0
  });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return (
    <section
      id="product"
      className="relative min-h-screen pt-32 pb-24 md:pt-40 md:pb-32 flex flex-col items-center justify-center overflow-hidden bg-[#F9F9F7]">
      
      {/* Interactive Dot Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute inset-[-10%]"
          style={{
            backgroundImage: `radial-gradient(#0F0F0F 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            opacity: 0.03
          }}
          animate={{
            x: -mousePos.x,
            y: -mousePos.y - 32
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 40,
              ease: 'linear'
            },
            x: {
              type: 'spring',
              stiffness: 50,
              damping: 20
            }
          }} />
        
      </div>

      <div className="max-w-[1200px] w-full mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-[64px] font-bold tracking-tight text-[#0F0F0F] mb-6 leading-[1.1] max-w-4xl">
          {headlineWords.map((word, i) =>
          <motion.span
            key={i}
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.4,
              delay: i * 0.05
            }}
            className="inline-block mr-[0.25em]">
            
              {word}
            </motion.span>
          )}
        </h1>

        <motion.p
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.5,
            delay: 0.5
          }}
          className="text-lg md:text-[20px] text-[#6B6B6B] max-w-2xl mb-10 leading-[1.6] font-light">
          
          Find the right leads, engage them across every channel, and let your
          pipeline build itself — all from one intelligent workflow.
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.5,
            delay: 0.8
          }}
          className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          
          <BookDemoButton
            variant="dark"
            className="w-full sm:w-auto px-8 py-3.5"
          />
          <a href="#how-it-works">
          <button className="w-full sm:w-auto group bg-white text-[#0F0F0F] border border-[#0F0F0F] px-8 py-3.5 rounded-lg font-medium hover:bg-[#F5F5F5] transition-colors flex items-center justify-center">
            See How It Works
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          </a>
        </motion.div>
      </div>
    </section>);

}
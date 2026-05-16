'use client';

import { motion } from 'framer-motion';
interface DotGridProps {
  color?: string;
  opacity?: number;
  speed?: number;
}
export function DotGrid({
  color = '#0F0F0F',
  opacity = 0.03,
  speed = 40
}: DotGridProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          opacity: opacity
        }}
        animate={{
          y: [0, -32]
        }}
        transition={{
          repeat: Infinity,
          duration: speed,
          ease: 'linear'
        }} />
      
    </div>);

}
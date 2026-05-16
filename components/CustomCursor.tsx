'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState, useSyncExternalStore } from 'react';

const touchSubscribe = () => () => {};

function getTouchClientSnapshot() {
  return (
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  );
}

export function CustomCursor() {
  const isTouchDevice = useSyncExternalStore(
    touchSubscribe,
    getTouchClientSnapshot,
    () => false,
  );
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = {
    damping: 25,
    stiffness: 120,
    mass: 0.5
  };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  useEffect(() => {
    if (isTouchDevice) return;
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
      if (!isVisible) setIsVisible(true);
    };
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible, isTouchDevice]);
  if (isTouchDevice) return null;
  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-dark/40 rounded-full pointer-events-none z-[9999] mix-blend-multiply"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        opacity: isVisible ? 1 : 0
      }}
      transition={{
        opacity: {
          duration: 0.2
        }
      }} />);


}
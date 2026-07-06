"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export function HeroAvatar() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-12, 12]);

  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className="relative w-56 h-56 sm:w-72 sm:h-72 select-none group"
    >
      {/* Glow shadow behind card */}
      <div className="absolute inset-4 rounded-[32px] bg-[var(--primary)] opacity-20 blur-2xl group-hover:opacity-35 transition-opacity duration-500" />

      {/* Frame border background */}
      <div 
        className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-[var(--primary)] via-[var(--border)] to-[var(--primary-muted)] p-[1.5px] shadow-[var(--shadow-xl)]"
        style={{ transform: "translateZ(0px)" }}
      >
        {/* Core photo container */}
        <div className="relative w-full h-full rounded-[30px] bg-[var(--surface)] overflow-hidden">
          
          {/* Grid background behind the photo */}
          <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:16px_16px]" />

          {/* Glowing dot grid */}
          <div className="absolute inset-0 bg-radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)" />

          {/* The Portrait Image */}
          <motion.div 
            className="absolute inset-0 w-full h-full p-2"
            style={{ transform: "translateZ(10px)" }}
          >
            <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-white/5 border border-white/10">
              <img
                src="/avatar.png"
                alt="Shikhar Srivastava"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                draggable={false}
              />
            </div>
          </motion.div>

          {/* Cyberpunk HUD / Scanning element overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ transform: "translateZ(15px)" }}
          >
            {/* Corner brackets */}
            <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-[var(--primary)] opacity-60" />
            <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-[var(--primary)] opacity-60" />
            <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-[var(--primary)] opacity-60" />
            <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-[var(--primary)] opacity-60" />

            {/* Scanning Line sweeping downward */}
            <motion.div
              className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-40 shadow-[0_0_8px_var(--primary)]"
              initial={{ top: "0%" }}
              animate={{ top: ["5%", "95%", "5%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>

      {/* Floating "AI/ML Engineer" pill */}
      <motion.div
        className="absolute -top-3 -left-3 px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-xs font-semibold text-[var(--text-secondary)] shadow-[var(--shadow-md)]"
        style={{ transform: "translateZ(28px)" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        AI/ML Engineer
      </motion.div>

      {/* Small tech badge at bottom right */}
      <motion.div
        className="absolute -bottom-3 -right-3 px-3 py-1 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[9px] font-mono text-[var(--primary)] shadow-[var(--shadow-sm)]"
        style={{ transform: "translateZ(25px)" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        SYS_STATUS: ACTIVE
      </motion.div>
    </motion.div>
  );
}

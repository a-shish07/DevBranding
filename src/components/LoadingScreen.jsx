import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      {/* Background Soft Glow */}
      <motion.div 
        className="absolute w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.2em" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-12"
        >
          <h1 className="font-display text-4xl md:text-6xl font-extrabold uppercase text-white">
            Dev Bharwad
          </h1>
        </motion.div>

        {/* Minimalist Progress Line */}
        <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ 
              duration: 2, 
              ease: "easeInOut",
              repeat: Infinity
            }}
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 flex flex-col items-center gap-2"
        >
          <p className="font-condensed uppercase tracking-[0.4em] text-[10px] text-white/50">
            Heritage & Vision
          </p>
          <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" />
        </motion.div>
      </div>

      {/* Elegant Framing */}
      <div className="absolute inset-12 border border-white/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
    </motion.div>
  );
};

export default LoadingScreen;

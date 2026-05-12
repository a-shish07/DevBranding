import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const PageTransition = ({ children, title }) => {
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFirstMount(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const transition = { duration: 0.8, ease: [0.76, 0, 0.24, 1] };

  const anim = (variants) => {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      variants
    }
  }

  const nbOfColumns = 5;

  const expand = {
    initial: {
      top: 0
    },
    enter: (i) => ({
      top: "100%",
      transition: {
        duration: 0.4,
        delay: 0.03 * i, // Reduced delay for faster transition
        ease: [0.215, 0.61, 0.355, 1],
      },
      transitionEnd: { height: 0, top: 0 }
    }),
    exit: (i) => ({
      height: "100%",
      transition: {
        duration: 0.4,
        delay: 0.03 * i, // Reduced delay for faster transition
        ease: [0.215, 0.61, 0.355, 1],
      }
    })
  }

  return (
    <div className="page-transition-wrapper">
      {/* Columns Background */}
      <div className="fixed inset-0 z-[9999] pointer-events-none flex h-screen">
        {[...Array(nbOfColumns)].map((_, i) => {
          return (
            <motion.div
              key={i}
              className="relative h-full w-full bg-black"
              {...anim(expand)}
              custom={nbOfColumns - i}
            />
          )
        })}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          filter: "blur(0px)",
          transition: { duration: 0.6, delay: 0.3, ease: "easeOut" } 
        }}
        exit={{ 
          opacity: 0, 
          scale: 1.02, 
          filter: "blur(10px)",
          transition: { duration: 0.4, ease: "easeIn" } 
        }}
      >
        {children}
      </motion.div>
      
      {/* Transition Overlay Content (Shows on ENTER of the new page) */}
      <motion.div
        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center pointer-events-none text-white"
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: 0,
          transition: { duration: 0.3, delay: 0.6 } // Fade out after columns start moving
        }}
        exit={{ 
          opacity: 0, 
          transition: { duration: 0.2 }
        }}
      >
        <div className="flex flex-col items-center">
          <h2 className="font-display text-2xl md:text-4xl font-extrabold tracking-[0.2em] uppercase mb-4">
            Dev Bharwad
          </h2>
          
          <div className="flex items-center gap-3 bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm border border-white/10">
            <Loader2 className="w-4 h-4 animate-spin text-white/70" />
            <span className="font-condensed uppercase tracking-[0.3em] text-[10px] md:text-xs text-white/90">
              Opening {title}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PageTransition;

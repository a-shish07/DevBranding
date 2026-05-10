import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../data/mock';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (sessionStorage.getItem('promo_dismissed')) setShowPromo(false);
  }, []);

  const onHome = location.pathname === '/';

  const dismissPromo = () => {
    sessionStorage.setItem('promo_dismissed', '1');
    setShowPromo(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Promo bar */}
      <AnimatePresence>
        {showPromo && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#C8102E] text-white overflow-hidden"
          >
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-9 flex items-center justify-between text-xs">
              <p className="truncate font-condensed uppercase tracking-widest">
                <span className="hidden md:inline">Now booking community speaking engagements — </span>
                <Link to="/contact" className="underline underline-offset-2 hover:no-underline">
                  Get in touch ›
                </Link>
              </p>
              <button
                onClick={dismissPromo}
                aria-label="Dismiss"
                className="opacity-80 hover:opacity-100 ml-4"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main nav */}
      <div
        className={`transition-colors duration-300 ${
          scrolled || !onHome
            ? 'bg-black/95 backdrop-blur-sm border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span
              className="font-display text-white text-xl md:text-2xl font-extrabold tracking-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              DEV <span style={{ color: '#C8102E' }}>BHARWAD</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((l) => {
              const active = location.pathname === l.path;
              return (
                <Link
                  key={l.path}
                  to={l.path}
                  className={`nav-underline font-condensed uppercase text-sm tracking-widest font-semibold transition-colors ${
                    active ? 'text-white active' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-[#C8102E] hover:bg-[#a50d24] text-white font-condensed uppercase text-sm tracking-widest transition-colors"
            >
              Get In Touch
            </Link>
          </div>

          <button
            aria-label="Toggle menu"
            className="lg:hidden text-white p-2"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-black border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={l.path}
                    className="block py-3 text-white/90 hover:text-white font-condensed uppercase text-sm tracking-widest border-b border-white/5"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: NAV_LINKS.length * 0.05 }}
              >
                <Link
                  to="/contact"
                  className="mt-4 inline-flex items-center justify-center px-5 py-3 bg-[#C8102E] text-white font-condensed uppercase text-sm tracking-widest w-full"
                >
                  Get In Touch
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

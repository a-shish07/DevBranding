import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS, SITE, SOCIALS } from '../data/mock';
import ScrollReveal from './ui/scroll-reveal';

const iconFor = (name) => {
  switch (name) {
    case 'Instagram':
      return <Instagram size={18} />;
    case 'Facebook':
      return <Facebook size={18} />;
    case 'LinkedIn':
      return <Linkedin size={18} />;
    case 'Email':
      return <Mail size={18} />;
    default:
      return null;
  }
};

const Footer = () => {
  return (
    <footer className="bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0   pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-20 pb-10 relative">
        <ScrollReveal direction="up" className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <h3 className="font-display uppercase text-4xl md:text-5xl leading-[0.95] font-bold">
              Let&apos;s build something
              <br />
              <span style={{ color: '#E6C87E' }}>that matters.</span>
            </h3>
            <p className="mt-6 text-white/70 max-w-md">
              For collaborations, speaking engagements, or community initiatives — reach out and start a conversation.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-[#E6C87E] hover:bg-[#C5A059] font-display uppercase tracking-widest text-sm transition-colors"
            >
              Get In Touch <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="lg:col-span-3">
            <p className="font-display uppercase tracking-widest text-xs text-white/50 mb-4">Explore</p>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-white/80 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="font-display uppercase tracking-widest text-xs text-white/50 mb-4">Connect</p>
            <ul className="space-y-3">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
                  >
                    <span className="w-9 h-9 border border-white/20 flex items-center justify-center group-hover:border-[#E6C87E] group-hover:text-[#E6C87E] transition-colors">
                      {iconFor(s.name)}
                    </span>
                    <span>
                      <span className="block text-xs text-white/50 uppercase tracking-wider">{s.name}</span>
                      <span className="block">{s.handle}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-white/40 text-xs uppercase tracking-widest">
            Crafted with purpose. Rooted in heritage.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

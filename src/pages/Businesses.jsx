import React, { useMemo, useState, useEffect } from 'react';
import {
  Search,
  ArrowUpRight,
  X,
} from 'lucide-react';

import { BUSINESSES, BUSINESS_IMAGES } from '../data/mock';
import ScrollReveal from '../components/ui/scroll-reveal';

const BusinessModal = ({ business, onClose }) => {
  if (!business) return null;

  const imageIndex = BUSINESSES.findIndex(
    (b) => b.name === business.name
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl bg-white rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">

        {/* Top Section */}
        <div className="relative bg-black px-8 py-8 md:px-10 md:py-10 text-white">

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
          >
            <X size={18} />
          </button>

          {/* Logo + Title */}
          <div className="flex items-center gap-5 pr-10">

            {/* Logo */}
            <div className="w-20 h-20 rounded-3xl overflow-hidden bg-white/10 shrink-0 border border-white/10">
              <img
                src={BUSINESS_IMAGES[imageIndex % BUSINESS_IMAGES.length]}
                alt={business.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text */}
            <div>
              <p className="uppercase tracking-[0.3em] text-[10px] text-white/50 mb-2">
                Business Overview
              </p>

              <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                {business.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-8 md:px-10 md:py-10">

          <p className="text-neutral-600 leading-relaxed text-[15px] md:text-base">
            {business.desc}
          </p>

          {/* Bottom */}
          <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between">

            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 mb-1">
                Status
              </p>

              <p className="font-semibold text-sm text-black">
                Active Venture
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-[#C8102E]">
              <ArrowUpRight size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Businesses = () => {
  const [q, setQ] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const filtered = useMemo(
    () =>
      BUSINESSES.filter((b) =>
        b.name.toLowerCase().includes(q.toLowerCase())
      ),
    [q]
  );

  // ESC close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedBusiness(null);
    };

    window.addEventListener('keydown', handleEsc);

    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="bg-white">
      <BusinessModal
        business={selectedBusiness}
        onClose={() => setSelectedBusiness(null)}
      />

      {/* HERO */}
      <section className="relative bg-black text-white pt-28 pb-20 overflow-hidden">
        <img
          src={BUSINESS_IMAGES[0]}
          alt="AOD Group"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0  " />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <ScrollReveal direction="up">
            <p className="font-display uppercase tracking-[0.3em] text-xs text-[#C8102E]">
              AOD Group of Companies
            </p>

            <h1 className="font-display uppercase text-5xl md:text-7xl lg:text-[8rem] font-black leading-[0.9] mt-4 tracking-tight">
              <span className="text-[#C8102E]">Businesses</span>
            </h1>

            <p className="font-serif-italic text-lg md:text-2xl mt-6 max-w-2xl text-white/75">
              One ecosystem. {BUSINESSES.length} verticals.
              Built for long-term impact and innovation.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left */}
          <ScrollReveal className="lg:col-span-5" direction="right">
            <p className="font-display uppercase tracking-[0.3em] text-xs text-[#C8102E] mb-4">
              Vision & Strategy
            </p>

            <h2 className="font-display uppercase text-4xl md:text-6xl font-black leading-[0.92] text-black tracking-tight">
              A diversified
              <br />
              ecosystem under
              <br />
              <span className="text-[#C8102E]">
                one vision.
              </span>
            </h2>

            <div className="h-px w-20 bg-[#C8102E] mt-8 mb-6" />

            <p className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-lg">
              From premium real estate and luxury hospitality to food,
              technology, and global investments — AOD Group operates
              across carefully crafted verticals.
            </p>
          </ScrollReveal>

          {/* Right Images */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-4">
            {BUSINESS_IMAGES.slice(0, 6).map((src, i) => (
              <ScrollReveal
                key={i}
                direction="up"
                delay={i * 0.05}
                className={`group overflow-hidden rounded-2xl relative ${
                  i === 0 ? 'col-span-2 row-span-2' : 'aspect-square'
                }`}
              >
                <img
                  src={src}
                  alt={`Business ${i + 1}`}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-[#C8102E]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS CARDS */}
      <section className="bg-neutral-50 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="font-display uppercase tracking-[0.3em] text-[10px] font-bold text-[#C8102E] mb-3">
                Portfolio Explorer
              </p>

              <h2 className="font-display uppercase text-3xl md:text-5xl font-black leading-[0.95] text-black tracking-tight">
                Explore the
                <span className="block text-[#C8102E]">
                  Businesses
                </span>
              </h2>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                size={18}
              />

              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search business..."
                className="w-full pl-12 pr-4 h-12 bg-white border border-neutral-200 rounded-full focus:ring-2 focus:ring-[#C8102E]/10 focus:outline-none transition-all text-sm"
              />
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((b, i) => (
              <ScrollReveal
                key={b.name}
                direction="up"
                delay={(i % 4) * 0.05}
              >
                <div
                  onClick={() => setSelectedBusiness(b)}
                  className="group h-full min-h-[240px] bg-white rounded-[26px] border border-neutral-200 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer flex flex-col"
                >
                  
                  {/* Top */}
                  <div className="flex items-center gap-4 mb-5">

                    {/* Logo */}
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-neutral-100 shrink-0">
                      <img
                        src={BUSINESS_IMAGES[i % BUSINESS_IMAGES.length]}
                        alt={b.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl font-black tracking-tight text-black leading-tight group-hover:text-[#C8102E] transition-colors">
                      {b.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-500 leading-relaxed line-clamp-4 flex-grow">
                    {b.desc}
                  </p>

                  {/* Bottom */}
                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-end">
                    <ArrowUpRight
                      size={18}
                      className="text-neutral-300 group-hover:text-[#C8102E] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                    />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Empty */}
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-neutral-400">
                No businesses found matching your search.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Businesses;
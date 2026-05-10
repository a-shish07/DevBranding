import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { STORY_CHAPTERS, PORTRAIT_4 } from '../data/mock';
import ScrollReveal from '../components/ui/scroll-reveal';

const Story = () => {
  return (
    <div className="bg-white">
      {/* Page hero */}
      <section className="relative bg-black text-white pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grain" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <ScrollReveal direction="up">
            <p className="font-display uppercase tracking-[0.3em] text-xs text-[#C8102E]">Chapter Index</p>
            <h1 className="font-display uppercase text-6xl md:text-8xl lg:text-[10rem] font-bold leading-[0.9] mt-4">
              THE <span style={{ color: '#C8102E' }}>STORY</span>
            </h1>
            <p className="font-serif-italic text-xl md:text-2xl mt-6 max-w-2xl text-white/80">
              A journey that bridges grassroots values with global vision — told in six chapters.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Chapters */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 space-y-24 md:space-y-32">
          {STORY_CHAPTERS.map((c, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <div
                key={c.no}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  reverse ? 'lg:[&>div:first-child]:order-2' : ''
                }`}
              >
                <ScrollReveal 
                  className="lg:col-span-6" 
                  direction={reverse ? 'left' : 'right'}
                >
                  <div className="img-zoom">
                    <img src={c.image} alt={c.title} className="w-full h-[460px] object-cover" />
                  </div>
                </ScrollReveal>
                <ScrollReveal 
                  className="lg:col-span-6" 
                  direction={reverse ? 'right' : 'left'}
                  delay={0.2}
                >
                  <p
                    className="font-display text-[#C8102E] text-7xl md:text-8xl font-bold leading-none"
                    style={{ letterSpacing: '-0.04em' }}
                  >
                    {c.no}
                  </p>
                  <h2
                    className="font-display uppercase text-4xl md:text-5xl font-bold leading-[0.95] mt-2 text-black"
                    style={{ letterSpacing: '-0.01em' }}
                  >
                    {c.title}
                  </h2>
                  <div className="divider-red mt-6" />
                  <p className="mt-6 text-lg text-neutral-700 leading-relaxed max-w-xl">{c.text}</p>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-black text-white overflow-hidden">
        <img
          src={PORTRAIT_4}
          alt="Dev Bharwad"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-24 md:py-32">
          <h2 className="font-display uppercase text-5xl md:text-7xl font-bold leading-[0.95] max-w-3xl">
            The story continues.
            <br />
            <span style={{ color: '#C8102E' }}>Be part of it.</span>
          </h2>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-2 px-7 py-4 bg-[#C8102E] hover:bg-[#a50d24] font-display uppercase tracking-widest text-sm transition-colors"
          >
            Connect With Dev <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Story;

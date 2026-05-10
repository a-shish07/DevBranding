import React, { useState } from 'react';
import { Play, ArrowUpRight, Newspaper, FileText, Youtube } from 'lucide-react';
import { NEWS, BLOGS, YOUTUBE } from '../data/mock';
import ScrollReveal from '../components/ui/scroll-reveal';

const tabs = [
  { id: 'youtube', label: 'YouTube', icon: Youtube, data: YOUTUBE },
  { id: 'news', label: 'News', icon: Newspaper, data: NEWS },
  { id: 'blogs', label: 'Blogs', icon: FileText, data: BLOGS },
];

const Media = () => {
  const [active, setActive] = useState('youtube');
  const current = tabs.find((t) => t.id === active);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-black text-white pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grain" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <ScrollReveal direction="up">
            <p className="font-display uppercase tracking-[0.3em] text-xs text-[#C8102E]">Press • Stories • Voice</p>
            <h1 className="font-display uppercase text-6xl md:text-8xl lg:text-[10rem] font-bold leading-[0.9] mt-4">
              MEDIA & <span style={{ color: '#C8102E' }}>BLOGS</span>
            </h1>
            <p className="font-serif-italic text-xl md:text-2xl mt-6 max-w-2xl text-white/80">
              Conversations, coverage, and reflections from a life of leadership.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-neutral-200 sticky top-20 bg-white z-30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-wrap gap-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`flex items-center gap-2 px-5 py-4 font-display uppercase tracking-widest text-sm border-b-2 transition-colors ${
                  isActive
                    ? 'border-[#C8102E] text-black'
                    : 'border-transparent text-neutral-500 hover:text-black'
                }`}
              >
                <Icon size={16} /> {t.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {active === 'youtube' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {current.data.map((v, i) => (
                <ScrollReveal 
                  key={v.title}
                  direction="up"
                  delay={(i % 2) * 0.1}
                >
                  <button
                    className="group text-left w-full"
                    onClick={() => alert('Video player coming soon')}
                  >
                    <div className="relative img-zoom aspect-video overflow-hidden bg-black">
                      <img src={v.image} alt={v.title} className="w-full h-full object-cover opacity-90" />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="w-20 h-20 rounded-full bg-[#C8102E] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play size={28} className="text-white ml-1" />
                        </span>
                      </div>
                      <span className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-xs font-display tracking-widest">
                        {v.duration}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display uppercase text-xl md:text-2xl font-bold leading-tight text-black group-hover:text-[#C8102E] transition-colors">
                      {v.title}
                    </h3>
                  </button>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {current.data.map((n, i) => (
                <ScrollReveal 
                  key={n.title}
                  direction="up"
                  delay={(i % 3) * 0.1}
                >
                  <article className="group cursor-pointer">
                    <div className="img-zoom aspect-[4/3] overflow-hidden">
                      <img src={n.image} alt={n.title} className="w-full h-full object-cover" />
                    </div>
                    <p className="mt-5 font-display uppercase tracking-widest text-xs text-[#C8102E]">
                      {n.type} • {n.date}
                    </p>
                    <h3 className="mt-2 font-display uppercase text-xl md:text-2xl font-bold leading-tight text-black group-hover:text-[#C8102E] transition-colors">
                      {n.title}
                    </h3>
                    <p className="mt-3 text-neutral-700 leading-relaxed">{n.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-2 font-display uppercase tracking-widest text-xs border-b border-black pb-1 group-hover:text-[#C8102E] group-hover:border-[#C8102E] transition-colors">
                      Read More <ArrowUpRight size={12} />
                    </span>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Media;

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from '../components/ui/scroll-reveal';
import { ChevronDown } from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  Play,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Clock,
} from 'lucide-react';
import {
  HERO_IMAGE,
  PORTRAIT_3,
  PILLARS,
  EVENTS,
  TESTIMONIALS,
  PRESS_LOGOS,
  VIDEO_TESTIMONIALS,
  STATS,
  BUSINESSES,
  STORY_IMAGES,
} from '../data/mock';



/* ============================================================ */
/* Carousel: simple scroll-snap horizontal slider (Tony style)   */
/* ============================================================ */
const HCarousel = ({ children, ariaLabel = 'carousel' }) => {
  const ref = useRef(null);
  const scroll = (dir) => {
    if (!ref.current) return;
    const w = ref.current.clientWidth * 0.8;
    ref.current.scrollBy({ left: dir * w, behavior: 'smooth' });
  };
  return (
    <div className="relative">
      <div className="flex justify-end gap-2 mb-6">
        <button
          aria-label="Previous"
          onClick={() => scroll(-1)}
          className="w-11 h-11 border border-neutral-300 hover:border-[#C8102E] hover:text-[#C8102E] flex items-center justify-center transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          aria-label="Next"
          onClick={() => scroll(1)}
          className="w-11 h-11 border border-neutral-300 hover:border-[#C8102E] hover:text-[#C8102E] flex items-center justify-center transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div
        ref={ref}
        aria-label={ariaLabel}
        className="flex gap-5 overflow-x-auto scrollbar-hide snap-x-strong pb-4"
      >
        {children}
      </div>
    </div>
  );
};

const HCarouselDark = ({ children, ariaLabel = 'carousel' }) => {
  const ref = useRef(null);
  const scroll = (dir) => {
    if (!ref.current) return;
    const w = ref.current.clientWidth * 0.8;
    ref.current.scrollBy({ left: dir * w, behavior: 'smooth' });
  };
  return (
    <div className="relative">
      <div className="flex justify-end gap-2 mb-6">
        <button
          aria-label="Previous"
          onClick={() => scroll(-1)}
          className="w-11 h-11 border border-white/30 hover:border-[#C8102E] hover:text-[#C8102E] text-white flex items-center justify-center transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          aria-label="Next"
          onClick={() => scroll(1)}
          className="w-11 h-11 border border-white/30 hover:border-[#C8102E] hover:text-[#C8102E] text-white flex items-center justify-center transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div
        ref={ref}
        aria-label={ariaLabel}
        className="flex gap-5 overflow-x-auto scrollbar-hide snap-x-strong pb-4"
      >
        {children}
      </div>
    </div>
  );
};

/* ============================================================ */
/* Pillars (hover swap big background image — Tony style)        */
/* ============================================================ */
const PillarsSection = () => {
  const [active, setActive] = useState(0);
  return (
    <section className="relative py-24 md:py-32 bg-black text-white overflow-hidden">
      <div className="absolute inset-0">
        {PILLARS.map((p, i) => (
          <img
            key={p.name}
            src={p.image}
            alt={p.name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              i === active ? 'opacity-40' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
        <div className="absolute inset-0 grain" />
      </div>
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <ScrollReveal className="lg:col-span-5" direction="right">
          <p className="font-condensed uppercase tracking-[0.3em] text-xs text-[#ff8194] mb-4">
            The Pillars
          </p>
          <h2
            className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95]"
            style={{ letterSpacing: '-0.03em' }}
          >
            Pillars for an
            <br />
            extraordinary life.
          </h2>
          <p className="mt-6 text-white/70 max-w-md">
            The values that shape every decision, every relationship, and every business Dev builds.
          </p>
        </ScrollReveal>
        <ScrollReveal className="lg:col-span-7" direction="left" delay={0.2}>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {PILLARS.map((p, i) => (
              <li
                key={p.name}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                className="group flex items-center justify-between py-5 cursor-pointer"
              >
                <span
                  className={`font-display text-3xl md:text-5xl font-extrabold transition-colors ${
                    i === active ? 'text-white' : 'text-white/40 hover:text-white'
                  }`}
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {p.name}
                </span>
                <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 group-hover:text-[#ff8194] transition-colors">
                  Explore
                  <ArrowUpRight size={16} />
                </span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
};

/* ============================================================ */
/* Testimonials (TR-style: big portrait + name overlay + quote)  */
/* ============================================================ */
const TestimonialsSection = () => {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  const next = () => setI((p) => (p + 1) % TESTIMONIALS.length);
  const prev = () => setI((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  return (
    <section className="relative py-20 md:py-28 bg-black text-white overflow-hidden">
      <div className="absolute inset-0 grain" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(40,90,180,0.3), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(200,16,46,0.18), transparent 60%)',
        }}
      />
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Big portrait card with name overlay */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
              {TESTIMONIALS.map((tt, idx) => (
                <img
                  key={tt.name}
                  src={tt.portrait}
                  alt={tt.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    idx === i ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p
                  key={`name-${t.name}`}
                  className="font-display text-3xl md:text-4xl font-extrabold leading-[1.05] fade-in"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {t.name}
                </p>
                <p className="text-sm text-white/75 mt-1">{t.role}</p>
              </div>
            </div>
          </div>

          {/* Quote and controls */}
          <div className="lg:col-span-7 lg:pl-8">
            <p className="font-condensed uppercase tracking-[0.3em] text-xs text-[#ff8194]">
              What Leaders Say
            </p>
            <blockquote
              key={t.name}
              className="font-serif-italic text-3xl md:text-4xl lg:text-5xl leading-[1.2] mt-6 fade-in"
            >
              “{t.quote}”
            </blockquote>
            <div className="mt-10 flex items-center gap-4">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-white/20"
              />
              <div>
                <p className="font-display text-lg font-bold">{t.name}</p>
                <p className="text-sm text-white/60">{t.role}</p>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setI(idx)}
                    aria-label={`Show testimonial ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === i ? 'bg-[#C8102E] w-12' : 'bg-white/30 w-6 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="w-11 h-11 rounded-full border border-white/30 hover:border-[#C8102E] hover:text-[#C8102E] flex items-center justify-center transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className="w-11 h-11 rounded-full border border-white/30 hover:border-[#C8102E] hover:text-[#C8102E] flex items-center justify-center transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Avatar strip (TR-style) */}
            <div className="mt-10 flex items-center gap-4 overflow-x-auto scrollbar-hide pb-2">
              {TESTIMONIALS.map((tt, idx) => (
                <button
                  key={`thumb-${tt.name}`}
                  onClick={() => setI(idx)}
                  className={`shrink-0 flex flex-col items-center gap-2 transition-opacity ${
                    idx === i ? 'opacity-100' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <img
                    src={tt.avatar}
                    alt={tt.name}
                    className={`w-14 h-14 rounded-full object-cover ${
                      idx === i ? 'ring-2 ring-[#C8102E]' : 'ring-1 ring-white/20'
                    }`}
                  />
                  <span className="text-[10px] font-condensed uppercase tracking-widest text-white/60 whitespace-nowrap">
                    {tt.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================ */
/* Home Page                                                      */
/* ============================================================ */
const Home = () => {
  // Top promo bar (like Tony's)
  const [showPromo, setShowPromo] = useState(true);
  useEffect(() => {
    if (sessionStorage.getItem('promo_dismissed')) setShowPromo(false);
  }, []);
   const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white">
      {/* ===== HERO ===== */}
      <section className="relative bg-black text-white min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 hero-blue-glow" />
        <div className="absolute inset-0 hero-stage-glow" />
        <div className="absolute inset-0 grain" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 w-full py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Side: Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <h1
                className="font-display font-extrabold leading-[0.95] text-[12vw] md:text-[8vw] lg:text-[7rem]"
                style={{ letterSpacing: '-0.04em' }}
              >
                Life is
                <br />
                extraordinary.
                <br />
                <span style={{ color: '#C8102E' }}>Unleash yours.</span>
              </h1>
              <p className="mt-8 text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
                The official site of Dev Bharwad — entrepreneur, community leader, and cultural
                torchbearer of the global Gujarati diaspora.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link
                  to="/story"
                  className="group inline-flex items-center gap-2 px-10 py-5 rounded-full bg-[#C8102E] hover:bg-[#a50d24] font-display font-bold text-sm uppercase tracking-[0.2em] transition-all hover:scale-105"
                >
                  Start Now <ArrowRight size={18} className="cta-arrow" />
                </Link>
                <Link
                  to="/events"
                  className="font-display text-sm uppercase tracking-widest text-white/90 hover:text-white border-b border-white/40 hover:border-white pb-1 transition-colors"
                >
                  Next Event ›
                </Link>
              </div>
            </motion.div>

            {/* Right Side: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl border border-white/10 group">
                <img
                  src="/hero image.jpeg"
                  alt="Dev Bharwad"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-[10px] font-condensed uppercase tracking-widest text-[#ff8194]">Founder & Leader</p>
                  <p className="font-display font-bold text-lg mt-1">Dev Bharwad</p>
                </div>
              </div>
              
              {/* Decorative accent */}
              <div className="absolute -top-6 -right-6 w-32 h-32 border-r-2 border-t-2 border-[#C8102E]/40 pointer-events-none" />
            </motion.div>
          </div>
        </div>

        {/* Floating event card - Keeping it but repositioning if needed, or removing for cleaner grid */}
        {/* <Link ... /> Removed for the new grid layout as it might clash visually */}

        <div className="absolute bottom-10 left-0 right-0">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1.5 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-[1px] bg-white" />
              <p className="text-white text-[11px] uppercase tracking-[0.3em] font-condensed">
                Scroll to Explore
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== EVENTS THAT LIBERATE (carousel) ===== */}
      <section className="py-24 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] text-black" style={{ letterSpacing: '-0.03em' }}>
                Events that liberate
              </h2>
              <Link
                to="/events"
                className="group inline-flex items-center gap-2 font-display uppercase tracking-widest text-sm text-[#C8102E] hover:text-black transition-colors w-fit"
              >
                Discover events <ArrowRight size={14} className="cta-arrow" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <HCarousel ariaLabel="Events">
              {EVENTS.concat(EVENTS).slice(0, 6).map((e, i) => (
                <Link
                  key={`${e.id}-${i}`}
                  to="/events"
                  className="group relative shrink-0 w-[300px] md:w-[340px] h-[440px] snap-start-strong overflow-hidden bg-black text-white rounded-3xl"
                >
                  <img
                    src={e.image}
                    alt={e.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  <div className="relative h-full flex flex-col justify-end p-6">
                    <p className="font-condensed uppercase tracking-[0.25em] text-[10px] text-[#ff8194]">{e.role}</p>
                    <h3 className="font-display text-2xl font-bold mt-2 leading-tight" style={{ letterSpacing: '-0.01em' }}>
                      {e.short}
                    </h3>
                    <p className="mt-2 text-sm text-white/80 line-clamp-2">{e.title}</p>
                  </div>
                </Link>
              ))}
            </HCarousel>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== MASTER EVERY AREA (video background) ===== */}
      <section className="relative py-32 md:py-40 overflow-hidden text-white">
        {/* Video background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={STORY_IMAGES.cultural}
        >
          <source
            src="https://videos.pexels.com/video-files/3015527/3015527-uhd_3840_2160_25fps.mp4"
            type="video/mp4"
          />
          <source
            src="https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay + soft glow */}
        <div className="absolute inset-0 bg-black/65" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(200,16,46,0.15), transparent 70%)',
          }}
        />
        <div className="absolute inset-0 grain" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal direction="up">
            <p className="font-condensed uppercase tracking-[0.3em] text-xs text-[#ff8194] mb-6">
              The Promise
            </p>
            <h2
              className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95]"
              style={{ letterSpacing: '-0.03em' }}
            >
              Master every area
              <br />
              of your <span style={{ color: '#C8102E' }}>life</span>.
            </h2>
            <p className="mt-8 text-lg text-white/85 max-w-xl mx-auto">
              Close the gap between where you are and where you want to be — with the principles
              of leadership, heritage, and service that have guided Dev for over two decades.
            </p>
            <Link
              to="/story"
              className="group mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C8102E] hover:bg-[#a50d24] text-white font-display uppercase tracking-widest text-sm transition-colors"
            >
              Start now <ArrowRight size={14} className="cta-arrow" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== PILLARS ===== */}
      <PillarsSection />

      {/* ===== TESTIMONIALS ===== */}
      <TestimonialsSection />

      {/* ===== HUNGER / MEET DEV ===== */}
      {/* <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.02] text-black"
              style={{ letterSpacing: '-0.03em' }}
            >
              Do you have a hunger to
              <br />
              increase the quality
              <br />
              of your <span style={{ color: '#C8102E' }}>life?</span>
            </h2>
            <p className="mt-8 text-lg text-neutral-700 max-w-xl">
              We believe progress equals happiness. And no matter where you are looking to excel,
              Dev’s journey is here to help you forge your pathway. Meet the man who has spent over
              two decades creating breakthroughs and uniting communities.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                to="/story"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black hover:bg-[#C8102E] text-white font-display uppercase tracking-widest text-sm transition-colors"
              >
                Meet Dev Bharwad <ArrowRight size={14} className="cta-arrow" />
              </Link>
              <button
                onClick={() => alert('Video player coming soon')}
                className="group inline-flex items-center gap-3 text-black hover:text-[#C8102E] transition-colors"
              >
                <span className="w-12 h-12 rounded-full bg-[#C8102E] text-white flex items-center justify-center play-pulse">
                  <Play size={16} className="ml-0.5" />
                </span>
                <span className="font-display uppercase tracking-widest text-sm">Watch video</span>
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="img-zoom relative aspect-[4/5] overflow-hidden rounded-3xl">
              <img src={PORTRAIT_3} alt="Dev Bharwad" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </section> */}

      {/* ===== FEATURED IN ===== */}
      <section className="py-14 bg-neutral-100 border-y border-neutral-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <p className="text-center font-condensed uppercase tracking-[0.3em] text-xs text-neutral-500 mb-8">
            Featured in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {PRESS_LOGOS.map((p) => (
              <span
                key={p}
                className="font-serif text-2xl md:text-3xl text-neutral-400 hover:text-neutral-700 tracking-wide transition-colors"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BHARWAD EQUALS IMPACT (stats + video carousel) ===== */}
      <section className="relative py-24 md:py-32 bg-black text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 80% 30%, rgba(50,110,210,0.35), transparent 60%), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(200,16,46,0.18), transparent 60%)',
          }}
        />
        <div className="absolute inset-0 grain" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
            <ScrollReveal className="lg:col-span-5" direction="right">
              <h2
                className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95]"
                style={{ letterSpacing: '-0.03em' }}
              >
                Bharwad equals
                <br />
                <span style={{ color: '#C8102E' }}>impact.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal className="lg:col-span-7" direction="left" delay={0.2}>
              <p className="text-lg text-white/80 max-w-xl">
                Join over a million members of the diaspora who are building, celebrating and
                thriving alongside Dev. Their stories paint the picture of what is possible.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-8 max-w-lg">
                {STATS.slice(0, 2).map((s) => (
                  <div key={s.label}>
                    <p
                      className="font-display text-6xl md:text-7xl font-extrabold text-white"
                      style={{ letterSpacing: '-0.04em' }}
                    >
                      {s.value}
                    </p>
                    <p className="text-xs uppercase tracking-widest text-white/60 mt-2">{s.label}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/achievements"
                className="group mt-10 inline-flex items-center gap-2 font-display uppercase tracking-widest text-sm border-b border-white pb-1 hover:text-[#C8102E] hover:border-[#C8102E] transition-colors"
              >
                Learn more <ArrowRight size={14} className="cta-arrow" />
              </Link>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.4}>
            <HCarouselDark ariaLabel="Video testimonials">
              {VIDEO_TESTIMONIALS.map((v) => (
                <button
                  key={v.title}
                  onClick={() => alert('Video player coming soon')}
                  className="group relative shrink-0 w-[300px] md:w-[360px] h-[440px] snap-start-strong overflow-hidden bg-neutral-800 text-left rounded-3xl"
                >
                  <img
                    src={v.image}
                    alt={v.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-16 h-16 rounded-full bg-[#C8102E] flex items-center justify-center play-pulse">
                      <Play size={22} className="text-white ml-1" />
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black to-transparent">
                    <p className="font-serif-italic text-white text-base leading-snug line-clamp-3">
                      “{v.quote}”
                    </p>
                  </div>
                </button>
              ))}
            </HCarouselDark>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== BECOME UNSHAKEABLE (intro to events) ===== */}
      <section className="py-20 md:py-28 bg-white">
        <ScrollReveal direction="up" className="max-w-3xl mx-auto px-6 text-center">
          <h2
            className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] text-black"
            style={{ letterSpacing: '-0.03em' }}
          >
            Become <span style={{ color: '#C8102E' }}>unshakeable</span>.
          </h2>
          <p className="mt-8 text-lg text-neutral-700">
            With community programs, mentorship, and businesses designed to power your growth, Dev’s
            foundational principles are informed by over two decades of disciplined leadership.
          </p>
        </ScrollReveal>
      </section>

      {/* ===== UPCOMING EVENTS (large carousel) ===== */}
      {/* <section className="py-20 md:py-28 bg-neutral-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <h2 className="font-display text-5xl md:text-6xl font-extrabold leading-[0.95] text-black" style={{ letterSpacing: '-0.03em' }}>
              Upcoming events
            </h2>
            <Link
              to="/events"
              className="group inline-flex items-center gap-2 font-display uppercase tracking-widest text-sm text-[#C8102E] hover:text-black transition-colors w-fit"
            >
              Explore all events <ArrowRight size={14} className="cta-arrow" />
            </Link>
          </div>

          <HCarousel ariaLabel="Upcoming events">
            {EVENTS.map((e) => (
              <Link
                key={e.id}
                to="/events"
                className="group relative shrink-0 w-[88vw] md:w-[720px] h-[480px] snap-start-strong overflow-hidden bg-black text-white rounded-3xl"
              >
                <img
                  src={e.image}
                  alt={e.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-8 md:p-10 max-w-2xl">
                  <span className="inline-flex w-fit items-center px-3 py-1 bg-white/15 backdrop-blur-sm border border-white/20 text-[11px] font-condensed uppercase tracking-widest">
                    {e.badge}
                  </span>
                  <h3
                    className="font-display text-3xl md:text-5xl font-extrabold mt-4 leading-[1.05]"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {e.short}
                  </h3>
                  <p className="mt-3 text-white/80 max-w-md">{e.text}</p>
                  <div className="mt-5 flex flex-wrap gap-5 text-xs text-white/70 font-condensed uppercase tracking-widest">
                    <span className="flex items-center gap-2">
                      <Calendar size={14} className="text-[#ff8194]" /> {e.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin size={14} className="text-[#ff8194]" /> {e.place}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock size={14} className="text-[#ff8194]" /> Eastern
                    </span>
                  </div>
                  <span className="mt-6 inline-flex w-fit items-center gap-2 px-6 py-3 bg-[#C8102E] group-hover:bg-[#a50d24] font-display uppercase tracking-widest text-xs transition-colors">
                    Learn more <ArrowRight size={12} className="cta-arrow" />
                  </span>
                </div>
              </Link>
            ))}
          </HCarousel>
        </div>
      </section> */}

      {/* ===== EXPERT GUIDANCE (mentorship/coaching style) ===== */}
      <section className="py-24 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <ScrollReveal className="lg:col-span-7" direction="right">
            <p className="font-condensed uppercase tracking-[0.3em] text-xs text-[#C8102E]">
              Mentorship
            </p>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.02] text-black mt-3"
              style={{ letterSpacing: '-0.03em' }}
            >
              Expert guidance for
              <br />
              your <span style={{ color: '#C8102E' }}>path</span>.
            </h2>
          

            <p className="mt-8 text-lg text-neutral-700 max-w-xl leading-relaxed">
              Achieve lasting transformation across business, community, and culture.
              Discover how Dev’s ecosystem of ventures and community bodies creates
              lasting change.
            </p>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="mt-4 text-lg text-neutral-600 max-w-xl leading-relaxed">
                    Through innovation, collaboration, and sustainable initiatives,
                    Dev’s ecosystem empowers individuals, strengthens communities, and
                    drives meaningful progress. From impactful ventures to social
                    programs, every initiative is designed to inspire growth, create
                    opportunities, and shape a better future for generations to come.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setExpanded(!expanded)}
              className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-neutral-600 transition-all duration-300"
            >
              {expanded ? "Read Less" : "Read More"}

              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/businesses"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#C8102E] hover:bg-[#a50d24] text-white font-display uppercase tracking-widest text-xs transition-colors"
              >
                Businesses <ArrowRight size={12} className="cta-arrow" />
              </Link>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-7 py-3.5 border border-black hover:bg-black hover:text-white text-black font-display uppercase tracking-widest text-xs transition-colors"
              >
                Get in touch <ArrowRight size={12} className="cta-arrow" />
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal className="lg:col-span-5" direction="left" delay={0.2}>
            <button
              onClick={() => alert('Video player coming soon')}
              className="group relative w-full aspect-[4/3] overflow-hidden bg-black rounded-3xl"
            >
              <img
                src={EVENTS[1].image}
                alt="Mentorship"
                className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-20 h-20 rounded-full bg-[#C8102E] flex items-center justify-center play-pulse">
                  <Play size={26} className="text-white ml-1" />
                </span>
              </div>
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== FINAL CTA (full-bleed background) ===== */}
      <section className="relative h-[80vh] min-h-[560px] overflow-hidden text-white">
        <img
          src={PORTRAIT_3}
          alt="Dev Bharwad"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />
        <div className="absolute inset-0 grain" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 h-full flex items-center">
          <div className="max-w-2xl">
            <h2
              className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95]"
              style={{ letterSpacing: '-0.03em' }}
            >
              Ready to live an
              <br />
              <span style={{ color: '#C8102E' }}>extraordinary life?</span>
            </h2>
            <p className="mt-6 text-xl text-white/85">
              Now is your time. Connect with us to learn more.
            </p>
              <Link
                to="/contact"
                className="group mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C8102E] hover:bg-[#a50d24] font-display uppercase tracking-widest text-sm transition-colors"
              >
                Learn more <ArrowRight size={14} className="cta-arrow" />
              </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

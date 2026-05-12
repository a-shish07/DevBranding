import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from '../components/ui/scroll-reveal';
import { Skeleton } from '../components/ui/skeleton';
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
/* TitleReveal: Masked slide-up animation for titles            */
/* ============================================================ */
const TitleReveal = ({ children, className = "", delay = 0 }) => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.08, 
        delayChildren: delay 
      },
    },
  };

  const item = {
    hidden: { y: "120%", opacity: 0, rotate: 2 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1], // Custom smooth quint easing
      },
    },
  };

  // Helper to split text into words and wrap them
  const renderContent = (content) => {
    return React.Children.map(content, (child) => {
      if (typeof child === "string") {
        return child.split(" ").map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em] py-[0.1em]">
            <motion.span variants={item} className="inline-block whitespace-nowrap">
              {word}
            </motion.span>
          </span>
        ));
      }
      if (React.isValidElement(child)) {
        if (child.type === "br") return child;
        return (
          <span className="inline-block">
            {React.cloneElement(child, {
              children: renderContent(child.props.children),
            })}
          </span>
        );
      }
      return child;
    });
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {renderContent(children)}
    </motion.div>
  );
};

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
        <div className="absolute inset-0 " />
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
            <TitleReveal>
              Pillars for an
              <br />
              extraordinary life.
            </TitleReveal>
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
                onClick={() => setActive(i)}
                tabIndex={0}
                className="group py-5 cursor-pointer flex flex-col"
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`font-display text-3xl md:text-5xl font-extrabold transition-colors ${
                      i === active ? 'text-white' : 'text-white/40 hover:text-white'
                    }`}
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {p.name}
                  </span>
                  <span className={`flex items-center gap-2 text-xs uppercase tracking-widest transition-colors ${
                    i === active ? 'text-[#ff8194]' : 'text-white/60 group-hover:text-[#ff8194]'
                  }`}>
                    {i === active ? 'Active' : 'Explore'}
                    <ArrowUpRight size={16} className={`transition-transform duration-300 ${i === active ? 'rotate-45' : ''}`} />
                  </span>
                </div>
                <AnimatePresence>
                  {i === active && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-white/70 text-lg leading-relaxed max-w-xl">
                        {p.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
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
      <div className="absolute inset-0" />
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
/* About Us Section (Requested Style)                            */
/* ============================================================ */
const AboutSection = () => {
  const images = ['/first.jpeg', '/second.jpeg', '/third.jpeg'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className=" pt-10 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Auto-playing Carousel */}
          <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl bg-neutral-100">
            <AnimatePresence initial={false}>
              <motion.img
                key={index}
                src={images[index]}
                alt={`Dev Bharwad ${index + 1}`}
                initial={{ opacity: 0, scale: 1.25 }}
                animate={{ opacity: 1, scale: 1.1 }}
                exit={{ opacity: 0, scale: 1.15 }}
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>

          {/* Right: Content */}
          <div className="flex flex-col h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-condensed uppercase tracking-[0.3em] text-sm font-bold text-[#C8102E] mb-3">
                ABOUT US
              </p>
              <h2 className="font-display text-5xl md:text-6xl font-extrabold leading-[1.05] text-black mb-8" style={{ letterSpacing: '-0.02em' }}>
                <TitleReveal>
                  Building communities.<br />
                  <span className="text-[#C8102E]">Leading with vision.</span>
                </TitleReveal>
              </h2>
            </motion.div>
              
            {/* Scrollable Description Container */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="overflow-y-auto pr-4 custom-scrollbar mb-10 max-h-[300px] md:max-h-[350px] overscroll-contain"
            >
              <div className="space-y-6 text-neutral-600 text-base leading-relaxed">
                <p>
                  Dev Bharwad is a respected entrepreneur and an influential leader within the global Gujarati community. 
                  Born and brought up in Ahmedabad, India, he completed his Bachelor of Commerce (B.Com) and began his professional 
                  journey in the Real Estate sector before relocating to the United States in 2003.
                </p>
                <p>
                  Based in the USA, Dev has successfully established himself in the Property Business and currently serves as 
                  the Executive Director of AOD Group of Companies, contributing strategic direction and business leadership 
                  across diverse ventures.
                </p>
                <p>
                  A passionate advocate of community building and cultural preservation, Dev Bharwad has been the President 
                  of the Gujarati Samaj of Kansas City (GSKC) since 2017. He is also the Founder & Chairman of Maldhari 
                  Samaj of USA & Canada (MSUC), fostering unity and empowerment across the Maldhari community in North America.
                </p>
                <p>
                  Further extending his cultural leadership, he serves as Chairman – Cultural at the Federation of Gujarati 
                  Associations (FOGA), actively promoting Gujarati heritage on a global platform.
                </p>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                to="/story"
                className="px-10 py-4 bg-[#C8102E] hover:bg-[#a50d24] text-white font-display font-bold uppercase tracking-widest text-sm rounded-full transition-all hover:shadow-lg hover:shadow-red-900/20"
              >
                EXPLORE JOURNEY
              </Link>
              <Link
                to="/contact"
                className="px-10 py-4 bg-white border-2 border-black hover:bg-black hover:text-white text-black font-display font-bold uppercase tracking-widest text-sm rounded-full transition-all"
              >
                CONTACT
              </Link>
            </motion.div>
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
  const [loading, setLoading] = useState(true);
  const [showPromo, setShowPromo] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('promo_dismissed')) setShowPromo(false);
    
    // Simulate loading for better UX and to show skeletons
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="bg-white">
        {/* Hero Skeleton */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-neutral-100">
          <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 w-full pt-32 pb-24">
            <div className="max-w-3xl space-y-6">
              <Skeleton className="h-20 w-3/4" />
              <Skeleton className="h-20 w-1/2" />
              <Skeleton className="h-6 w-2/3 mt-8" />
              <div className="flex gap-4 mt-10">
                <Skeleton className="h-12 w-40 rounded-full" />
                <Skeleton className="h-6 w-32 mt-3" />
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-[45%] hidden lg:block">
            <Skeleton className="h-full w-full" />
          </div>
        </section>

        {/* Carousel Skeleton */}
        <section className="py-24 md:py-28">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <Skeleton className="h-16 w-1/2" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="flex gap-5 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="shrink-0 w-[300px] md:w-[340px] h-[440px] rounded-3xl" />
              ))}
            </div>
          </div>
        </section>

        {/* Video Skeleton */}
        <section className="py-32 md:py-40 bg-neutral-900">
          <div className="max-w-3xl mx-auto px-6 text-center space-y-6 flex flex-col items-center">
            <Skeleton className="h-4 w-24 bg-white/10" />
            <Skeleton className="h-20 w-full bg-white/10" />
            <Skeleton className="h-6 w-2/3 bg-white/10" />
            <Skeleton className="h-12 w-40 rounded-full bg-white/10 mt-4" />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* ===== HERO ===== */}
     <section className="relative text-white min-h-screen flex items-center overflow-hidden bg-blue-950 grain">
        <div className="absolute inset-0 flex justify-end">
          <motion.div 
            className="relative w-full lg:w-[55%] h-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.21, 0.45, 0.32, 0.9] }}
          >
            <img
              src={HERO_IMAGE}
              alt="Dev Bharwad"
              className="w-full h-full object-cover object-center"
            />
            {/* Soft blend from the image into the black background of the left side */}
            <div className="absolute inset-y-0 -left-1 w-full bg-gradient-to-r from-blue-950  to-transparent" />
          </motion.div>
          
          {/* Mobile overlay to ensure text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/10 to-transparent lg:hidden grain" />
          
          {/* Subtle top/bottom vignettes */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10 pointer-events-none" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 w-full pt-32 pb-24">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.45, 0.32, 0.9] }}
          >
            <h1
              className="font-display font-extrabold leading-[0.95] text-[12vw] md:text-[7.5vw] lg:text-[6.5rem]"
              style={{ letterSpacing: '-0.04em' }}
            >
              <TitleReveal>
                Life is
                <br />
                extraordinary.
                <br />
                <span style={{ color: '#C8102E' }}>Unleash yours.</span>
              </TitleReveal>
            </h1>
            <motion.p 
              className="mt-8 text-lg md:text-xl text-white/80 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              The official site of Dev Bharwad — entrepreneur, community leader, and cultural
              torchbearer of the global Gujarati diaspora.
            </motion.p>
            <motion.div 
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                to="/story"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C8102E] hover:bg-[#a50d24] font-display font-semibold text-sm uppercase tracking-widest transition-colors"
              >
                Start Now <ArrowRight size={16} className="cta-arrow" />
              </Link>
              <Link
                to="/events"
                className="font-display text-sm uppercase tracking-widest text-white/90 hover:text-white border-b border-white/40 hover:border-white pb-1 transition-colors"
              >
                Next Event ›
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating event card (bottom-right) */}
        <Link
          to="/events"
          className="hidden lg:flex absolute bottom-10 right-1 w-[300px] bg-white text-black overflow-hidden group hover:shadow-2xl transition-shadow rounded-2xl"
        >
          <img
            src="/third.jpeg"
            alt={EVENTS[0].title}
            className="w-32 h-28 object-cover"
          />
          <div className="flex-1 p-2">
            <p className="text-[10px] font-condensed uppercase tracking-widest text-[#C8102E]">
              Next Event
            </p>
            <p className="font-display font-bold text-sm leading-tight mt-1 line-clamp-2">
              {EVENTS[0].title}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-display uppercase tracking-widest text-black group-hover:text-[#C8102E] transition-colors">
              View details <ArrowUpRight size={12} className="cta-arrow" />
            </span>
          </div>
        </Link>

        <div className="absolute bottom-6 left-0 right-0">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <p className="text-white/60 text-[11px] uppercase tracking-[0.3em] font-condensed">
              Scroll to Explore
            </p>
          </div>
        </div>
      </section>


      {/* ===== ABOUT US ===== */}
      <AboutSection />


      {/* ===== EVENTS THAT LIBERATE (carousel) ===== */}
      <section className="py-24 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] text-black" style={{ letterSpacing: '-0.03em' }}>
                <TitleReveal>Events that liberate</TitleReveal>
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
                    src={e.images[0]}
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
       {/* YouTube Background Video */}
<div className="absolute inset-0 overflow-hidden">
  <iframe
    className="absolute top-1/2 left-1/2 w-[120vw] h-[120vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    src="https://www.youtube.com/embed/41Sa0yrt8bw?autoplay=1&mute=1&controls=0&loop=1&playlist=41Sa0yrt8bw&modestbranding=1&showinfo=0&rel=0"
    title="Background Video"
    frameBorder="0"
    allow="autoplay; fullscreen"
    allowFullScreen
  />
</div>
        {/* Dark overlay + soft glow */}
        <div className="absolute inset-0 bg-black/65" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(200,16,46,0.15), transparent 70%)',
          }}
        />
        <div className="absolute inset-0 " />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal direction="up">
            <p className="font-condensed uppercase tracking-[0.3em] text-xs text-[#ff8194] mb-6">
              The Promise
            </p>
            <h2
              className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95]"
              style={{ letterSpacing: '-0.03em' }}
            >
              <TitleReveal>
                Master every area
                <br />
                of your <span style={{ color: '#C8102E' }}>life</span>.
              </TitleReveal>
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
        <div className="absolute inset-0 " />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
            <ScrollReveal className="lg:col-span-5" direction="right">
              <h2
                className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95]"
                style={{ letterSpacing: '-0.03em' }}
              >
                <TitleReveal>
                  Bharwad equals
                  <br />
                  <span style={{ color: '#C8102E' }}>impact.</span>
                </TitleReveal>
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
                  src={e.images[0]}
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
           <a
  href="https://www.youtube.com/watch?v=41Sa0yrt8bw"
  target="_blank"
  rel="noopener noreferrer"
  className="group relative block w-full aspect-video overflow-hidden rounded-3xl shadow-2xl"
>
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/41Sa0yrt8bw?autoplay=1&mute=1&loop=1&playlist=41Sa0yrt8bw&controls=0&rel=0"
    title="YouTube video player"
    frameBorder="0"
    allow="autoplay; encrypted-media"
    allowFullScreen
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500" />

  {/* Play Button */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="w-20 h-20 rounded-full bg-[#C8102E] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
      <Play size={28} className="text-white fill-white ml-1" />
    </div>
  </div>
</a>
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
        <div className="absolute inset-0" />
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

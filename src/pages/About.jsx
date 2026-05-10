import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  PORTRAIT_ALT, 
  PORTRAIT_3, 
  BUSINESS_IMAGES, 
  STORY_IMAGES, 
  SITE 
} from '../data/mock';

const ABOUT_SECTIONS = [
  {
    id: 'intro',
    title: 'A Visionary Journey',
    content: [
      'Dev Bharwad is a distinguished entrepreneur, community leader, and cultural torchbearer whose journey seamlessly bridges grassroots values with global vision.',
      'Born and brought up in Ahmedabad, India, he completed his formal education with a Bachelor of Commerce (B.Com), laying a strong foundation in business acumen and financial discipline.',
      'In 2003, driven by ambition and a global outlook, he relocated to the United States of America, where he further expanded his footprint in the Property and Real Estate Business.'
    ],
    image: PORTRAIT_ALT
  },
  {
    id: 'entrepreneur',
    title: 'Entrepreneurial Excellence',
    content: [
      'Soon after completing his studies, Dev began his professional journey in the Real Estate sector, where his instinct for opportunity, strategic thinking, and people-centric approach shaped his early success.',
      'Today, Dev Bharwad serves as the Executive Director of AOD Group of Companies, where he plays a pivotal role in strategic leadership, business expansion, and long-term vision building across diversified ventures.'
    ],
    image: BUSINESS_IMAGES[0]
  },
  {
    id: 'community',
    title: 'Community Leadership',
    content: [
      'Beyond his corporate achievements, Dev is widely recognized for his unwavering commitment to the Gujarati diaspora and cultural heritage.',
      'Since 2017, he has been serving as the President of the Gujarati Samaj of Kansas City (GSKC), leading the organization with inclusivity, foresight, and a deep sense of community responsibility.',
      'His passion for social unity and cultural preservation led him to establish the Maldhari Samaj of USA & Canada (MSUC), where he serves as the Founder & Chairman, creating a powerful platform that connects, empowers, and uplifts the Maldhari community across North America.'
    ],
    image: STORY_IMAGES.community
  },
  {
    id: 'cultural',
    title: 'Cultural Torchbearer',
    content: [
      'At a broader cultural level, Dev Bharwad holds the esteemed position of Chairman – Cultural at the Federation of Gujarati Associations (FOGA), contributing to the promotion and celebration of Gujarati culture, traditions, and values on an international stage.'
    ],
    image: STORY_IMAGES.cultural
  },
  {
    id: 'philosophy',
    title: 'Indian Soul, Global Vision',
    content: [
      'A leader rooted in humility yet driven by vision, Dev Bharwad continues to inspire through his entrepreneurial excellence, cultural stewardship, and tireless service to society—embodying the spirit of a global Gujarati with a deeply Indian soul.'
    ],
    image: PORTRAIT_3
  }
];

const Section = ({ section, index, setActiveSection }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveSection(index);
    }
  }, [isInView, index, setActiveSection]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, margin: "-20%" }}
      className="min-h-[70vh] flex flex-col justify-center py-24"
    >
      <p className="font-condensed uppercase tracking-[0.3em] text-xs text-[#C8102E] mb-4">
        {section.id.replace('-', ' ')}
      </p>
      <h2 
        className="font-display uppercase text-4xl md:text-5xl font-extrabold leading-tight text-black mb-8"
        style={{ letterSpacing: '-0.02em' }}
      >
        {section.title}
      </h2>
      <div className="space-y-6">
        {section.content.map((text, idx) => (
          <p key={idx} className="text-lg text-neutral-700 leading-relaxed">
            {text}
          </p>
        ))}
      </div>
    </motion.div>
  );
};

const About = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [direction, setDirection] = useState('down');
  const prevIndex = useRef(0);

  const handleSetActiveSection = (index) => {
    if (index !== activeSection) {
      setDirection(index > activeSection ? 'down' : 'up');
      setActiveSection(index);
    }
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="relative bg-black text-white pt-40 pb-24 overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 grain opacity-20" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Side: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <p className="font-condensed uppercase tracking-[0.3em] text-xs text-[#C8102E]">The Founder</p>
              <h1 
                className="font-display uppercase text-6xl md:text-8xl lg:text-[8rem] font-extrabold leading-[0.9] mt-4"
                style={{ letterSpacing: '-0.04em' }}
              >
                ABOUT <br />
                <span className="text-[#C8102E]">DEV BHARWAD</span>
              </h1>
              <p className="font-serif-italic text-xl md:text-2xl mt-8 max-w-2xl text-white/80 leading-relaxed">
                Entrepreneur. Community Leader. Cultural Torchbearer. <br className="hidden md:block" />
                A journey that bridges grassroots values with global vision.
              </p>
            </motion.div>

            {/* Right Side: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl border border-white/10">
                <img 
                  src="/hero image.jpeg" 
                  alt="Dev Bharwad Hero" 
                  className="w-full h-full object-cover transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 border-l-2 border-b-2 border-[#C8102E] pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content with Sticky Image */}
      <section className="relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Left Side: Sticky Image */}
            <div className="hidden lg:block lg:w-1/2">
              <div className="sticky top-32 h-[calc(100vh-160px)] w-full overflow-hidden bg-neutral-900 rounded-sm shadow-2xl">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.img
                    key={activeSection}
                    src={ABOUT_SECTIONS[activeSection].image}
                    alt="Dev Bharwad"
                    initial={{ y: direction === 'down' ? "100%" : "-100%" }}
                    animate={{ y: 0 }}
                    exit={{ 
                        y: direction === 'down' ? "-30%" : "30%", 
                        opacity: 0,
                        scale: 0.95
                    }}
                    transition={{ 
                      duration: 1, 
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                    className="absolute inset-0 w-full h-full object-cover z-10"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-20" />
              </div>
            </div>

            {/* Mobile Image */}
            <div className="lg:hidden w-full h-[400px] mb-8 overflow-hidden rounded-sm relative">
                <AnimatePresence mode="wait">
                    <motion.img 
                        key={activeSection}
                        src={ABOUT_SECTIONS[activeSection].image} 
                        alt="Dev Bharwad" 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>
            </div>

            {/* Right Side: Scrollable Content */}
            <div className="w-full lg:w-1/2">
              {ABOUT_SECTIONS.map((section, idx) => (
                <Section 
                  key={section.id} 
                  section={section} 
                  index={idx}
                  setActiveSection={handleSetActiveSection} 
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Highlight Section */}
      <section className="bg-neutral-50 py-24 border-y border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-display text-5xl font-extrabold text-[#C8102E]">2003</h3>
              <p className="mt-2 text-neutral-500 uppercase tracking-widest text-xs font-condensed">Relocated to USA</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-display text-5xl font-extrabold text-[#C8102E]">2017</h3>
              <p className="mt-2 text-neutral-500 uppercase tracking-widest text-xs font-condensed">President of GSKC</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-display text-5xl font-extrabold text-[#C8102E]">AOD</h3>
              <p className="mt-2 text-neutral-500 uppercase tracking-widest text-xs font-condensed">Group of Companies</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final Quote */}
      <section className="py-32 bg-black text-white text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <p className="font-serif-italic text-3xl md:text-5xl leading-tight">
            "Leadership is a harmonious blend of entrepreneurial excellence, cultural commitment, and community service."
          </p>
          <div className="divider-red mx-auto mt-10 w-24" />
          <p className="mt-8 font-condensed uppercase tracking-[0.4em] text-sm text-neutral-400">
            Dev Bharwad
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default About;

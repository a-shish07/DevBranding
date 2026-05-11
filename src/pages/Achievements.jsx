import React from 'react';
import { Award, Trophy, Star } from 'lucide-react';
import { ACHIEVEMENTS, AWARD_IMAGES } from '../data/mock';
import ScrollReveal from '../components/ui/scroll-reveal';

const icons = [Trophy, Award, Star, Award];

const Achievements = () => {
  return (
    <div className="bg-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[65vh] flex items-center text-white overflow-hidden">
        <img
          src={AWARD_IMAGES[0]}
          alt="Awards"
          className="absolute inset-0 w-full h-full object-cover scale-105 opacity-30"
        />

        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
        <div className="absolute inset-0  " />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full lg:mt-32">
          <ScrollReveal direction="up">
            <div className="max-w-3xl">
              <p className="font-display uppercase tracking-[0.35em] text-xs text-[#C8102E] mb-5 ">
                Recognition & Excellence
              </p>

              <h1 className="font-display uppercase font-black leading-[0.9] tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-[6rem]">
                Awards &
                <span className="block text-[#C8102E]">Honors</span>
              </h1>

              <p className="mt-6 text-base md:text-lg text-white/75 leading-relaxed max-w-xl mb-5">
                Celebrating milestones, leadership, and contributions that
                continue to inspire meaningful impact across industries and
                communities.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* INTRO + ACHIEVEMENTS */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <ScrollReveal direction="up">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
              <div>
                <p className="font-display uppercase tracking-[0.35em] text-[11px] text-[#C8102E] mb-3">
                  Awards
                </p>

                <h2 className="font-display uppercase text-3xl md:text-5xl font-black leading-[0.95] tracking-tight text-black">
                  Legacy of
                  <span className="block text-[#C8102E]">
                    Recognition
                  </span>
                </h2>
              </div>

              <p className="max-w-lg text-neutral-600 text-base leading-relaxed">
                A collection of recognitions earned through dedication,
                innovation, leadership, and commitment to excellence.
              </p>
            </div>
          </ScrollReveal>

          {/* ACHIEVEMENT CARDS */}
          <div className="space-y-16 md:space-y-20">
            {ACHIEVEMENTS.map((a, i) => {
              const isEven = i % 2 === 0;
              const Icon = icons[i % icons.length];
              const imageSrc = AWARD_IMAGES[i % AWARD_IMAGES.length];

              return (
                <div key={a.title} className="group">
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center ${
                      !isEven ? 'lg:[&>*:first-child]:order-2' : ''
                    }`}
                  >
                    {/* IMAGE */}
                    <ScrollReveal
                      direction={isEven ? 'left' : 'right'}
                    >
                      <div className="relative overflow-hidden rounded-xl bg-neutral-100">
                        <div className="aspect-[5/4] overflow-hidden">
                          <img
                            src={imageSrc}
                            alt={a.title}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                          />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                        {/* YEAR */}
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-md">
                          <span className="font-display text-xs tracking-[0.2em] font-bold text-black">
                            {a.year}
                          </span>
                        </div>

                        {/* ICON */}
                        <div className="absolute bottom-4 right-4 w-12 h-12 rounded-xl bg-[#C8102E] text-white flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110">
                          <Icon size={20} />
                        </div>
                      </div>
                    </ScrollReveal>

                    {/* CONTENT */}
                    <ScrollReveal
                      direction={isEven ? 'right' : 'left'}
                    >
                      <div className="max-w-lg">
                        <p className="font-display uppercase tracking-[0.3em] text-[12px] font-bold text-[#C8102E] mb-3">
                          {a.org}
                        </p>

                        <h3 className="font-display uppercase text-2xl md:text-4xl font-black leading-tight tracking-tight text-black mb-5">
                          {a.title}
                        </h3>

                        <p className="text-neutral-600 text-base leading-relaxed mb-6">
                          {a.text}
                        </p>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-px bg-[#C8102E]" />

                          <span className="font-display uppercase tracking-[0.2em] text-[11px] font-bold text-neutral-700">
                            Official Recognition
                          </span>
                        </div>
                      </div>
                    </ScrollReveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="relative py-16 md:py-24 bg-neutral-50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:22px_22px] opacity-40" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal direction="up">
            <div className="w-16 h-16 rounded-full bg-[#C8102E]/10 flex items-center justify-center mx-auto mb-8">
              <Trophy className="text-[#C8102E]" size={30} />
            </div>

            <h2 className="font-serif-italic text-2xl md:text-4xl leading-tight text-black">
              “Leadership is not about titles or recognition.
              It is about creating impact that inspires others.”
            </h2>

            <div className="mt-10 flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-[#C8102E]" />
              <div className="w-2 h-2 rounded-full bg-[#C8102E]" />
              <div className="w-12 h-px bg-[#C8102E]" />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Achievements;
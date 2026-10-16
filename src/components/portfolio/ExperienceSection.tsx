'use client';

import { getThemeColors, getPaletteHex } from '@/utils/theme';

import { useEffect, useRef, useState } from 'react';

import { GlowingStarsBackground } from '@/components/ui/GlowingStars';

import { SparklesCore } from '@/components/ui/SparklesCore';

import { TextGenerateEffect } from '@/components/ui/TextGenerateEffect';

import { CardContainer, CardBody, CardItem } from '@/components/ui/3DCard';

import { IExperienceProps, IExperienceSectionProps } from '@/types/IExperienceSection';

// Custom hook for scroll-based animations
const useScrollAnimation = (threshold = 0.2, itemCount = 0) => {
    const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        itemRefs.current.forEach((ref, index) => {
            if (ref) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setVisibleItems((prev) => new Set([...prev, index]));
                        }
                    });
                }, { threshold, rootMargin: '0px 0px -50px 0px' });
                observer.observe(ref);
                observers.push(observer);
            }
        });
        return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, [threshold, itemCount]);
    return { visibleItems, itemRefs };
};

// 3D Floating Cards Experience - Premium interactive cards with depth
const CardsExperience = ({ data, theme }: IExperienceProps) => {
    const { experience } = data;
    const { visibleItems, itemRefs } = useScrollAnimation(0.1, experience.length);
    const getSparkleColor = () => getPaletteHex(theme.name);
    return (<section id="experience" className="relative py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-slate-950 via-slate-900 to-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <GlowingStarsBackground className="opacity-30" starCount={60}/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50"/>
        {/* Colored glow orbs */}
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full blur-[100px] opacity-30" style={{ background: getSparkleColor() }}/>
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full blur-[100px] opacity-20" style={{ background: getSparkleColor() }}/>
      </div>

      {/* Sparkles */}
      <div className="absolute top-0 left-0 right-0 h-40 overflow-hidden">
        <SparklesCore className="w-full h-full" particleColor={getSparkleColor()} particleDensity={25} speed={0.4} minSize={0.4} maxSize={1.2}/>
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className={`inline-flex max-w-full items-center gap-2 text-xs sm:text-sm font-semibold ${theme.primary} tracking-widest uppercase mb-4 px-4 py-2 rounded-full border ${theme.border} bg-white/5 backdrop-blur-sm`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            Experience Cards
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            <TextGenerateEffect words="Professional Experience" className="inline" textClassName="text-white" duration={0.3}/>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
            A visual showcase of my career journey and professional milestones.
          </p>
          <div className={`w-20 sm:w-24 h-1 bg-gradient-to-r ${theme.gradient} mx-auto rounded-full mt-6`}/>
        </div>

        {/* Cards - Single column centered */}
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          {experience.map((exp, index) => (<div key={index} ref={(el) => { itemRefs.current[index] = el; }} className={`w-full min-w-0 max-w-lg transition-all duration-700 ${visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${index * 100}ms` }}>
              <CardContainer className="inter-var w-full h-full" containerClassName="py-2 w-full">
                <CardBody className={`relative group/card w-full h-full min-h-[320px] rounded-xl sm:rounded-2xl p-4 sm:p-6 border bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-white/10 transition-colors duration-300`}>
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${theme.gradient} opacity-0 group-hover/card:opacity-10 transition-opacity duration-500`}/>
                  
                  {/* Floating Step Number */}
                  <CardItem translateZ={80} className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-2xl`}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </CardItem>

                  {/* Content */}
                  <CardItem translateZ={50} className="w-full">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-1 line-clamp-2">{exp.title}</h3>
                        <p className={`${theme.primary} min-w-0 font-semibold text-xs sm:text-sm flex items-center gap-1.5`}>
                          <svg className="w-3.5 h-3.5 opacity-70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                          </svg>
                          <span className="truncate">{exp.company}</span>
                        </p>
                      </div>
                    </div>
                  </CardItem>

                  {/* Date Badge - Floating */}
                  <CardItem translateZ={60} translateY={-5} className="mb-3">
                    <span className={`inline-flex w-fit max-w-full break-all items-center gap-1 text-xs ${theme.primary} font-medium px-2.5 py-1 bg-white/5 border ${theme.border} rounded-full backdrop-blur-sm`}>
                      <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      {exp.dates}
                    </span>
                  </CardItem>

                  {/* Description */}
                  <CardItem translateZ={40} className="w-full mb-3">
                    <p className="break-words text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3">{exp.description}</p>
                  </CardItem>

                  {/* Highlights */}
                  {exp.highlights && exp.highlights.length > 0 && (<CardItem translateZ={30} className="w-full">
                      <div className="pt-3 border-t border-white/10">
                        <p className="text-xs uppercase tracking-wider text-slate-500 mb-2 font-semibold flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                          </svg>
                          Highlights
                        </p>
                        <ul className="space-y-1.5">
                          {exp.highlights.slice(0, 2).map((highlight, i) => (<li key={i} className="min-w-0 text-slate-300 flex items-start gap-1.5 text-xs">
                              <span className={`flex-shrink-0 w-3.5 h-3.5 rounded-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center mt-0.5`}>
                                <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                                </svg>
                              </span>
                              <span className="min-w-0 break-words line-clamp-2">{highlight}</span>
                            </li>))}
                        </ul>
                      </div>
                    </CardItem>)}

                  {/* Bottom Glow Line */}
                  <CardItem translateZ={20} className="w-full mt-3">
                    <div className={`h-0.5 w-full bg-gradient-to-r from-transparent ${theme.gradient.includes('from-') ? theme.gradient.replace('from-', 'via-').split(' ')[0] : 'via-white/20'} to-transparent opacity-50`}/>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>))}
        </div>
      </div>
    </section>);
};

export default function ExperienceSection({ data, variant, palette }: IExperienceSectionProps) {
    const theme = getThemeColors(palette);
    return <CardsExperience data={data} theme={theme}/>;
}

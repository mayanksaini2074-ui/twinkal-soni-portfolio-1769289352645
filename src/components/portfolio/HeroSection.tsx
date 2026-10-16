'use client';

import { useState, useEffect, useRef } from 'react';

import { motion } from 'framer-motion';

import { getPersonalLinks, sanitizePersonalLinks } from '@/lib/utils';

import { getThemeColors } from '@/utils/theme';

import { IHeroProps, IHeroSectionProps } from '@/types/IHeroSection';

const HeroLinks = ({ personalInfo, className }: {
    personalInfo: IHeroProps['data']['personalInfo'];
    className: string;
}) => (<>
		{getPersonalLinks(personalInfo).map((link) => (<a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className={`${className} relative min-w-0 gap-2`}>
				<span className="min-w-0 [overflow-wrap:anywhere]">{link.label}</span>
				<span aria-hidden="true">↗</span>
				<span className="sr-only"> (opens in a new tab)</span>
			</a>))}
	</>);

const SplitHero = ({ data, theme }: IHeroProps) => {
    const { personalInfo } = data;
    const [mousePosition, setMousePosition] = useState({ x: 400, y: 300 });
    const containerRef = useRef<HTMLElement>(null);
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }
        };
        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
        }
        return () => {
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);
    // Get spotlight color based on theme
    const getSpotlightColor = () => {
        if (theme.gradient.includes('blue'))
            return { r: 59, g: 130, b: 246 };
        if (theme.gradient.includes('purple'))
            return { r: 147, g: 51, b: 234 };
        if (theme.gradient.includes('emerald'))
            return { r: 16, g: 185, b: 129 };
        if (theme.gradient.includes('rose'))
            return { r: 244, g: 63, b: 94 };
        if (theme.gradient.includes('amber'))
            return { r: 245, g: 158, b: 11 };
        if (theme.gradient.includes('cyan'))
            return { r: 6, g: 182, b: 212 };
        if (theme.gradient.includes('indigo'))
            return { r: 99, g: 102, b: 241 };
        if (theme.gradient.includes('orange'))
            return { r: 249, g: 115, b: 22 };
        if (theme.gradient.includes('teal'))
            return { r: 20, g: 184, b: 166 };
        if (theme.gradient.includes('slate'))
            return { r: 100, g: 116, b: 139 };
        return { r: 59, g: 130, b: 246 };
    };
    const spotColor = getSpotlightColor();
    return (<section ref={containerRef} className="relative flex min-h-screen min-h-svh flex-col overflow-hidden bg-slate-950 cursor-none md:flex-row">
			{/* Theme gradient background */}
			<div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-20`}></div>
			
			{/* Spotlight effect layer */}
			<div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `
						radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${spotColor.r}, ${spotColor.g}, ${spotColor.b}, 0.15) 0%, rgba(${spotColor.r}, ${spotColor.g}, ${spotColor.b}, 0.05) 200px, transparent 350px),
						radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${spotColor.r}, ${spotColor.g}, ${spotColor.b}, 0.08) 0%, rgba(${spotColor.r}, ${spotColor.g}, ${spotColor.b}, 0.02) 150px, transparent 280px)
					`,
            backgroundSize: '100% 100%, 100% 100%',
        }}></div>
			
			{/* Dot pattern */}
			<div className="absolute inset-0 pointer-events-none opacity-30" style={{
            backgroundImage: `radial-gradient(circle, rgba(${spotColor.r}, ${spotColor.g}, ${spotColor.b}, 0.3) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
        }}></div>

			<div className="relative z-10 flex min-h-screen min-h-svh w-full items-center justify-center px-4 py-10 text-white sm:p-12">
				<div className="w-full min-w-0 max-w-lg">
					<motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className={`font-mono mb-2 text-sm sm:text-base bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
						Hello, I&apos;m
					</motion.p>
					<motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="mb-3 break-words text-3xl font-bold leading-tight sm:mb-4 sm:text-5xl md:text-6xl">
						{personalInfo.name}
					</motion.h1>
					<motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="mb-4 break-words text-lg leading-snug text-slate-300 sm:mb-6 sm:text-2xl">
						{personalInfo.title}
					</motion.p>
					<motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }} className="mb-6 max-w-md break-words text-sm text-slate-400 sm:mb-8 sm:text-base">
						{personalInfo.summary}
					</motion.p>
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1 }} className="flex gap-3 sm:gap-4 flex-wrap">
						{personalInfo.email && <a href={`mailto:${personalInfo.email}`} className={`inline-flex min-h-11 max-w-full items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r ${theme.gradient} text-white rounded-lg font-semibold text-sm sm:text-base hover:-translate-y-0.5 transition-all duration-300`}>
							Get in Touch
						</a>}
						<a href="#projects" className="inline-flex min-h-11 max-w-full items-center justify-center px-4 py-2 text-sm font-semibold sm:px-6 sm:py-3 sm:text-base border border-slate-600 rounded-lg hover:border-slate-400 hover:-translate-y-0.5 transition-all duration-300">
							View Work
						</a>
						<HeroLinks personalInfo={personalInfo} className="inline-flex min-h-11 max-w-full items-center justify-center px-4 py-2 text-sm font-semibold sm:px-6 sm:py-3 sm:text-base border border-slate-600 rounded-lg hover:border-slate-400 hover:-translate-y-0.5 transition-all duration-300"/>
					</motion.div>
				</div>
			</div>
		</section>);
};

export default function HeroSection({ data, variant, palette, }: IHeroSectionProps) {
    const theme = getThemeColors(palette);
    const safeData = { ...data, personalInfo: sanitizePersonalLinks(data.personalInfo) };
    return (<SplitHero data={safeData} theme={theme}/>);
}

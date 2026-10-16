'use client';

import { useMemo } from 'react';

import { SkillsGrouped } from '@/types/portfolio';

import { getThemeColors } from '@/utils/theme';

import { SparklesCore } from '@/components/ui/SparklesCore';

import { ISkillsProps, ISkillsSectionProps } from '@/types/ISkillsSection';

// Helper function to normalize skills to grouped format
function normalizeSkills(skills: SkillsGrouped | string[] | undefined): SkillsGrouped {
    if (skills && typeof skills === 'object' && !Array.isArray(skills)) {
        return skills;
    }
    if (Array.isArray(skills)) {
        return { 'Skills': skills };
    }
    return {};
}

function getAllSkills(skills: SkillsGrouped): string[] {
    return Object.values(skills).flat();
}

function getSkillCategories(skills: SkillsGrouped) {
    return Object.entries(skills)
        .filter(([, skillList]) => skillList && skillList.length > 0)
        .map(([name, skillList]) => ({
        name,
        skills: skillList,
    }));
}

function getSkillPercentage(index: number): number {
    const percentages = [85, 90, 78, 92, 88, 75, 95, 82, 87, 79, 91, 84, 76, 93, 80];
    return percentages[index % percentages.length];
}

// Floating tag component with hover effect
const FloatingTag = ({ skill, theme, index }: {
    skill: string;
    theme: ReturnType<typeof getThemeColors>;
    index: number;
}) => {
    return (<span className={`group relative inline-flex max-w-full items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-center font-medium leading-snug text-sm sm:text-base transition-all duration-300 cursor-default touch-pan-y [overflow-wrap:anywhere]
        bg-white/10 backdrop-blur-sm border border-white/20 text-white
        hover:bg-gradient-to-r hover:${theme.gradient} hover:border-transparent hover:shadow-lg hover:shadow-purple-500/25 [@media(hover:hover)]:hover:-translate-y-1`} style={{ animationDelay: `${index * 50}ms` }}>
      <span className="relative z-10">{skill}</span>
    </span>);
};

const TagsSkills = ({ data, theme }: ISkillsProps) => {
    const { skills } = data;
    const categories = getSkillCategories(skills);
    return (<section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-950 text-white relative overflow-hidden">
      {/* Sparkles Background */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore id="skills-sparkles" background="transparent" minSize={0.4} maxSize={1} particleDensity={30} className="w-full h-full" particleColor="#FFFFFF"/>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <p className={`${theme.primary} font-mono text-xs sm:text-sm mb-3`}>TECH STACK</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Skills & Technologies
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>
        
        <div className="space-y-10 sm:space-y-12">
          {categories.map((category) => (<div key={category.name} className="text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-5 sm:mb-6 [overflow-wrap:anywhere]">
                {category.name}
              </h3>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {category.skills.map((skill, index) => (<FloatingTag key={index} skill={skill} theme={theme} index={index}/>))}
              </div>
            </div>))}
        </div>
      </div>
    </section>);
};

export default function SkillsSection({ data, variant, palette }: ISkillsSectionProps) {
    const skills = normalizeSkills(data.skills as SkillsGrouped | string[] | undefined);
    const theme = getThemeColors(palette);
    const allSkills = getAllSkills(skills);
    const skillPercentages = useMemo(() => {
        return allSkills.map((_, index) => getSkillPercentage(index));
    }, [allSkills]);
    if (allSkills.length === 0) {
        return null;
    }
    const safeData = { ...data, skills };
    return <TagsSkills data={safeData} theme={theme} skillPercentages={skillPercentages}/>;
}

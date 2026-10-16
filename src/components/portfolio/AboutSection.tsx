'use client';

import { getThemeColors } from '@/utils/theme';

import { IAboutProps, IAboutSectionProps } from '@/types/IAboutSection';

import { MacTerminal } from '@/components/ui/MacTerminal';

const SplitAbout = ({ data }: IAboutProps) => {
    const { personalInfo } = data;
    // Terminal lines with just description text, fast typing
    const terminalLines = [
        { type: "output" as const, text: personalInfo.summary, delay: 5 },
    ];
    return (<section id="about" className="overflow-x-clip bg-slate-950 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto min-w-0 max-w-4xl">
        <div className="mb-6 text-center sm:mb-8">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">About Me</h2>
        </div>
        <MacTerminal title={personalInfo.name} lines={terminalLines} className="min-w-0 [overflow-wrap:anywhere]"/>
      </div>
    </section>);
};

export default function AboutSection({ data, variant, palette }: IAboutSectionProps) {
    const theme = getThemeColors(palette);
    return <SplitAbout data={data} theme={theme}/>;
}

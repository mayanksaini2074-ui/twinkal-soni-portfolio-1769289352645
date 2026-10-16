'use client';

import { getThemeColors } from '@/utils/theme';

import { getPersonalLinks, sanitizePersonalLinks } from '@/lib/utils';

import { GlowingStarsBackground, GlowingStarsCard } from '@/components/ui/GlowingStars';

import { IContactProps, IContactSectionProps } from '@/types/IContactSection';

const ContactLinks = ({ personalInfo, className, stacked = false }: {
    personalInfo: IContactProps['data']['personalInfo'];
    className: string;
    stacked?: boolean;
}) => (<>
    {getPersonalLinks(personalInfo).map((link) => (<a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className={`${className} relative flex items-center gap-3 min-w-0 max-w-full ${stacked ? 'flex-col' : ''}`}>
        <svg aria-hidden="true" className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 3h7v7M21 3l-11 11M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/>
        </svg>
        <span className="min-w-0 max-w-full [overflow-wrap:anywhere]">{link.label}</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>))}
  </>);

const ModernContact = ({ data, theme }: IContactProps) => {
    const { personalInfo } = data;
    return (<section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-950 text-white relative overflow-hidden">
      <GlowingStarsBackground className="opacity-50" starCount={30}/>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Side */}
          <div className="min-w-0">
            <p className={`${theme.primary} mb-3 font-mono text-xs sm:text-sm`}>GET IN TOUCH</p>
            <h2 className="mb-4 break-words text-3xl font-bold leading-tight sm:mb-6 sm:text-4xl md:text-5xl">
              Let&apos;s Build Something{' '}
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${theme.gradient}`}>
                Great
              </span>
            </h2>
            <p className="mb-8 text-sm text-slate-400 sm:text-base">
              I&apos;m always excited to work on new projects and collaborate with amazing people.
            </p>
            
            {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className={`inline-flex min-h-11 max-w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg sm:px-8 sm:py-4 sm:text-base ${theme.gradient}`}>
              <span>Send Email</span>
              <span className="text-lg">→</span>
            </a>}
          </div>
          
          {/* Right Side - Contact Cards */}
          <div className="min-w-0 space-y-4 sm:space-y-5">
            {personalInfo.email && <GlowingStarsCard className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur sm:p-8">
              <p className="mb-2 text-xs text-slate-400 sm:text-sm">Email</p>
              <p className="font-medium text-sm text-white [overflow-wrap:anywhere] sm:text-base">{personalInfo.email}</p>
            </GlowingStarsCard>}
            
            {personalInfo.phone && (<GlowingStarsCard className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur sm:p-8">
                <p className="mb-2 text-xs text-slate-400 sm:text-sm">Phone</p>
                <p className="font-medium text-sm text-white [overflow-wrap:anywhere] sm:text-base">{personalInfo.phone}</p>
              </GlowingStarsCard>)}
            
            <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-4">
              <ContactLinks personalInfo={personalInfo} stacked className="group p-5 sm:p-6 bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700 text-center hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-300 text-sm sm:text-base"/>
            </div>
          </div>
        </div>
        
        <p className="mt-16 text-center text-xs text-slate-600 [overflow-wrap:anywhere] sm:mt-20 sm:text-sm">
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </section>);
};

export default function ContactSection({ data, variant, palette }: IContactSectionProps) {
    const theme = getThemeColors(palette);
    const safeData = { ...data, personalInfo: sanitizePersonalLinks(data.personalInfo) };
    return <ModernContact data={safeData} theme={theme}/>;
}

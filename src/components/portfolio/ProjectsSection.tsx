'use client';

import { getThemeColors } from '@/utils/theme';

import { getProjectLinks, sanitizeProjectLinks } from '@/lib/utils';

import { motion } from 'framer-motion';

import { IProjectsProps, IProjectsSectionProps } from '@/types/IProjectsSection';

// Responsive flex wrapper for consistent layout across all variants
// Uses flexbox with justify-center so items are always centered,
// even when there are fewer than 3 projects (e.g. 2 projects on desktop)
const ProjectsGrid = ({ children }: {
    children: React.ReactNode;
}) => (<div className="flex w-full min-w-0 flex-wrap justify-center gap-6 lg:gap-8 [&>*]:basis-full min-[360px]:[&>*]:basis-[17rem] [&>*]:grow">
    {children}
  </div>);

const ProjectLinks = ({ project, primaryClassName, secondaryClassName }: {
    project: IProjectsProps['data']['projects'][number];
    primaryClassName: string;
    secondaryClassName: string;
}) => (<>
    {getProjectLinks(project).map((link, index) => (<a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className={`${index === 0 ? primaryClassName : secondaryClassName} relative min-w-0 max-w-full [overflow-wrap:anywhere]`}>
        {link.label}<span aria-hidden="true"> ↗</span>
        <span className="sr-only">: {project.name} (opens in a new tab)</span>
      </a>))}
  </>);

// Featured Projects - Premium Bento-style with spotlight effect
const FeaturedProjects = ({ data, theme }: IProjectsProps) => {
    const { projects } = data;
    return (<section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-950 overflow-x-clip">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-slate-800 ${theme.primary} mb-4`}>
            Featured Work
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">Handpicked Projects</h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Each project represents a unique challenge and creative solution
          </p>
        </motion.div>
        
        <ProjectsGrid>
          {projects.map((project, index) => (<motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)] max-w-sm min-w-0 group">
              <div className="relative h-full min-w-0 rounded-2xl bg-slate-900 border border-slate-700 shadow-sm hover:shadow-2xl hover:shadow-slate-900/60 transition-all duration-500 overflow-hidden">
                {/* Spotlight effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className={`absolute -top-24 -right-24 w-48 h-48 sm:-top-40 sm:-right-40 sm:w-80 sm:h-80 bg-gradient-to-br ${theme.gradient} rounded-full blur-3xl opacity-20`}/>
                </div>
                
                {/* Image area with gradient overlay */}
                <div className="relative">
                  <div className={`aspect-[16/10] bg-gradient-to-br ${theme.gradient} flex items-center justify-center overflow-hidden`}>
                    <span className="text-5xl sm:text-6xl text-white/80 group-hover:scale-110 transition-transform duration-500 drop-shadow-lg">🖥️</span>
                    {/* Floating badge */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-slate-900/90 backdrop-blur-sm rounded-full shadow-sm">
                      <span className={`${theme.primary} text-xs font-bold tracking-wider`}>FEATURED</span>
                    </div>
                  </div>
                  {/* Gradient fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-900 to-transparent"/>
                </div>
                
                {/* Content */}
                <div className="relative min-w-0 p-5 pt-2 sm:p-6 sm:pt-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-slate-300 transition-colors [overflow-wrap:anywhere]">{project.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2 [overflow-wrap:anywhere]">{project.description}</p>
                  
                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies?.slice(0, 3).map((tech, i) => (<span key={i} className={`max-w-full px-3 py-1.5 bg-slate-800 ${theme.primary} text-xs font-medium rounded-full [overflow-wrap:anywhere]`}>
                        {tech}
                      </span>))}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <ProjectLinks project={project} primaryClassName={`flex-auto text-center px-4 py-3 bg-gradient-to-r ${theme.gradient} text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-slate-900`} secondaryClassName="flex-auto text-center px-4 py-3 bg-slate-800 text-slate-200 text-sm font-semibold rounded-xl hover:bg-slate-700 transition-colors"/>
                  </div>
                </div>
              </div>
            </motion.div>))}
        </ProjectsGrid>
      </div>
    </section>);
};

export default function ProjectsSection({ data, variant, palette }: IProjectsSectionProps) {
    const theme = getThemeColors(palette);
    const safeData = { ...data, projects: sanitizeProjectLinks(data.projects) };
    return <FeaturedProjects data={safeData} theme={theme}/>;
}

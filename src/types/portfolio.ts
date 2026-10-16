// Portfolio section design variants
export type HeroVariant = 'interactive-boxes' | 'spotlight' | 'shiny-text' | 'floating-shapes' | 'animated-border' | 'falling-snow';
export type AboutVariant = 'simple' | 'split' | 'modern' | 'cards';
export type ExperienceVariant = 'cards' | 'list' | 'accordion' | 'detailed' | 'timeline' | 'chain';
export type ProjectsVariant = 'grid' | 'carousel' | 'masonry' | 'featured' | 'minimal' | 'showcase';
export type SkillsVariant = 'bars' | 'tags' | 'circular' | 'categories' | 'grid' | 'minimal';
export type ContactVariant = 'simple' | 'split' | 'card' | 'floating' | 'minimal' | 'modern';

export type SkillsDisplay = 'hero' | 'separate';

export type ColorPalette = 'blue' | 'purple' | 'emerald' | 'rose' | 'amber' | 'slate' | 'cyan' | 'indigo' | 'orange' | 'teal';

// Pre-made templates
export const professionalTemplateIds = [
  'content-designer', 'graphic-designer', 'accountant', 'photographer', 'architect', 'marketer', 'consultant',
  'developer-terminal', 'developer-blueprint', 'product-designer', 'business-executive', 'creative-journal',
  'developer-signal', 'designer-prism', 'creative-spectrum',
] as const;
export type ProfessionalTemplateId = typeof professionalTemplateIds[number];
export type TemplateId = 'valentine' | 'glass' | 'aurora' | 'orbit' | 'noir' | 'cascade' | ProfessionalTemplateId;

export const templateCategories = [
  { id: 'classic', label: 'Classic' },
  { id: 'bold', label: 'Bold & expressive' },
  { id: 'cinematic', label: 'Dark & cinematic' },
  { id: 'geometric', label: 'Minimal & geometric' },
  { id: 'developers', label: 'Developers' },
  { id: 'designers', label: 'Designers' },
  { id: 'business', label: 'Business' },
  { id: 'creatives', label: 'Creatives' },
] as const;
export type TemplateCategory = typeof templateCategories[number]['id'];

export interface ITemplate {
  id: TemplateId;
  name: string;
  description: string;
  palette: ColorPalette;
  tier: 'free' | 'premium';
  category: TemplateCategory;
  config: Omit<ISectionConfig, 'colorPalette'>;
}

export const templates: ITemplate[] = [
  {
    id: 'valentine',
    tier: 'free',
    category: 'classic',
    name: '💕 Valentine',
    description: 'A rose-accented spotlight hero, terminal-style introduction and interactive experience cards.',
    palette: 'rose',
    config: { hero: 'spotlight', about: 'split', experience: 'cards', projects: 'featured', skills: 'tags', skillsDisplay: 'separate', contact: 'floating' }
  },
  {
    id: 'glass',
    tier: 'free',
    category: 'classic',
    name: '✨ Glass UI',
    description: 'Floating shapes, glowing details and comet-style experience cards with circular skills.',
    palette: 'cyan',
    config: { hero: 'floating-shapes', about: 'modern', experience: 'detailed', projects: 'masonry', skills: 'circular', skillsDisplay: 'separate', contact: 'modern' }
  },
  {
    id: 'aurora',
    tier: 'free',
    category: 'bold',
    name: 'Aurora',
    description: 'Floating shapes, flowing text and bright accents with a connected timeline and clean project cards.',
    palette: 'purple',
    config: { hero: 'floating-shapes', about: 'cards', experience: 'timeline', projects: 'grid', skills: 'tags', skillsDisplay: 'separate', contact: 'floating' },
  },
  {
    id: 'orbit',
    tier: 'free',
    category: 'geometric',
    name: 'Orbit',
    description: 'Interactive hero tiles, glowing details and spacious project showcases with compact experience panels.',
    palette: 'indigo',
    config: { hero: 'interactive-boxes', about: 'modern', experience: 'accordion', projects: 'showcase', skills: 'grid', skillsDisplay: 'separate', contact: 'card' },
  },
  {
    id: 'noir',
    tier: 'free',
    category: 'cinematic',
    name: 'Noir',
    description: 'A light introduction with a shimmering headline, followed by dark, minimal sections and restrained accents.',
    palette: 'slate',
    config: { hero: 'shiny-text', about: 'simple', experience: 'list', projects: 'minimal', skills: 'minimal', skillsDisplay: 'separate', contact: 'minimal' },
  },
  {
    id: 'cascade',
    tier: 'free',
    category: 'bold',
    name: 'Cascade',
    description: 'A soft snowfall hero, flowing text and linked experience cards with a sliding project showcase.',
    palette: 'blue',
    config: { hero: 'falling-snow', about: 'cards', experience: 'chain', projects: 'carousel', skills: 'circular', skillsDisplay: 'separate', contact: 'simple' },
  },
  {
    id: 'content-designer',
    tier: 'premium',
    category: 'creatives',
    name: 'Editorial',
    description: 'A magazine cover for your work: oversized serif type, a story index and spacious editorial spreads.',
    palette: 'rose',
    config: { templateId: 'content-designer', hero: 'spotlight', about: 'split', experience: 'cards', projects: 'featured', skills: 'tags', skillsDisplay: 'separate', contact: 'modern' },
  },
  {
    id: 'graphic-designer',
    tier: 'premium',
    category: 'designers',
    name: 'Studio',
    description: 'Poster-sized typography, punchy contrast and graphic shapes that make a bold first impression.',
    palette: 'amber',
    config: { templateId: 'graphic-designer', hero: 'spotlight', about: 'split', experience: 'cards', projects: 'featured', skills: 'tags', skillsDisplay: 'separate', contact: 'modern' },
  },
  {
    id: 'accountant',
    tier: 'premium',
    category: 'business',
    name: 'Ledger',
    description: 'Crisp dividers, balanced spacing and a monogram-led introduction for a quietly confident look.',
    palette: 'emerald',
    config: { templateId: 'accountant', hero: 'spotlight', about: 'split', experience: 'cards', projects: 'featured', skills: 'tags', skillsDisplay: 'separate', contact: 'modern' },
  },
  {
    id: 'photographer',
    tier: 'premium',
    category: 'creatives',
    name: 'Aperture',
    description: 'Dark framing, oversized type and contact-sheet grids that put your work in the spotlight.',
    palette: 'slate',
    config: { templateId: 'photographer', hero: 'spotlight', about: 'split', experience: 'cards', projects: 'featured', skills: 'tags', skillsDisplay: 'separate', contact: 'modern' },
  },
  {
    id: 'architect',
    tier: 'premium',
    category: 'designers',
    name: 'Form',
    description: 'Warm stone tones, precise grids and geometric details with room to breathe.',
    palette: 'orange',
    config: { templateId: 'architect', hero: 'spotlight', about: 'split', experience: 'cards', projects: 'featured', skills: 'tags', skillsDisplay: 'separate', contact: 'modern' },
  },
  {
    id: 'marketer',
    tier: 'premium',
    category: 'business',
    name: 'Momentum',
    description: 'Vivid accents, oversized headlines and playful arrows that give your story energy.',
    palette: 'purple',
    config: { templateId: 'marketer', hero: 'spotlight', about: 'split', experience: 'cards', projects: 'featured', skills: 'tags', skillsDisplay: 'separate', contact: 'modern' },
  },
  {
    id: 'consultant',
    tier: 'premium',
    category: 'business',
    name: 'Clarity',
    description: 'Cool tones, refined serif headings and orderly sections for a calm, polished presentation.',
    palette: 'blue',
    config: { templateId: 'consultant', hero: 'spotlight', about: 'split', experience: 'cards', projects: 'featured', skills: 'tags', skillsDisplay: 'separate', contact: 'modern' },
  },
  {
    id: 'developer-terminal',
    tier: 'premium',
    category: 'developers',
    name: 'Terminal',
    description: 'Your portfolio as a developer workspace, with a file explorer, profile editor and repository-style project panels.',
    palette: 'emerald',
    config: { templateId: 'developer-terminal', hero: 'spotlight', about: 'split', experience: 'cards', projects: 'featured', skills: 'tags', skillsDisplay: 'separate', contact: 'modern' },
  },
  {
    id: 'developer-blueprint',
    tier: 'premium',
    category: 'developers',
    name: 'Blueprint',
    description: 'Technical grid paper, a systems-inspired diagram and precise blue-bordered project cards.',
    palette: 'blue',
    config: { templateId: 'developer-blueprint', hero: 'spotlight', about: 'split', experience: 'cards', projects: 'featured', skills: 'tags', skillsDisplay: 'separate', contact: 'modern' },
  },
  {
    id: 'product-designer',
    tier: 'premium',
    category: 'designers',
    name: 'Canvas',
    description: 'An expressive bento canvas with a bold identity tile, a personal introduction and work-first case studies.',
    palette: 'teal',
    config: { templateId: 'product-designer', hero: 'spotlight', about: 'split', experience: 'cards', projects: 'featured', skills: 'tags', skillsDisplay: 'separate', contact: 'modern' },
  },
  {
    id: 'business-executive',
    tier: 'premium',
    category: 'business',
    name: 'Executive',
    description: 'Midnight tones, champagne rules and elegant serif headlines with a career-first presentation.',
    palette: 'amber',
    config: { templateId: 'business-executive', hero: 'spotlight', about: 'split', experience: 'cards', projects: 'featured', skills: 'tags', skillsDisplay: 'separate', contact: 'modern' },
  },
  {
    id: 'creative-journal',
    tier: 'premium',
    category: 'creatives',
    name: 'Journal',
    description: 'A personal notebook in cream and terracotta, with oversized issue numbers and alternating story spreads.',
    palette: 'orange',
    config: { templateId: 'creative-journal', hero: 'spotlight', about: 'split', experience: 'cards', projects: 'featured', skills: 'tags', skillsDisplay: 'separate', contact: 'modern' },
  },
  {
    id: 'developer-signal',
    tier: 'premium',
    category: 'developers',
    name: 'Signal',
    description: 'A midnight stage with luminous orbital lines, an oversized introduction and precise, project-first panels.',
    palette: 'cyan',
    config: { templateId: 'developer-signal', hero: 'spotlight', about: 'split', experience: 'cards', projects: 'featured', skills: 'tags', skillsDisplay: 'separate', contact: 'modern' },
  },
  {
    id: 'designer-prism',
    tier: 'premium',
    category: 'designers',
    name: 'Prism',
    description: 'Light lavender paper, layered project cards and spacious case studies with playful depth and precise typography.',
    palette: 'indigo',
    config: { templateId: 'designer-prism', hero: 'spotlight', about: 'split', experience: 'cards', projects: 'featured', skills: 'tags', skillsDisplay: 'separate', contact: 'modern' },
  },
  {
    id: 'creative-spectrum',
    tier: 'premium',
    category: 'creatives',
    name: 'Spectrum',
    description: 'A cobalt-and-apricot poster with oversized type, original geometric artwork and bold, full-color project spreads.',
    palette: 'orange',
    config: { templateId: 'creative-spectrum', hero: 'spotlight', about: 'split', experience: 'cards', projects: 'featured', skills: 'tags', skillsDisplay: 'separate', contact: 'modern' },
  },
];

export function getActiveTemplate(config: ISectionConfig): ITemplate | undefined {
  return templates.find((template) => config.templateId
    ? template.id === config.templateId
    : !template.config.templateId && Object.entries(template.config).every(
      ([key, value]) => config[key as keyof ISectionConfig] === value,
    ));
}

export const premiumTemplatePublishMessage =
  'Premium templates are available to preview only. Publishing is coming soon. Choose a free template or use section styles to publish.';

export function getTemplatePublishError(config: unknown): string | null {
  if (!config || typeof config !== 'object' || !('templateId' in config) || config.templateId === undefined) {
    return null;
  }
  const template = templates.find((item) => item.config.templateId === config.templateId && item.config.templateId !== undefined);
  if (!template) return 'This template is not available for publishing. Choose a free template or use section styles.';
  return template.tier === 'premium' ? premiumTemplatePublishMessage : null;
}

export interface ISectionConfig {
  templateId?: ProfessionalTemplateId;
  hero: HeroVariant;
  about: AboutVariant;
  experience: ExperienceVariant;
  projects: ProjectsVariant;
  skills: SkillsVariant;
  skillsDisplay: SkillsDisplay;
  contact: ContactVariant;
  colorPalette: ColorPalette;
}

// Dynamic skills - categories are determined by the resume content
// e.g., { "Frontend": ["React", "Vue"], "Accounting": ["QuickBooks", "SAP"] }
export type SkillsGrouped = Record<string, string[]>;

export interface IPortfolioLink {
  label: string;
  url: string;
}

export interface IResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    links?: IPortfolioLink[];
    location: string;
    summary: string;
  };
  experience: Array<{
    title: string;
    company: string;
    dates: string;
    description: string;
    highlights: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    years: string;
    gpa?: string;
  }>;
  skills: SkillsGrouped;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    link: string;
    github?: string;
    links?: IPortfolioLink[];
  }>;
}

export interface IPortfolioTheme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
}

export const defaultTheme: IPortfolioTheme = {
  primary: '#2563eb',
  secondary: '#1e40af',
  background: '#ffffff',
  text: '#1f2937',
  accent: '#3b82f6',
};

export const defaultSectionConfig: ISectionConfig = {
  hero: 'spotlight',
  about: 'split',
  experience: 'cards',
  projects: 'featured',
  skills: 'tags',
  skillsDisplay: 'separate',
  contact: 'modern',
  colorPalette: 'cyan',
};

const SECTION_CONFIG_VALUES = {
  hero: ['interactive-boxes', 'spotlight', 'shiny-text', 'floating-shapes', 'animated-border', 'falling-snow'],
  about: ['simple', 'split', 'modern', 'cards'],
  experience: ['cards', 'list', 'accordion', 'detailed', 'timeline', 'chain'],
  projects: ['grid', 'carousel', 'masonry', 'featured', 'minimal', 'showcase'],
  skills: ['bars', 'tags', 'circular', 'categories', 'grid', 'minimal'],
  skillsDisplay: ['hero', 'separate'],
  contact: ['simple', 'split', 'card', 'floating', 'minimal', 'modern'],
  colorPalette: ['blue', 'purple', 'emerald', 'rose', 'amber', 'slate', 'cyan', 'indigo', 'orange', 'teal'],
} as const;

export function isSectionConfig(value: unknown): value is ISectionConfig {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }

  const config = value as Record<string, unknown>;
  if (
    config.templateId !== undefined &&
    !professionalTemplateIds.some((id) => id === config.templateId)
  ) {
    return false;
  }
  return Object.entries(SECTION_CONFIG_VALUES).every(
    ([key, allowedValues]) =>
      typeof config[key] === 'string' &&
      (allowedValues as readonly string[]).includes(config[key] as string),
  );
}

// Deployment pipeline types
export interface IVercelDeploymentResult {
  success: boolean;
  projectId?: string;
  projectName?: string;
  dashboardUrl?: string;
  deploymentUrl?: string;
  deploymentId?: string;
  error?: string;
}

export interface IDeploymentRecord {
  userName: string;
  userEmail: string;
  githubRepoUrl: string;
  githubRepoName: string;
  vercelProjectId?: string;
  vercelDashboardUrl?: string;
  deploymentUrl?: string;
  deploymentStatus: 'pending' | 'github_created' | 'deploying' | 'ready' | 'failed';
  emailSent: boolean;
  emailSentAt?: Date;
  errorMessage?: string;
  planId: string;
  planName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISubmitOrderResponse {
  success: boolean;
  message: string;
  planId: string;
  githubRepoUrl: string | null;
  vercelDashboardUrl: string | null;
  deploymentUrl: string | null;
  emailSent: boolean;
}

import { IResumeData, ProjectsVariant, ColorPalette } from '@/types/portfolio';
import { getThemeColors } from '@/utils/theme';

export interface IProjectsProps {
  data: IResumeData;
  theme: ReturnType<typeof getThemeColors>;
}

export interface IProjectsSectionProps {
  data: IResumeData;
  variant: ProjectsVariant;
  palette: ColorPalette;
}

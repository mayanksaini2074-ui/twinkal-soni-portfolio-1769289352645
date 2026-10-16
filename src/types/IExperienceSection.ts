import { IResumeData, ExperienceVariant, ColorPalette } from '@/types/portfolio';
import { getThemeColors } from '@/utils/theme';

export interface IExperienceProps {
  data: IResumeData;
  theme: ReturnType<typeof getThemeColors>;
}

export interface IExperienceSectionProps {
  data: IResumeData;
  variant: ExperienceVariant;
  palette: ColorPalette;
}

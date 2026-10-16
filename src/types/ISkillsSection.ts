import { IResumeData, SkillsVariant, ColorPalette } from '@/types/portfolio';
import { getThemeColors } from '@/utils/theme';

export interface ISkillsProps {
  data: IResumeData;
  theme: ReturnType<typeof getThemeColors>;
  skillPercentages: number[];
}

export interface ISkillsSectionProps {
  data: IResumeData;
  variant: SkillsVariant;
  palette: ColorPalette;
}

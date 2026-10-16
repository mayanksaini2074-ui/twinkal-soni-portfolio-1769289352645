import { IResumeData, AboutVariant, ColorPalette } from '@/types/portfolio';
import { getThemeColors } from '@/utils/theme';

export interface IAboutProps {
  data: IResumeData;
  theme: ReturnType<typeof getThemeColors>;
}

export interface IAboutSectionProps {
  data: IResumeData;
  variant: AboutVariant;
  palette: ColorPalette;
}

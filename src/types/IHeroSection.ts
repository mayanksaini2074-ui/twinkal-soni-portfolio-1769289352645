import { IResumeData, HeroVariant, ColorPalette } from '@/types/portfolio';
import { getThemeColors } from '@/utils/theme';

export interface IHeroProps {
  data: IResumeData;
  theme: ReturnType<typeof getThemeColors>;
}

export interface IHeroSectionProps {
  data: IResumeData;
  variant: HeroVariant;
  palette: ColorPalette;
}

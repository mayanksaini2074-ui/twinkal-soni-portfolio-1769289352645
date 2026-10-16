import { IResumeData, ContactVariant, ColorPalette } from '@/types/portfolio';
import { getThemeColors } from '@/utils/theme';

export interface IContactProps {
  data: IResumeData;
  theme: ReturnType<typeof getThemeColors>;
}

export interface IContactSectionProps {
  data: IResumeData;
  variant: ContactVariant;
  palette: ColorPalette;
}

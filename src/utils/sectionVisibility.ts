import { IResumeData } from '@/types/portfolio';
import { getPersonalLinks } from '@/lib/utils';

// Returns true when the skills object has at least one non-empty category.
export function hasSkillsData(skills: IResumeData['skills'] | undefined): boolean {
  if (!skills) return false;
  if (typeof skills !== 'object') return false;
  return Object.values(skills).some(
    (skillList) => Array.isArray(skillList) && skillList.length > 0
  );
}

// Returns true when any contact field is present on personalInfo.
export function hasContactData(personalInfo: IResumeData['personalInfo'] | undefined): boolean {
  if (!personalInfo) return false;
  return !!(
    personalInfo.email ||
    personalInfo.phone ||
    personalInfo.linkedin ||
    personalInfo.github ||
    getPersonalLinks(personalInfo).length > 0 ||
    personalInfo.location
  );
}

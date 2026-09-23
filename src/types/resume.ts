export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  gpa?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
}

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
  summary: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
  skills: string[];
  projects: Project[];
}

export type AccentColor = "indigo" | "emerald" | "blue" | "rose" | "slate" | "violet";
export type TemplateId = "modern" | "tech-minimal" | "executive";

export interface ThemeConfig {
  accentColor: AccentColor;
  templateId: TemplateId;
}

export interface ATSBreakdown {
  overallScore: number;
  actionVerbsScore: number;
  metricsScore: number;
  contactScore: number;
  skillsScore: number;
  suggestions: string[];
}

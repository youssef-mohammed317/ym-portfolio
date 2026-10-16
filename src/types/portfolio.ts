export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  icon: string;
}

export interface StatItem {
  value: string;
  label: string;
  highlight?: string;
}

export interface QuickFact {
  label: string;
  value: string;
  icon?: string;
}

export interface ValueHighlight {
  title: string;
  description: string;
  icon?: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0 to 100
  badge?: string; // e.g. "Advanced", "Expert"
  icon?: string;
}

export interface SkillCategory {
  category: string;
  description?: string;
  items: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  type: string; // "Full-time", "Contract", etc.
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  description: string;
  highlights?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  fullDescription?: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  metric?: string;
  keyFeatures?: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number; // 1 to 5
}

export interface ContactConfig {
  headline: string;
  description: string;
  email: string;
  phone?: string;
  location: string;
  calendlyUrl?: string;
  web3FormsAccessKey: string;
  formspreeEndpoint?: string;
  successMessage?: string;
  workingHours?: string;
  availabilityBadge?: string;
}

export interface PersonalInfo {
  name: string;
  headline: string;
  titles: string[];
  bio: string;
  avatar: string;
  status: {
    available: boolean;
    text: string;
  };
  location: string;
  email: string;
  phone?: string;
  resumeUrl: string;
}

export interface PortfolioData {
  siteMetadata: {
    title: string;
    description: string;
    ogImage?: string;
    keywords?: string[];
    enableLiveEditor: boolean;
    defaultTheme: "light" | "dark" | "system";
  };
  personal: PersonalInfo;
  socials: SocialLink[];
  stats: StatItem[];
  about: {
    story: string[];
    quickFacts: QuickFact[];
    highlights: ValueHighlight[];
  };
  skills: SkillCategory[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  projectCategories: string[];
  testimonials: TestimonialItem[];
  contact: ContactConfig;
}

export interface UserData {
  name: string;
  profession: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  skills: string[];
  projects: Project[];
  education: Education[];
  experience: Experience[];
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  profileImage?: string; // Base64 encoded image
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
}

export type TemplateId = 'enhanced';
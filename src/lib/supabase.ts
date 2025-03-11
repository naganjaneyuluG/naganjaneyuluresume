
import { createClient } from '@supabase/supabase-js';
import { env } from '@/utils/env';

const supabaseUrl = env.apiUrl || '';
const supabaseKey = env.authSecret || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials are not defined in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Define database types
export type UserProfile = {
  id: string;
  user_id: string;
  full_name: string;
  avatar_url: string;
  website: string;
  updated_at: string;
};

export type Experience = {
  id: string;
  user_id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  highlight: boolean;
  created_at: string;
  updated_at: string;
};

export type SkillCategory = {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
};

export type Skill = {
  id: string;
  user_id: string;
  category_id: string;
  name: string;
  level: number;
  icon: string;
  created_at: string;
};

export type AppearanceSettings = {
  id: string;
  user_id: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  social_links: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    github: string;
  };
  created_at: string;
  updated_at: string;
};

export type EmailSettings = {
  id: string;
  user_id: string;
  settings: {
    host: string;
    port: string;
    username: string;
    password: string;
    fromEmail: string;
    fromName: string;
    secure: boolean;
    enabled: boolean;
  };
  created_at: string;
  updated_at: string;
};


-- Create schema for profile data
CREATE SCHEMA IF NOT EXISTS public;

-- Enable RLS
ALTER SCHEMA public OWNER TO postgres;

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create experiences table
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT,
  technologies TEXT[] DEFAULT '{}',
  highlight BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create skill categories table
CREATE TABLE IF NOT EXISTS public.skill_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  category_id UUID REFERENCES public.skill_categories(id) NOT NULL,
  name TEXT NOT NULL,
  level INTEGER NOT NULL,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create appearance settings table
CREATE TABLE IF NOT EXISTS public.appearance_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  colors JSONB DEFAULT '{"primary":"#1E90FF","secondary":"#6C7A89","accent":"#FF6B6B","background":"#FFFFFF","text":"#333333"}',
  social_links JSONB DEFAULT '{"facebook":"","twitter":"","instagram":"","linkedin":"","github":""}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create email settings table
CREATE TABLE IF NOT EXISTS public.email_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  settings JSONB DEFAULT '{"host":"","port":"","username":"","password":"","fromEmail":"","fromName":"","secure":false,"enabled":false}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appearance_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Profiles policies
CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Experiences policies
CREATE POLICY "Experiences are viewable by everyone" 
  ON public.experiences FOR SELECT USING (true);

CREATE POLICY "Users can create their own experiences" 
  ON public.experiences FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own experiences" 
  ON public.experiences FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own experiences" 
  ON public.experiences FOR DELETE USING (auth.uid() = user_id);

-- Skill categories policies
CREATE POLICY "Skill categories are viewable by everyone" 
  ON public.skill_categories FOR SELECT USING (true);

CREATE POLICY "Users can create their own skill categories" 
  ON public.skill_categories FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own skill categories" 
  ON public.skill_categories FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own skill categories" 
  ON public.skill_categories FOR DELETE USING (auth.uid() = user_id);

-- Skills policies
CREATE POLICY "Skills are viewable by everyone" 
  ON public.skills FOR SELECT USING (true);

CREATE POLICY "Users can create their own skills" 
  ON public.skills FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own skills" 
  ON public.skills FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own skills" 
  ON public.skills FOR DELETE USING (auth.uid() = user_id);

-- Appearance settings policies
CREATE POLICY "Appearance settings are viewable by everyone" 
  ON public.appearance_settings FOR SELECT USING (true);

CREATE POLICY "Users can create their own appearance settings" 
  ON public.appearance_settings FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own appearance settings" 
  ON public.appearance_settings FOR UPDATE USING (auth.uid() = user_id);

-- Email settings policies
CREATE POLICY "Email settings are viewable by owner" 
  ON public.email_settings FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own email settings" 
  ON public.email_settings FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own email settings" 
  ON public.email_settings FOR UPDATE USING (auth.uid() = user_id);

-- NOTE: We've removed the default skill category seed data with the invalid user_id.
-- Instead, let users create their own categories after registration.

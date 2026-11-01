export type LinkItem = { label: string; url: string };
export type StorySection = { heading: string; body?: string; items?: string[] };

export type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  crop?: { x: number; y: number; width: number; height: number; sourceWidth: number; sourceHeight: number };
};

export type PortfolioRecord = {
  id: string;
  slug: string;
  title: string;
  organization?: string;
  role?: string;
  type?: string;
  context?: string;
  location?: string;
  recognition?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  coverImage?: string;
  coverAlt?: string;
  logoImage?: string;
  gallery?: { title: string; description?: string; items: GalleryItem[] };
  supportingMaterials?: { src: string; alt: string; title: string; caption: string }[];
  tags?: string[];
  links?: LinkItem[];
  featured?: boolean;
  showOnHome?: boolean;
  draft: boolean;
  order?: number;
  sections?: StorySection[];
};

export type ProfileContent = {
  name?: string;
  displayName?: string;
  headline?: string;
  introduction?: string;
  about?: string[];
  location?: string;
  email?: string;
  links?: LinkItem[];
  resume?: { path: string; filename: string };
  education?: { institution: string; school?: string; degree: string; date: string; location?: string }[];
  certifications?: string[];
  principles?: { title: string; body: string }[];
};

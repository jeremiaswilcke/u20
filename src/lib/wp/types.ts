export interface WPPost {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
}

export interface WpEvent {
  id: number;
  date: string;
  slug: string;
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  url: string;
  image?: {
    url: string;
  };
  venue?: {
    venue: string;
    address?: string;
    city?: string;
  };
}

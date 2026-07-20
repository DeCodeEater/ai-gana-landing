export interface SiteConfig {
  agentName: string;
  fullName: string;
  role: string;
  tagline: string;
  heroGreeting: string;
  heroSubtext: string;
  heroQuote: string;
  heroTagline: string;
  whatsappNumber: string;
  phone: string;
  email: string;
  officeLocation: string;
  companyName: string;
  responseTime: string;
  friendlyNote: string;
  originStory: {
    title: string;
    body: string[];
    calloutTitle: string;
    calloutBody: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    tiktok: string;
  };
  howIWork: {
    badge: string;
    subtitle: string;
    philosophyQuote: string;
    philosophySubtext: string;
    oldWayTitle: string;
    oldWayBullets: string[];
    myWayTitle: string;
    expectations: string[];
    ctaTitle: string;
    ctaSubtext: string;
    ctaButtonText: string;
  };
}

export const siteConfig: SiteConfig = {
  agentName: "AI GANA",
  fullName: "Abdullahi Idris Gana",
  role: "Real Estate Agent . Abuja",
  tagline: "I help people find homes and investment opportunities in Abuja without making the process stressful.",
  heroGreeting: "👋 Hi, I'm Abdullahi Idris Gana.",
  heroSubtext: "Most people know me as AI GANA.",
  heroQuote: "My goal isn't to sell you the most expensive property. It's to help you make a decision you'll be happy with.",
  heroTagline: "Whether you're renting your first apartment, upgrading to a bigger home, or looking for your next investment, I'll help you find the right property without pressure, confusion, or endless back and forth.",
  whatsappNumber: "2348149912055",
  phone: "+234 814 991 2055",
  email: "Abduallahi.Idris.gana@gmail.com",
  officeLocation: "Abuja, Nigeria",
  companyName: "AI GANA Real Estate",
  responseTime: "Usually replies within an hour",
  friendlyNote: "Even if you're just exploring your options, I'm happy to point you in the right direction.",
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
  },
  originStory: {
    title: "I believe real estate should feel simple.",
    body: [
      "Finding the right property in Abuja can feel overwhelming. Too many calls. Too many opinions. Too much pressure.",
      "That's not how I work.",
      "I start by understanding what you're actually looking for, whether that's your first apartment, your family home, or your next investment.",
      "If I think a property isn't right for you, I'll tell you. I'd rather earn your trust than make a quick sale."
    ],
    calloutTitle: "Why \"AI GANA\"?",
    calloutBody: "AI GANA comes from my name, Abdullahi Idris Gana. Over time, it became more than an abbreviation. To me, it means showing up prepared, communicating clearly, and helping people make confident property decisions. That's the standard I try to live up to every time someone messages me."
  },
  howIWork: {
    badge: "What It's Like Working With Me",
    subtitle: "Clear guidance. Honest advice. Better property decisions.",
    philosophyQuote: "Before I recommend a property, I try to understand the person.",
    philosophySubtext: "Buying or renting property in Abuja shouldn't feel exhausting.",
    oldWayTitle: "The Usual Experience",
    oldWayBullets: [
      "Endless calls & pushy follow-ups",
      "Conflicting advice & hidden details",
      "Pressure to make quick decisions"
    ],
    myWayTitle: "Working With AI GANA",
    expectations: [
      "I'll tell you when a property isn't worth your money.",
      "You'll always know where things stand.",
      "I'll never pressure you into buying."
    ],
    ctaTitle: "Tell me what you're looking for.",
    ctaSubtext: "Even if you're just exploring options, I'm happy to point you in the right direction.",
    ctaButtonText: "Chat with AI GANA"
  }
};

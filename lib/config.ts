export interface SiteConfig {
  agentName: string;
  fullName: string;
  role: string;
  profileImage: string;
  aboutImage: string;
  tagline: string;
  heroGreeting: string;
  heroSubtext: string;
  heroQuote: string;
  heroHook: string;
  heroTagline: string;
  heroPaths: string[];
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
  profileImage: "/images/me.png",
  aboutImage: "",
  tagline: "I help people find homes and investment opportunities in Abuja without making the process stressful.",
  heroGreeting: "👋 Hi, I'm Abdullahi Idris Gana.",
  heroSubtext: "Most people know me as AI GANA.",
  heroQuote: "My goal isn't to sell you the most expensive property. It's to help you make a decision you'll still feel good about later.",
  heroHook: "Finding the right property shouldn't feel this complicated.",
  heroTagline: "Whatever you're looking for, I'll help you make sense of your options and find what actually fits your needs.",
  heroPaths: [
    "Renting your first apartment",
    "Upgrading to a bigger home",
    "Exploring property as an investment",
  ],
  whatsappNumber: "2348149912055",
  phone: "+234 814 991 2055",
  email: "Abduallahi.Idris.gana@gmail.com",
  officeLocation: "Abuja, Nigeria",
  companyName: "AI GANA Real Estate",
  responseTime: "Usually replies within an hour",
  friendlyNote: "You don't need to have everything figured out before you reach out. Tell me what you're looking for, what you're considering, or even what you're unsure about. I'll help you figure out the next step.",
  socialLinks: {
    facebook: "https://web.facebook.com/AiganaOfficial",
    instagram: "https://www.instagram.com/aiganaofficial/?__pwa=1",
    tiktok: "https://www.tiktok.com/@aiganaofficial?lang=en",
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
    badge: "What it's like working with me",
    subtitle: "Clear guidance. Honest advice. No unnecessary pressure.",
    philosophyQuote: "Before I recommend a property, I want to understand the person looking for it.",
    philosophySubtext: "Buying or renting a property in Abuja shouldn't feel like a guessing game.",
    oldWayTitle: "Instead of...",
    oldWayBullets: [
      "Pushing you toward the most expensive option",
      "Sending endless listings",
      "Giving you vague advice",
      "Making you feel rushed",
      "Disappearing after you enquire"
    ],
    myWayTitle: "You'll get...",
    expectations: [
      "Recommendations based on what actually fits you",
      "A shortlist that makes sense for your needs",
      "Clear explanations, even when the answer isn't what you hoped for",
      "Time to think through your decision",
      "Someone who stays involved when you need help"
    ],
    ctaTitle: "Not sure where to start?",
    ctaSubtext: "You don't need to have everything figured out before you reach out. Tell me what you're looking for, what you're considering, or what you're unsure about. I'll help you figure out the next step.",
    ctaButtonText: "Chat with AI GANA on WhatsApp"
  }
};

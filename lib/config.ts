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
}

export const siteConfig: SiteConfig = {
  agentName: "AI GANA",
  fullName: "Abdullahi Idris Gana",
  role: "Real Estate Consultant . Abuja",
  tagline: "I help people find homes and investment opportunities in Abuja without making the process stressful.",
  heroGreeting: "👋 Hi, I'm Abdullahi Idris Gana.",
  heroSubtext: "Most people know me as AI GANA.",
  heroQuote: "My goal isn't to sell you the most expensive property. It's to help you make a decision you'll be happy with.",
  heroTagline: "Whether you're renting your first apartment, upgrading to a bigger home, or looking for your next investment, I'll help you find the right property without pressure, confusion, or endless back and forth.",
  whatsappNumber: "2348030000000",
  phone: "+234 803 000 0000",
  email: "hello@aigana.com",
  officeLocation: "Abuja, Nigeria",
  companyName: "AI GANA Real Estate",
  responseTime: "Usually replies within an hour",
  friendlyNote: "Happy to answer questions even if you're just exploring.",
  originStory: {
    title: "Clear guidance, honest advice.",
    body: [
      "Navigating real estate in Abuja can often feel overwhelming — with endless calls, unclear pricing, and brokers pushing whatever listing is on their desk.",
      "I take a different approach. I work directly with clients to understand what they actually need — whether that's a family home in Wuse 2, a long-term investment property in Maitama, or simply understanding land values before making a move.",
      "When you send a message, you get direct answers from me. If a property isn't a good fit or the asking price doesn't make sense, I'll tell you straight up."
    ],
    calloutTitle: "People often ask... Why \"AI GANA\"?",
    calloutBody: "AI GANA comes from my name, Abdullahi Idris Gana. It started as a simple abbreviation, but today it represents how I approach my work: clear communication, honest advice, and helping people make confident decisions. Whether you're searching for your next home or your next investment, my goal is to make the journey simpler and more enjoyable."
  }
};

import { siteConfig } from "./config";

export function buildWhatsAppLink(message?: string): string {
  const number = siteConfig.whatsappNumber.replace(/[^\d]/g, "");
  const defaultMsg = `Hi ${siteConfig.agentName}, I was looking at your website and I'd like to chat about options in Abuja.`;
  const text = encodeURIComponent(message || defaultMsg);
  return `https://wa.me/${number}?text=${text}`;
}

export function trackWhatsAppClick(source: string) {
  if (typeof window !== "undefined" && "gtag" in window) {
    (window as Window & typeof globalThis & { gtag?: (command: string, action: string, params: Record<string, string>) => void }).gtag?.("event", "whatsapp_click", {
      event_category: "conversion",
      event_label: source,
      source: source,
    });
  }
}

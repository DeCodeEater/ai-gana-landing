import React from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { buildWhatsAppLink, trackWhatsAppClick } from "@/lib/whatsapp";

const FacebookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TikTokIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.35 22a6.33 6.33 0 0 0 6.33-6.33V9.59a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-0.86-1.02z" />
  </svg>
);

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2m0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24a8.19 8.19 0 015.82 2.42 8.18 8.18 0 012.41 5.83c.01 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.27" />
  </svg>
);

export const FooterMobile: React.FC = () => {
  const { socialLinks } = siteConfig;
  const whatsappUrl = buildWhatsAppLink("Hi Idris, I'm reaching out from your website footer.");

  return (
    <footer className="relative bg-bg text-ink-soft pt-8 pb-24 border-t border-border/80 overflow-hidden">
      {/* Subtle top accent divider */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/5 via-accent/30 to-accent/5" />

      <div className="max-w-md mx-auto px-4 space-y-6">
        
        {/* 1. Brand Hero Card */}
        <div className="bg-surface rounded-2xl p-5 border border-border/80 shadow-resting space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-accent/20 bg-accent-soft flex-shrink-0 flex items-center justify-center font-bold text-accent text-sm">
                {siteConfig.profileImage ? (
                  <Image
                    src={siteConfig.profileImage}
                    alt={siteConfig.fullName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span>AI</span>
                )}
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-ink tracking-tight">
                  {siteConfig.agentName}
                </h3>
                <p className="text-xs font-medium text-ink-soft">
                  {siteConfig.fullName}
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-soft text-accent text-[11px] font-semibold flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
              <span>Realtor</span>
            </div>
          </div>

          <p className="text-xs text-ink-soft leading-relaxed border-t border-border/60 pt-3">
            {siteConfig.tagline}
          </p>

          <div className="flex items-center justify-between text-xs pt-1 text-ink-soft">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" />
              <span className="font-medium text-ink">{siteConfig.responseTime}</span>
            </div>
            <span className="text-[11px] text-ink-soft/80">{siteConfig.officeLocation}</span>
          </div>
        </div>

        {/* 2. Direct Contact Quick Touch Targets */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-ink/70 px-1">
              Direct Contact & Enquiries
            </h4>
          </div>

          {/* Primary WhatsApp Pill Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("footer_mobile")}
            className="w-full py-3.5 px-4 rounded-full bg-accent hover:bg-accent-hover text-white font-semibold text-sm shadow-cta flex items-center justify-center gap-2.5 transition-all active:scale-[0.98]"
          >
            <WhatsAppIcon className="w-5 h-5 text-current shrink-0" />
            <span>Chat me on WhatsApp</span>
          </a>

          {/* 2-Column Contact Cards */}
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              className="p-3 rounded-xl bg-surface border border-border/80 hover:border-accent/40 flex items-center gap-2.5 transition-all shadow-resting group"
            >
              <div className="p-2 rounded-lg bg-accent-soft text-accent group-hover:bg-accent group-hover:text-white transition-colors flex-shrink-0">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase font-semibold text-ink-soft tracking-wider">Phone</p>
                <p className="text-xs font-semibold text-ink truncate">{siteConfig.phone}</p>
              </div>
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              className="p-3 rounded-xl bg-surface border border-border/80 hover:border-accent/40 flex items-center gap-2.5 transition-all shadow-resting group"
            >
              <div className="p-2 rounded-lg bg-accent-soft text-accent group-hover:bg-accent group-hover:text-white transition-colors flex-shrink-0">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase font-semibold text-ink-soft tracking-wider">Email</p>
                <p className="text-xs font-semibold text-ink truncate">{siteConfig.email.split('@')[0]}</p>
              </div>
            </a>
          </div>

          <div className="p-3 rounded-xl bg-surface border border-border/80 flex items-center gap-2.5 shadow-resting">
            <div className="p-2 rounded-lg bg-accent-soft text-accent flex-shrink-0">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase font-semibold text-ink-soft tracking-wider">Location</p>
              <p className="text-xs font-semibold text-ink">{siteConfig.officeLocation}</p>
            </div>
          </div>
        </div>

        {/* 3. Navigation & Social Connect Strip */}
        <div className="bg-surface rounded-2xl p-4 border border-border/80 shadow-resting space-y-4">
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-ink/70 mb-2.5">
              Quick Navigation
            </h4>
            <nav className="flex flex-wrap gap-2 text-xs font-medium">
              <a
                href="#properties"
                className="px-3 py-1.5 rounded-full bg-bg border border-border/80 text-ink hover:text-accent hover:border-accent/40 transition-all flex items-center gap-1.5"
              >
                <span>Featured Properties</span>
                <ArrowUpRight className="w-3 h-3 text-ink-soft" />
              </a>
              <a
                href="#how-i-work"
                className="px-3 py-1.5 rounded-full bg-bg border border-border/80 text-ink hover:text-accent hover:border-accent/40 transition-all flex items-center gap-1.5"
              >
                <span>How I Work</span>
                <ArrowUpRight className="w-3 h-3 text-ink-soft" />
              </a>
              <a
                href="#contact"
                className="px-3 py-1.5 rounded-full bg-bg border border-border/80 text-ink hover:text-accent hover:border-accent/40 transition-all flex items-center gap-1.5"
              >
                <span>Contact Me</span>
                <ArrowUpRight className="w-3 h-3 text-ink-soft" />
              </a>
            </nav>
          </div>

          <div className="border-t border-border/60 pt-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-ink/70 mb-2.5">
              Connect With Me
            </h4>
            <div className="flex items-center gap-2">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex-1 py-2 px-3 rounded-full bg-bg border border-border/80 text-ink-soft hover:text-accent hover:border-accent/40 transition-all flex items-center justify-center gap-2 text-xs font-semibold"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
                <span>Facebook</span>
              </a>

              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex-1 py-2 px-3 rounded-full bg-bg border border-border/80 text-ink-soft hover:text-accent hover:border-accent/40 transition-all flex items-center justify-center gap-2 text-xs font-semibold"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>

              <a
                href={socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex-1 py-2 px-3 rounded-full bg-bg border border-border/80 text-ink-soft hover:text-accent hover:border-accent/40 transition-all flex items-center justify-center gap-2 text-xs font-semibold"
              >
                <TikTokIcon className="w-3.5 h-3.5" />
                <span>TikTok</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4. Bottom Signature & Copyright */}
        <div className="pt-2 text-center space-y-2 text-[11px] text-ink-soft">
          <p className="italic text-ink-soft/90 max-w-xs mx-auto">
            &quot;{siteConfig.friendlyNote}&quot;
          </p>
          <p className="font-medium">
            © {new Date().getFullYear()} AI GANA • Abuja Realtor
          </p>
        </div>

      </div>
    </footer>
  );
};

import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/config";

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

export const Footer: React.FC = () => {
  const { socialLinks } = siteConfig;

  return (
    <footer className="relative bg-surface text-ink-soft pt-12 pb-24 sm:pb-14 border-t border-border overflow-hidden">
      {/* Top Subtle Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/5 via-accent/30 to-accent/5" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-8 border-b border-border/80">
          
          {/* Column 1: Brand & Role (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <h3 className="font-display text-2xl font-bold text-ink tracking-tight">
                {siteConfig.agentName}
              </h3>
              <p className="text-sm font-medium text-ink mt-0.5">
                {siteConfig.fullName}
              </p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent-soft text-accent text-xs font-semibold mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
                Real Estate Agent &bull; Abuja
              </div>
            </div>
            
            <p className="text-sm text-ink-soft max-w-sm leading-relaxed">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Column 2: Direct Contact Info (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-sm">
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2.5 text-ink-soft hover:text-accent transition-colors group"
              >
                <span className="p-2 rounded-lg bg-bg border border-border text-accent group-hover:bg-accent-soft transition-colors">
                  <Phone className="w-4 h-4" />
                </span>
                <span>{siteConfig.phone}</span>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2.5 text-ink-soft hover:text-accent transition-colors group"
              >
                <span className="p-2 rounded-lg bg-bg border border-border text-accent group-hover:bg-accent-soft transition-colors">
                  <Mail className="w-4 h-4" />
                </span>
                <span className="truncate max-w-[220px] sm:max-w-none">{siteConfig.email}</span>
              </a>

              <div className="flex items-center gap-2.5 text-ink-soft">
                <span className="p-2 rounded-lg bg-bg border border-border text-accent">
                  <MapPin className="w-4 h-4" />
                </span>
                <span>{siteConfig.officeLocation}</span>
              </div>
            </div>
          </div>

          {/* Column 3: Navigation & Social (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ink mb-2.5">
                Navigation
              </h4>
              <nav className="flex flex-col space-y-2 text-sm font-medium">
                <a href="#properties" className="hover:text-accent transition-colors">
                  Featured Properties
                </a>
                <a href="#how-i-work" className="hover:text-accent transition-colors">
                  How I Work
                </a>
                <a href="#contact" className="hover:text-accent transition-colors">
                  Contact Idris
                </a>
              </nav>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ink mb-2.5">
                Connect
              </h4>
              <div className="flex items-center gap-2.5">
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2.5 rounded-full bg-bg border border-border text-ink-soft hover:text-accent hover:border-accent/40 hover:bg-accent-soft transition-all shadow-resting"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>

                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2.5 rounded-full bg-bg border border-border text-ink-soft hover:text-accent hover:border-accent/40 hover:bg-accent-soft transition-all shadow-resting"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>

                <a
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="p-2.5 rounded-full bg-bg border border-border text-ink-soft hover:text-accent hover:border-accent/40 hover:bg-accent-soft transition-all shadow-resting"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Status */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-soft">
          <p>
            © {new Date().getFullYear()} {siteConfig.companyName}. Based in {siteConfig.officeLocation}.
          </p>
          <div className="flex items-center gap-2 text-ink-soft font-medium">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" />
            <span>{siteConfig.responseTime}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

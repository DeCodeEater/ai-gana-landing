import React from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { buildWhatsAppLink, trackWhatsAppClick } from "@/lib/whatsapp";
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "./icons";

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

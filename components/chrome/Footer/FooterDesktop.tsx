"use client";

import React from "react";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { buildWhatsAppLink, trackWhatsAppClick } from "@/lib/whatsapp";
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "./icons";

export const FooterDesktop: React.FC = () => {
  const { socialLinks } = siteConfig;
  const whatsappUrl = buildWhatsAppLink(
    "Hi Idris, I'm reaching out from your website footer."
  );

  return (
    <footer className="relative bg-surface text-ink-soft pt-12 pb-14 border-t border-border overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/5 via-accent/30 to-accent/5" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-12 gap-12 pb-8 border-b border-border/80">
          
          {/* Brand */}
          <div className="col-span-5 space-y-4">
            <div className="flex items-start gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-accent/20 bg-accent-soft flex-shrink-0 flex items-center justify-center font-bold text-accent text-sm">
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
                <h3 className="font-display text-2xl font-bold text-ink tracking-tight">
                  {siteConfig.agentName}
                </h3>
                <p className="text-sm font-medium text-ink mt-0.5">
                  {siteConfig.fullName}
                </p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent-soft text-accent text-xs font-semibold mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
                  <span>Real Estate Agent &bull; Abuja</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-ink-soft max-w-sm leading-relaxed">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Contact */}
          <div className="col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink">
              Direct Contact
            </h4>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("footer_desktop")}
              className="w-full py-3 px-4 rounded-full bg-accent hover:bg-accent-hover text-white font-semibold text-sm shadow-cta flex items-center justify-center gap-2.5 transition-all active:scale-[0.98]"
            >
              <WhatsAppIcon className="w-5 h-5 text-current shrink-0" />
              <span>Chat me on WhatsApp</span>
            </a>

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
                <span>{siteConfig.email}</span>
              </a>

              <div className="flex items-center gap-2.5 text-ink-soft">
                <span className="p-2 rounded-lg bg-bg border border-border text-accent">
                  <MapPin className="w-4 h-4" />
                </span>
                <span>{siteConfig.officeLocation}</span>
              </div>
            </div>
          </div>

          {/* Nav & Social */}
          <div className="col-span-3 space-y-4">
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
                  Contact Me
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

        {/* Bottom */}
        <div className="flex flex-row items-center justify-between text-xs text-ink-soft">
          <p>
            © {new Date().getFullYear()} AI GANA • Abuja Realtor
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

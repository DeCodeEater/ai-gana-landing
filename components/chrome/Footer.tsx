import React from "react";
import { siteConfig } from "@/lib/config";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface text-ink-soft py-12 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-border">
          <div>
            <h3 className="font-display text-xl font-bold text-ink tracking-tight">
              {siteConfig.agentName}
            </h3>
            <p className="text-sm text-ink-soft mt-1 max-w-md">
              {siteConfig.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
            <a href="#properties" className="hover:text-ink transition-colors">
              Properties
            </a>
            <a href="#about" className="hover:text-ink transition-colors">
              About
            </a>
            <a href="#why-me" className="hover:text-ink transition-colors">
              Why Me
            </a>
            <a href="#contact" className="hover:text-ink transition-colors">
              Contact
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-soft">
          <p>
            © {new Date().getFullYear()} {siteConfig.companyName}. Based in {siteConfig.officeLocation}.
          </p>
          <p>
            Built for direct, transparent property discussions in Abuja.
          </p>
        </div>
      </div>
    </footer>
  );
};

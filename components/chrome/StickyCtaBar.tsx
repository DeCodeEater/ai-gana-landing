"use client";

import React, { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { siteConfig } from "@/lib/config";

export const StickyCtaBar: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-premium ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      role="toolbar"
      aria-label="Quick contact actions"
    >
      <div className="bg-surface/95 backdrop-blur-md border-t border-border shadow-hover pb-safe">
        <div className="max-w-lg mx-auto flex items-center justify-center gap-3 px-4 py-3">
          <WhatsAppButton
            source="sticky_bar"
            variant="primary"
            className="flex-1 max-w-[200px] text-sm px-4 py-3"
          >
            WhatsApp
          </WhatsAppButton>

          <a
            href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
            className="flex-1 max-w-[200px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-border bg-bg hover:bg-accent-soft text-ink hover:text-accent text-sm font-medium transition-colors active:scale-[0.98]"
            aria-label={`Call ${siteConfig.agentName}`}
          >
            <Phone className="w-4 h-4 text-accent" />
            <span>Call</span>
          </a>
        </div>
      </div>
    </div>
  );
};

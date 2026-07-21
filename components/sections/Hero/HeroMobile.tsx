"use client";

import React from "react";
import Image from "next/image";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const HeroMobile: React.FC = () => {
  const { config } = useSiteConfig();

  return (
    <section className="relative min-h-[85vh] flex items-center pt-6 pb-12 bg-bg overflow-hidden">
      <div className="max-w-xl mx-auto px-4 w-full mt-4">
        
        <div className="flex flex-col gap-6">
          
          {/* Top Row for Mobile (Title + Image side by side) */}
          <div className="flex flex-row items-start justify-between gap-4">
            {/* Typography Content - Title */}
            <div className="flex-1">
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink tracking-tight leading-[1.1] mb-4">
                <span className="text-2xl sm:text-3xl block mb-2 font-medium text-ink-soft">Hi, I&apos;m</span>
                <span className="text-ink break-words block mb-2">{config.fullName}</span>
                <span className="italic font-light text-ink-soft text-xl sm:text-3xl tracking-normal mt-2 block">
                  mostly known as <span className="font-bold text-accent not-italic">{config.agentName}</span>.
                </span>
              </h1>
            </div>

            {/* Mobile/Tablet Image */}
            <div className="w-[45%] sm:w-[40%] shrink-0 mt-2">
              <div className="relative w-full aspect-[3/4] rounded-tl-[40px] rounded-br-[40px] sm:rounded-tl-[60px] sm:rounded-br-[60px] overflow-hidden shadow-2xl border border-border">
                <Image
                  src={config.profileImage}
                  alt={config.fullName}
                  fill
                  priority
                  sizes="45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-full w-full bg-accent"></span>
                  </span>
                  <span className="text-[10px] font-medium text-surface uppercase tracking-widest bg-ink/40 backdrop-blur-md px-2 py-1 rounded-full truncate">
                    Abuja
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tagline Paragraph */}
          <p className="text-ink-soft text-base sm:text-xl leading-relaxed mb-4 font-normal">
            {config.heroTagline}
          </p>

          {/* CTA Button & Reassurance */}
          <div className="flex flex-col items-center gap-3 w-full">
            <WhatsAppButton
              source="hero_primary"
              variant="primary"
              className="px-8 py-3.5 text-base font-medium rounded-full justify-center w-full shadow-cta"
              containerClassName="w-full"
            >
              What are you looking for?
            </WhatsAppButton>
            
            {/* Reassurance */}
            <div className="flex items-center justify-center gap-2 text-xs text-ink-soft font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-full w-full bg-accent"></span>
              </span>
              {config.responseTime}
            </div>
          </div>

          {/* Quote */}
          <blockquote className="border-l-4 border-border pl-4 py-2 italic text-ink-soft font-normal text-base leading-relaxed mt-4">
            &ldquo;{config.heroQuote}&rdquo;
          </blockquote>
          
        </div>

      </div>
    </section>
  );
};

"use client";

import React from "react";
import Image from "next/image";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const HeroMobile: React.FC = () => {
  const { config } = useSiteConfig();

  return (
    <section className="relative min-h-[calc(100svh-5rem)] flex flex-col justify-center pt-6 pb-10 bg-bg overflow-hidden">
      <div className="max-w-xl mx-auto px-4 w-full">
        
        <div className="flex flex-col gap-5">
          
          {/* Top Row for Mobile (Title + Image side by side) */}
          <div className="flex flex-row items-start justify-between gap-4">
            {/* Typography Content - Title */}
            <div className="flex-1">
              <h1 className="font-display text-3xl sm:text-5xl font-bold text-ink tracking-tight leading-[1.1]">
                <span className="text-xl sm:text-3xl block mb-1 font-medium text-ink-soft">Hi, I&apos;m</span>
                <span className="text-ink break-words block mb-1">{config.fullName}</span>
                <span className="italic font-light text-ink-soft text-lg sm:text-3xl tracking-normal block">
                  mostly known as <span className="font-bold text-accent not-italic">{config.agentName}</span>.
                </span>
              </h1>
            </div>

            {/* Mobile/Tablet Image */}
            <div className="w-[42%] sm:w-[40%] shrink-0 mt-1">
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

          {/* Hook line */}
          <p className="font-display text-xl sm:text-3xl font-bold text-ink leading-snug">
            {config.heroHook}
          </p>

          {/* Path chips */}
          <div className="flex flex-wrap gap-1.5">
            {config.heroPaths.map((path) => (
              <span
                key={path}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-soft/60 border border-accent/20 text-ink text-[11px] font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                {path}
              </span>
            ))}
          </div>

          {/* Tagline Paragraph */}
          <p className="text-ink-soft text-sm sm:text-lg leading-relaxed font-normal">
            {config.heroTagline}
          </p>

          {/* CTA Button & Reassurance */}
          <div className="flex flex-col items-center gap-2 w-full">
            <WhatsAppButton
              source="hero_primary"
              variant="primary"
              className="px-8 py-3.5 text-base font-medium rounded-full justify-center w-full shadow-cta"
              containerClassName="w-full"
            >
              Tell me what you&apos;re looking for
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
          
        </div>

      </div>
    </section>
  );
};

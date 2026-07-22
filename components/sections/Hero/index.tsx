"use client";

import React from "react";
import Image from "next/image";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const Hero: React.FC = () => {
  const { config } = useSiteConfig();

  return (
    <section className="relative min-h-[calc(100svh-5rem)] lg:min-h-[calc(100vh-5rem)] flex items-center pt-6 pb-10 lg:pt-8 lg:pb-16 bg-bg overflow-hidden">
      <div className="max-w-xl lg:max-w-7xl mx-auto px-4 lg:px-6 w-full">
        
        {/* Container: Flex-col on mobile/tablet, 12-col Grid on Desktop */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-x-16 lg:gap-y-4 items-center gap-5">
          
          {/* Top Row / Title Block */}
          <div className="w-full lg:col-span-7 flex flex-row lg:block items-start justify-between gap-4">
            
            {/* Title Typography */}
            <div className="flex-1">
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl xl:text-[4.5rem] font-bold text-ink tracking-tight leading-[1.1]">
                <span className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl block mb-1 lg:mb-2 font-medium text-ink-soft">
                  Hi, I&apos;m
                </span>
                <span className="text-ink break-words block mb-1 lg:mb-2">{config.fullName}</span>
                <span className="italic font-light text-ink-soft text-lg sm:text-3xl lg:text-4xl xl:text-5xl tracking-normal block mt-0 lg:mt-4">
                  mostly known as <span className="font-bold text-accent not-italic">{config.agentName}</span>.
                </span>
              </h1>
            </div>

            {/* Profile Image (Mobile top row) */}
            <div className="w-[42%] sm:w-[40%] shrink-0 mt-1 lg:hidden">
              <div className="relative w-full aspect-[3/4] rounded-tl-[40px] rounded-br-[40px] sm:rounded-tl-[60px] sm:rounded-br-[60px] overflow-hidden shadow-2xl border border-border">
                <Image
                  src={config.profileImage}
                  alt={config.fullName}
                  fill
                  priority
                  sizes="(max-width: 1023px) 45vw, 40vw"
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

          {/* Profile Image (Desktop right column grid) */}
          <div className="hidden lg:block lg:col-span-5 lg:row-span-2 relative self-center w-full">
            <div className="relative w-full aspect-[4/5] rounded-tl-[120px] rounded-br-[120px] overflow-hidden shadow-2xl border border-border">
              <Image
                src={config.profileImage}
                alt={config.fullName}
                fill
                sizes="40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3">
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-full w-full bg-accent"></span>
                </span>
                <span className="text-xs font-medium text-surface uppercase tracking-widest bg-ink/40 backdrop-blur-md px-3 py-1.5 rounded-full truncate">
                  Abuja
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Content: Hook, Path Chips, Tagline, CTA */}
          <div className="w-full lg:col-span-7 lg:col-start-1 flex flex-col gap-5 lg:gap-0">
            {/* Hook line */}
            <p className="font-display text-xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold text-ink leading-snug lg:max-w-2xl lg:mb-6">
              {config.heroHook}
            </p>

            {/* Path chips */}
            <div className="flex flex-wrap gap-1.5 lg:gap-2.5 lg:mb-6 lg:max-w-2xl">
              {config.heroPaths.map((path) => (
                <span
                  key={path}
                  className="inline-flex items-center gap-1.5 lg:gap-2 px-2.5 py-1 lg:px-4 lg:py-2 rounded-full bg-accent-soft/60 border border-accent/20 text-ink text-[11px] lg:text-sm font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {path}
                </span>
              ))}
            </div>

            {/* Tagline Paragraph */}
            <p className="text-ink-soft text-sm sm:text-lg lg:text-xl leading-relaxed font-normal lg:max-w-2xl lg:mb-8">
              {config.heroTagline}
            </p>

            {/* CTA Button & Reassurance */}
            <div className="flex flex-col items-center lg:items-start gap-2 lg:gap-3 w-full">
              <WhatsAppButton
                source="hero_primary"
                variant="primary"
                className="px-8 py-3.5 lg:px-10 lg:py-4 text-base lg:text-lg font-medium rounded-full justify-center w-full lg:w-auto shadow-cta lg:hover:-translate-y-0.5 transition-transform"
                containerClassName="w-full lg:w-auto"
              >
                Tell me what you&apos;re looking for
              </WhatsAppButton>
              
              {/* Reassurance */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs lg:text-sm text-ink-soft font-medium lg:pl-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-full w-full bg-accent"></span>
                </span>
                {config.responseTime}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

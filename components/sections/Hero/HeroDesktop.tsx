"use client";

import React from "react";
import Image from "next/image";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const HeroDesktop: React.FC = () => {
  const { config } = useSiteConfig();

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center pt-8 pb-16 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-12 gap-x-16 gap-y-4 items-center">
          
          {/* Left Column: Title Typography */}
          <div className="col-span-7">
            <h1 className="font-display text-6xl xl:text-[4.5rem] font-bold text-ink tracking-tight leading-[1.1]">
              <span className="text-4xl xl:text-5xl block mb-2 font-medium text-ink-soft">Hi, I&apos;m</span>
              <span className="text-ink break-words block mb-2">{config.fullName}</span>
              <span className="italic font-light text-ink-soft text-4xl xl:text-5xl tracking-normal mt-4 block">
                mostly known as <span className="font-bold text-accent not-italic">{config.agentName}</span>.
              </span>
            </h1>
          </div>

          {/* Right Column: Desktop Image */}
          <div className="col-span-5 row-span-2 relative self-center">
            <div className="relative w-full aspect-[4/5] rounded-tl-[120px] rounded-br-[120px] overflow-hidden shadow-2xl border border-border">
              <Image
                src={config.profileImage}
                alt={config.fullName}
                fill
                priority
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

          {/* Bottom Left Column: Tagline, CTA */}
          <div className="col-span-7 col-start-1">
            {/* Hook line */}
            <p className="font-display text-3xl xl:text-4xl font-bold text-ink leading-snug max-w-2xl mb-6">
              {config.heroHook}
            </p>

            {/* Path chips */}
            <div className="flex flex-wrap gap-2.5 mb-6 max-w-2xl">
              {config.heroPaths.map((path) => (
                <span
                  key={path}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-soft/60 border border-accent/20 text-ink text-sm font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {path}
                </span>
              ))}
            </div>

            <p className="text-ink-soft text-xl leading-relaxed max-w-2xl mb-8 font-normal">
              {config.heroTagline}
            </p>

            <div className="flex flex-row gap-8 items-center">
              <div className="flex flex-col items-start gap-3">
                <WhatsAppButton
                  source="hero_primary"
                  variant="primary"
                  className="px-10 py-4 text-lg font-medium rounded-full shadow-cta hover:-translate-y-0.5 transition-transform"
                >
                  Tell me what you&apos;re looking for
                </WhatsAppButton>
                {/* Reassurance */}
                <div className="flex items-center gap-2 text-sm text-ink-soft font-medium pl-4">
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
      </div>
    </section>
  );
};

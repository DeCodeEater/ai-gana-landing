"use client";

import React from "react";
import Image from "next/image";
import { Quote, Check } from "lucide-react";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";
import { SectionContainer } from "@/components/ui/SectionContainer";

export const AboutMeDesktop: React.FC = () => {
  const { config } = useSiteConfig();
  const { howIWork } = config;

  return (
    <SectionContainer id="how-i-work" surface={true}>
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="bg-bg rounded-2xl p-10 lg:p-14 border border-border shadow-resting space-y-10">

          {/* Header Zone */}
          <div className="space-y-2">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-ink tracking-tight leading-tight">
              {howIWork.badge}
            </h2>
            <p className="text-ink-soft text-lg">
              {howIWork.subtitle}
            </p>
          </div>

          {/* Single Quote Card */}
          <div className="relative p-8 rounded-2xl bg-accent-soft/60 border border-accent/20 shadow-resting">
            <Quote className="w-10 h-10 text-accent/15 absolute top-6 right-6 pointer-events-none select-none" />
            <div className="max-w-3xl space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                Core Philosophy
              </p>
              <h3 className="font-display font-bold text-3xl text-ink leading-tight pr-12">
                &ldquo;{howIWork.philosophyQuote}&rdquo;
              </h3>
              <p className="text-ink-soft text-lg pt-1">
                {howIWork.philosophySubtext}
              </p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="rounded-2xl border border-border overflow-hidden">
            <div className="grid grid-cols-2">
              <div className="px-5 py-3 bg-surface border-b border-r border-border">
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold shrink-0">✕</span>
                  <span className="truncate">{howIWork.oldWayTitle}</span>
                </span>
              </div>
              <div className="px-5 py-3 bg-accent-soft/40 border-b border-accent/10">
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-accent text-white shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span className="truncate">{howIWork.myWayTitle}</span>
                </span>
              </div>
            </div>

            {howIWork.oldWayBullets.map((oldBullet, idx) => (
              <div
                key={oldBullet}
                className={`grid grid-cols-2 ${
                  idx < howIWork.oldWayBullets.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="px-5 py-4 bg-surface border-r border-border flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-border shrink-0 mt-2" />
                  <span className="text-ink-soft text-base leading-normal">{oldBullet}</span>
                </div>
                <div className="px-5 py-4 bg-accent-soft/20 flex items-start gap-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-accent text-white shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span className="text-ink font-medium text-base leading-normal">
                    {howIWork.expectations[idx]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Photo Card */}
          {config.aboutImage && (
            <div className="max-w-sm mx-auto">
              <div className="relative w-full aspect-[3/4] rounded-[28px] overflow-hidden shadow-hover border border-border group">
                <Image
                  src={config.aboutImage}
                  alt={`${config.fullName} at a property in Abuja`}
                  fill
                  sizes="384px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-surface/90 backdrop-blur-md border border-white/20 shadow-resting">
                  <p className="font-display font-semibold text-ink text-sm">
                    {config.fullName}
                  </p>
                  <p className="text-xs text-ink-soft">
                    {config.role}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </SectionContainer>
  );
};

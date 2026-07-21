"use client";

import React from "react";
import Image from "next/image";
import { Quote, Check } from "lucide-react";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";
import { SectionContainer } from "@/components/ui/SectionContainer";

export const AboutMeMobile: React.FC = () => {
  const { config } = useSiteConfig();
  const { howIWork } = config;

  return (
    <SectionContainer id="how-i-work" surface={true}>
      <div className="max-w-xl mx-auto space-y-6">
        <div className="bg-bg rounded-2xl p-5 border border-border shadow-resting space-y-6">

          {/* Header Zone */}
          <div className="space-y-1">
            <h2 className="font-display text-3xl font-bold text-ink tracking-tight leading-tight">
              {howIWork.badge}
            </h2>
            <p className="text-ink-soft text-base">
              {howIWork.subtitle}
            </p>
          </div>

          {/* Single Quote Card */}
          <div className="relative p-5 rounded-2xl bg-accent-soft/60 border border-accent/20 shadow-resting">
            <Quote className="w-8 h-8 text-accent/15 absolute top-4 right-4 pointer-events-none select-none" />
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                Core Philosophy
              </p>
              <h3 className="font-display font-bold text-xl text-ink leading-snug pr-6">
                &ldquo;{howIWork.philosophyQuote}&rdquo;
              </h3>
              <p className="text-ink-soft text-sm pt-1">
                {howIWork.philosophySubtext}
              </p>
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="rounded-2xl border border-border overflow-hidden">
            <div className="grid grid-cols-2">
              <div className="px-3 py-2.5 bg-surface border-b border-r border-border">
                <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-soft">
                  <span className="flex items-center justify-center w-4 h-4 rounded-full bg-red-100 text-red-600 text-[9px] font-bold shrink-0">✕</span>
                  <span className="truncate">{howIWork.oldWayTitle}</span>
                </span>
              </div>
              <div className="px-3 py-2.5 bg-accent-soft/40 border-b border-accent/10">
                <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                  <span className="flex items-center justify-center w-4 h-4 rounded-full bg-accent text-white shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
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
                <div className="px-3 py-3 bg-surface border-r border-border flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-border shrink-0 mt-1.5" />
                  <span className="text-ink-soft text-xs leading-snug">{oldBullet}</span>
                </div>
                <div className="px-3 py-3 bg-accent-soft/20 flex items-start gap-2">
                  <span className="flex items-center justify-center w-4 h-4 rounded-full bg-accent text-white shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span className="text-ink font-medium text-xs leading-snug">
                    {howIWork.expectations[idx]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Photo Card */}
          <div className="w-full">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-hover border border-border">
              <Image
                src={config.aboutImage || "/images/ai_gana_balcony.png"}
                alt={`${config.fullName} at a property in Abuja`}
                fill
                sizes="90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-surface/90 backdrop-blur-md border border-white/20">
                <p className="font-display font-semibold text-ink text-xs">
                  {config.fullName}
                </p>
                <p className="text-[10px] text-ink-soft">
                  {config.role}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </SectionContainer>
  );
};

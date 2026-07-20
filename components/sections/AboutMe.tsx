import React from "react";
import Image from "next/image";
import { Quote, Check } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { SectionContainer } from "@/components/ui/SectionContainer";

export const AboutMe: React.FC = () => {
  const { howIWork } = siteConfig;

  return (
    <SectionContainer id="how-i-work" surface={true}>
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="bg-bg rounded-2xl p-6 sm:p-10 lg:p-14 border border-border shadow-resting space-y-10">

          {/* 1 — Header Zone */}
          <div className="space-y-2">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight leading-tight">
              {howIWork.badge}
            </h2>
            <p className="text-ink-soft text-base sm:text-lg">
              {howIWork.subtitle}
            </p>
          </div>

          {/* 2 — Single Quote Card */}
          <div className="relative p-6 sm:p-8 rounded-2xl bg-accent-soft/60 border border-accent/20 shadow-resting">
            <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-accent/15 absolute top-5 right-5 sm:top-6 sm:right-6 pointer-events-none select-none" />
            <div className="max-w-3xl space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                Core Philosophy
              </p>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink leading-tight pr-8 sm:pr-12">
                &ldquo;{howIWork.philosophyQuote}&rdquo;
              </h3>
              <p className="text-ink-soft text-base sm:text-lg pt-1">
                {howIWork.philosophySubtext}
              </p>
            </div>
          </div>

          {/* 3 — Comparison Strip */}
          <div className="rounded-2xl border border-border overflow-hidden">
            {/* Column Headers */}
            <div className="grid grid-cols-2">
              <div className="px-3 py-3 sm:px-5 bg-surface border-b border-r border-border">
                <span className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-100 text-red-600 text-[9px] sm:text-[10px] font-bold shrink-0">✕</span>
                  <span className="truncate">{howIWork.oldWayTitle}</span>
                </span>
              </div>
              <div className="px-3 py-3 sm:px-5 bg-accent-soft/40 border-b border-accent/10">
                <span className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-accent">
                  <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-accent text-white shrink-0">
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                  </span>
                  <span className="truncate">{howIWork.myWayTitle}</span>
                </span>
              </div>
            </div>

            {/* Comparison Rows */}
            {howIWork.oldWayBullets.map((oldBullet, idx) => (
              <div
                key={oldBullet}
                className={`grid grid-cols-2 ${
                  idx < howIWork.oldWayBullets.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="px-3 py-3 sm:px-5 sm:py-4 bg-surface border-r border-border flex items-start gap-2 sm:gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-border shrink-0 mt-1.5" />
                  <span className="text-ink-soft text-xs sm:text-base leading-snug sm:leading-normal">{oldBullet}</span>
                </div>
                <div className="px-3 py-3 sm:px-5 sm:py-4 bg-accent-soft/20 flex items-start gap-2 sm:gap-3">
                  <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-accent text-white shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                  </span>
                  <span className="text-ink font-medium text-xs sm:text-base leading-snug sm:leading-normal">
                    {howIWork.expectations[idx]}
                  </span>
                </div>
              </div>
            ))}
          </div>


          {/* 5 — Photo + Name Card */}
          <div className="max-w-sm mx-auto">
            <div className="relative w-full aspect-[3/4] rounded-[28px] overflow-hidden shadow-hover border border-border group">
              <Image
                src="/images/ai_gana_balcony.png"
                alt={`${siteConfig.fullName} at a property in Abuja`}
                fill
                sizes="(min-width: 640px) 384px, 90vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-surface/90 backdrop-blur-md border border-white/20 shadow-resting">
                <p className="font-display font-semibold text-ink text-sm">
                  {siteConfig.fullName}
                </p>
                <p className="text-xs text-ink-soft">
                  {siteConfig.role}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </SectionContainer>
  );
};

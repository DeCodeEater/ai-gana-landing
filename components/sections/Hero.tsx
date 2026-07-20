import React from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center pt-6 pb-12 sm:pt-14 sm:pb-20 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full mt-4 sm:mt-0">
        
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Top Row for Mobile (Title + Image side by side) */}
          <div className="flex flex-row items-start justify-between gap-4 sm:gap-8 lg:col-span-7 lg:block">
            {/* Typography Content - Title */}
            <div className="flex-1 lg:pt-8">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem] font-bold text-ink tracking-tight leading-[1.1] mb-4 sm:mb-8">
                <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl block mb-2 font-medium text-ink-soft">Hi, I&apos;m</span>
                <span className="text-ink break-words block mb-2">{siteConfig.fullName}</span>
                <span className="italic font-light text-ink-soft text-xl sm:text-3xl lg:text-4xl xl:text-5xl tracking-normal mt-2 sm:mt-4 block">
                  mostly known as <span className="font-bold text-accent not-italic">{siteConfig.agentName}</span>.
                </span>
              </h1>
            </div>

            {/* Mobile/Tablet Image (hidden on Desktop) */}
            <div className="w-[45%] sm:w-[40%] shrink-0 lg:hidden mt-2 sm:mt-4">
              <div className="relative w-full aspect-[3/4] rounded-tl-[40px] rounded-br-[40px] sm:rounded-tl-[80px] sm:rounded-br-[80px] overflow-hidden shadow-2xl border border-border">
                <Image
                  src="/images/me.png"
                  alt={siteConfig.fullName}
                  fill
                  priority
                  sizes="(max-width: 1024px) 45vw, 35vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex items-center gap-2 sm:gap-3">
                  <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-full w-full bg-accent"></span>
                  </span>
                  <span className="text-[10px] sm:text-xs font-medium text-surface uppercase tracking-widest bg-ink/40 backdrop-blur-md px-2 py-1 sm:px-3 sm:py-1.5 rounded-full truncate">
                    Abuja
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Image (hidden on Mobile) */}
          <div className="hidden lg:block lg:col-span-5 relative lg:mt-8">
            <div className="relative w-full aspect-[4/5] lg:rounded-tl-[120px] lg:rounded-br-[120px] overflow-hidden shadow-2xl border border-border">
              <Image
                src="/images/me.png"
                alt={siteConfig.fullName}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 0vw"
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

          {/* Bottom Content (Paragraph, CTAs, Quote) */}
          <div className="lg:col-span-7 lg:col-start-1 lg:row-start-2 lg:-mt-16">
            <p className="text-ink-soft text-base sm:text-xl lg:text-2xl leading-relaxed max-w-xl lg:max-w-2xl mb-8 sm:mb-10 font-normal">
              {siteConfig.heroTagline}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 items-start sm:items-center w-full sm:w-auto">
              <div className="w-full sm:w-auto flex flex-col items-center sm:items-start gap-3">
                <WhatsAppButton
                  source="hero_primary"
                  variant="primary"
                  className="px-8 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg font-medium rounded-full justify-center w-full sm:w-auto shadow-cta hover:-translate-y-0.5 transition-transform"
                  containerClassName="w-full sm:w-auto"
                >
                  What are you looking for?
                </WhatsAppButton>
                {/* Reassurance */}
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-ink-soft font-medium pl-0 sm:pl-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-full w-full bg-accent"></span>
                  </span>
                  {siteConfig.responseTime}
                </div>
              </div>
            </div>

            <blockquote className="border-l-4 border-border pl-4 sm:pl-6 py-2 italic text-ink-soft font-normal text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl lg:max-w-2xl mt-6 sm:mt-8">
              &ldquo;{siteConfig.heroQuote}&rdquo;
            </blockquote>
          </div>
          
        </div>

      </div>
    </section>
  );
};

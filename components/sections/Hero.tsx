import React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const Hero: React.FC = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 bg-bg overflow-hidden">
      <div className="max-w-xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        
        {/* 1. Headline - Stacked Centered Text */}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-ink tracking-tight leading-[1.25] max-w-md">
          Hi,<br />
          I&apos;m {siteConfig.fullName}<br />
          most people know me as<br />
          <span className="font-bold text-accent">{siteConfig.agentName}</span>
        </h1>

        {/* 2. Personal Profile Card */}
        <div className="w-full max-w-sm bg-surface/80 border border-border/80 rounded-3xl p-4 sm:p-5 flex items-center gap-4 text-left shadow-resting my-8">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-border shrink-0">
            <Image
              src="/images/ai_gana_portrait.png"
              alt={siteConfig.fullName}
              fill
              priority
              sizes="80px"
              className="object-cover object-top rounded-full"
            />
            <span className="w-4 h-4 rounded-full bg-accent border-2 border-surface absolute bottom-0 right-0 z-10 shadow-sm" />
          </div>
          <div className="flex flex-col text-left justify-center min-w-0">
            <h3 className="font-display font-semibold text-ink text-base sm:text-lg leading-snug truncate">
              {siteConfig.fullName}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-ink-soft mt-1 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
              <span>{siteConfig.responseTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-soft mt-1">
              <MapPin className="w-3.5 h-3.5 text-ink-soft shrink-0" />
              <span>Abuja</span>
            </div>
          </div>
        </div>

        {/* 3. Quote Section */}
        <blockquote className="italic text-ink font-normal text-lg sm:text-xl leading-relaxed max-w-md my-4">
          &ldquo;{siteConfig.heroQuote}&rdquo;
        </blockquote>

        {/* 4. Intro / Tagline Paragraph */}
        <p className="text-ink-soft text-sm sm:text-base leading-relaxed max-w-md mb-8 font-normal">
          {siteConfig.heroTagline}
        </p>

        {/* 5. CTAs - Stacked Full Width Pills */}
        <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-3.5 items-stretch">
          <WhatsAppButton
            source="hero_primary"
            variant="primary"
            className="w-full py-4 text-base font-medium rounded-full justify-center"
            containerClassName="w-full"
          >
            Message Me
          </WhatsAppButton>

          <a
            href="#properties"
            className="w-full inline-flex items-center justify-center font-medium text-accent hover:text-accent-hover bg-transparent hover:bg-accent-soft border border-accent/80 rounded-full py-3.5 text-base transition-colors text-center"
          >
            See Properties
          </a>
        </div>

      </div>
    </section>
  );
};

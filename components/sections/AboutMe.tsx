import React from "react";
import { siteConfig } from "@/lib/config";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Sparkles } from "lucide-react";

export const AboutMe: React.FC = () => {
  const { originStory } = siteConfig;

  return (
    <SectionContainer id="about" surface={true}>
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="bg-bg rounded-lg p-8 sm:p-12 border border-border shadow-resting space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-soft text-accent text-xs font-semibold uppercase tracking-wider">
            About {siteConfig.agentName}
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight leading-tight">
            {originStory.title}
          </h2>

          <div className="space-y-4 text-ink-soft text-base sm:text-lg leading-relaxed">
            {originStory.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Static Callout Card: "People often ask... Why AI GANA?" */}
          <div className="p-6 sm:p-8 rounded-md bg-accent-soft border border-accent/20 space-y-3">
            <div className="flex items-center gap-2 text-accent font-display font-semibold text-lg">
              <Sparkles className="w-5 h-5 shrink-0" />
              <h3>{originStory.calloutTitle}</h3>
            </div>
            <p className="text-ink text-base leading-relaxed">
              {originStory.calloutBody}
            </p>
          </div>

          <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-display font-bold text-ink text-lg">{siteConfig.agentName}</p>
              <p className="text-sm text-ink-soft">{siteConfig.fullName} • Based in {siteConfig.officeLocation}</p>
            </div>
            <WhatsAppButton source="about_section" variant="outline">
              Let&apos;s Chat
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

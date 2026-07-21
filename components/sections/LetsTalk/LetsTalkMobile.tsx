import React from "react";
import { Phone, Mail } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const LetsTalkMobile: React.FC = () => {
  return (
    <SectionContainer id="contact" surface={false}>
      <div className="max-w-xl mx-auto text-center space-y-6 bg-surface rounded-2xl p-6 border border-border shadow-resting">
        
        <div className="space-y-2">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink">
            Tell me what you&apos;re looking for.
          </h2>
          <p className="text-base text-ink-soft leading-relaxed">
            {siteConfig.friendlyNote}
          </p>
        </div>

        {/* Action Buttons: Primary WhatsApp + Secondary Call/Email */}
        <div className="flex flex-col items-center gap-4 pt-2">
          <WhatsAppButton
            source="contact_section_mobile"
            variant="primary"
            showResponseTime={true}
            className="w-full justify-center"
          >
            Chat on WhatsApp
          </WhatsAppButton>

          <div className="flex items-center justify-center gap-3 w-full">
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-border bg-bg hover:bg-accent-soft text-ink-soft hover:text-ink text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4 text-accent" />
              <span>Call Me</span>
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-border bg-bg hover:bg-accent-soft text-ink-soft hover:text-ink text-sm font-medium transition-colors"
            >
              <Mail className="w-4 h-4 text-accent" />
              <span>Email</span>
            </a>
          </div>

        </div>

      </div>
    </SectionContainer>
  );
};

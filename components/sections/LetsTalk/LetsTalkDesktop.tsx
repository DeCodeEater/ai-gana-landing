import React from "react";
import { Phone, Mail } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const LetsTalkDesktop: React.FC = () => {
  return (
    <SectionContainer id="contact" surface={false}>
      <div className="max-w-4xl mx-auto text-center space-y-8 bg-surface rounded-2xl p-14 border border-border shadow-resting">
        
        <div className="space-y-3">
          <h2 className="font-display text-5xl font-bold tracking-tight text-ink">
            Not sure where to start?
          </h2>
          <p className="text-lg text-ink-soft max-w-xl mx-auto leading-relaxed">
            {siteConfig.friendlyNote}
          </p>
        </div>

        {/* Action Buttons: Primary WhatsApp + Secondary Call/Email */}
        <div className="flex flex-col items-center gap-6 pt-2">
          <WhatsAppButton
            source="contact_section"
            variant="primary"
            showResponseTime={true}
          >
            Chat on WhatsApp
          </WhatsAppButton>

          <div className="flex items-center justify-center gap-3">
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-border bg-bg hover:bg-accent-soft text-ink-soft hover:text-ink text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4 text-accent" />
              <span>Call Me</span>
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-border bg-bg hover:bg-accent-soft text-ink-soft hover:text-ink text-sm font-medium transition-colors"
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

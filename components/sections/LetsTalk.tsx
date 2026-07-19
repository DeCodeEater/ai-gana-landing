import React from "react";
import { Phone, Mail, MessageSquare } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const LetsTalk: React.FC = () => {
  return (
    <SectionContainer id="contact" surface={false}>
      <div className="max-w-4xl mx-auto text-center space-y-8 bg-surface rounded-lg p-8 sm:p-14 border border-border shadow-resting">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-soft text-accent text-xs font-semibold uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5" />
          Direct Communication
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink">
          Let&apos;s Talk
        </h2>

        <p className="text-base sm:text-lg text-ink-soft max-w-2xl mx-auto leading-relaxed">
          Have a property question, looking for something specific in Abuja, or just want to chat options? Send a message on WhatsApp or reach out directly.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <WhatsAppButton
            source="contact_section"
            variant="primary"
            showResponseTime={true}
          >
            Let&apos;s Chat
          </WhatsAppButton>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-border bg-bg hover:bg-accent-soft text-ink hover:text-accent text-base font-medium transition-colors shadow-resting"
            >
              <Phone className="w-4 h-4 text-accent" />
              <span>Call</span>
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-border bg-bg hover:bg-accent-soft text-ink hover:text-accent text-base font-medium transition-colors shadow-resting"
            >
              <Mail className="w-4 h-4 text-accent" />
              <span>Email</span>
            </a>
          </div>
        </div>

        <p className="text-xs text-ink-soft pt-4 italic">
          {siteConfig.friendlyNote}
        </p>

        <p className="text-xs text-ink-soft pt-2 border-t border-border">
          Based in {siteConfig.officeLocation} • Direct line to {siteConfig.agentName} ({siteConfig.fullName})
        </p>
      </div>
    </SectionContainer>
  );
};

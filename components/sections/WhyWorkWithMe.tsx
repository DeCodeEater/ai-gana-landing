import React from "react";
import { CheckCircle2, Zap, ShieldCheck, Scale, Compass } from "lucide-react";
import { SectionContainer } from "@/components/ui/SectionContainer";

export const WhyWorkWithMe: React.FC = () => {
  const points = [
    {
      icon: Zap,
      title: "Fast Responses",
      description:
        "You speak directly to me on WhatsApp or phone. No gatekeepers, no waiting days for feedback.",
    },
    {
      icon: ShieldCheck,
      title: "No Pressure",
      description:
        "No endless follow-up calls or aggressive sales tactics. Take the time you need to decide with clarity.",
    },
    {
      icon: Scale,
      title: "Upfront Advice",
      description:
        "I'll give you candid feedback on real market values and property conditions so you know exactly where things stand.",
    },
    {
      icon: Compass,
      title: "Local Expertise",
      description:
        "Deep knowledge of Abuja markets, neighborhood realities, and land values across Maitama, Wuse, Jabi, and Asokoro.",
    },
  ];

  return (
    <SectionContainer id="why-me" surface={false}>
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-soft text-accent text-xs font-semibold uppercase tracking-wider mb-3">
          <CheckCircle2 className="w-3.5 h-3.5" />
          The Direct Approach
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight">
          Why Work With Me
        </h2>
        <p className="text-ink-soft mt-3 text-base sm:text-lg">
          A straightforward, client-first way of navigating Abuja real estate.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {points.map((pt, idx) => {
          const Icon = pt.icon;
          return (
            <div
              key={idx}
              className="bg-surface rounded-md p-8 border border-border shadow-resting hover:shadow-hover hover:-translate-y-1 transition-all duration-250 ease-premium flex items-start gap-5 group"
            >
              <div className="p-3.5 rounded-sm bg-accent-soft border border-accent/20 text-accent group-hover:scale-105 transition-transform shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-xl text-ink">
                  {pt.title}
                </h3>
                <p className="text-ink-soft text-sm sm:text-base leading-relaxed mt-2">
                  {pt.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
};

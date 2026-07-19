import React from "react";
import { Coffee, Laptop, Sparkles } from "lucide-react";
import { SectionContainer } from "@/components/ui/SectionContainer";

export const GetToKnowMe: React.FC = () => {
  return (
    <SectionContainer id="get-to-know-me" surface={true}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-bg rounded-lg p-8 sm:p-12 border border-border shadow-resting space-y-8">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-sm bg-accent-soft text-accent border border-accent/20">
              <Coffee className="w-5 h-5" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight">
              Outside of real estate...
            </h2>
          </div>

          <div className="space-y-4 text-ink-soft text-base sm:text-lg leading-relaxed">
            <p className="font-display font-semibold text-xl text-ink leading-snug">
              When I&apos;m not helping clients find properties in Abuja, I&apos;m usually reading about AI, building software tools, or exploring business strategy.
            </p>
            <p>
              I genuinely enjoy solving complex problems, and I bring that same analytical mindset to helping you make confident, stress-free real estate decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="p-5 rounded-md bg-surface border border-border flex items-start gap-4 shadow-resting">
              <Laptop className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display font-semibold text-ink text-base">Technology & AI</h3>
                <p className="text-sm text-ink-soft mt-1">
                  Exploring software automation, modern tools, and building helpful tech solutions.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-md bg-surface border border-border flex items-start gap-4 shadow-resting">
              <Sparkles className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display font-semibold text-ink text-base">Business & Strategy</h3>
                <p className="text-sm text-ink-soft mt-1">
                  Studying market dynamics, growth models, and clear decision-making frameworks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

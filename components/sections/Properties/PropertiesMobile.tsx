"use client";

import React, { useState } from "react";
import { Property } from "@/lib/data";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ChevronLeft, ChevronRight, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PropertiesProps {
  properties: Property[];
}

export const PropertiesMobile: React.FC<PropertiesProps> = ({ properties: initialProperties }) => {
  const [properties] = useState<Property[]>(initialProperties);
  const [activeFilter, setActiveFilter] = useState<string>("sale");
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const filterOptions = [
    { label: "Sale Listings", value: "sale" },
    { label: "Rental Listings", value: "rent" },
  ];

  const filteredProperties = properties.filter((item) => {
    return item.purpose === activeFilter;
  });

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (activeIndex < filteredProperties.length - 1) setActiveIndex((prev) => prev + 1);
  };

  return (
    <SectionContainer id="properties" surface={true}>
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h2 className="font-display text-3xl font-bold text-ink tracking-tight">
            A few properties worth seeing
          </h2>
          <p className="text-ink-soft mt-1 text-base">
            Browse a few properties I&apos;ve selected. If something catches your eye, I&apos;ll help you take the next step.
          </p>
        </div>

        {filterOptions.length > 1 && (
          <div className="bg-bg border border-border p-1 rounded-full flex w-full relative">
            {filterOptions.map((option) => {
              const isActive = activeFilter === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    setActiveFilter(option.value);
                    setActiveIndex(0);
                  }}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer flex-1 text-center ${
                    isActive ? "text-white" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterBgMobile"
                      className="absolute inset-0 bg-accent rounded-full shadow-cta"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{option.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Properties Display */}
      {filteredProperties.length === 0 ? (
        <div className="bg-bg rounded-2xl border border-border p-6 text-center w-full my-4 shadow-resting space-y-5">
          <div className="w-12 h-12 rounded-xl bg-accent-soft text-accent flex items-center justify-center mx-auto shadow-sm">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-display font-bold text-ink text-xl">
              Nothing here that fits right now
            </h3>
            <p className="text-ink-soft text-xs leading-relaxed">
              I&apos;m always updating my listings, and the right property may not be published yet. Tell me what you&apos;re looking for and I&apos;ll help you find it.
            </p>
          </div>
          <div className="pt-1 flex justify-center w-full">
            <WhatsAppButton
              source="empty_properties_mobile"
              variant="primary"
              className="px-6 py-3 text-xs font-medium rounded-full justify-center w-full shadow-cta"
              containerClassName="w-full"
            >
              Ask AI GANA directly on WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      ) : (
        /* Stacked Deck Carousel */
        <div className="relative w-full flex flex-col items-center">
          {/* Card Stage */}
          <div className="relative w-full h-[460px] flex items-center justify-center overflow-hidden touch-pan-y">
            <AnimatePresence initial={false}>
              {filteredProperties.map((property, idx) => {
                const offset = idx - activeIndex;
                const isActive = idx === activeIndex;

                if (Math.abs(offset) > 1) return null;

                let x = "0%";
                let cardHeight = "100%";
                let opacity = 1;
                let zIndex = 20;

                if (offset === -1) {
                  x = "-35%";
                  cardHeight = "72%";
                  opacity = 0.55;
                  zIndex = 10;
                } else if (offset === 1) {
                  x = "35%";
                  cardHeight = "72%";
                  opacity = 0.55;
                  zIndex = 10;
                }

                return (
                  <motion.div
                    key={property.id}
                    className="absolute w-[88%] max-w-[340px]"
                    style={{
                      top: "50%",
                      y: "-50%",
                    }}
                    initial={false}
                    animate={{
                      x,
                      height: cardHeight,
                      opacity,
                      zIndex,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 26,
                      mass: 0.8,
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.25}
                    onDragEnd={(_e, info) => {
                      const swipeThreshold = 40;
                      if (info.offset.x < -swipeThreshold && activeIndex < filteredProperties.length - 1) {
                        setActiveIndex(activeIndex + 1);
                      } else if (info.offset.x > swipeThreshold && activeIndex > 0) {
                        setActiveIndex(activeIndex - 1);
                      }
                    }}
                    onClick={() => {
                      if (!isActive) setActiveIndex(idx);
                    }}
                  >
                    <div className={`w-full h-full rounded-2xl overflow-hidden ${!isActive ? "cursor-pointer" : ""}`}>
                      <PropertyCard property={property} isActive={isActive} />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Row */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`p-2.5 rounded-full border border-border transition-all ${
                activeIndex === 0
                  ? "opacity-30 cursor-not-allowed bg-transparent"
                  : "bg-surface text-ink shadow-sm"
              }`}
              aria-label="Previous property"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {filteredProperties.map((prop, idx) => (
                <button
                  key={prop.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? "bg-accent scale-125" : "bg-border"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={activeIndex === filteredProperties.length - 1}
              className={`p-2.5 rounded-full border border-border transition-all ${
                activeIndex === filteredProperties.length - 1
                  ? "opacity-30 cursor-not-allowed bg-transparent"
                  : "bg-surface text-ink shadow-sm"
              }`}
              aria-label="Next property"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </SectionContainer>
  );
};

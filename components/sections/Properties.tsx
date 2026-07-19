"use client";

import React, { useState } from "react";
import { Property } from "@/lib/data";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { Building2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PropertiesProps {
  properties: Property[];
}

export const Properties: React.FC<PropertiesProps> = ({ properties }) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const availableTypes = Array.from(new Set(properties.map((p) => p.type)));

  const typeLabels: Record<string, string> = {
    all: "All Properties",
    apartment: "Apartments",
    house: "Houses & Villas",
    land: "Land",
    commercial: "Commercial",
  };

  const filterOptions = [
    { label: "All Properties", value: "all" },
    ...availableTypes.map((type) => ({
      label: typeLabels[type] || type,
      value: type,
    })),
  ];

  const filteredProperties = properties.filter((item) => {
    if (activeFilter === "all") return true;
    return item.type === activeFilter;
  });

  return (
    <SectionContainer id="properties" surface={true}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-soft text-accent text-xs font-semibold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            Featured Listings
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            A Few Places You Might Like
          </h2>
          <p className="text-ink-soft mt-2 text-base sm:text-lg max-w-xl">
            A snapshot of current opportunities available in Abuja. Tap any card to open a direct WhatsApp chat about that specific property.
          </p>
        </div>

        {filterOptions.length > 2 && (
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setActiveFilter(option.value);
                  setActiveIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  activeFilter === option.value
                    ? "bg-accent text-white shadow-cta"
                    : "bg-bg hover:bg-accent-soft text-ink-soft hover:text-accent border border-border"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative w-full h-[550px] sm:h-[650px] flex items-center justify-center overflow-hidden touch-none px-4">
        <AnimatePresence initial={false}>
          {filteredProperties.map((property, idx) => {
            const offset = idx - activeIndex;
            const isActive = idx === activeIndex;

            let x = "0%";
            let scale = 1;
            let opacity = 1;
            let zIndex = 10;

            if (offset === 0) {
              x = "0%";
              scale = 1;
              opacity = 1;
              zIndex = 10;
            } else if (offset === -1) {
              x = "-65%";
              scale = 0.85;
              opacity = 0.3;
              zIndex = 5;
            } else if (offset === 1) {
              x = "65%";
              scale = 0.85;
              opacity = 0.3;
              zIndex = 5;
            } else if (offset < -1) {
              x = "-110%";
              scale = 0.7;
              opacity = 0;
              zIndex = 0;
            } else if (offset > 1) {
              x = "110%";
              scale = 0.7;
              opacity = 0;
              zIndex = 0;
            }

            return (
              <motion.div
                key={property.id}
                className="absolute w-full max-w-sm sm:max-w-md h-[480px] sm:h-[580px]"
                initial={false}
                animate={{
                  x,
                  scale,
                  opacity,
                  zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 28,
                  mass: 0.9,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(e, info) => {
                  const swipeThreshold = 50;
                  if (info.offset.x < -swipeThreshold && activeIndex < filteredProperties.length - 1) {
                    setActiveIndex(activeIndex + 1);
                  } else if (info.offset.x > swipeThreshold && activeIndex > 0) {
                    setActiveIndex(activeIndex - 1);
                  }
                }}
                onClick={() => {
                  if (!isActive) {
                    setActiveIndex(idx);
                  }
                }}
              >
                <div className={`w-full h-full ${!isActive && 'cursor-pointer'} ${!isActive ? 'pointer-events-none' : ''}`}>
                  <PropertyCard property={property} isActive={isActive} />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Pagination indicators */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {filteredProperties.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              idx === activeIndex ? "bg-accent scale-125" : "bg-border hover:bg-ink-soft"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </SectionContainer>
  );
};

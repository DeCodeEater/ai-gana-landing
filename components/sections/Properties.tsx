"use client";

import React, { useState, useEffect } from "react";
import { Property } from "@/lib/data";
import { getAllProperties } from "@/lib/admin-data";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PropertiesProps {
  properties: Property[];
}

export const Properties: React.FC<PropertiesProps> = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [activeFilter, setActiveFilter] = useState<string>("sale");
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    async function fetchFreshData() {
      try {
        const freshProps = await getAllProperties();
        const publishedProps = freshProps.filter(p => p.published !== false);
        setProperties(publishedProps);
      } catch (error) {
        console.error("Failed to fetch fresh properties:", error);
      }
    }
    fetchFreshData();
  }, []);

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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            A Few Places You Might Like
          </h2>
          <p className="text-ink-soft mt-2 text-base sm:text-lg max-w-xl">
            A snapshot of current opportunities available in Abuja. Swipe or tap cards to explore, then tap WhatsApp to inquire.
          </p>
        </div>

        {filterOptions.length > 1 && (
          <div className="bg-bg border border-border p-1 rounded-full flex w-full md:w-fit relative">
            {filterOptions.map((option) => {
              const isActive = activeFilter === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    setActiveFilter(option.value);
                    setActiveIndex(0);
                  }}
                  className={`relative px-4 py-2 sm:px-6 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer flex-1 md:flex-initial text-center ${
                    isActive ? "text-white" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterBg"
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

      {/* Stacked Deck Carousel */}
      <div className="relative w-full flex flex-col items-center">
        {/* Card Stage */}
        <div className="relative w-full h-[480px] sm:h-[500px] flex items-center justify-center overflow-hidden touch-pan-y">
          <AnimatePresence initial={false}>
            {filteredProperties.map((property, idx) => {
              const offset = idx - activeIndex;
              const isActive = idx === activeIndex;

              // Only render cards within visible range
              if (Math.abs(offset) > 1) return null;

              let x = "0%";
              let cardHeight = "100%";
              let opacity = 1;
              let zIndex = 20;

              if (offset === -1) {
                // Previous: shifted left, shorter, behind, vertically centered
                x = "-40%";
                cardHeight = "72%";
                opacity = 0.55;
                zIndex = 10;
              } else if (offset === 1) {
                // Next: shifted right, shorter, behind, vertically centered
                x = "40%";
                cardHeight = "72%";
                opacity = 0.55;
                zIndex = 10;
              }

              return (
                <motion.div
                  key={property.id}
                  className="absolute w-[80%] max-w-[340px] sm:max-w-[380px]"
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
                  <div className={`w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden ${!isActive ? "cursor-pointer" : ""}`}>
                    <PropertyCard property={property} isActive={isActive} />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation Row: Arrows + Dots */}
        <div className="flex items-center justify-center gap-6 mt-6">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className={`p-2.5 rounded-full border border-border transition-all cursor-pointer ${
              activeIndex === 0
                ? "opacity-30 cursor-not-allowed bg-transparent"
                : "bg-surface hover:bg-bg text-ink shadow-sm hover:shadow-md"
            }`}
            aria-label="Previous property"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {filteredProperties.map((prop, idx) => (
              <button
                key={prop.id}
                onClick={() => setActiveIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex ? "bg-accent scale-125" : "bg-border hover:bg-ink-soft"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            disabled={activeIndex === filteredProperties.length - 1}
            className={`p-2.5 rounded-full border border-border transition-all cursor-pointer ${
              activeIndex === filteredProperties.length - 1
                ? "opacity-30 cursor-not-allowed bg-transparent"
                : "bg-surface hover:bg-bg text-ink shadow-sm hover:shadow-md"
            }`}
            aria-label="Next property"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </SectionContainer>
  );
};

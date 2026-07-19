"use client";

import React, { useState } from "react";
import { Property } from "@/lib/data";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { Building2 } from "lucide-react";

interface PropertiesProps {
  properties: Property[];
}

export const Properties: React.FC<PropertiesProps> = ({ properties }) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

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
                onClick={() => setActiveFilter(option.value)}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </SectionContainer>
  );
};

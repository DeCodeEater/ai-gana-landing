"use client";

import React from "react";
import Image from "next/image";
import { Bed, Bath, MapPin } from "lucide-react";
import { Property } from "@/lib/data";
import { WhatsAppButton } from "./WhatsAppButton";
import { motion, AnimatePresence } from "motion/react";

interface PropertyCardProps {
  property: Property;
  isActive?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, isActive = true }) => {
  return (
    <div className={`group bg-surface rounded-2xl sm:rounded-3xl border border-border overflow-hidden transition-all duration-300 flex flex-col h-full ${isActive ? 'shadow-hover' : 'shadow-resting'}`}>
      <div className={`relative w-full overflow-hidden bg-bg transition-all duration-300 ${isActive ? 'h-64 sm:h-72' : 'h-48 sm:h-56'}`}>
        <Image
          src={property.imageUrl}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-premium"
        />
        <div className="absolute top-4 left-4 bg-ink/85 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-accent-soft" />
          <span>{property.location}</span>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between gap-4">
        <div>
          <h3 className="font-display font-semibold text-lg sm:text-xl text-ink leading-snug group-hover:text-accent transition-colors line-clamp-2">
            {property.title}
          </h3>
          <p className="font-display font-bold text-xl sm:text-2xl text-ink mt-2">
            {property.price}
          </p>

          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-5 text-sm text-ink-soft mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-4 h-4 text-ink-soft" />
                    <span>{property.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bath className="w-4 h-4 text-ink-soft" />
                    <span>{property.bathrooms} Baths</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 8 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <WhatsAppButton
                message={property.whatsappMessage}
                source={`property_${property.id}`}
                variant="primary"
                className="w-full justify-center shadow-cta"
              >
                Ask about this property
              </WhatsAppButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

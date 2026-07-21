"use client";

import React from "react";
import Image from "next/image";
import { Bed, Bath, MapPin } from "lucide-react";
import { Property } from "@/lib/data";
import { WhatsAppButton } from "./WhatsAppButton";

interface PropertyCardProps {
  property: Property;
  isActive?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, isActive = true }) => {
  return (
    <div className={`group bg-surface rounded-2xl sm:rounded-3xl border border-border overflow-hidden transition-all duration-300 flex flex-col h-full ${isActive ? 'shadow-hover' : 'shadow-resting'}`}>
      {/* Image — fills entire card when inactive, fixed ratio when active */}
      <div className={`relative w-full overflow-hidden bg-bg ${isActive ? '' : 'flex-1'}`}>
        {isActive ? (
          /* Active: 3:2 aspect ratio — image-dominant */
          <div className="relative w-full aspect-[3/2]">
            <Image
              src={property.imageUrl}
              alt={property.title}
              fill
              sizes="(max-width: 768px) 82vw, 400px"
              className="object-cover"
            />
          </div>
        ) : (
          /* Inactive: image fills entire card, no text */
          <Image
            src={property.imageUrl}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 40vw, 200px"
            className="object-cover"
          />
        )}
        {/* Location badge — only on active card */}
        {isActive && (
          <div className="absolute top-3 left-3 bg-ink/80 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <MapPin className="w-3 h-3 text-accent-soft" />
            <span>{property.location}</span>
          </div>
        )}
      </div>

      {/* Text content — only on active card, compact layout */}
      {isActive && (
        <div className="px-5 pt-4 pb-5 sm:px-6 sm:pt-5 sm:pb-6 flex flex-col gap-3 flex-1">
          <div>
            <h3 className="font-display font-semibold text-base sm:text-lg text-ink leading-snug line-clamp-1">
              {property.title}
            </h3>
            {property.opinion && (
              <p className="text-ink-soft text-sm italic mt-1.5 leading-relaxed">
                {property.opinion}
              </p>
            )}
            <p className="font-display font-bold text-lg sm:text-xl text-ink mt-2">
              {property.price}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs sm:text-sm text-ink-soft pt-2 border-t border-border">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-ink-soft" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-ink-soft" />
              <span>{property.bathrooms} Baths</span>
            </div>
          </div>

          <WhatsAppButton
            message={property.whatsappMessage}
            source={`property_${property.id}`}
            variant="primary"
            className="w-full justify-center text-sm py-2.5 mt-3 sm:mt-4"
            propertyId={property.id}
            propertyTitle={property.title}
          >
            Ask me about this home
          </WhatsAppButton>
        </div>
      )}
    </div>
  );
};

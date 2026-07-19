import React from "react";
import Image from "next/image";
import { Bed, Bath, MapPin } from "lucide-react";
import { Property } from "@/lib/data";
import { WhatsAppButton } from "./WhatsAppButton";

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="group bg-surface rounded-md border border-border overflow-hidden shadow-resting hover:shadow-hover hover:-translate-y-1 transition-all duration-250 ease-premium flex flex-col h-full">
      <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-bg">
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

      <div className="p-6 flex flex-col flex-grow justify-between gap-5">
        <div>
          <h3 className="font-display font-semibold text-xl text-ink leading-snug group-hover:text-accent transition-colors">
            {property.title}
          </h3>
          <p className="font-display font-bold text-2xl text-ink mt-2">
            {property.price}
          </p>

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
        </div>

        <div className="pt-2">
          <WhatsAppButton
            message={property.whatsappMessage}
            source={`property_${property.id}`}
            variant="outline"
            className="w-full justify-center"
          >
            Ask about this property
          </WhatsAppButton>
        </div>
      </div>
    </div>
  );
};

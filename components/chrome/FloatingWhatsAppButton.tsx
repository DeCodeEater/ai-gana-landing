"use client";

import React from "react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const FloatingWhatsAppButton: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <WhatsAppButton
        source="floating_button"
        variant="floating"
      />
    </div>
  );
};

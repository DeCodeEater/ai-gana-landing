import React from "react";
import { StickyCtaBarMobile } from "./StickyCtaBarMobile";

export const StickyCtaBar: React.FC = () => {
  return (
    <div className="block md:hidden">
      <StickyCtaBarMobile />
    </div>
  );
};

import React from "react";
import { HeroDesktop } from "./HeroDesktop";
import { HeroMobile } from "./HeroMobile";

export const Hero: React.FC = () => {
  return (
    <>
      {/* Mobile & Tablet view (isolated) */}
      <div className="block lg:hidden">
        <HeroMobile />
      </div>

      {/* Desktop view (isolated) */}
      <div className="hidden lg:block">
        <HeroDesktop />
      </div>
    </>
  );
};

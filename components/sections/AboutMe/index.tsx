import React from "react";
import { AboutMeDesktop } from "./AboutMeDesktop";
import { AboutMeMobile } from "./AboutMeMobile";

export const AboutMe: React.FC = () => {
  return (
    <>
      <div className="block md:hidden">
        <AboutMeMobile />
      </div>
      <div className="hidden md:block">
        <AboutMeDesktop />
      </div>
    </>
  );
};

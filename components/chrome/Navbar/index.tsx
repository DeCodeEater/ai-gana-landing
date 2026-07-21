import React from "react";
import { NavbarDesktop } from "./NavbarDesktop";
import { NavbarMobile } from "./NavbarMobile";

export const Navbar: React.FC = () => {
  return (
    <>
      {/* Mobile Header (isolated) */}
      <div className="block md:hidden">
        <NavbarMobile />
      </div>

      {/* Desktop Header (isolated) */}
      <div className="hidden md:block">
        <NavbarDesktop />
      </div>
    </>
  );
};

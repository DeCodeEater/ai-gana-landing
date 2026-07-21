import React from "react";
import { FooterDesktop } from "./FooterDesktop";
import { FooterMobile } from "./FooterMobile";

export const Footer: React.FC = () => {
  return (
    <>
      <div className="block md:hidden">
        <FooterMobile />
      </div>
      <div className="hidden md:block">
        <FooterDesktop />
      </div>
    </>
  );
};

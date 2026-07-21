import React from "react";
import { LetsTalkDesktop } from "./LetsTalkDesktop";
import { LetsTalkMobile } from "./LetsTalkMobile";

export const LetsTalk: React.FC = () => {
  return (
    <>
      <div className="block md:hidden">
        <LetsTalkMobile />
      </div>
      <div className="hidden md:block">
        <LetsTalkDesktop />
      </div>
    </>
  );
};

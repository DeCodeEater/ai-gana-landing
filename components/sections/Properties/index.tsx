import React from "react";
import { Property } from "@/lib/data";
import { PropertiesDesktop } from "./PropertiesDesktop";
import { PropertiesMobile } from "./PropertiesMobile";

interface PropertiesProps {
  properties: Property[];
}

export const Properties: React.FC<PropertiesProps> = (props) => {
  return (
    <>
      <div className="block md:hidden">
        <PropertiesMobile {...props} />
      </div>
      <div className="hidden md:block">
        <PropertiesDesktop {...props} />
      </div>
    </>
  );
};

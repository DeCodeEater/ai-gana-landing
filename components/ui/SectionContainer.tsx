import React from "react";

interface SectionContainerProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  surface?: boolean;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  className = "",
  children,
  surface = false,
}) => {
  return (
    <section
      id={id}
      className={`py-16 md:py-28 transition-colors duration-200 ${
        surface ? "bg-surface text-ink" : "bg-bg text-ink"
      } ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
};

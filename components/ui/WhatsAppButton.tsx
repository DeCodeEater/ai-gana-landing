"use client";

import React from "react";
import { buildWhatsAppLink, trackWhatsAppClick } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/config";

interface WhatsAppButtonProps {
  message?: string;
  source: string;
  className?: string;
  containerClassName?: string;
  variant?: "primary" | "secondary" | "outline" | "floating";
  showResponseTime?: boolean;
  children?: React.ReactNode;
}

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2m0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24a8.19 8.19 0 015.82 2.42 8.18 8.18 0 012.41 5.83c.01 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.27" />
  </svg>
);

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  message,
  source,
  className = "",
  containerClassName = "",
  variant = "primary",
  showResponseTime = false,
  children,
}) => {
  const href = buildWhatsAppLink(message);

  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none cursor-pointer select-none rounded-full";

  const variants = {
    primary:
      "bg-accent hover:bg-accent-hover text-white shadow-cta active:scale-[0.98] px-6 py-3.5 text-base gap-2.5",
    secondary:
      "bg-ink hover:bg-ink-soft text-white shadow-resting active:scale-[0.98] px-6 py-3.5 text-base gap-2.5",
    outline:
      "border border-border hover:border-accent bg-surface hover:bg-accent-soft text-ink hover:text-accent shadow-resting px-5 py-2.5 text-sm gap-2 active:scale-[0.98]",
    floating:
      "bg-accent hover:bg-accent-hover text-white shadow-cta p-4 hover:scale-105 active:scale-95 transition-transform",
  };

  const handleClick = () => {
    trackWhatsAppClick(source);
  };

  if (variant === "floating") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Chat on WhatsApp"
        className={`${baseStyles} ${variants.floating} ${className}`}
      >
        <WhatsAppIcon className="w-6 h-6 text-current" />
      </a>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-2 ${containerClassName}`}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        <WhatsAppIcon className="w-5 h-5 text-current shrink-0" />
        <span>{children || "Message Me"}</span>
      </a>
      {showResponseTime && siteConfig.responseTime && (
        <div className="flex items-center gap-2 text-xs text-ink-soft font-medium">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow shrink-0" />
          <span>{siteConfig.responseTime}</span>
        </div>
      )}
    </div>
  );
};

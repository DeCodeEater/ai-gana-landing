"use client";

import React from "react";
import { MessageSquare } from "lucide-react";
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
        <MessageSquare className="w-6 h-6" />
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
        <MessageSquare className="w-5 h-5 fill-current" />
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

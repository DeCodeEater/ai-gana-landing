"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Properties", href: "#properties" },
    { name: "How I Work", href: "#how-i-work" },
    { name: "Get to Know Me", href: "#get-to-know-me" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-bg/85 backdrop-blur-md border-b border-border transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo area - Circular avatar + AI GANA & subtitle */}
        <Link href="/" aria-label="AI GANA Home" className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border shrink-0 shadow-sm">
            <Image
              src={siteConfig.profileImage}
              alt={siteConfig.agentName}
              fill
              sizes="40px"
              className="object-cover object-top"
            />
          </div>
          <div className="flex flex-col text-left leading-none">
            <span className="font-display text-xl font-bold tracking-tight text-accent">
              {siteConfig.agentName}
            </span>
            <span className="text-[10px] uppercase font-semibold text-ink-soft tracking-wider mt-0.5">
              {siteConfig.role}
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-ink-soft hover:text-ink transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <WhatsAppButton source="navbar" variant="outline">
            Chat on WhatsApp
          </WhatsAppButton>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full text-ink hover:bg-surface transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-border px-4 pt-2 pb-6 space-y-4 shadow-hover transition-all duration-200 ease-out">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-ink hover:text-accent py-2 border-b border-border/60"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <WhatsAppButton
              source="navbar_mobile"
              variant="primary"
              className="w-full justify-center"
            >
              Chat on WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      )}
    </header>
  );
};

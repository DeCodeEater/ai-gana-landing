import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const navLinks = [
  { name: "Properties", href: "#properties" },
  { name: "How I Work", href: "#how-i-work" },
  { name: "Get to Know Me", href: "#get-to-know-me" },
  { name: "Contact", href: "#contact" },
];

export const NavbarDesktop: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-bg/85 backdrop-blur-md border-b border-border transition-all">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo area */}
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

        {/* Desktop Navigation Links */}
        <nav className="flex items-center gap-8">
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

        {/* Desktop WhatsApp CTA */}
        <div>
          <WhatsAppButton source="navbar_desktop" variant="outline">
            Chat on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </header>
  );
};

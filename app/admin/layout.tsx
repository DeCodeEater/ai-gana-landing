"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth, signOut } from "@/lib/auth";
import { useRouter, usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  Users,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
    if (!loading && user && !isAdmin && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [user, loading, isAdmin, pathname, router]);

  const handleSignOut = async () => {
    await signOut();
    router.replace("/admin/login");
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg gap-3">
        <div className="w-10 h-10 border-3 border-accent border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-medium text-ink-soft">Authenticating Admin...</span>
      </div>
    );
  }

  // Login page bypass
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Unauthorized guard
  if (!user || !isAdmin) {
    return null;
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
    { name: "Properties", href: "/admin/properties", icon: Building2, exact: false },
    { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare, exact: false },
    { name: "Leads", href: "/admin/leads", icon: Users, exact: false },
    { name: "Settings", href: "/admin/settings", icon: Settings, exact: false },
  ];

  const isActive = (item: typeof navItems[0]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <div className="min-h-screen bg-bg text-ink font-body flex flex-col">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-border shadow-resting">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Left: Brand + Badge */}
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-border shrink-0 shadow-sm">
              <Image
                src={siteConfig.profileImage}
                alt={siteConfig.agentName}
                fill
                sizes="40px"
                className="object-cover object-top"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-ink">
                  {siteConfig.agentName}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-accent bg-accent-soft px-2.5 py-0.5 rounded-full border border-accent/20">
                  Admin
                </span>
              </div>
              <span className="text-xs text-ink-soft hidden sm:inline-block">
                Property Management System
              </span>
            </div>
          </div>

          {/* Center: Desktop Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-bg/80 p-1.5 rounded-full border border-border shadow-inner">
            {navItems.map((item) => {
              const active = isActive(item);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    active
                      ? "bg-accent text-white shadow-sm"
                      : "text-ink-soft hover:text-ink hover:bg-surface"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions & User Info */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-ink-soft hover:text-accent transition-colors bg-surface border border-border px-3.5 py-2 rounded-full shadow-sm"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-ink-soft" />
            </a>

            <div className="h-6 w-px bg-border" />

            <div className="flex items-center gap-3">
              <div className="text-right leading-none">
                <p className="text-xs font-semibold text-ink max-w-[120px] truncate">
                  {user.displayName || "Admin User"}
                </p>
                <p className="text-[10px] text-ink-soft max-w-[120px] truncate mt-0.5">
                  {user.email}
                </p>
              </div>
              <button
                onClick={handleSignOut}
                title="Sign Out"
                className="p-2 text-ink-soft hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                aria-label="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-ink hover:bg-surface transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-surface border-b border-border px-4 pt-3 pb-6 space-y-4 shadow-hover">
            <nav className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const active = isActive(item);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      active
                        ? "bg-accent text-white"
                        : "text-ink hover:bg-bg"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-border flex flex-col gap-3">
              <div className="flex items-center justify-between px-2">
                <div className="text-left">
                  <p className="text-xs font-semibold text-ink">{user.displayName || "Admin User"}</p>
                  <p className="text-[11px] text-ink-soft">{user.email}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 text-xs font-medium text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-full border border-red-200 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-xs font-semibold text-accent bg-accent-soft border border-accent/20 py-2.5 rounded-full"
              >
                <span>Preview Live Landing Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Admin Content Viewport */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>
    </div>
  );
}

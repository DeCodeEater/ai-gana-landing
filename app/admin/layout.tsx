"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
    if (!loading && user && !isAdmin && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [user, loading, isAdmin, pathname, router]);

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Login page renders without the admin shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Not authenticated or not admin
  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-bg text-ink font-body">
      {/* Admin Top Bar */}
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-border shadow-resting">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display text-lg font-bold text-accent">
              AI GANA
            </span>
            <span className="text-xs font-semibold text-ink-soft bg-accent-soft px-2.5 py-0.5 rounded-full">
              Admin Panel
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <a
              href="/admin"
              className={`text-sm font-medium transition-colors ${
                pathname === "/admin" ? "text-accent font-semibold" : "text-ink-soft hover:text-ink"
              }`}
            >
              Dashboard
            </a>
            <a
              href="/admin/properties"
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith("/admin/properties") ? "text-accent font-semibold" : "text-ink-soft hover:text-ink"
              }`}
            >
              Properties
            </a>
            <a
              href="/admin/testimonials"
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith("/admin/testimonials") ? "text-accent font-semibold" : "text-ink-soft hover:text-ink"
              }`}
            >
              Reviews
            </a>
            <a
              href="/admin/leads"
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith("/admin/leads") ? "text-accent font-semibold" : "text-ink-soft hover:text-ink"
              }`}
            >
              Leads
            </a>
            <a
              href="/"
              className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Site ↗
            </a>
          </nav>
        </div>
      </header>

      {/* Admin Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}

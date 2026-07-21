"use client";

import React, { useEffect, useState } from "react";
import { getAllProperties, getLeads } from "@/lib/admin-data";
import type { Property, Lead } from "@/lib/data";
import { useAuth, signOut } from "@/lib/auth";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [props, lds] = await Promise.all([
          getAllProperties(),
          getLeads(),
        ]);
        setProperties(props);
        setLeads(lds);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const recentLeads = leads.slice(0, 5);
  const thisWeekLeads = leads.filter((l) => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(l.timestamp) >= weekAgo;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">
            Welcome back, {user?.displayName?.split(" ")[0] || "Abdullahi"}
          </h1>
          <p className="text-sm text-ink-soft mt-1">
            Overview of property listings and incoming WhatsApp inquiries.
          </p>
        </div>
        <button
          onClick={() => signOut()}
          className="text-xs font-semibold uppercase tracking-wider text-ink-soft hover:text-red-600 transition-colors cursor-pointer self-start sm:self-auto"
        >
          Sign out
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface rounded-2xl border border-border p-6 shadow-resting">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
            Total Properties
          </p>
          <p className="font-display text-3xl font-bold text-ink mt-2">
            {properties.length}
          </p>
          <p className="text-xs text-ink-soft mt-1">
            {properties.filter((p) => p.published !== false).length} published live
          </p>
        </div>

        <div className="bg-surface rounded-2xl border border-border p-6 shadow-resting">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
            Leads This Week
          </p>
          <p className="font-display text-3xl font-bold text-accent mt-2">
            {thisWeekLeads.length}
          </p>
          <p className="text-xs text-ink-soft mt-1">WhatsApp inquiries</p>
        </div>

        <div className="bg-surface rounded-2xl border border-border p-6 shadow-resting">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
            Total Leads
          </p>
          <p className="font-display text-3xl font-bold text-ink mt-2">
            {leads.length}
          </p>
          <p className="text-xs text-ink-soft mt-1">All time recorded</p>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <a
          href="/admin/properties/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-medium text-sm shadow-cta hover:bg-accent-hover active:scale-[0.98] transition-all"
        >
          + Add New Property
        </a>
        <a
          href="/admin/leads"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-surface text-ink font-medium text-sm hover:bg-bg active:scale-[0.98] transition-all"
        >
          View All Leads
        </a>
      </div>

      {/* Recent Leads Activity */}
      <div className="bg-surface rounded-2xl border border-border shadow-resting overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="font-display font-semibold text-ink">
            Recent WhatsApp Inquiries
          </h2>
          <a href="/admin/leads" className="text-xs font-medium text-accent hover:underline">
            See all
          </a>
        </div>
        {recentLeads.length === 0 ? (
          <div className="p-8 text-center text-ink-soft text-sm">
            No leads recorded yet. When visitors tap WhatsApp buttons on the site, they will appear here.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {recentLeads.map((lead, i) => (
              <div key={lead.id || i} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {lead.propertyTitle || "General Inquiry"}
                  </p>
                  <p className="text-xs text-ink-soft mt-0.5">
                    Source: <span className="font-medium text-ink">{lead.source}</span>
                  </p>
                </div>
                <p className="text-xs text-ink-soft">
                  {new Date(lead.timestamp).toLocaleDateString("en-NG", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

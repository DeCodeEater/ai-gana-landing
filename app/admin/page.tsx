"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllProperties, getLeads } from "@/lib/admin-data";
import type { Property, Lead } from "@/lib/data";
import { useAuth } from "@/lib/auth";
import {
  Building2,
  Users,
  CheckCircle2,
  Plus,
  ArrowRight,
  Sparkles,
  ExternalLink,
  MessageSquareText,
} from "lucide-react";

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

  const publishedCount = properties.filter((p) => p.published !== false).length;
  const recentLeads = leads.slice(0, 5);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-ink-soft font-medium">Loading dashboard overview...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome & Overview Header */}
      <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-resting flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-soft text-accent text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Abuja Real Estate Command Center</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">
            Welcome back, {user?.displayName?.split(" ")[0] || "Abdullahi"} 👋
          </h1>
          <p className="text-ink-soft text-sm leading-relaxed">
            Manage your Abuja property listings, monitor incoming WhatsApp inquiries, and control live site content in one place.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/admin/properties/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-medium text-sm shadow-cta hover:bg-accent-hover active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Property</span>
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border bg-surface text-ink hover:bg-bg font-medium text-sm transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-4 h-4 text-ink-soft" />
          </a>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Metric 1 */}
        <div className="bg-surface rounded-2xl border border-border p-6 shadow-resting hover:shadow-hover transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
              Total Properties
            </span>
            <div className="w-10 h-10 rounded-xl bg-accent-soft text-accent flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <p className="font-display text-4xl font-bold text-ink mt-3">
            {properties.length}
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs text-ink-soft">
            <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
            <span>{publishedCount} published live</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface rounded-2xl border border-border p-6 shadow-resting hover:shadow-hover transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
              WhatsApp Inquiries
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <MessageSquareText className="w-5 h-5" />
            </div>
          </div>
          <p className="font-display text-4xl font-bold text-ink mt-3">
            {leads.length}
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs text-ink-soft">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tracked lead interactions</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface rounded-2xl border border-border p-6 shadow-resting hover:shadow-hover transition-shadow sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
              Catalog Health
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <p className="font-display text-4xl font-bold text-ink mt-3">
            {properties.length > 0 ? "100%" : "0%"}
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs text-ink-soft">
            <span>{properties.length > 0 ? "Firestore synced & ready" : "Needs initial listings"}</span>
          </div>
        </div>

      </div>

      {/* Main Grid: Property Overview + Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Property Overview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-ink">
              Property Listings ({properties.length})
            </h2>
            <Link
              href="/admin/properties"
              className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
            >
              <span>Manage all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {properties.length === 0 ? (
            <div className="bg-surface rounded-2xl border border-border p-8 text-center space-y-4 shadow-resting">
              <div className="w-12 h-12 rounded-full bg-accent-soft text-accent flex items-center justify-center mx-auto">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-ink text-base">No properties in database</h3>
                <p className="text-xs text-ink-soft max-w-sm mx-auto mt-1">
                  Add your first Abuja property listing to display it on the live website.
                </p>
              </div>
              <Link
                href="/admin/properties/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white font-medium text-xs shadow-cta hover:bg-accent-hover transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Listing</span>
              </Link>
            </div>
          ) : (
            <div className="bg-surface rounded-2xl border border-border shadow-resting overflow-hidden divide-y divide-border">
              {properties.slice(0, 4).map((property) => (
                <div key={property.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-bg/40 transition-colors">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-bg shrink-0 border border-border">
                      {property.imageUrl ? (
                        <Image
                          src={property.imageUrl}
                          alt={property.title}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-ink-soft text-xs">No img</div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-display font-semibold text-ink text-sm truncate">
                        {property.title}
                      </p>
                      <p className="text-xs text-ink-soft truncate mt-0.5">
                        {property.location} • <span className="font-semibold text-accent">{property.price}</span>
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-bg text-ink-soft border border-border">
                          {property.bedrooms} Beds
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-bg text-ink-soft border border-border">
                          {property.purpose}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        property.published !== false
                          ? "bg-accent-soft text-accent border border-accent/20"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {property.published !== false ? "Live" : "Draft"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column (5 cols): Recent Leads */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-ink">
              Recent Leads
            </h2>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
            >
              <span>View all ({leads.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-surface rounded-2xl border border-border shadow-resting overflow-hidden">
            {recentLeads.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <Users className="w-8 h-8 text-ink-soft/40 mx-auto" />
                <p className="text-xs text-ink-soft font-medium">No recorded WhatsApp leads yet.</p>
                <p className="text-[11px] text-ink-soft/80 max-w-xs mx-auto">
                  When visitors tap WhatsApp CTA buttons on your listings, inquiry logs will appear here.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {recentLeads.map((lead, i) => (
                  <div key={lead.id || i} className="p-4 hover:bg-bg/40 transition-colors space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-ink truncate max-w-[180px]">
                        {lead.propertyTitle || "General Inquiry"}
                      </p>
                      <span className="text-[10px] font-medium text-ink-soft">
                        {new Date(lead.timestamp).toLocaleDateString("en-NG", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="text-[11px] text-ink-soft">
                      Source: <span className="font-semibold text-accent">{lead.source}</span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

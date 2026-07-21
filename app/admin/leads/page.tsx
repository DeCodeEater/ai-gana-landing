"use client";

import React, { useEffect, useState } from "react";
import { getLeads } from "@/lib/admin-data";
import type { Lead } from "@/lib/data";
import { siteConfig } from "@/lib/config";
import {
  Users,
  MessageSquareText,
  Search,
  ExternalLink,
  Clock,
  Calendar,
} from "lucide-react";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getLeads();
        setLeads(data);
      } catch (error) {
        console.error("Failed to load leads:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredLeads = leads.filter(
    (l) =>
      l.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.propertyTitle && l.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-ink-soft font-medium">Loading lead inquiries...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">
            Lead Inquiries ({leads.length})
          </h1>
          <p className="text-sm text-ink-soft mt-1">
            Real-time log of WhatsApp inquiries triggered by visitors across your site.
          </p>
        </div>
      </div>

      {/* Filter / Search */}
      <div className="bg-surface rounded-2xl border border-border p-4 shadow-resting flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-ink-soft absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search leads by source or property..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-bg border border-border text-sm text-ink focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      {/* Leads Table */}
      {filteredLeads.length === 0 ? (
        <div className="bg-surface rounded-2xl border border-border p-12 text-center space-y-3 shadow-resting">
          <Users className="w-10 h-10 text-ink-soft/40 mx-auto" />
          <p className="font-display font-semibold text-ink text-base">No lead inquiries found</p>
          <p className="text-xs text-ink-soft max-w-sm mx-auto">
            {searchQuery
              ? "No leads matched your search query."
              : "When visitors tap WhatsApp CTAs on your property listings or hero section, lead events will log here automatically."}
          </p>
        </div>
      ) : (
        <div className="bg-surface rounded-2xl border border-border shadow-resting overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-bg border-b border-border text-xs uppercase font-semibold text-ink-soft">
                <tr>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Inquiry Source</th>
                  <th className="px-6 py-4">Property Listing</th>
                  <th className="px-6 py-4 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredLeads.map((lead, i) => {
                  const targetMsg = lead.propertyTitle
                    ? `Hi ${siteConfig.agentName}, regarding ${lead.propertyTitle}...`
                    : `Hi ${siteConfig.agentName}, I have an inquiry from the website.`;
                  const waUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(targetMsg)}`;

                  return (
                    <tr key={lead.id || i} className="hover:bg-bg/40 transition-colors">
                      <td className="px-6 py-4 font-medium text-ink whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-accent shrink-0" />
                          <span>
                            {new Date(lead.timestamp).toLocaleDateString("en-NG", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-soft text-accent text-xs font-semibold border border-accent/20">
                          <MessageSquareText className="w-3 h-3" />
                          <span>{lead.source}</span>
                        </span>
                      </td>

                      <td className="px-6 py-4 font-semibold text-ink">
                        {lead.propertyTitle || "General Inquiry"}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent text-white text-xs font-semibold shadow-cta hover:bg-accent-hover transition-all"
                        >
                          <span>Open WhatsApp</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

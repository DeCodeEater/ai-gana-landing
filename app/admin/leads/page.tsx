"use client";

import React, { useEffect, useState } from "react";
import { getLeads } from "@/lib/admin-data";
import type { Lead } from "@/lib/data";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Lead Inquiries</h1>
        <p className="text-sm text-ink-soft">
          Log of every WhatsApp click event recorded on your landing page.
        </p>
      </div>

      {leads.length === 0 ? (
        <div className="bg-surface rounded-2xl border border-border p-12 text-center text-ink-soft">
          <p className="text-base font-medium">No leads logged yet.</p>
          <p className="text-sm mt-1">When visitors tap WhatsApp buttons, click data will appear here in real time.</p>
        </div>
      ) : (
        <div className="bg-surface rounded-2xl border border-border shadow-resting overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-bg border-b border-border text-xs uppercase font-semibold text-ink-soft">
                <tr>
                  <th className="px-6 py-3.5">Date & Time</th>
                  <th className="px-6 py-3.5">Source / Button</th>
                  <th className="px-6 py-3.5">Property Inquired</th>
                  <th className="px-6 py-3.5">Referrer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {leads.map((lead, i) => (
                  <tr key={lead.id || i} className="hover:bg-bg/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-ink whitespace-nowrap">
                      {new Date(lead.timestamp).toLocaleDateString("en-NG", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-1 rounded-full bg-accent-soft text-accent text-xs font-semibold">
                        {lead.source}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-ink">
                      {lead.propertyTitle || "General Inquiry"}
                    </td>
                    <td className="px-6 py-4 text-xs text-ink-soft truncate max-w-[150px]">
                      {lead.referrer}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

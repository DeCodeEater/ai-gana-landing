"use client";

import React, { useEffect, useState } from "react";
import {
  getAllTestimonials,
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
} from "@/lib/admin-data";
import type { Testimonial } from "@/lib/data";
import {
  MessageSquare,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Star,
  CheckCircle2,
} from "lucide-react";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    quote: "",
    source: "manual" as "google" | "manual",
    rating: 5,
    published: true,
  });

  async function loadTestimonials() {
    try {
      const data = await getAllTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error("Failed to load testimonials:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTestimonial(newTestimonial);
      setNewTestimonial({ name: "", quote: "", source: "manual", rating: 5, published: true });
      setShowAddForm(false);
      loadTestimonials();
    } catch (error) {
      console.error("Failed to create testimonial:", error);
    }
  };

  const handleTogglePublish = async (t: Testimonial) => {
    try {
      const nextState = !t.published;
      await updateTestimonial(t.id, { published: nextState });
      setTestimonials((prev) =>
        prev.map((item) => (item.id === t.id ? { ...item, published: nextState } : item))
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete review from "${name}"?`)) return;
    try {
      await deleteTestimonial(id);
      setTestimonials((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-ink-soft font-medium">Loading client reviews...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">
            Client Testimonials & Reviews
          </h1>
          <p className="text-sm text-ink-soft mt-1">
            Manage genuine client feedback displayed on the landing page.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white font-semibold text-sm shadow-cta hover:bg-accent-hover transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? "Close Form" : "Add Review"}</span>
        </button>
      </div>

      {/* Add Review Form */}
      {showAddForm && (
        <form
          onSubmit={handleCreate}
          className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-resting space-y-5"
        >
          <h3 className="font-display font-bold text-ink text-lg border-b border-border pb-3">
            Add Client Testimonial
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                Client Name *
              </label>
              <input
                type="text"
                required
                value={newTestimonial.name}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                placeholder="e.g. Chief Emeka O."
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-ink text-sm focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                Rating
              </label>
              <select
                value={newTestimonial.rating}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-ink text-sm focus:outline-none focus:border-accent"
              >
                <option value={5}>5 Stars ★★★★★</option>
                <option value={4}>4 Stars ★★★★☆</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Review Quote *
            </label>
            <textarea
              required
              rows={3}
              value={newTestimonial.quote}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
              placeholder="What did the client say about finding a home with AI GANA?"
              className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-ink text-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent text-white text-sm font-semibold shadow-cta hover:bg-accent-hover transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save Review</span>
            </button>
          </div>
        </form>
      )}

      {/* List */}
      {testimonials.length === 0 ? (
        <div className="bg-surface rounded-2xl border border-border p-12 text-center space-y-3 shadow-resting">
          <MessageSquare className="w-10 h-10 text-ink-soft/40 mx-auto" />
          <p className="font-display font-semibold text-ink text-base">No reviews added yet</p>
          <p className="text-xs text-ink-soft max-w-sm mx-auto">
            Per UX guidelines, empty review sections will auto-hide on the public website to maintain authenticity.
          </p>
        </div>
      ) : (
        <div className="bg-surface rounded-2xl border border-border shadow-resting overflow-hidden divide-y divide-border">
          {testimonials.map((t) => (
            <div key={t.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-bg/40 transition-colors">
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-3">
                  <span className="font-display font-bold text-ink text-base">{t.name}</span>
                  <div className="flex items-center text-amber-500">
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-ink-soft italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => handleTogglePublish(t)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                    t.published !== false
                      ? "text-emerald-700 bg-emerald-100 hover:bg-emerald-200"
                      : "text-amber-700 bg-amber-100 hover:bg-amber-200"
                  }`}
                >
                  {t.published !== false ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Live</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hidden</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDelete(t.id, t.name)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  title="Delete Review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

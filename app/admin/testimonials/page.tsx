"use client";

import React, { useEffect, useState } from "react";
import { getAllTestimonials, createTestimonial, deleteTestimonial, updateTestimonial } from "@/lib/admin-data";
import type { Testimonial } from "@/lib/data";

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
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Client Reviews</h1>
          <p className="text-sm text-ink-soft">
            Manage feedback and testimonials displayed on the landing page.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white font-medium text-sm shadow-cta hover:bg-accent-hover transition-all cursor-pointer"
        >
          {showAddForm ? "Cancel" : "+ Add Review"}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleCreate} className="bg-surface rounded-2xl border border-border p-6 shadow-resting space-y-4">
          <h3 className="font-display font-semibold text-ink text-lg">Add New Review</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1">
                Client Name *
              </label>
              <input
                type="text"
                required
                value={newTestimonial.name}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                placeholder="e.g. Chief Emeka O."
                className="w-full px-4 py-2 rounded-xl border border-border bg-bg text-ink text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1">
                Rating
              </label>
              <select
                value={newTestimonial.rating}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: Number(e.target.value) })}
                className="w-full px-4 py-2 rounded-xl border border-border bg-bg text-ink text-sm"
              >
                <option value={5}>5 Stars ★★★★★</option>
                <option value={4}>4 Stars ★★★★☆</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1">
              Review Quote *
            </label>
            <textarea
              required
              rows={3}
              value={newTestimonial.quote}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
              placeholder="What did the client say about working with AI GANA?"
              className="w-full px-4 py-2 rounded-xl border border-border bg-bg text-ink text-sm"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-accent text-white text-sm font-medium shadow-cta hover:bg-accent-hover cursor-pointer"
            >
              Save Review
            </button>
          </div>
        </form>
      )}

      {testimonials.length === 0 ? (
        <div className="bg-surface rounded-2xl border border-border p-12 text-center text-ink-soft">
          <p className="text-base font-medium">No reviews added yet.</p>
          <p className="text-sm mt-1">Per UX guidelines, empty review sections will auto-hide on the public site.</p>
        </div>
      ) : (
        <div className="bg-surface rounded-2xl border border-border shadow-resting overflow-hidden divide-y divide-border">
          {testimonials.map((t) => (
            <div key={t.id} className="p-6 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-display font-semibold text-ink">{t.name}</span>
                  <span className="text-xs text-amber-500 font-bold">
                    {"★".repeat(t.rating || 5)}
                  </span>
                </div>
                <p className="text-sm text-ink-soft italic">&ldquo;{t.quote}&rdquo;</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleTogglePublish(t)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    t.published ? "bg-accent-soft text-accent" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {t.published ? "Live" : "Hidden"}
                </button>
                <button
                  onClick={() => handleDelete(t.id, t.name)}
                  className="px-3 py-1 rounded-full text-xs font-semibold text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

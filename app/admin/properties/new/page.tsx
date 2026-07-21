"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createProperty } from "@/lib/admin-data";

export default function NewPropertyPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "Abuja",
    bedrooms: 3,
    bathrooms: 3,
    type: "house" as "house" | "apartment" | "land" | "commercial",
    purpose: "sale" as "sale" | "rent",
    opinion: "",
    imageUrl: "/images/property_maitama.png",
    whatsappMessage: "",
    published: true,
    sortOrder: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const defaultMsg = formData.whatsappMessage || `Hi AI GANA, I'm interested in ${formData.title} in ${formData.location}.`;
      await createProperty({
        ...formData,
        whatsappMessage: defaultMsg,
      });
      router.push("/admin/properties");
    } catch (error) {
      console.error("Failed to create property:", error);
      alert("Failed to save property. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ink">Add Property</h1>
        <a href="/admin/properties" className="text-sm text-ink-soft hover:text-ink">
          &larr; Back to Properties
        </a>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-resting space-y-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
            Property Title *
          </label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Modern 4-Bedroom Villa in Maitama"
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:border-accent text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Price *
            </label>
            <input
              type="text"
              name="price"
              required
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. ₦350,000,000 or ₦12,000,000/year"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:border-accent text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Location *
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Maitama, Abuja"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:border-accent text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Bedrooms
            </label>
            <input
              type="number"
              name="bedrooms"
              min="0"
              value={formData.bedrooms}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:border-accent text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Bathrooms
            </label>
            <input
              type="number"
              name="bathrooms"
              min="0"
              value={formData.bathrooms}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:border-accent text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Purpose
            </label>
            <select
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:border-accent text-sm"
            >
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:border-accent text-sm"
            >
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="land">Land</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
            Agent Personal Opinion / Note
          </label>
          <textarea
            name="opinion"
            rows={2}
            value={formData.opinion}
            onChange={handleChange}
            placeholder="e.g. One of my favourite family homes in Maitama."
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:border-accent text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
            Image Path / URL
          </label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="/images/property_maitama.png"
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:border-accent text-sm"
          />
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-border">
          <a
            href="/admin/properties"
            className="px-5 py-2.5 rounded-full border border-border bg-bg text-ink-soft hover:text-ink text-sm font-medium"
          >
            Cancel
          </a>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 rounded-full bg-accent text-white font-medium text-sm shadow-cta hover:bg-accent-hover disabled:opacity-50 cursor-pointer"
          >
            {submitting ? "Saving..." : "Save Property"}
          </button>
        </div>
      </form>
    </div>
  );
}

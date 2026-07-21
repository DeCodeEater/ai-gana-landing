"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createProperty, uploadPropertyImage } from "@/lib/admin-data";
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Building2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function NewPropertyPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("/images/property_maitama.png");

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "Maitama, Abuja",
    bedrooms: 4,
    bathrooms: 4,
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview immediately
    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);
    setUploadingImage(true);

    try {
      const downloadUrl = await uploadPropertyImage(file);
      setFormData((prev) => ({ ...prev, imageUrl: downloadUrl }));
      setImagePreview(downloadUrl);
    } catch (error) {
      console.error("Failed to upload image to Firebase Storage:", error);
      alert("Failed to upload image. You can still enter an image URL manually.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const defaultMsg =
        formData.whatsappMessage ||
        `Hi AI GANA, I saw the ${formData.title} in ${formData.location} on your website and I'd like more details.`;
      
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
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/properties"
            className="p-2 rounded-full border border-border bg-surface text-ink-soft hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-ink">Add New Property</h1>
            <p className="text-xs text-ink-soft">Create a new listing in Cloud Firestore</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Basic Information */}
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-resting space-y-5">
          <h2 className="font-display font-bold text-lg text-ink flex items-center gap-2 border-b border-border pb-3">
            <Building2 className="w-5 h-5 text-accent" />
            <span>Listing Overview</span>
          </h2>

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
              className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:border-accent text-sm"
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
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:border-accent text-sm font-semibold text-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                Location / District *
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Maitama, Abuja"
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:border-accent text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
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
        </div>

        {/* Section 2: Property Image */}
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-resting space-y-5">
          <h2 className="font-display font-bold text-lg text-ink flex items-center gap-2 border-b border-border pb-3">
            <ImageIcon className="w-5 h-5 text-accent" />
            <span>Listing Photography</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* Preview Box */}
            <div className="sm:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden bg-bg border border-border shadow-inner flex items-center justify-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Property preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-ink-soft">No image selected</span>
              )}
              {uploadingImage && (
                <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm flex flex-col items-center justify-center text-white text-xs gap-2">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Uploading to Firebase...</span>
                </div>
              )}
            </div>

            {/* Upload Controls */}
            <div className="sm:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-2">
                  Upload Image File (Firebase Storage)
                </label>
                <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-border hover:border-accent rounded-xl cursor-pointer bg-bg hover:bg-accent-soft/30 transition-colors text-xs font-semibold text-ink-soft hover:text-accent">
                  <Upload className="w-4 h-4" />
                  <span>Choose Photo to Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1">
                  Or Paste Direct Image URL
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => {
                    handleChange(e);
                    setImagePreview(e.target.value);
                  }}
                  placeholder="/images/property_maitama.png"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:border-accent text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Agent Callout & WhatsApp Message */}
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-resting space-y-5">
          <h2 className="font-display font-bold text-lg text-ink flex items-center gap-2 border-b border-border pb-3">
            <Sparkles className="w-5 h-5 text-accent" />
            <span>Agent Note & WhatsApp Trigger</span>
          </h2>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Personal Agent Opinion / Note
            </label>
            <textarea
              name="opinion"
              rows={2}
              value={formData.opinion}
              onChange={handleChange}
              placeholder="e.g. One of my favourite family homes in Maitama — exceptional light and security."
              className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:border-accent text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Prefilled WhatsApp Inquiry Message
            </label>
            <input
              type="text"
              name="whatsappMessage"
              value={formData.whatsappMessage}
              onChange={handleChange}
              placeholder={`Hi AI GANA, I saw the ${formData.title || "property"} in ${formData.location || "Abuja"} on your website...`}
              className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:border-accent text-sm"
            />
            <p className="text-[11px] text-ink-soft mt-1">
              This text is automatically pre-filled when visitors tap &ldquo;Ask about this property&rdquo; on WhatsApp.
            </p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Link
            href="/admin/properties"
            className="px-6 py-3 rounded-full border border-border bg-surface text-ink-soft hover:text-ink text-sm font-medium transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting || uploadingImage}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-accent text-white font-semibold text-sm shadow-cta hover:bg-accent-hover active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{submitting ? "Publishing to Firestore..." : "Publish Property"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getPropertyById, updateProperty, uploadPropertyImage } from "@/lib/admin-data";
import type { Property } from "@/lib/data";
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Building2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

function EditPropertyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [formData, setFormData] = useState<Omit<Property, "id" | "createdAt">>({
    title: "",
    price: "",
    location: "",
    bedrooms: 0,
    bathrooms: 0,
    type: "house",
    purpose: "sale",
    opinion: "",
    imageUrl: "",
    whatsappMessage: "",
    published: true,
    sortOrder: 0,
  });

  useEffect(() => {
    async function fetchProp() {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const prop = await getPropertyById(id);
        if (prop) {
          setFormData({
            title: prop.title || "",
            price: prop.price || "",
            location: prop.location || "",
            bedrooms: prop.bedrooms || 0,
            bathrooms: prop.bathrooms || 0,
            type: prop.type || "house",
            purpose: prop.purpose || "sale",
            opinion: prop.opinion || "",
            imageUrl: prop.imageUrl || "",
            whatsappMessage: prop.whatsappMessage || "",
            published: prop.published !== false,
            sortOrder: prop.sortOrder || 0,
          });
          setImagePreview(prop.imageUrl || "");
        }
      } catch (error) {
        console.error("Failed to load property for edit:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProp();
  }, [id]);

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

    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);
    setUploadingImage(true);

    try {
      const downloadUrl = await uploadPropertyImage(file);
      setFormData((prev) => ({ ...prev, imageUrl: downloadUrl }));
      setImagePreview(downloadUrl);
    } catch (error) {
      console.error("Failed to upload image to Firebase Storage:", error);
      alert("Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSubmitting(true);
    try {
      await updateProperty(id, formData);
      router.push("/admin/properties");
    } catch (error) {
      console.error("Failed to update property:", error);
      alert("Failed to update property. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-ink-soft font-medium">Loading property details...</p>
      </div>
    );
  }

  if (!id) {
    return (
      <div className="bg-surface rounded-2xl border border-border p-8 text-center space-y-4">
        <p className="text-sm font-semibold text-red-600">No property ID specified for editing.</p>
        <Link href="/admin/properties" className="text-xs font-semibold text-accent hover:underline">
          Return to Properties List
        </Link>
      </div>
    );
  }

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
            <h1 className="font-display text-2xl font-bold text-ink">Edit Property</h1>
            <p className="text-xs text-ink-soft">Update property listing details in Firestore</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Overview */}
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
                placeholder="e.g. ₦350,000,000"
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

        {/* Media */}
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-resting space-y-5">
          <h2 className="font-display font-bold text-lg text-ink flex items-center gap-2 border-b border-border pb-3">
            <ImageIcon className="w-5 h-5 text-accent" />
            <span>Listing Photography</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
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

            <div className="sm:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-2">
                  Upload New Photo
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
                  Or Edit Image URL
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => {
                    handleChange(e);
                    setImagePreview(e.target.value);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:border-accent text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Agent Note & WhatsApp */}
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
              className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:border-accent text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Prefilled WhatsApp Message
            </label>
            <input
              type="text"
              name="whatsappMessage"
              value={formData.whatsappMessage}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:border-accent text-sm"
            />
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
            <span>{submitting ? "Saving Changes..." : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default function EditPropertyPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-ink-soft font-medium">Loading edit form...</p>
        </div>
      }
    >
      <EditPropertyForm />
    </Suspense>
  );
}

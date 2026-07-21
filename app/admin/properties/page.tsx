"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAllProperties, deleteProperty, updateProperty } from "@/lib/admin-data";
import type { Property } from "@/lib/data";
import {
  Plus,
  Search,
  Building2,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  Bed,
  Bath,
  MapPin,
  Tag,
  CheckCircle2,
} from "lucide-react";

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  async function loadProperties() {
    try {
      const data = await getAllProperties();
      setProperties(data);
    } catch (error) {
      console.error("Failed to load properties:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProperties();
  }, []);

  const handleTogglePublish = async (prop: Property) => {
    try {
      const nextState = !prop.published;
      await updateProperty(prop.id, { published: nextState });
      setProperties((prev) =>
        prev.map((p) => (p.id === prop.id ? { ...p, published: nextState } : p))
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await deleteProperty(id);
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete property:", error);
    }
  };

  // Filter properties by search query and type
  const filteredProperties = properties.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || p.type.toLowerCase() === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-ink-soft font-medium">Loading property listings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Title & Add Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">
            Properties Management
          </h1>
          <p className="text-sm text-ink-soft mt-1">
            Create, edit, publish, and delete Abuja property listings in real time.
          </p>
        </div>
        <Link
          href="/admin/properties/new"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-semibold text-sm shadow-cta hover:bg-accent-hover active:scale-[0.98] transition-all"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Property</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-surface rounded-2xl border border-border p-4 shadow-resting flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-ink-soft absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-bg border border-border text-sm text-ink focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {["all", "villa", "apartment", "house", "penthouse"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedType === type
                  ? "bg-accent text-white shadow-sm"
                  : "bg-bg text-ink-soft hover:text-ink border border-border"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Properties Grid */}
      {filteredProperties.length === 0 ? (
        <div className="bg-surface rounded-2xl border border-border p-12 text-center space-y-4 shadow-resting">
          <div className="w-12 h-12 rounded-full bg-accent-soft text-accent flex items-center justify-center mx-auto">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <p className="font-display font-semibold text-ink text-base">No properties found</p>
            <p className="text-xs text-ink-soft mt-1">
              {searchQuery ? "Try adjusting your search query or filter criteria." : "Create your first property listing to get started."}
            </p>
          </div>
          {!searchQuery && (
            <Link
              href="/admin/properties/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white font-medium text-xs shadow-cta hover:bg-accent-hover transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Property</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProperties.map((prop) => (
            <div
              key={prop.id}
              className="bg-surface rounded-2xl border border-border overflow-hidden shadow-resting hover:shadow-hover transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image & Badges Overlay */}
                <div className="relative w-full aspect-[16/10] bg-bg overflow-hidden border-b border-border">
                  {prop.imageUrl ? (
                    <img
                      src={prop.imageUrl}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-ink-soft text-xs">
                      No Image Available
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />

                  {/* Top Left Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-surface/90 backdrop-blur-md text-ink border border-white/20 shadow-sm">
                      {prop.type || "Property"}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-accent text-white shadow-sm">
                      {prop.purpose || "Listing"}
                    </span>
                  </div>

                  {/* Top Right Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md border shadow-sm ${
                        prop.published !== false
                          ? "bg-emerald-500/90 text-white border-emerald-400"
                          : "bg-amber-500/90 text-white border-amber-400"
                      }`}
                    >
                      {prop.published !== false ? "Live" : "Draft"}
                    </span>
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="font-display font-bold text-lg text-white drop-shadow-md">
                      {prop.price}
                    </span>
                  </div>
                </div>

                {/* Content Info */}
                <div className="p-5 space-y-3">
                  <h3 className="font-display font-bold text-ink text-base leading-snug line-clamp-1">
                    {prop.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-ink-soft">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span className="truncate">{prop.location}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Bed className="w-3.5 h-3.5 text-ink-soft shrink-0" />
                      <span>{prop.bedrooms} Bed</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Bath className="w-3.5 h-3.5 text-ink-soft shrink-0" />
                      <span>{prop.bathrooms} Bath</span>
                    </span>
                  </div>

                  {prop.opinion && (
                    <p className="text-xs text-ink-soft bg-accent-soft/40 border border-accent/10 p-3 rounded-xl line-clamp-2 italic">
                      &ldquo;{prop.opinion}&rdquo;
                    </p>
                  )}
                </div>
              </div>

              {/* Card Bottom Actions */}
              <div className="px-5 py-3.5 bg-bg/50 border-t border-border flex items-center justify-between gap-3">
                <button
                  onClick={() => handleTogglePublish(prop)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                    prop.published !== false
                      ? "text-emerald-700 bg-emerald-100 hover:bg-emerald-200"
                      : "text-amber-700 bg-amber-100 hover:bg-amber-200"
                  }`}
                >
                  {prop.published !== false ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Published</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Draft</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/properties/edit?id=${prop.id}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-ink-soft hover:text-accent p-2 rounded-full hover:bg-surface transition-colors"
                    title="Edit Property"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => handleDelete(prop.id, prop.title)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors"
                    title="Delete Property"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

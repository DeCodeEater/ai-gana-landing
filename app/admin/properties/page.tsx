"use client";

import React, { useEffect, useState } from "react";
import { getAllProperties, deleteProperty, updateProperty } from "@/lib/admin-data";
import type { Property } from "@/lib/data";
import Image from "next/image";

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

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
          <h1 className="font-display text-2xl font-bold text-ink">Properties</h1>
          <p className="text-sm text-ink-soft">
            Manage your Abuja property listings.
          </p>
        </div>
        <a
          href="/admin/properties/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white font-medium text-sm shadow-cta hover:bg-accent-hover transition-all"
        >
          + Add Property
        </a>
      </div>

      {properties.length === 0 ? (
        <div className="bg-surface rounded-2xl border border-border p-12 text-center text-ink-soft">
          <p className="text-base font-medium">No properties found.</p>
          <p className="text-sm mt-1">Click &quot;Add Property&quot; to create your first listing.</p>
        </div>
      ) : (
        <div className="bg-surface rounded-2xl border border-border shadow-resting overflow-hidden">
          <div className="divide-y divide-border">
            {properties.map((prop) => (
              <div
                key={prop.id}
                className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-bg/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-bg border border-border shrink-0">
                    <Image
                      src={prop.imageUrl || "/images/property_maitama.png"}
                      alt={prop.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-semibold text-ink text-base">
                        {prop.title}
                      </h3>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          prop.purpose === "sale"
                            ? "bg-accent-soft text-accent"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {prop.purpose}
                      </span>
                    </div>
                    <p className="text-xs text-ink-soft mt-0.5">
                      {prop.location} &bull; {prop.price} &bull; {prop.bedrooms} Bed, {prop.bathrooms} Bath
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-border">
                  <button
                    onClick={() => handleTogglePublish(prop)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                      prop.published
                        ? "bg-accent-soft text-accent hover:bg-accent/20"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {prop.published ? "Published" : "Draft"}
                  </button>
                  <button
                    onClick={() => handleDelete(prop.id, prop.title)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  getSiteSettings,
  updateSiteSettings,
  uploadSiteImage,
} from "@/lib/admin-data";
import { siteConfig as defaultSiteConfig, type SiteConfig } from "@/lib/config";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";
import {
  Settings,
  Upload,
  Save,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  User,
  Phone,
  Share2,
  Loader2,
  RefreshCw,
} from "lucide-react";

export default function AdminSettingsPage() {
  const { refreshConfig } = useSiteConfig();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingAbout, setUploadingAbout] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState<SiteConfig>(defaultSiteConfig);

  useEffect(() => {
    async function loadSettings() {
      try {
        const dynamicSettings = await getSiteSettings();
        if (dynamicSettings) {
          setFormData((prev) => ({
            ...prev,
            ...dynamicSettings,
            socialLinks: {
              ...prev.socialLinks,
              ...(dynamicSettings.socialLinks || {}),
            },
          }));
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
        setErrorMessage("Failed to load existing settings.");
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }));
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingHero(true);
    setErrorMessage("");
    try {
      const imageUrl = await uploadSiteImage(file, "hero_profile");
      setFormData((prev) => ({ ...prev, profileImage: imageUrl }));
    } catch (err) {
      console.error("Hero image upload failed:", err);
      setErrorMessage("Failed to upload Hero image. Please try again.");
    } finally {
      setUploadingHero(false);
    }
  };

  const handleAboutImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAbout(true);
    setErrorMessage("");
    try {
      const imageUrl = await uploadSiteImage(file, "about_photo");
      setFormData((prev) => ({ ...prev, aboutImage: imageUrl }));
    } catch (err) {
      console.error("About image upload failed:", err);
      setErrorMessage("Failed to upload About photo. Please try again.");
    } finally {
      setUploadingAbout(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    setErrorMessage("");

    try {
      await updateSiteSettings(formData);
      await refreshConfig();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error("Failed to save settings:", err);
      setErrorMessage("Failed to save site settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
        <p className="text-xs text-ink-soft font-medium">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl pb-16">
      {/* Header */}
      <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-resting flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-wider mb-1">
            <Settings className="w-4 h-4" />
            <span>Site Configuration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink">
            Site Images & Branding Settings
          </h1>
          <p className="text-sm text-ink-soft mt-1">
            Upload profile photos and manage your public contact details across the website.
          </p>
        </div>
      </div>

      {/* Save Notifications */}
      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">
            Settings updated successfully! Changes are live on the website.
          </span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Profile & Section Images */}
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-resting space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="p-2 rounded-lg bg-accent-soft text-accent">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-ink">
                App & Profile Images
              </h2>
              <p className="text-xs text-ink-soft">
                Upload new photos for the Hero section and About Me section.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Hero Profile Image */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-ink">
                Hero Profile Photo
              </label>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-bg shadow-inner flex items-center justify-center group">
                <Image
                  src={formData.profileImage}
                  alt="Hero Profile Preview"
                  fill
                  className="object-cover"
                />
                {uploadingHero && (
                  <div className="absolute inset-0 bg-ink/50 backdrop-blur-xs flex flex-col items-center justify-center text-white gap-2">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="text-xs font-medium">Uploading...</span>
                  </div>
                )}
              </div>
              <div>
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white text-xs font-semibold hover:bg-accent/90 transition-colors shadow-sm w-full justify-center">
                  {uploadingHero ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  <span>{uploadingHero ? "Uploading..." : "Upload New Hero Photo"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleHeroImageUpload}
                    disabled={uploadingHero}
                  />
                </label>
                <p className="text-[11px] text-ink-soft mt-1.5 text-center">
                  Recommended ratio: 4:5 portrait photo.
                </p>
              </div>
            </div>

            {/* About Me Photo */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-ink">
                About Me Section Photo
              </label>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-bg shadow-inner flex items-center justify-center group">
                <Image
                  src={formData.aboutImage || "/images/ai_gana_balcony.png"}
                  alt="About Me Photo Preview"
                  fill
                  className="object-cover"
                />
                {uploadingAbout && (
                  <div className="absolute inset-0 bg-ink/50 backdrop-blur-xs flex flex-col items-center justify-center text-white gap-2">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="text-xs font-medium">Uploading...</span>
                  </div>
                )}
              </div>
              <div>
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white text-xs font-semibold hover:bg-accent/90 transition-colors shadow-sm w-full justify-center">
                  {uploadingAbout ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  <span>{uploadingAbout ? "Uploading..." : "Upload New About Photo"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAboutImageUpload}
                    disabled={uploadingAbout}
                  />
                </label>
                <p className="text-[11px] text-ink-soft mt-1.5 text-center">
                  Recommended ratio: 3:4 portrait photo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Identity & Tagline */}
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-resting space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="p-2 rounded-lg bg-accent-soft text-accent">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-ink">
                Personal Identity & Tagline
              </h2>
              <p className="text-xs text-ink-soft">
                Your full name, brand name, and introductory headlines.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                Brand / Short Name
              </label>
              <input
                type="text"
                name="agentName"
                value={formData.agentName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                Full Legal Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                Professional Role / Designation
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                Tagline / Summary
              </label>
              <textarea
                name="tagline"
                rows={2}
                value={formData.tagline}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Contact & Communication */}
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-resting space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="p-2 rounded-lg bg-accent-soft text-accent">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-ink">
                Contact & Communication
              </h2>
              <p className="text-xs text-ink-soft">
                WhatsApp number, phone, email, and location.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                WhatsApp Number (International format without +)
              </label>
              <input
                type="text"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                placeholder="2348149912055"
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                Display Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+234 814 991 2055"
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                Office Location
              </label>
              <input
                type="text"
                name="officeLocation"
                value={formData.officeLocation}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Social Links */}
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-resting space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="p-2 rounded-lg bg-accent-soft text-accent">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-ink">
                Social Media Links
              </h2>
              <p className="text-xs text-ink-soft">
                Official social profile links connected across the site.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                Instagram Profile URL
              </label>
              <input
                type="url"
                name="instagram"
                value={formData.socialLinks.instagram}
                onChange={handleSocialChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                Facebook Page URL
              </label>
              <input
                type="url"
                name="facebook"
                value={formData.socialLinks.facebook}
                onChange={handleSocialChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                TikTok Profile URL
              </label>
              <input
                type="url"
                name="tiktok"
                value={formData.socialLinks.tiktok}
                onChange={handleSocialChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm"
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            type="submit"
            disabled={saving || uploadingHero || uploadingAbout}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent/90 transition-all shadow-md disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            <span>{saving ? "Saving Changes..." : "Save Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { siteConfig as defaultSiteConfig, type SiteConfig } from "@/lib/config";
import { getSiteSettings } from "@/lib/admin-data";

interface SiteConfigContextType {
  config: SiteConfig;
  refreshConfig: () => Promise<void>;
  loading: boolean;
}

const SiteConfigContext = createContext<SiteConfigContextType>({
  config: defaultSiteConfig,
  refreshConfig: async () => {},
  loading: true,
});

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(defaultSiteConfig);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const dynamicSettings = await getSiteSettings();
      if (dynamicSettings) {
        setConfig((prev) => ({
          ...prev,
          ...dynamicSettings,
          socialLinks: {
            ...prev.socialLinks,
            ...(dynamicSettings.socialLinks || {}),
          },
          originStory: {
            ...prev.originStory,
            ...(dynamicSettings.originStory || {}),
          },
          howIWork: {
            ...prev.howIWork,
            ...(dynamicSettings.howIWork || {}),
          },
        }));
      }
    } catch (err) {
      console.error("Failed to load dynamic site settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    getSiteSettings()
      .then((dynamicSettings) => {
        if (isMounted && dynamicSettings) {
          setConfig((prev) => ({
            ...prev,
            ...dynamicSettings,
            socialLinks: {
              ...prev.socialLinks,
              ...(dynamicSettings.socialLinks || {}),
            },
            originStory: {
              ...prev.originStory,
              ...(dynamicSettings.originStory || {}),
            },
            howIWork: {
              ...prev.howIWork,
              ...(dynamicSettings.howIWork || {}),
            },
          }));
        }
      })
      .catch((err) => console.error("Failed to load dynamic site settings:", err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SiteConfigContext.Provider
      value={{
        config,
        refreshConfig: fetchSettings,
        loading,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => useContext(SiteConfigContext);

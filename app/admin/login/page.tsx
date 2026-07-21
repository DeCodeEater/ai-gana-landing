"use client";

import React, { useEffect, useState } from "react";
import { useAuth, signInWithGoogle, isAdminEmail } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    if (!loading && user && isAdmin) {
      router.replace("/admin");
    }
  }, [user, loading, isAdmin, router]);

  const handleSignIn = async () => {
    setError("");
    setSigningIn(true);
    try {
      const result = await signInWithGoogle();
      if (!isAdminEmail(result.user.email)) {
        setError("This Google account is not authorized to access the admin panel.");
        setSigningIn(false);
        return;
      }
      router.replace("/admin");
    } catch (err) {
      console.error("Sign-in failed:", err);
      setError("Sign-in failed. Please try again.");
      setSigningIn(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4 py-12">
      <div className="w-full max-w-sm bg-surface rounded-2xl border border-border shadow-resting p-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="font-display text-xl font-bold text-accent">AI GANA</span>
          <h1 className="font-display text-2xl font-bold text-ink">
            Admin Login
          </h1>
          <p className="text-sm text-ink-soft">
            Sign in with your authorized Google account.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 leading-relaxed">
            {error}
          </div>
        )}

        <button
          onClick={handleSignIn}
          disabled={signingIn}
          className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full border border-border bg-bg hover:bg-surface text-ink font-medium text-sm transition-all hover:shadow-hover active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>{signingIn ? "Signing in..." : "Sign in with Google"}</span>
        </button>

        <p className="text-xs text-ink-soft text-center leading-relaxed">
          Access restricted to authorized team members.
        </p>
      </div>
    </div>
  );
}

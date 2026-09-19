"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AccountMenu() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showLoginOverlay, setShowLoginOverlay] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const supabase = createClient();

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setLoading(false);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setShowAccountMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function signInWithGoogle() {
    if (signingIn) return;

    setSigningIn(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Google sign-in error:", error);
      setSigningIn(false);
    }
  }

  async function signOut() {
    if (signingOut) return;

    setSigningOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      setSigningOut(false);
      return;
    }

    setShowAccountMenu(false);
    window.location.reload();
  }

  function closeLoginOverlay() {
    if (!signingIn) {
      setShowLoginOverlay(false);
    }
  }

  if (loading) {
    return (
      <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 animate-pulse" />
    );
  }

  const avatarUrl =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    null;

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "MedicSim User";

  return (
    <>
      {/* LOGIN BUTTON */}
      {!user && (
        <button
          type="button"
          onClick={() => setShowLoginOverlay(true)}
          className="group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-200 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-white hover:shadow-indigo-500/10 active:translate-y-0 active:scale-[0.96] focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

          <span className="relative h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)] transition-all duration-300 group-hover:scale-125 group-hover:bg-indigo-300" />

          <span className="relative">Log in</span>

          <span className="relative text-gray-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-indigo-300">
            →
          </span>
        </button>
      )}

      {/* LOGGED IN */}
      {user && (
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setShowAccountMenu(!showAccountMenu)}
            className="group flex cursor-pointer items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            aria-label="Open account menu"
            aria-expanded={showAccountMenu}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="h-9 w-9 rounded-full object-cover border border-white/20 shadow-lg transition-all duration-300 group-hover:border-indigo-400/60 group-hover:scale-105 group-hover:shadow-indigo-500/20 group-active:scale-95"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-black transition-all duration-300 group-hover:scale-105 group-hover:bg-indigo-500 group-active:scale-95">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </button>

          {showAccountMenu && (
            <div className="absolute right-0 top-12 z-[100] w-56 origin-top-right animate-[accountMenuIn_0.18s_ease-out] rounded-2xl border border-white/10 bg-[#0f1626] p-2 shadow-2xl shadow-black/40">
              <div className="mb-1 border-b border-white/5 px-3 py-3">
                <p className="truncate text-sm font-bold text-white">
                  {displayName}
                </p>

                {user.email && (
                  <p className="mt-0.5 truncate text-[11px] text-gray-500">
                    {user.email}
                  </p>
                )}
              </div>

              <Link
                href="/dashboard"
                onClick={() => setShowAccountMenu(false)}
                className="group flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold text-gray-300 transition-all duration-200 hover:bg-white/5 hover:pl-4 hover:text-white active:scale-[0.98]"
              >
                <span>Performance Dashboard</span>
                <span className="text-gray-600 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-indigo-400">
                  →
                </span>
              </Link>

              <button
                type="button"
                onClick={signOut}
                disabled={signingOut}
                className="group flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-bold text-red-400 transition-all duration-200 hover:bg-red-500/5 hover:pl-4 hover:text-red-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>{signingOut ? "Logging out..." : "Log out"}</span>

                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* LOGIN OVERLAY */}
      {showLoginOverlay && !user && (
        <div
          className="login-overlay fixed inset-0 z-[200] flex cursor-pointer items-center justify-center bg-black/70 p-5"
          onClick={closeLoginOverlay}
        >
          <div
            className="login-modal relative w-full max-w-md cursor-default rounded-3xl border border-white/10 bg-[#0c111d]/95 p-7 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-9"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE */}
            <button
              type="button"
              onClick={closeLoginOverlay}
              disabled={signingIn}
              className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/5 text-lg text-gray-400 transition-all duration-200 hover:rotate-90 hover:bg-white/10 hover:text-white active:scale-90 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Close login"
            >
              ×
            </button>

            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl shadow-indigo-500/20 transition-transform duration-500 hover:scale-105 hover:rotate-2">
                <svg
                  className="h-7 w-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>

              <h2 className="mt-5 text-2xl font-black text-white">
                Continue to MedicSim
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                Sign in with Google to save your completed consultations and
                access your performance dashboard across devices.
              </p>
            </div>

            {/* GOOGLE */}
            <button
              type="button"
              onClick={signInWithGoogle}
              disabled={signingIn}
              className="group relative mt-7 flex w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-black shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-xl active:translate-y-0 active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/[0.04] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              {signingIn ? (
                <span className="relative h-5 w-5 animate-spin rounded-full border-2 border-black/20 border-t-black" />
              ) : (
                <svg
                  className="relative h-5 w-5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="#4285F4"
                    d="M21.35 12.23c0-.79-.07-1.55-.22-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.5Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M6.54 13.59A5.85 5.85 0 0 1 6.23 12c0-.55.11-1.09.31-1.59V7.88H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.12l3.24-2.53Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 6.38c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.48 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.38l3.24 2.53C7.31 8.1 9.46 6.38 12 6.38Z"
                  />
                </svg>
              )}

              <span className="relative">
                {signingIn ? "Connecting..." : "Continue with Google"}
              </span>

              {!signingIn && (
                <span className="relative text-gray-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-black">
                  →
                </span>
              )}
            </button>

            {/* CONTINUE WITHOUT ACCOUNT */}
            <button
              type="button"
              onClick={() => setShowLoginOverlay(false)}
              disabled={signingIn}
              className="mt-3 w-full cursor-pointer rounded-xl py-3 text-xs font-bold text-gray-400 transition-all duration-200 hover:bg-white/[0.03] hover:text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue without an account
            </button>

            <p className="mt-5 text-center text-[10px] leading-relaxed text-gray-600">
              You can still use MedicSim without signing in. Sign in when you
              want your completed consultation results saved to your account.
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes overlayIn {
          from {
            opacity: 0;
            backdrop-filter: blur(0px);
          }

          to {
            opacity: 1;
            backdrop-filter: blur(12px);
          }
        }

        @keyframes modalMorphIn {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.92);
            filter: blur(8px);
          }

          60% {
            opacity: 1;
            transform: translateY(-3px) scale(1.015);
            filter: blur(0);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes accountMenuIn {
          from {
            opacity: 0;
            transform: translateY(-5px) scale(0.97);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .login-overlay {
          animation: overlayIn 0.3s ease-out forwards;
        }

        .login-modal {
          animation: modalMorphIn 0.45s cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }
      `}</style>
    </>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AccountMenu() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showLoginOverlay, setShowLoginOverlay] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
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
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Google sign-in error:", error);
    }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      return;
    }

    setShowAccountMenu(false);
    window.location.reload();
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
          onClick={() => setShowLoginOverlay(true)}
          className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-200 shadow-lg backdrop-blur-md transition-all duration-200 hover:border-indigo-400/30 hover:bg-indigo-500/10 hover:text-white hover:-translate-y-0.5 active:scale-95"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
          Log in
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">
            
          </span>
        </button>
      )}

      {/* LOGGED IN */}
      {user && (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowAccountMenu(!showAccountMenu)}
            className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            aria-label="Open account menu"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-9 h-9 rounded-full object-cover border border-white/20 shadow-lg"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-black">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </button>

          {showAccountMenu && (
            <div className="absolute right-0 top-12 w-56 rounded-2xl bg-[#0f1626] border border-white/10 shadow-2xl p-2 z-[100]">
              <div className="px-3 py-3 border-b border-white/5 mb-1">
                <p className="text-sm font-bold text-white truncate">
                  {displayName}
                </p>

                {user.email && (
                  <p className="text-[11px] text-gray-500 truncate mt-0.5">
                    {user.email}
                  </p>
                )}
              </div>

              <Link
                href="/dashboard"
                onClick={() => setShowAccountMenu(false)}
                className="block px-3 py-2.5 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                Performance Dashboard
              </Link>

              <button
                onClick={signOut}
                className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      )}

      {/* LOGIN OVERLAY */}
      {showLoginOverlay && !user && (
        <div
          className="login-overlay fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-5"
          onClick={() => setShowLoginOverlay(false)}
        >
          <div
            className="login-modal w-full max-w-md rounded-3xl border border-white/10 bg-[#0c111d]/95 p-7 sm:p-9 shadow-2xl shadow-black/50 backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLoginOverlay(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
              aria-label="Close login"
            >
              ×
            </button>

            <div className="text-center">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/20">
                <svg
                  className="w-7 h-7 text-white"
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

              <h2 className="text-2xl font-black text-white mt-5">
                Continue to MedicSim
              </h2>

              <p className="text-sm text-gray-400 leading-relaxed mt-2">
                Sign in with Google to save your completed consultations and
                access your performance dashboard across devices.
              </p>
            </div>

            <button
              onClick={signInWithGoogle}
              className="group w-full mt-7 bg-white hover:bg-gray-100 text-black rounded-xl px-5 py-3.5 font-bold text-sm transition-all duration-200 active:scale-[0.98] hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path fill="#4285F4" d="M21.35 12.23c0-.79-.07-1.55-.22-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z" />
                <path fill="#34A853" d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.5Z" />
                <path fill="#FBBC05" d="M6.54 13.59A5.85 5.85 0 0 1 6.23 12c0-.55.11-1.09.31-1.59V7.88H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.12l3.24-2.53Z" />
                <path fill="#EA4335" d="M12 6.38c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.48 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.38l3.24 2.53C7.31 8.1 9.46 6.38 12 6.38Z" />
              </svg>

              Continue with Google

              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </button>

            <button
              onClick={() => setShowLoginOverlay(false)}
              className="w-full mt-3 py-3 text-xs font-bold text-gray-400 hover:text-white transition-colors"
            >
              Continue without an account
            </button>

            <p className="text-[10px] text-gray-600 text-center mt-5 leading-relaxed">
              You can still use MedicSim without signing in. Sign in when you
              want your completed consultation results saved to your account.
            </p>
          </div>
        </div>
      )}

      {/* LOGIN ANIMATIONS */}
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
            transform: translateY(-3px) scale(1.015);
            filter: blur(0);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .login-overlay {
          animation: overlayIn 0.3s ease-out forwards;
        }

        .login-modal {
          animation: modalMorphIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  );
}
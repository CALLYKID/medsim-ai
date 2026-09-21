"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import ThemeSelector from "./ThemeSelector";

export default function AccountMenu() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showLoginOverlay, setShowLoginOverlay] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuPosition, setMenuPosition] = useState({
    top: 78,
    right: 20,
  });

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
  }, []);

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

  function updateMenuPosition() {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    const menuWidth =
      window.innerWidth >= 640 ? 380 : Math.min(window.innerWidth - 32, 380);

    const right = Math.max(
      16,
      window.innerWidth - rect.right
    );

    let calculatedRight = right;

    if (window.innerWidth < 640) {
      calculatedRight = 16;
    }

    if (calculatedRight + menuWidth > window.innerWidth - 8) {
      calculatedRight = 8;
    }

    setMenuPosition({
      top: rect.bottom + 10,
      right: calculatedRight,
    });
  }

  useEffect(() => {
    if (!showAccountMenu) return;

    updateMenuPosition();

    function handleResize() {
      updateMenuPosition();
    }

    function handleScroll() {
      updateMenuPosition();
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [showAccountMenu]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setShowAccountMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!showAccountMenu) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowAccountMenu(false);
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showAccountMenu]);

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
      <div className="h-9 w-9 animate-pulse rounded-full border border-white/10 bg-white/5" />
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
      {!user && (
        <button
          type="button"
          onClick={() => setShowLoginOverlay(true)}
          className="group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-200 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:bg-[var(--primary)]/10 hover:text-white active:scale-[0.96] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
        >
          <span className="relative z-10 flex items-center gap-2">
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 17l5-5-5-5"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H3"
              />
            </svg>
            Sign In
          </span>

          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </button>
      )}

      {user && (
        <div className="relative z-[99999]">
          <button
            ref={buttonRef}
            type="button"
            onClick={() => {
              if (!showAccountMenu) {
                updateMenuPosition();
              }

              setShowAccountMenu((value) => !value);
            }}
            className={`group flex cursor-pointer items-center gap-2 rounded-full outline-none transition-all duration-300 ${
              showAccountMenu
                ? "ring-2 ring-[var(--primary)]/50 ring-offset-2 ring-offset-[var(--background)]"
                : "hover:ring-2 hover:ring-[var(--primary)]/30 hover:ring-offset-2 hover:ring-offset-[var(--background)]"
            }`}
            aria-label="Open account menu"
            aria-expanded={showAccountMenu}
          >
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/15 bg-gradient-to-br from-[var(--primary)]/30 to-white/5 shadow-lg">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm font-black text-white">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[var(--background)] bg-emerald-400" />
            </div>
          </button>
        </div>
      )}

      {mounted &&
        user &&
        showAccountMenu &&
        createPortal(
          <div
            ref={menuRef}
            className="account-menu-scroll fixed z-[999999] w-[calc(100vw-2rem)] max-w-[380px] overflow-y-auto overscroll-contain rounded-3xl border border-white/[0.09] bg-[var(--card)]/98 p-3 shadow-[0_30px_100px_rgba(0,0,0,0.7)] backdrop-blur-2xl animate-[accountMenuIn_0.22s_cubic-bezier(0.16,1,0.3,1)] sm:w-[380px] sm:p-4"
            style={{
              top: `${
  window.innerWidth < 640
    ? Math.min(menuPosition.top, window.innerHeight - 620)
    : menuPosition.top
}px`,
              right: `${menuPosition.right}px`,
              maxHeight: "calc(100dvh - 90px)",
            }}
          >
            {/* PROFILE */}
            <div className="mb-3 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.035]">
              <div className="relative overflow-hidden px-4 py-4">
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--primary)]/10 blur-3xl" />

                <div className="relative flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[var(--primary)]/30 to-white/5">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={displayName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-lg font-black text-white">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full border-2 border-[var(--card)] bg-emerald-400" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-white">
                      {displayName}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-gray-400">
                      {user.email}
                    </p>

                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                        Signed in
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* DASHBOARD */}
            <Link
              href="/dashboard"
              onClick={() => setShowAccountMenu(false)}
              className="group mb-2 flex w-full items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-4 py-3.5 text-left transition-all duration-200 hover:border-[var(--primary)]/25 hover:bg-[var(--primary)]/10"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.04] text-gray-300 transition-colors group-hover:border-[var(--primary)]/20 group-hover:text-[var(--primary)]">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13h4v8H3zM10 3h4v18h-4zM17 8h4v13h-4z"
                  />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-gray-100">
                  Performance Dashboard
                </p>
                <p className="mt-0.5 text-[11px] text-gray-500">
                  View your clinical performance
                </p>
              </div>

              <svg
                className="h-4 w-4 text-gray-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[var(--primary)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>

            {/* APPEARANCE */}
            <div className="mb-2 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-3.5">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05]">
                  <svg
                    className="h-4 w-4 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2M19 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                    />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-200">
                    Appearance
                  </p>
                  <p className="text-[10px] text-gray-500">
                    Choose your clinical environment
                  </p>
                </div>
              </div>

              <ThemeSelector />
            </div>

            {/* LOGOUT */}
            <button
              type="button"
              onClick={signOut}
              disabled={signingOut}
              className="group flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-red-500/10 bg-red-500/[0.025] px-4 py-3.5 text-left transition-all duration-200 hover:border-red-500/25 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/10 bg-red-500/[0.05] text-red-400 transition-colors group-hover:bg-red-500/10">
                {signingOut ? (
                  <svg
                    className="h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="20 40"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 17l5-5-5-5"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12H3"
                    />
                  </svg>
                )}
              </div>

              <div className="flex-1">
                <p className="text-sm font-bold text-gray-200">
                  {signingOut ? "Signing out..." : "Log out"}
                </p>
                <p className="mt-0.5 text-[11px] text-gray-500">
                  Sign out of your MedicSim account
                </p>
              </div>
            </button>
          </div>,
          document.body
        )}

      {mounted &&
        showLoginOverlay &&
        !user &&
        createPortal(
          <div
            className="login-overlay fixed inset-0 z-[1000000] flex cursor-pointer items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-md sm:p-6"
            onClick={closeLoginOverlay}
          >
            <div
              className="login-modal relative w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.09] bg-[var(--card)] shadow-[0_30px_100px_rgba(0,0,0,0.7)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[var(--primary)]/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />

              <div className="relative p-6 sm:p-8">
                <button
                  type="button"
                  onClick={closeLoginOverlay}
                  disabled={signingIn}
                  className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Close login"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6l12 12M18 6L6 18"
                    />
                  </svg>
                </button>

                <div className="mb-7 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--primary)]/20 bg-[var(--primary)]/10 shadow-lg shadow-[var(--primary)]/10">
                    <svg
                      className="h-8 w-8 text-[var(--primary)]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v18M3 12h18"
                      />
                      <circle cx="12" cy="12" r="8.5" />
                    </svg>
                  </div>

                  <h2 className="text-2xl font-black tracking-tight text-white">
                    Welcome to MedicSim
                  </h2>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-400">
                    Sign in to save your completed consultations and track your
                    clinical performance across devices.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={signInWithGoogle}
                  disabled={signingIn}
                  className="group relative flex w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.1] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {signingIn ? (
                    <>
                      <svg
                        className="h-5 w-5 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="20 40"
                        />
                      </svg>
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#4285F4"
                          d="M21.35 12.2c0-.7-.06-1.37-.18-2.02H12v3.82h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.19Z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 21.67c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.29v2.53A9.74 9.74 0 0 0 12 21.67Z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M6.54 13.77A5.86 5.86 0 0 1 6.23 12c0-.62.11-1.22.31-1.77V7.7H3.29A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.06 1.04 4.3l3.25-2.53Z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 6.2c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.3 14.63 2.33 12 2.33a9.74 9.74 0 0 0-8.71 5.37l3.25 2.53C7.31 7.92 9.46 6.2 12 6.2Z"
                        />
                      </svg>

                      <span>Continue with Google</span>
                    </>
                  )}

                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </button>

                <div className="my-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/[0.07]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-600">
                    Or
                  </span>
                  <div className="h-px flex-1 bg-white/[0.07]" />
                </div>

                <button
                  type="button"
                  onClick={() => setShowLoginOverlay(false)}
                  className="flex w-full cursor-pointer items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-400 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.05] hover:text-white"
                >
                  Continue without an account
                </button>

                <p className="mt-5 text-center text-[10px] leading-5 text-gray-600">
                  You can use MedicSim without signing in. Sign in only when
                  you want your completed results saved and synced.
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}

      <style jsx>{`
        @keyframes accountMenuIn {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.96);
            filter: blur(4px);
          }

          60% {
            opacity: 1;
            transform: translateY(1px) scale(1.01);
            filter: blur(0);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes overlayIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes modalMorphIn {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.94);
            filter: blur(6px);
          }

          60% {
            opacity: 1;
            transform: translateY(-2px) scale(1.01);
            filter: blur(0);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .account-menu-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .account-menu-scroll::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }

        .login-overlay {
          animation: overlayIn 0.25s ease-out forwards;
        }

        .login-modal {
          animation: modalMorphIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }
      `}</style>
    </>
  );
}
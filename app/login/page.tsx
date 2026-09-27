"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  async function signInWithGoogle() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Google sign-in error:", error);
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--text)]">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-220px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[var(--primary)]/15 blur-[120px]" />
        <div className="absolute bottom-[-250px] left-[-150px] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] shadow-lg">
  <img
    src="/favicon.ico"
    alt="MedicSim"
    className="h-7 w-7 object-contain"
  />
</div>

          <div>
            <div className="font-bold tracking-tight">MedicSim</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
              Clinical OSCE Engine
            </div>
          </div>
        </Link>

        <Link
          href="/"
          className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-[var(--muted)] transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
        >
          Back to home
        </Link>
      </header>

      {/* Main */}
      <section className="relative z-10 flex min-h-[calc(100vh-96px)] items-center justify-center px-6 pb-16">
        <div className="w-full max-w-md">

          {/* Badge */}
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-4 py-2 text-xs font-medium text-[var(--primary)]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--primary)]" />
              Medicsim Login Page
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-7 shadow-2xl backdrop-blur-2xl sm:p-9">

            {/* Heading */}
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome back.
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[var(--muted)]">
                Sign in to access your MedicSim dashboard, track your
                performance and continue developing your clinical reasoning.
              </p>
            </div>

            {/* Google button */}
            <button
              onClick={signInWithGoogle}
              disabled={loading}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-white px-5 py-3.5 font-semibold text-black shadow-lg transition hover:bg-gray-100 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                  Connecting...
                </>
              ) : (
                <>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      fill="#4285F4"
                      d="M21.35 12.27c0-.78-.07-1.53-.22-2.27H12v4.3h5.23a4.47 4.47 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.92-4.18 2.92-7.4z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.74 9.74 0 0 0 12 21.75z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M6.54 13.85a5.86 5.86 0 0 1 0-3.7V7.63H3.3a9.75 9.75 0 0 0 0 8.74l3.24-2.52z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 6.12c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.84 3.18 14.63 2.25 12 2.25a9.74 9.74 0 0 0-8.7 5.38l3.24 2.52C7.31 7.84 9.46 6.12 12 6.12z"
                    />
                  </svg>

                  Continue with Google
                </>
              )}
            </button>

            {/* Benefits */}
            <div className="mt-8 space-y-3">
              <Benefit
                icon="↗"
                title="Performance tracking"
                text="See your scores and clinical progress over time."
              />

              <Benefit
                icon="◈"
                title="Personalised insights"
                text="Keep your learning points and areas for improvement."
              />

              <Benefit
                icon="✓"
                title="Synced across devices"
                text="Your completed consultations follow your account."
              />
            </div>

            {/* Divider */}
            <div className="my-7 h-px bg-white/10" />

            <p className="text-center text-xs leading-5 text-[var(--muted)]">
              By continuing, you agree to use MedicSim for educational
              purposes. Your active consultation conversations are not
              stored as chat history.
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-center gap-5 text-xs text-[var(--muted)]">
            <Link
              href="/privacy"
              className="transition hover:text-white"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-white"
            >
              Terms
            </Link>

            <span>© {new Date().getFullYear()} MedicSim</span>
          </div>
        </div>
      </section>
    </main>
  );
}

function Benefit({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-black/10 p-3.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-sm font-bold text-[var(--primary)]">
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-xs leading-5 text-[var(--muted)]">
          {text}
        </p>
      </div>
    </div>
  );
}
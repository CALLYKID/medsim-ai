"use client";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();

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

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-white">
          MedicSim
        </h1>

        <p className="mt-2 text-gray-400">
          Sign in to continue
        </p>

        <button
          onClick={signInWithGoogle}
          className="mt-8 w-full rounded-lg bg-white px-4 py-3 font-semibold text-black transition hover:bg-gray-200"
        >
          Continue with Google
        </button>
      </div>
    </main>
  );
}
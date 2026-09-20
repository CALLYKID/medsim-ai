"use client";

import Link from "next/link";

export default function PrivacyPage() {
return (
<main className="min-h-screen bg-[#070a12] text-white">
<div className="pointer-events-none fixed inset-0 overflow-hidden">
<div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl" />
<div className="absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-purple-600/5 blur-3xl" />
</div>

  <div className="relative mx-auto max-w-4xl px-6 py-8 sm:py-12">
    {/* HEADER */}
    <header className="mb-12 flex items-center justify-between">
      <Link
        href="/"
        className="group flex cursor-pointer items-center gap-2"
      >
        <span className="text-xl font-black tracking-tight">
          Medic<span className="text-indigo-400">Sim</span>
        </span>

        <span className="text-gray-600 transition-transform duration-200 group-hover:-translate-x-1">
          ←
        </span>
      </Link>

      <Link
        href="/"
        className="cursor-pointer rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold text-gray-300 transition-all duration-200 hover:border-indigo-400/30 hover:bg-indigo-500/10 hover:text-white active:scale-95"
      >
        Home
      </Link>
    </header>

    {/* TITLE */}
    <div className="mb-10">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/[0.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-indigo-300">
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
        Legal
      </div>

      <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
        Privacy Policy
      </h1>

      <p className="mt-4 text-sm text-gray-500">
        Last updated: September 20, 2026
      </p>

      <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-400">
        MedicSim ("MedicSim", "we", "us", or "our") is an educational
        clinical simulation platform designed to help users practise
        clinical reasoning, history taking, examination skills, and
        diagnostic decision-making.
      </p>
    </div>

    {/* POLICY */}
    <div className="space-y-5">
      <PolicySection title="1. Information We Collect">
        <h3>Account information</h3>

        <p>
          If you sign in using Google, we may receive basic account
          information from Google, such as:
        </p>

        <ul>
          <li>Your name</li>
          <li>Your email address</li>
          <li>Your Google profile picture</li>
        </ul>

        <p>
          We use this information to create and manage your MedicSim
          account.
        </p>

        <h3>Consultation results</h3>

        <p>
          When you complete a MedicSim consultation while signed in, we
          may store summary information associated with your account,
          including:
        </p>

        <ul>
          <li>Patient/case name used by the simulation</li>
          <li>Correct diagnosis</li>
          <li>Final score</li>
          <li>Category</li>
          <li>Specialty</li>
          <li>Severity</li>
          <li>Difficulty</li>
          <li>Learning points</li>
          <li>Red flags</li>
          <li>Date and time of completion</li>
        </ul>

        <h3>Information we do not store</h3>

        <p>
          MedicSim is designed so that your live consultation conversation
          is not permanently stored as chat history.
        </p>

        <p>
          Temporary information used during an active consultation is used
          to operate the simulation and is not intended to become part of
          your permanent account history.
        </p>
      </PolicySection>

      <PolicySection title="2. How We Use Your Information">
        <p>We use information to:</p>

        <ul>
          <li>Provide and maintain your MedicSim account</li>
          <li>Save completed consultation results</li>
          <li>Display your performance history and dashboard</li>
          <li>Synchronise your completed results across devices</li>
          <li>Improve the reliability and functionality of MedicSim</li>
          <li>Protect the platform from misuse or security issues</li>
        </ul>

        <p>
          We do not need your account information to provide every feature
          of MedicSim. You may use supported features without signing in,
          although completed results may not be saved to an account.
        </p>
      </PolicySection>

      <PolicySection title="3. Google Sign-In">
        <p>
          MedicSim uses Google authentication for account sign-in.
        </p>

        <p>
          When you choose to sign in with Google, authentication is handled
          through Google's authentication services. MedicSim receives the
          account information made available through that authentication
          process.
        </p>

        <p>Your Google password is not provided to MedicSim.</p>
      </PolicySection>

      <PolicySection title="4. Database and Service Providers">
        <p>
          MedicSim uses third-party services to operate the platform,
          including services for authentication, database storage, hosting,
          and application delivery.
        </p>

        <p>
          These services may process information on MedicSim's behalf where
          necessary to provide the platform.
        </p>
      </PolicySection>

      <PolicySection title="5. Data Security">
        <p>
          We take reasonable measures to protect account and
          consultation-result information from unauthorised access,
          alteration, or disclosure.
        </p>

        <p>
          However, no online service can guarantee absolute security.
        </p>
      </PolicySection>

      <PolicySection title="6. Data Retention">
        <p>
          Account information and completed consultation results may remain
          associated with your account while your account is active.
        </p>

        <p>
          We may retain information where reasonably necessary for
          security, legal, or operational purposes.
        </p>
      </PolicySection>

      <PolicySection title="7. Your Choices">
        <p>
          You can choose whether to create or use a MedicSim account.
        </p>

        <p>
          If you do not sign in, MedicSim can still be used where the
          relevant functionality is available, but your completed
          consultation history will not be associated with an account for
          cross-device access.
        </p>

        <p>
          If you want to request access, correction, or deletion of
          information associated with your MedicSim account, you can contact
          us using the contact information provided on the MedicSim website.
        </p>
      </PolicySection>

      <PolicySection title="8. Children's Privacy">
        <p>
          MedicSim is an educational platform. Users should only create an
          account where they are permitted to do so under applicable laws
          and the terms of the services used to authenticate their account.
        </p>

        <p>
          If you are under the applicable age for independently providing
          consent to data processing in your country, you should use
          MedicSim with the involvement of a parent or guardian where
          required.
        </p>
      </PolicySection>

      <PolicySection title="9. Changes to This Privacy Policy">
        <p>
          We may update this Privacy Policy when MedicSim's features,
          services, or legal requirements change.
        </p>

        <p>
          The updated version will be published on this page with a new
          "Last updated" date.
        </p>
      </PolicySection>

      <PolicySection title="10. Contact">
        <p>
          If you have questions about this Privacy Policy or how your
          information is handled, please contact MedicSim through the
          contact method provided on the website.
        </p>
      </PolicySection>
    </div>

    {/* DISCLAIMER */}
    <div className="mt-8 rounded-2xl border border-indigo-500/15 bg-indigo-500/[0.04] p-6">
      <p className="text-xs leading-6 text-gray-400">
        <span className="font-bold text-indigo-300">Important: </span>
        MedicSim is an educational simulation platform and is not a
        substitute for professional medical education, supervision,
        diagnosis, or treatment.
      </p>
    </div>

    {/* BACK HOME */}
    <div className="mt-10 border-t border-white/5 pt-8 text-center">
      <Link
        href="/"
        className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-xs font-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-500 active:scale-95"
      >
        ← Back to MedicSim
      </Link>
    </div>
  </div>
</main>

);
}

function PolicySection({
title,
children,
}: {
title: string;
children: React.ReactNode;
}) {
return (
<section className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 shadow-lg shadow-black/5 transition-colors duration-200 hover:border-white/[0.11] sm:p-7">
<h2 className="text-base font-black text-white sm:text-lg">{title}</h2>

  <div className="mt-5 space-y-4 text-sm leading-7 text-gray-400 [&_h3]:pt-2 [&_h3]:text-sm [&_h3]:font-bold [&_h3]:text-gray-200 [&_li]:ml-5 [&_li]:list-disc">
    {children}
  </div>
</section>

);
}
"use client";

import Link from "next/link";

export default function TermsPage() {
return (
<main className="min-h-screen bg-[#070a12] text-white">
<div className="pointer-events-none fixed inset-0 overflow-hidden">
<div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-600/10 blur-3xl" />
<div className="absolute top-1/2 -right-40 h-80 w-80 rounded-full bg-indigo-600/5 blur-3xl" />
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
        className="cursor-pointer rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold text-gray-300 transition-all duration-200 hover:border-purple-400/30 hover:bg-purple-500/10 hover:text-white active:scale-95"
      >
        Home
      </Link>
    </header>

    {/* TITLE */}
    <div className="mb-10">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/[0.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-purple-300">
        <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
        Legal
      </div>

      <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
        Terms of Service
      </h1>

      <p className="mt-4 text-sm text-gray-500">
        Last updated: September 20, 2026
      </p>

      <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-400">
        Welcome to MedicSim. By accessing or using MedicSim, you agree to
        these Terms of Service.
      </p>
    </div>

    {/* TERMS */}
    <div className="space-y-5">
      <TermsSection title="1. About MedicSim">
        <p>
          MedicSim is an educational clinical simulation platform designed
          to provide practice with clinical reasoning, history taking,
          examination skills, and diagnostic decision-making.
        </p>

        <p>
          MedicSim is intended for educational and simulation purposes.
        </p>
      </TermsSection>

      <TermsSection title="2. Educational Use Only">
        <p>MedicSim does not provide real medical care.</p>

        <p>
          Information, cases, diagnoses, scores, feedback, and other
          content provided by MedicSim are part of an educational
          simulation and should not be treated as:
        </p>

        <ul>
          <li>Medical diagnosis</li>
          <li>Medical advice</li>
          <li>Medical treatment</li>
          <li>A substitute for a qualified healthcare professional</li>
          <li>A substitute for supervised clinical training</li>
        </ul>

        <p>
          You should not use MedicSim to make decisions about a real
          person's medical care.
        </p>
      </TermsSection>

      <TermsSection title="3. Accounts">
        <p>
          Certain features, including saving completed consultation results
          and accessing your performance dashboard across devices, require
          an account.
        </p>

        <p>
          You are responsible for maintaining the security of your account
          and for activity performed through your account.
        </p>

        <p>
          Authentication may be provided through third-party services such
          as Google.
        </p>
      </TermsSection>

      <TermsSection title="4. Acceptable Use">
        <p>You agree not to:</p>

        <ul>
          <li>
            Attempt to gain unauthorised access to MedicSim or its systems
          </li>
          <li>
            Interfere with the operation or security of the platform
          </li>
          <li>
            Attempt to access another user's account or information
          </li>
          <li>
            Use the platform to distribute malicious software
          </li>
          <li>
            Abuse, overload, or intentionally disrupt the service
          </li>
          <li>
            Reverse engineer or circumvent security measures where
            prohibited by law
          </li>
          <li>Use MedicSim for unlawful purposes</li>
        </ul>
      </TermsSection>

      <TermsSection title="5. Consultation Results">
        <p>
          When you complete a simulation while signed in, MedicSim may
          save a summary of your result to your account.
        </p>

        <p>
          This may include your score, diagnosis, case information,
          learning points, and other performance information described in
          our Privacy Policy.
        </p>

        <p>
          MedicSim does not intend to permanently store your live
          consultation chat history.
        </p>
      </TermsSection>

      <TermsSection title="6. Accuracy of Simulations">
        <p>
          Clinical simulations are simplified educational scenarios.
        </p>

        <p>
          Although we aim to make cases useful and accurate, MedicSim does
          not guarantee that every simulation, diagnosis, clinical
          explanation, score, or educational recommendation will always be
          complete, current, or error-free.
        </p>

        <p>
          Users should verify important medical information using
          appropriate professional and educational sources.
        </p>
      </TermsSection>

      <TermsSection title="7. Intellectual Property">
        <p>
          Unless otherwise stated, MedicSim and its associated software,
          design, branding, content, interfaces, and original materials
          are owned by or licensed to MedicSim.
        </p>

        <p>
          You may use the platform for its intended educational purpose.
        </p>

        <p>
          You may not reproduce, redistribute, sell, or commercially
          exploit MedicSim's content or software without appropriate
          permission, except where permitted by law.
        </p>
      </TermsSection>

      <TermsSection title="8. Third-Party Services">
        <p>
          MedicSim relies on third-party services to provide certain
          functionality, including authentication, hosting, database
          services, and other infrastructure.
        </p>

        <p>
          Those services may have their own terms and privacy policies.
        </p>
      </TermsSection>

      <TermsSection title="9. Availability">
        <p>
          We aim to keep MedicSim available and functioning reliably, but
          we do not guarantee uninterrupted or error-free access.
        </p>

        <p>
          We may modify, suspend, or discontinue parts of the service when
          necessary.
        </p>
      </TermsSection>

      <TermsSection title="10. Limitation of Liability">
        <p>
          To the extent permitted by applicable law, MedicSim is not
          responsible for losses or damages arising from reliance on
          simulated clinical information, interruptions to the service,
          errors in educational content, or use of the platform outside
          its intended purpose.
        </p>

        <p>
          Nothing in these Terms excludes or limits liability where such
          exclusion or limitation is not permitted by law.
        </p>
      </TermsSection>

      <TermsSection title="11. Changes to These Terms">
        <p>
          We may update these Terms of Service as MedicSim develops.
        </p>

        <p>
          When changes are made, the updated version will be published on
          this page with a new "Last updated" date.
        </p>

        <p>
          Continued use of MedicSim after changes take effect means that
          you accept the updated terms to the extent permitted by law.
        </p>
      </TermsSection>

      <TermsSection title="12. Contact">
        <p>
          If you have questions about these Terms of Service, please
          contact MedicSim through the contact method provided on the
          website.
        </p>
      </TermsSection>
    </div>

    {/* DISCLAIMER */}
    <div className="mt-8 rounded-2xl border border-purple-500/15 bg-purple-500/[0.04] p-6">
      <p className="text-xs leading-6 text-gray-400">
        <span className="font-bold text-purple-300">Important: </span>
        MedicSim is an educational clinical simulation platform and does
        not provide real-world medical diagnosis, treatment, or healthcare
        services.
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

function TermsSection({
title,
children,
}: {
title: string;
children: React.ReactNode;
}) {
return (
<section className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 shadow-lg shadow-black/5 transition-colors duration-200 hover:border-white/[0.11] sm:p-7">
<h2 className="text-base font-black text-white sm:text-lg">{title}</h2>

  <div className="mt-5 space-y-4 text-sm leading-7 text-gray-400 [&_li]:ml-5 [&_li]:list-disc">
    {children}
  </div>
</section>

);
}
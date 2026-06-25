"use client";

import { useState } from "react";
import { diseaseLibrary } from "./data/diseaseLibrary";

import {
  maleFirstNames,
  femaleFirstNames,
  lastNames,
  occupations,
  personalities,
  painTolerance,
  anxietyLevels,
} from "./data/generator";

/**
 * =========================
 * PATIENT GENERATOR
 * =========================
 */
function generatePatient(caseData: (typeof diseaseLibrary)[number]) {
  const sex = Math.random() > 0.5 ? "Male" : "Female";

  const firstName =
    sex === "Male"
      ? maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)]
      : femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];

  const lastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];

  const age = Math.floor(Math.random() * 63) + 18;

  const occupation =
    occupations[Math.floor(Math.random() * occupations.length)];

  const personality =
    personalities[Math.floor(Math.random() * personalities.length)];

  const pain =
    painTolerance[Math.floor(Math.random() * painTolerance.length)];

  const anxiety =
    anxietyLevels[Math.floor(Math.random() * anxietyLevels.length)];

  return {
    ...caseData,
    patient: {
      ...caseData.patient,
      name: `${firstName} ${lastName}`,
      sex,
      age,
      occupation,
      personality,
      painTolerance: pain,
      anxiety,
    },
    aiContext: {
    disease: caseData.name,
    chiefComplaint: caseData.presentation.chiefComplaint,
    keyFindings: caseData.hidden.findings,
  }
  };
}

type GeneratedPatient = ReturnType<typeof generatePatient>;

/**
 * =========================
 * MAIN APP
 * =========================
 */
export default function Home() {
  // -------------------------
  // STATE LAYER
  // -------------------------
  const [phase, setPhase] = useState<"menu" | "patient">("menu");

  const [patient, setPatient] = useState<GeneratedPatient | null>(null);

  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [foundFindings, setFoundFindings] = useState<string[]>([]);

  const [diagnosis, setDiagnosis] = useState("");
  const [result, setResult] = useState("");

  const [score, setScore] = useState<number | null>(null);
  const [questionHistory, setQuestionHistory] = useState<string[]>([]);

  // -------------------------
  // SCORING ENGINE
  // -------------------------
  function calculateScore(isCorrect: boolean) {
    if (!patient) return;

    const totalFindings = patient.hidden.findings.length;
    const discovered = foundFindings.length;

    const completeness = (discovered / totalFindings) * 100;
    const efficiencyPenalty = questionHistory.length * 2;

    let baseScore = completeness;

    if (isCorrect) baseScore += 40;

    const finalScore = Math.max(
      0,
      Math.min(100, Math.round(baseScore - efficiencyPenalty))
    );

    setScore(finalScore);
  }

  // -------------------------
  // GAME START
  // -------------------------
  function admitPatient() {
    const randomDisease =
  diseaseLibrary[Math.floor(Math.random() * diseaseLibrary.length)];

    const generatedPatient = generatePatient(randomDisease);

    setPatient(generatedPatient);
    setPhase("patient");

    setQuestion("");
    setResponse("");
    setFoundFindings([]);
    setDiagnosis("");
    setResult("");
    setScore(null);
    setQuestionHistory([]);
  }

  function reset() {
    setPatient(null);
    setPhase("menu");

    setQuestion("");
    setResponse("");
    setFoundFindings([]);
    setDiagnosis("");
    setResult("");
    setScore(null);
    setQuestionHistory([]);
  }

  // -------------------------
  // QUESTION SYSTEM
  // -------------------------
  async function askQuestion() {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: question }),
  });

  const data = await res.json();
  setResponse(data.reply);
}

  // -------------------------
  // DIAGNOSIS SYSTEM
  // -------------------------
  function submitDiagnosis() {
    if (!patient) return;

    const correct = patient.hidden.diagnosis.toLowerCase();
    const user = diagnosis.toLowerCase().trim();

    const isCorrect = user.includes(correct);

    setResult(
      isCorrect
        ? "Correct diagnosis 🎉"
        : `Incorrect. Correct answer was: ${patient.hidden.diagnosis}`
    );

    calculateScore(isCorrect);
  }

  // -------------------------
  // UI: PATIENT SCREEN
  // -------------------------
  if (phase === "patient" && patient) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-[#0b0f17] to-[#0f172a]">

        <div className="w-full max-w-lg rounded-2xl bg-[#111827] border border-white/10 shadow-2xl p-6">

          <h1 className="text-xl font-semibold mb-6 text-white">
            Patient Admission
          </h1>

          {/* METADATA BLOCK */}
          <div className="space-y-1 text-sm text-gray-300">
            <p><span className="text-gray-400">Name:</span> {patient.patient.name}</p>
            <p><span className="text-gray-400">Age:</span> {patient.patient.age}</p>
            <p><span className="text-gray-400">Sex:</span> {patient.patient.sex}</p>
            <p><span className="text-gray-400">Occupation:</span> {patient.patient.occupation}</p>
            <p><span className="text-gray-400">Personality:</span> {patient.patient.personality}</p>
          </div>

          {/* PRESENTING COMPLAINT */}
          <div className="mt-6 p-4 rounded-xl bg-black/30 border border-white/10">
            <p className="text-xs text-gray-400 uppercase mb-2">
              Presenting Complaint
            </p>
            <p className="text-sm text-gray-100">
              {patient.presentation.chiefComplaint}
            </p>
          </div>

          {/* QUESTION SYSTEM */}
          <div className="mt-6 space-y-3">

            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a clinical question..."
              className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
            />

            <button
              onClick={askQuestion}
              className="w-full bg-indigo-600 hover:bg-indigo-500 p-3 rounded-xl"
            >
              Ask Question
            </button>

            {response && (
              <div className="p-4 rounded-xl bg-black/40 text-gray-200">
                {response}
              </div>
            )}

            {/* DISCOVERED CLUES */}
            {foundFindings.length > 0 && (
              <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                <p className="text-xs text-gray-400 uppercase mb-2">
                  Discovered Clues
                </p>
                <ul className="text-sm text-gray-200 space-y-1">
                  {foundFindings.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* DIAGNOSIS */}
            <input
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Enter diagnosis..."
              className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
            />

            <button
              onClick={submitDiagnosis}
              className="w-full bg-green-600 hover:bg-green-500 p-3 rounded-xl"
            >
              Submit Diagnosis
            </button>

            {result && (
              <div className="p-4 rounded-xl bg-black/40 text-gray-200">
                {result}
              </div>
            )}

            {score !== null && (
              <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                <p className="text-xs text-gray-400 uppercase">
                  Performance Score
                </p>
                <p className="text-2xl font-bold text-white">
                  {score}/100
                </p>
              </div>
            )}
          </div>

          <button
            onClick={reset}
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500 p-3 rounded-xl"
          >
            Back to Dashboard
          </button>

        </div>
      </main>
    );
  }

  // -------------------------
  // MENU SCREEN
  // -------------------------
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0b0f17] to-[#0f172a]">
      <div className="text-center w-full max-w-md">

        <h1 className="text-4xl font-bold text-white mb-3">
          MedSim AI
        </h1>

        <p className="text-gray-400 mb-8">
          Clinical simulation training environment
        </p>

        <button
          onClick={admitPatient}
          className="w-full bg-indigo-600 hover:bg-indigo-500 p-4 rounded-xl font-semibold"
        >
          Admit Patient
        </button>

      </div>
    </main>
  );
}
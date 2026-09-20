# 🩺 MedicSim

 🌐 **Live Website:** https://medicsim.vercel.app  
 📊 **Dashboard:** https://medicsim.vercel.app/dashboard  
 🧪 **Clinical Simulations:** https://medicsim.vercel.app/labs
 
### AI-Powered Clinical Simulation & OSCE Practice

MedicSim is an interactive clinical simulation platform designed to help students practise **clinical reasoning, history taking, examination skills, differential diagnosis, and diagnostic decision-making** through realistic simulated consultations.

Instead of simply reading clinical cases, users actively work through them — interacting with simulated patients, gathering information, performing examinations, forming differentials, and reaching a final diagnosis.

---

## ✨ Features

### 🩺 Interactive Clinical Simulations

Work through simulated clinical consultations where you can:

- Communicate with simulated patients
- Take a clinical history
- Ask targeted questions
- Perform available examinations
- Gather relevant clinical information
- Develop differential diagnoses
- Submit a final diagnosis
- Receive a final performance score

---

### 🧠 Clinical Reasoning

MedicSim is designed around the reasoning process rather than simply revealing the answer.

Users need to decide:

> What should I ask next?

> What examination should I perform?

> What diagnoses could explain these findings?

> What information is most clinically relevant?

This makes each consultation an active learning experience.

---

### 📊 Performance Dashboard

Completed consultations can be saved to a personal performance dashboard.

The dashboard can display information such as:

- Consultation history
- Final scores
- Diagnoses
- Categories
- Specialties
- Severity
- Difficulty
- Learning points
- Red flags
- Completion dates

This allows users to identify patterns in their performance and track their progress over time.

---

### ☁️ Cross-Device Progress

MedicSim uses account-based storage so completed consultation results can follow the user between devices.

A user can complete a consultation on one device and access their saved results from another device after signing in.

---

### 🔐 Privacy-Focused Data Design

MedicSim deliberately separates **temporary consultation activity** from **permanent account data**.

During an active consultation, information is used to operate the simulation.

When the consultation is completed, only the relevant summary/result information is saved to the user's account.

**MedicSim does not intend to permanently store live consultation chat history.**

---

### 🔑 Google Authentication

Users can sign in using their Google account.

Authentication is handled through Supabase Auth, allowing MedicSim to securely associate completed consultation results with the correct account.

---

### 🔒 Row-Level Security

User consultation results are protected using Supabase Row Level Security.

Users can only access results belonging to their own account.

---

### 📱 Responsive Interface

MedicSim is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile

The interface includes responsive navigation, interactive controls, animations, hover states, loading states, and mobile-friendly layouts.

---

### ⚡ Modern UI

MedicSim uses a dark medical/technology-inspired interface with:

- Dark UI
- Indigo/purple accents
- Responsive cards
- Animated interactions
- Interactive buttons
- Account controls
- Performance visualisations
- Dedicated legal pages

---

## 🏗️ Tech Stack

MedicSim is built using modern web technologies.

| Technology | Purpose |
|---|---|
| **Next.js** | Application framework |
| **React** | User interface |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Styling and responsive design |
| **Supabase** | Authentication and database |
| **PostgreSQL** | Consultation result storage |
| **Google OAuth** | User authentication |
| **Vercel** | Hosting and deployment |

---

## 🧩 Architecture

MedicSim is designed around a simple principle:

```text
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │ MedicSim Interface  │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │ Clinical Simulation │
                  │      Session        │
                  └──────────┬──────────┘
                             │
                    Temporary session
                             │
                             ▼
                  ┌─────────────────────┐
                  │   Final Result      │
                  │  Score + Diagnosis  │
                  │ + Learning Points   │
                  └──────────┬──────────┘
                             │
                         Save on
                        completion
                             │
                             ▼
                  ┌─────────────────────┐
                  │      Supabase       │
                  │    PostgreSQL DB    │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │ Performance        │
                  │     Dashboard      │
                  └─────────────────────┘
The database is not used as a live session store.
Consultation activity remains temporary while the user is working through a case.
Only the completed consultation result is persisted.
🗄️ Stored Consultation Data
When a signed-in user completes a consultation, MedicSim can store:
Patient / Case Name
Correct Diagnosis
Final Score
Category
Specialty
Severity
Difficulty
Learning Points
Red Flags
Completion Date & Time
Each result is associated with the authenticated user's account.
🔐 Security
MedicSim uses Supabase Row-Level Security to ensure consultation results are associated with the correct authenticated user.
The database policy follows the principle:
Authenticated User
        │
        ▼
     user_id
        │
        ▼
Only access matching results
The application does not expose privileged Supabase server credentials to the client.
📁 Project Structure
A simplified structure of the project looks like:
medicsim/
│
├── app/
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts
│   │
│   ├── dashboard/
│   │   └── page.tsx
│   │
│   ├── labs/
│   │   └── page.tsx
│   │
│   ├── privacy/
│   │   └── page.tsx
│   │
│   ├── terms/
│   │   └── page.tsx
│   │
│   ├── components/
│   │   └── AccountMenu.tsx
│   │
│   └── page.tsx
│
├── lib/
│   └── supabase/
│       ├── client.ts
│       └── server.ts
│
├── public/
│
├── .env.local
├── package.json
├── tsconfig.json
└── README.md
⚙️ Getting Started
1. Clone the repository
git clone https://github.com/YOUR_USERNAME/medicsim.git
cd medicsim
2. Install dependencies
npm install
3. Configure environment variables
Create a .env.local file:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
Do not commit .env.local or private credentials to the repository.
4. Run the development server
npm run dev
Open:
http://localhost:3000
🗃️ Database
MedicSim uses a PostgreSQL table for completed consultation results.
The database stores the result associated with the authenticated user's ID.
Example structure:
consultation_results

id
user_id
patient_name
correct_diagnosis
final_score
category
specialty
severity
difficulty
learning_points
red_flags
created_at
Row-Level Security is enabled so users can only retrieve their own consultation results.
🔑 Authentication Flow
MedicSim uses Google OAuth through Supabase.
User
 │
 ▼
MedicSim Login
 │
 ▼
Google
 │
 ▼
Supabase Authentication
 │
 ▼
MedicSim Auth Callback
 │
 ▼
Authenticated Session
 │
 ▼
MedicSim
The user's Google password is never provided to MedicSim.
📈 Consultation Flow
A typical consultation follows this process:
Start Case
    ↓
Interact With Patient
    ↓
Take History
    ↓
Perform Examination
    ↓
Gather Findings
    ↓
Develop Differential
    ↓
Submit Diagnosis
    ↓
Calculate Score
    ↓
Show Feedback
    ↓
Save Completed Result
    ↓
Dashboard


🎯 Design Goals
MedicSim is built around several principles:
Active Learning
Users should actively reason through cases rather than simply read explanations.
Realistic Practice
Simulations should resemble the decision-making process involved in clinical encounters.
Useful Feedback
Results should help users understand both what they did well and where they can improve.
Privacy-Conscious Architecture
Only information required for the user's long-term progress should be stored.
Accessible UX
The platform should remain easy to use across different screen sizes and devices.


📄 Legal
MedicSim includes dedicated:
Privacy Policy⁠� medicsim.vercel.app/privacy
Terms of Service⁠� medicsim.vercel
app/terms
MedicSim is an educational simulation platform and is not a substitute for professional medical education, supervision, diagnosis, or treatment.
Users should not use MedicSim to make decisions about a real person's medical care.


🚀 Deployment
MedicSim is deployed using Vercel.
Production application:
https://medicsim.vercel.app⁠�
The application can be updated through the project's deployment workflow.


🛠️ Development
Run the development server:
npm run dev
Build the production application:
npm run build
Start the production server:
npm start


🔮 Future Development
Potential future improvements include:
More clinical specialties
Larger case library
More examination types
Improved clinical reasoning feedback
More detailed performance analytics
Expanded OSCE scenarios
Additional authentication options
More advanced dashboard visualisations
Improved mobile experience
Additional educational resources


👨‍💻 Project
MedicSim
An educational clinical simulation platform built to make clinical reasoning practice more interactive, measurable, and accessible.


Built with:
Next.js · React · TypeScript · Tailwind CSS · Supabase · PostgreSQL · Vercel


⚠️ Educational Disclaimer
MedicSim provides simulated educational scenarios only.
It does not provide real-world medical diagnosis, treatment, healthcare services, or professional medical advice.

# LMS — Loan Management System

A full-stack lending platform where borrowers apply for loans and internal executives manage them through their lifecycle.

**Stack:** Next.js 15 · TypeScript · Tailwind CSS · Node.js · Express · MongoDB · JWT

---

## Project Structure

```
lms/
├── backend/       # Express + TypeScript API
└── frontend/      # Next.js 15 App Router
```

---

## Backend Setup

### 1. Navigate & Install

```bash
cd backend
npm install
```

### 2. Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

`.env.example`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/lms
JWT_SECRET=your_super_secret_key_change_this
CLIENT_URL=http://localhost:3000
```

| Variable | Description |
|---|---|
| `PORT` | Port the Express server runs on |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWTs — use a long random string in production |
| `CLIENT_URL` | Frontend origin for CORS |

### 3. Seed the Database

Creates one account per role so you can test immediately without signing up:

```bash
npm run seed
```

| Role | Email | Password |
|---|---|---|
| Admin | admin@lms.com | Admin@123 |
| Sales | sales@lms.com | Sales@123 |
| Sanction | sanction@lms.com | Sanction@123 |
| Disbursement | disburse@lms.com | Disburse@123 |
| Collection | collection@lms.com | Collection@123 |
| Borrower | borrower@lms.com | Borrower@123 |

### 4. Run

```bash
npm run dev
```

Server starts at `http://localhost:8000`

---

## Frontend Setup

### 1. Navigate & Install

```bash
cd frontend
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Run

```bash
npm run dev
```

App starts at `http://localhost:3000`

---

## How It Works

### Borrower Flow

1. **Sign up** at `/signup` — creates a borrower account
2. **Personal Details** — enter name, PAN, DOB, salary, employment mode
3. **BRE Check** — server validates eligibility automatically:
   - Age must be 23–50
   - Monthly salary ≥ ₹25,000
   - PAN must match format `ABCDE1234F`
   - Employment must not be Unemployed
4. **Upload Salary Slip** — PDF/JPG/PNG up to 5 MB
5. **Loan Config** — pick amount (₹50K–₹5L) and tenure (30–365 days) via sliders; interest previews live at 12% p.a. simple interest
6. **Track status** at `/loans`

### Operations Dashboard

Each executive role sees only their module. Admin sees all four.

| Module | Role | Actions |
|---|---|---|
| Sales | `sales` | View registered borrowers who haven't applied yet |
| Sanction | `sanction` | Approve or reject applied loans (with reason) |
| Disbursement | `disbursement` | Mark sanctioned loans as disbursed |
| Collection | `collection` | Record payments via UTR number; loan auto-closes when fully paid |

---

## Loan Lifecycle

```
applied → sanctioned → disbursed → closed
        ↘ rejected
```

---

## API Reference

All endpoints are prefixed with `/api`.

### Auth
| Method | Endpoint | Access |
|---|---|---|
| POST | `/auth/signup` | Public |
| POST | `/auth/login` | Public |
| GET | `/auth/me` | Authenticated |

### Application (Borrower)
| Method | Endpoint | Body |
|---|---|---|
| POST | `/application/personal-details` | `fullName, pan, dob, monthlySalary, employmentMode` |
| POST | `/application/upload-salary-slip` | `form-data: salarySlip (file)` |
| GET | `/application/me` | — |

### Loans
| Method | Endpoint | Access |
|---|---|---|
| POST | `/loans/apply` | Borrower |
| GET | `/loans/my` | Borrower |
| GET | `/loans/dashboard/sales` | Admin, Sales |
| GET | `/loans/dashboard/sanction` | Admin, Sanction |
| PATCH | `/loans/:id/sanction` | Admin, Sanction |
| GET | `/loans/dashboard/disbursement` | Admin, Disbursement |
| PATCH | `/loans/:id/disburse` | Admin, Disbursement |
| GET | `/loans/dashboard/collection` | Admin, Collection |
| POST | `/loans/:id/payment` | Admin, Collection |

---

## Role-Based Access Control

Access is enforced at **two layers**:

- **Frontend** — middleware redirects unauthenticated users to `/login`; each dashboard page calls `requireRole()` which redirects on role mismatch; the sidebar nav only renders links the user's role can access
- **Backend** — every protected route goes through `authenticate` (JWT verify) then `authorize(...roles)` middleware; unauthorized requests receive `403 Forbidden`

---

## Interest Calculation

Simple Interest formula used throughout:

```
SI = (P × R × T) / (365 × 100)
```

Where `P` = principal, `R` = 12 (fixed rate), `T` = tenure in days.

`simpleInterest` and `totalRepayment` are computed on the server at loan creation and stored — the frontend sliders show a live preview using the same formula.

---

## Tech Decisions

- **BRE runs server-side only** — client-side checks are cosmetic and bypassable; the server is the source of truth
- **Payments embedded in Loan document** — payments are always fetched with the loan, never queried independently; UTR uniqueness is enforced at the application layer since MongoDB can't index subdocument array fields globally
- **Server Actions for mutations, Server Components for reads** — all POST/PATCH requests use Next.js server actions with `useActionState`; data fetching happens in async server components with no client-side useEffect
- **One Application per borrower** — personal details are upsertable so borrowers can correct mistakes before uploading their salary slip

---

## Local Dev Notes

- Make sure MongoDB is running locally before starting the backend
- The `uploads/` folder is created automatically in `backend/` when the first file is uploaded
- Run seed **after** the backend has connected to MongoDB at least once
- Both servers must be running simultaneously during development
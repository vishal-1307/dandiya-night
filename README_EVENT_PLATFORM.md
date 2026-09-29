# Dandiya & Garba Night - Madhubani Digital Event Platform

## Executive Overview
A complete digital event experience and management system built for **Dandiya / Garba Night in Madhubani, Bihar, India**.

The application operates as both a public event portal and an operations management platform for organizers and event-day gate staff.

---

## Key Pages & Access URLs

| Route | Purpose | Audience |
|---|---|---|
| `http://localhost:3001/` | **Event Landing Page** (Hero with live countdown, About, Experiences, Schedule, Highlights, Venue & Map, Rules, FAQ, Sponsors, Social, Contact) | Public Visitors |
| `http://localhost:3001/register` | **Multi-Step Registration Flow** (5-step progressive form for Individual, Couple, and Group with auto-validation) | Attendees |
| `http://localhost:3001/my-pass` | **Pass & Ticket Retrieval** (Search by Registration ID, Phone, or Email to view/download digital pass) | Attendees |
| `http://localhost:3001/admin` | **Admin Portal Login** (Secured with JWT and Bcrypt) | Event Organizers |
| `http://localhost:3001/admin/dashboard` | **Live Metrics & Capacity Management** (Total attendees, today's counts, checked-in tally, type/status breakdowns) | Organizers |
| `http://localhost:3001/admin/registrations` | **Attendee Management & CSV Export** (Searchable database, category filters, 1-click CSV export) | Organizers |
| `http://localhost:3001/admin/checkin` | **Gate Fast Check-in System** (Instant QR / ID scanner, attendee verification, duplicate check-in protection) | Gate Staff |

### Default Admin Credentials
- **Username**: `admin`
- **Password**: `admin123`

---

## Architectural Highlights

### 1. Centralized Event Configuration (`src/lib/config.ts`)
All event details can be changed in a single file without altering layouts:
- Event Title, Tagline, Subtitle
- Date, Time, Schedule Timeline
- Venue name, Address, Google Maps embed, Parking instructions
- Capacity limit & Pricing (Free or Paid)
- Contact numbers, WhatsApp links, Instagram handle, Hashtag
- FAQ questions and categorized event rules

### 2. Multi-Step Registration System
- **Step 1: Registration Type**: Individual, Couple (partner details), Group (multi-member dynamic forms).
- **Step 2: Attendee Details**: Full Name, Email, Phone (with auto-formatting), City, Age, Gender, Instagram Handle.
- **Step 3: Participation Preferences**: Dandiya participation, Best-dressed competition interest, Costume theme, Food preferences.
- **Step 4: Emergency Contacts**: Contact name, phone, relationship.
- **Step 5: Consents & Validation**: Accuracy verification, rule agreement, photo/video consent.

### 3. Digital Pass & Real-time QR Code
- Generates unique ID (`DN-XXXX`) and unique QR string (`DNQR-...`).
- Renders scannable high-resolution QR codes in browser canvas/SVG using the `qrcode` engine.
- Formatted in Mithila festive theme (Maroon, Gold, Cream) ready for screenshot, mobile display, or print.

### 4. Event-Day QR Check-in System
- Auto-focused input for hand-held laser/barcode scanners or mobile keyboard entry.
- Instant validation: Checks registration validity, payment confirmation, and check-in status.
- **Duplicate Prevention**: If a pass is scanned a second time, immediately raises an alert: `✕ Already checked in`.
- Displays real-time recent check-in log with timestamps.

### 5. Capacity Management & Auto-Waitlist
- Configurable capacity (default: 500).
- Dynamically calculates confirmed registrations against capacity.
- Automatically transitions registrations to `WAITLISTED` once capacity is reached.

### 6. Tech Stack
- **Framework**: Next.js 14 App Router (React 18, TypeScript)
- **Styling**: Tailwind CSS with custom festive palette (`maroon`, `gold`, `saffron`, `cream`)
- **Database**: SQLite (via Prisma ORM, seamlessly migratable to PostgreSQL)
- **Security**: JWT Authentication, Bcrypt password hashing, parameter validation

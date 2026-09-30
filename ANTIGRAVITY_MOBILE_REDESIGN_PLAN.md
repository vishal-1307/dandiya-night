# Jhanjharpur Jhijhiya & Dandiya Fest 2026: Product, Mobile UX, and Engineering Redesign Brief

## Purpose

This document is the implementation brief for a focused redesign of the public event platform, registration journey, digital pass flow, and organizer operations portal. The site must become mobile-first, culturally specific, visually calm, and production-safe. It should not be rebuilt as a generic "festival landing page."

The current build has solid raw material: real event photos, a clear cultural purpose, a central configuration file, registration routes, a pass ID model, and a working admin area. The main problem is that the product currently combines an older generic Dandiya platform with a newer Jhijhiya-specific concept. That conflict shows up in the content, visual hierarchy, data model, documentation, and operational behavior.

## Executive Diagnosis

### What is working

- The real photography, crest, event story, programme, pass concept, and organiser contact details give the site genuine subject matter.
- `src/lib/config.ts` already centralises much of the event copy and should remain the public-event source of truth.
- The five-step registration structure is appropriate for the specialised Jhijhiya pathway.
- Input text contrast has been handled well, and inputs use 16px text so iOS will not auto-zoom.
- The project builds successfully with `npm run build`.

### What is making it feel generic or AI-generated

- Almost every section repeats the same formula: dark maroon gradient, gold glow, large rounded card, outlined gold pill, gradient heading, and hover shadow. There is no rhythm between content types.
- The page has too many equally prominent sections and too much copy before a user reaches the most important decision: choose a pass or contact the organisers.
- The homepage combines editorial language, sales language, technical labels, decorative symbols, and repeated event facts. It reads as assembled modules rather than one well-directed event experience.
- The current visual system leans on glow effects, blur blobs, gradients, oversized rounded corners, and scale-on-hover. These are the clearest sources of the artificial look.
- Every sponsor card uses the same academy crest, which makes the partner area look like placeholder content rather than real sponsorship.
- Some static SVG is hand-written while Lucide is already available. Use Lucide for interface icons consistently.

### Highest-impact mobile failures

- At a 390px phone viewport, the hero countdown overlaps the hero title and first-screen content. The primary story, CTA, and countdown compete for the same visual area.
- The hero has too many simultaneous elements: announcement, fixed header, full title, subtitle, two actions, meta facts, countdown, and a vertical scroll hint. A phone does not have room for all of these above the fold.
- The event name in the mobile header wraps to three lines, making the header visually heavy and reducing usable content height.
- The registration screen is substantially better than the homepage, but category cards are still large and repetitive. On a phone, choosing a category should be a quick comparison, not a long scroll through three oversized promotional cards.
- The site uses a 400px scroll threshold for the mobile action bar rather than a user-visible event/CTA state. It can appear over content and does not account for `safe-area-inset-bottom`.
- The long home page ends in a large multi-column desktop-style footer after already repeating contacts, event facts, FAQ, social content, and navigation. This is unnecessary on mobile.

## Decisions Required Before Implementation

Confirm these values with the organisers before implementation. Do not leave placeholders or conflicting values live.

| Topic | Current conflict | Required decision |
| --- | --- | --- |
| Capacity | Public page/config say 800; description says 500+ attendees | Exact total pass capacity and individual capacity for each category |
| Programme | Configuration times differ from the supplied plan | Final time-by-time programme, including the correct Jhijhiya slot |
| Venue | Displays Jhanjharpur and "Venue Details Coming Soon" | Exact venue name, entry gate, parking point, and final Maps pin |
| Payment | The flow creates a pass with `PENDING` payment but calls it confirmed/reserved | Is this a free reservation, a payment request, an on-site-payment token, or an online payment flow? |
| Partners | Five named partners use one crest image | Official logo or approved text-only treatment for every real partner |
| Privacy | The form collects child/guardian, address, and school information | Final data-retention policy, who may access the data, and organiser-approved consent wording |
| Pass rule | UI says no QR needed but the data model still generates QR data | Keep Pass ID only, or restore QR as an internal gate feature. Make one decision and remove the other path completely. |

## Target Product Direction

### Brand and visual character

Create a contemporary Mithila cultural event experience, not a dark luxury nightclub template.

- Use the real event imagery as the primary visual proof. The hero should make the actual festival visible immediately.
- Keep a small, deliberate palette: ink/plum for the base, warm paper/ivory for reading surfaces, maroon as an accent, and one flat marigold gold for primary actions. Use green only for a real success state and WhatsApp only where WhatsApp is the action.
- Use gold as an accent line, icon, label, and key number, not as a gradient everywhere.
- Replace blurred circular background decoration with a restrained, low-contrast Mithila line or border motif. It should frame content, never compete with it.
- Keep cards at 8px radius or less. Use no card simply to hold a whole page section; use cards only for a pass option, programme item, gallery item, FAQ row, or operational panel.
- Remove generic floating/scale hover effects from normal content. Use short opacity, border, and colour transitions only. Respect `prefers-reduced-motion`.
- Typography: retain Playfair Display only for event/editorial headings, DM Sans for UI and body, and add a proper Devanagari font such as `Noto_Serif_Devanagari` or `Noto_Sans_Devanagari` for Hindi text. Do not fake Hindi support with a Latin-only font setup.
- Use a small type scale with fixed sizes at phone widths. Do not use viewport-based font scaling. Headings must never use negative letter spacing.

### Button system: remove the "AI button" look

Build one shared `Button` component with `primary`, `secondary`, `text`, and `icon` variants. Update every public CTA to use it.

- Primary: flat marigold fill, ink text, 48px minimum height, 8px radius, no gradient, no floating shadow, one Lucide arrow only when it indicates navigation.
- Secondary: transparent or paper surface with a single 1px border; no glow.
- Text/link: no rounded container. Use an inline arrow only where the destination matters.
- Icon-only actions (menu, close, copy, print, directions) must use Lucide icons, a visible tooltip where a label is not evident, and an accessible name.
- Never put text in a rounded rectangle when a familiar icon is clearer. Example: the circular explore/scroll control can become a labelled down-arrow icon button.
- CTA copy must be consistent: choose `Reserve Pass`, `Find My Pass`, `Get Directions`, and `Contact Organisers`. Do not alternate among Spot, Booking, Registration, Reservation, and Pass unless their behaviours are truly different.

## Mobile-First Information Architecture

### Public home page, in this order

The home page should be intentionally shorter. It must let a visitor understand the event and act within the first two screenfuls.

1. **Announcement strip**: 32px high, one short factual message, one text link. No duplicate flower emojis.
2. **Compact mobile header**: crest, two-line maximum event name or short brand label, `Find pass` text action, menu icon. No event location subtitle in the header.
3. **Hero**: one genuine full-bleed event photo, fixed readable gradient scrim, event label, one short heading, a two-line summary, one primary `Reserve pass` CTA, and one quiet `View programme` text link. Use `min-height: 100svh` only when the content fits; otherwise let content determine height.
4. **At-a-glance strip**: date, start time, exact venue. These must be tappable only when they trigger a meaningful action, such as directions.
5. **Choose your experience**: three compact, comparable pass options. Each option should show audience, price, and two or three real inclusions. The main registration CTA lives here.
6. **The Jhijhiya story**: a single image plus concise explanation of the 108 Girls programme and its organisers. This is the cultural heart of the page, not another general-purpose card grid.
7. **Programme**: simple chronological list with time at the left and details at the right. No alternating desktop timeline styling at phone sizes.
8. **Venue and directions**: exact venue name, practical entry/parking notes, prominent map/directions action. Defer the map iframe or offer it after the practical directions to protect page speed.
9. **Gallery**: six curated images at first. `View more moments` can reveal the rest. Put poster images in a distinct "Information" group rather than mixing them with candid memories.
10. **FAQ**: six concise questions. Accordion rows should have 8px radius and strong tap targets.
11. **Organiser help**: the telephone numbers and one WhatsApp action. The optional contact form should move to a dedicated contact route or come after the essential actions.
12. **Footer**: compact brand/legal/contact footer. Do not duplicate the navigation and contact details already shown above.

### Hero acceptance criteria

- On 360px, 390px, and 412px wide screens, nothing overlaps the hero title, facts, CTA, or countdown.
- The hero title and primary CTA are visible without scrolling on a common phone height.
- Move the countdown below the hero or present it as one compact `18 days to go` label under the event facts. It must not be absolutely positioned on a phone.
- Remove the vertical scroll note on phone. It adds visual noise without helping users complete a task.
- Use `object-position` selected from the actual focal point of the hero image so faces and performers are not hidden by the text or crop.

### Navigation and mobile action bar

- The mobile menu must be an accessible modal: focus moves into it, focus is trapped, Escape closes it, and focus returns to the trigger.
- Make anchor navigation route-aware. When the visitor is already on `/register`, do not send them to a home-page anchor without an explicit return-home action.
- Rework the mobile sticky action bar as a fixed two-action bar only on public home pages after the hero. Include `padding-bottom: env(safe-area-inset-bottom)` and matching content bottom padding.
- Show only `Reserve pass` and `Find pass`; retain no duplicated header CTA in the bar.

## Registration Flow Redesign

### Goal

Make registration feel like a trusted organiser form, not a promotional mini-site. It must be easy to complete with one hand and clear about what happens after submission.

### Step design

- Keep five logical data groups only if every one is necessary. For Dandiya entry, reduce it to category, attendee details, optional preferences, emergency details, review/consent. For Jhijhiya, add the school/guardian fields within attendee details rather than making the process feel longer.
- Use a labelled progress bar with the current step name, for example `2 of 5 - Participant details`. Do not rely on five anonymous circles alone.
- Category selection: compact radio cards with exactly the category, audience, price, and three inclusions. The selected state needs a visible check/radio indicator, not just a gold outline.
- Make category-specific requirements visible before the person chooses, especially that Jhijhiya is for school and college girls and that costume/makeup are self-arranged.
- Use field labels above inputs, helpful validation text immediately under the field, `autocomplete` tokens, `inputMode="numeric"` for phone fields, and date input for DOB only when it is a real operational requirement.
- Separate optional fields visually. Do not make a user wonder which personal detail is required for entry.
- At review, state the fee, payment state, date, venue, cancellation/refund policy, and the exact next step in plain language. `Confirm & Get Digital Pass` is misleading while `paymentStatus` is `PENDING`.
- Preserve form data in session storage so accidental navigation or a poor connection does not erase a long parent/guardian form.
- Provide success, network error, validation error, duplicate-registration error, and waitlist states. The success page must show whether the pass is confirmed, reserved pending payment, or waitlisted.

## Digital Pass and Pass Retrieval

- Keep the Pass ID approach if that is the organiser decision. Remove `qrcode` from dependencies, `qrCode` generation/storage, QR wording, schema fields, and admin check-in if QR is truly not used.
- Do not treat any `DN-...` input as valid. The current `/my-pass` page manufactures a convincing pass for every unknown ID beginning with `DN-`; remove this fallback immediately.
- Remove all `DN-DEMO` content, demo registration records, quick-test buttons, and demo credentials from production builds.
- A pass lookup must not return the whole registration record. It should return only the fields needed to render the pass after a privacy-preserving verification step.
- Lookup by a public Pass ID alone is easy to guess and enables enumeration. Prefer `Pass ID + last four digits of mobile`, or email/mobile plus a one-time verification code. Add rate limiting and a generic response for failed lookups.
- The pass itself should fit within 360px with 16px page gutters. Use a flat ticket treatment, not a glowing card inside a glowing page. The ID, holder name, category, date, and venue must remain readable in a screenshot.
- Use a print-only stylesheet so `Print / Save pass` prints just the ticket, not headers, page backgrounds, CTAs, or the footer.

## Content and Data Consistency Work

Perform this before visual polishing. `src/lib/config.ts` must become the single source of truth for all public event facts.

- Replace stale schedule entries with the organiser-approved programme. The supplied description says 6:00 PM Jhijhiya, 7:15 PM Dandiya, 8:30 PM contests, 9:15 PM DJ, and 10:30 PM closing; the current configuration says different times and adds Maha Aarti/Cultural Felicitation. Use only the final programme.
- Align capacity everywhere; currently 800 appears in config while other material describes 500+.
- Standardise category identifiers as enums such as `JHIJHIYA_108`, `DANDIYA_SINGLE`, and `DANDIYA_COUPLE`. Do not persist display labels such as `Jhijhiya 108` or maintain legacy `INDIVIDUAL`, `COUPLE`, `GROUP`, and `FAMILY` categories in the same product.
- Remove legacy group-registration terms, the QR system, and older generic Dandiya wording from README files, types, store, schema, admin filters, demo data, and dependencies.
- Ensure the planned Jhijhiya fields are actually persisted: father/guardian name, DOB if needed, school/college, class/course, parent phone, full address, and district are sent by the form but absent from the Prisma schema and are currently discarded by the store.
- If a field is not legally/operationally necessary, remove it rather than collecting it. For minors, collect the minimum possible personal information.
- Replace placeholder venue language before registration opens. A generic city map is not enough for gate operations.
- Use approved partner assets. Until partner logos are available, show text-only names without a fake shared logo.
- Correct the social link rendering so it does not visually show `@@madhubani__dance`.
- Remove any reference to features that are not actually delivered, especially instant confirmation if payment remains pending.

## Technical and Security Corrections (must precede production launch)

### Priority zero: privacy and authentication

- Replace default production credentials (`admin` / `admin123`) and the fallback JWT secret. In production, fail startup/deployment if `ADMIN_USERNAME`, password hash, and `JWT_SECRET` are missing. Never fall back to public values.
- Make the admin session cookie `httpOnly`, `secure`, and signed/verified. Do not store the bearer JWT in `localStorage`; an XSS bug could expose it.
- Verify JWT signature, expiry, and role in middleware for all protected pages and APIs. The current middleware checks only whether a cookie exists; route APIs separately check the bearer header, so the protection model is inconsistent.
- Add login rate limiting, credential audit logging, session expiry/rotation, and an explicit logout endpoint.
- Protect public registration, contact, and pass lookup endpoints with rate limiting and bot prevention appropriate for the chosen hosting setup.
- The public lookup API currently returns the full registration object, including personal, emergency, and member data. Return a strict display DTO only after verification. Do not expose it by email, phone, or an easily guessed Pass ID alone.

### Data and operational correctness

- Do not use the in-memory store as a production fallback. Serverless instances are ephemeral and isolated; registrations, capacity counts, contact messages, check-ins, and exports can disappear or disagree across requests. A failed database must display a controlled service error and alert organisers.
- Remove seeded `INITIAL_DEMO_RECORDS` from live code. They create a real public lookup/check-in surface and make production analytics inaccurate.
- Use PostgreSQL in all environments or clearly configure SQLite for local development only. The README says SQLite, the Prisma schema requires PostgreSQL, and `.env.example` contains incompatible `file:./dev.db` guidance.
- Add a Prisma migration for all final participant/guardian fields. Validate input on the server with a schema library such as Zod; client-side validation alone can be bypassed.
- Define a database-level uniqueness strategy for registrations and transactions. The current `findFirst({ email, phone })` check is race-prone and only treats the pair as a duplicate. Add a unique/index strategy compatible with the actual event policy.
- Generate pass IDs with stronger entropy and retry on unique-conflict. Four base-36 characters gives only about 1.68 million combinations and current code has no collision retry.
- Make capacity accounting transaction-safe and account for couple entries correctly. Decide whether capacity counts registrations or people; a couple must consume two attendee places if capacity means venue attendees.
- Never set `paymentStatus` to `PAID` merely because somebody is checked in unless that is an explicit cash-collection workflow with staff identity and an audit record.
- Ensure the CSV uses safe values against spreadsheet formula injection (prefix values that begin with `=`, `+`, `-`, or `@`) and include only the columns gate staff genuinely need.
- Add organiser roles: an administrator can export/manage records; gate staff can only look up/check in. Do not give every volunteer data-export authority.

### Performance, accessibility, and quality

- Use `next/image` for local static photos with intentional `sizes`, `priority` only for the hero image, and responsive crop/aspect-ratio rules. Current source has multiple large JPEGs and standard `<img>` elements.
- Convert/serve high-volume photography as efficient WebP or AVIF variants. The image directory is roughly 12 MB before transfer overhead; the page should not eagerly load a full gallery on mobile.
- Lazy-load the gallery and map iframe. Avoid loading 15 gallery images before a visitor asks to see them.
- Remove the global fixed grain layer if it impacts lower-end phones. It is a constant paint/compositing layer with no functional value.
- Add proper focus-visible states, keyboard operations for the gallery lightbox (Escape, next/previous where applicable), dialog semantics/focus trap, and labelled icon buttons.
- Use `button` elements for interactive gallery items rather than clickable `div` elements. Add descriptive alt text based on the real photo, not generic copy.
- Publish complete SEO/social metadata: canonical URL, Open Graph/Twitter image, `Event` JSON-LD, `robots.txt`, and `sitemap.xml`. Use a final 1200x630 social image based on an approved poster.
- Add error/loading states for every form/API route and user-safe operational error messages. Never expose raw database errors.
- Delete unused QR dependencies and duplicate helper implementations. Bring README and project documentation in line with the final stack.

## Suggested Implementation Sequence

### Phase 0: decision and content lock

1. Confirm the eight decisions in the table above with organisers.
2. Freeze the final event facts, pricing, category rules, venue, programme, partners, payment policy, and privacy/consent text.
3. Convert `EVENT_CONFIG` into a typed, validated configuration object and delete contradictory content elsewhere.

### Phase 1: protect the operational core

1. Replace all demo data, pass fallbacks, default credentials, and default secrets.
2. Make the database mandatory in production and correct the environment/database documentation.
3. Add migrations for final data fields; add server-side schema validation; make ID, duplicate, and capacity handling transactional.
4. Rebuild authentication and role-based authorisation; lock down lookup/export/check-in endpoints.
5. Add rate limiting, audit fields, error monitoring, and a recovery/backup plan for registrations.

### Phase 2: establish reusable UI foundations

1. Replace scattered hex values and repeated Tailwind strings with a small semantic token layer in `globals.css` and component variants.
2. Build shared `Button`, `SectionHeader`, `EventFact`, `PassOption`, `FormField`, `StatusBadge`, and `Dialog` components.
3. Remove gradients, blur blobs, large radii, generic glows, and decorative emoji from the default component language.
4. Add the proper Devanagari font and responsive type, spacing, safe-area, and focus tokens.

### Phase 3: rebuild the public phone journey

1. Rebuild header, announcement, hero, CTA bar, and at-a-glance facts from a 360px layout first.
2. Recompose the homepage in the proposed content order, using six curated gallery images and real partner assets/text treatment.
3. Rebuild schedule, venue, FAQ, and contact areas as simple mobile-native sections; add desktop enhancements only after phone layouts are stable.
4. Rework the menu and lightbox with accessible modal behaviour.

### Phase 4: rebuild conversion flows

1. Simplify the registration categories and form; persist only approved fields.
2. Add resilient progress, field validation, review, pending/waitlist states, and draft persistence.
3. Rebuild pass retrieval with privacy-preserving verification and no fake passes.
4. Rebuild the printable pass with a print stylesheet and a restrained, screenshot-friendly ticket layout.

### Phase 5: admin operations and release hardening

1. Make the admin area utilitarian and dense rather than decorative. Gate check-in must show one clear success/failure decision at a glance.
2. Add roles, robust filters, payment/audit history, export restrictions, and a fast pass-ID lookup path.
3. Test with real staff flows and a staging database. Verify a pass cannot be duplicated, leaked, or marked paid incorrectly.
4. Ship only after the acceptance checks below pass.

## Definition of Done / Acceptance Checks

### Visual and mobile checks

- Test 360x800, 375x812, 390x844, 412x915, 768px, and 1440px viewports with screenshots.
- No horizontal page overflow, clipped content, overlapping text, or CTA hidden behind a sticky bar at any target viewport.
- The first phone viewport communicates event, date/location, and a single primary action without scrolling.
- All buttons have 44x44px minimum tap targets; primary actions are 48px high.
- No decorative gradient or blurred orb background is used. No section is a floating card. No nested cards.
- Content is visually legible with normal phone brightness; gold text is never used for long paragraphs.

### Functional checks

- Each category creates the correct canonical enum, fee, attendee count, required field set, and payment state.
- All Jhijhiya-specific information shown in the form is correctly validated, stored, retrievable only by authorised staff, and represented in CSV only if needed.
- Unknown pass IDs do not generate a pass; public lookups never reveal private registration data.
- A duplicate check-in cannot mark another entry; capacity and waitlist calculations are correct under concurrent registrations.
- Production cannot start with fallback secrets, default admin credentials, demo records, or the in-memory data store.
- Print output contains one readable pass only.

### Quality checks

- `npm run build` passes.
- Add unit tests for pricing, category validation, pass-ID creation/collisions, capacity/waitlist logic, and CSV sanitisation.
- Add route/integration tests for registration, authentication, pass retrieval privacy, CSV role checks, and duplicate gate check-in.
- Add end-to-end tests for the public registration-to-pass journey and gate staff check-in journey.
- Inspect browser console for errors; run a keyboard-only accessibility pass; respect reduced-motion settings.
- Run Lighthouse or equivalent on a mid-range mobile profile. Set project budgets for LCP, JavaScript, image payload, and accessibility rather than treating performance as an afterthought.

## File-Level Starting Map

| Area | Main files | Required direction |
| --- | --- | --- |
| Site shell and hero | `src/components/AppShell.tsx`, `Navbar.tsx`, `Hero.tsx`, `MobileStickyBar.tsx`, `globals.css` | Rebuild mobile hierarchy; remove overlap and artificial visual effects |
| Homepage composition | `src/app/page.tsx`, `src/components/sections/*` | Reduce and reorder sections; create distinct content treatments |
| Event facts | `src/lib/config.ts`, README files | Resolve all dates, capacity, schedule, venue, partner, and pass-rule conflicts |
| Registration | `src/app/register/page.tsx`, `src/components/registration/RegistrationForm.tsx`, `src/lib/types.ts` | Simplify phone flow, canonicalise categories, persist approved fields |
| Passes | `src/app/my-pass/page.tsx`, `DigitalPass.tsx`, `RegistrationSuccess.tsx`, lookup route | Remove fake/demo pass behaviour; add privacy-safe retrieval and print styles |
| Data layer | `prisma/schema.prisma`, `src/lib/store.ts`, `src/lib/db.ts` | Production database only, migrations, no demo/fallback data, transactional rules |
| Admin/security | `src/app/admin/*`, `src/app/api/admin/*`, `src/lib/auth.ts`, `src/middleware.ts` | Verified sessions, roles, rate limits, audit, safe export, gate-first UX |
| Media | `public/images/*`, gallery/experience components | Curate real photos, use responsive `next/image`, optimise formats, obtain actual partner logos |

## Non-Negotiable Constraints for Antigravity

- Do not introduce a new landing page separate from the working event experience; improve the actual public home, registration, pass, and admin routes.
- Build phone layouts first and validate them before desktop styling.
- Do not use purple/blue gradients, glow-heavy visual decoration, large rounded cards, generic stock art, decorative SVG hero art, or text-only artificial effects to replace the real event imagery.
- Preserve the cultural focus on Jhijhiya and Mithila. Design should amplify real organisers, real performers, programme information, and practical attendance details.
- Do not ship security/data changes partially. Privacy, fallback data removal, authenticated roles, and database correctness are release blockers.

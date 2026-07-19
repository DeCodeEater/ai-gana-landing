# AI GANA — UI Design System
### Modern Minimal with Human Warmth

This is the visual layer that sits on top of the UX/microcopy guide. Where that document defines *what to say*, this defines *how it should look, move, and feel* — so the page reads as premium and distinctive rather than another templated real-estate site.

---

## 1. Design Philosophy

The page has one job: get a visitor to think *"I feel comfortable messaging this person."* Not brand love, not emotional attachment after one visit — just enough trust to lower the cost of that first WhatsApp tap.

Every visual decision below serves one of four goals:

1. **Reduce uncertainty** — clarity in layout and copy hierarchy, nothing hidden or ambiguous.
2. **Increase familiarity** — a consistent, coherent visual voice from the first scroll to the last.
3. **Create comfort** — warmth through color temperature, photography, and motion — never cold or corporate.
4. **Lower the psychological cost of messaging** — the WhatsApp CTA is always the most visually resolved, reachable element on the page.

The metaphor to hold onto: **a boutique hotel, not a corporate office or a luxury showroom.** Clean, modern, unfussy — but the person behind the desk smiles, remembers your name, and makes you feel expected. Minimalism builds competence. Warmth is layered in through color temperature, photography, and motion — not through a second typeface or a busier layout.

---

## 2. Color System

Minimal palette, one accent. Warmth comes from the *temperature* of the neutrals (warm ivory, not stark white; warm ink, not pure black) rather than from adding more colors.

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#FAF7F2` | Page background — warm ivory, never pure white |
| `--color-surface` | `#FFFFFF` | Cards, elevated elements — lifts gently off the ivory background |
| `--color-text-primary` | `#1C1A17` | Headlines, body copy — warm near-black, not blue-black |
| `--color-text-secondary` | `#6E665C` | Supporting copy, microcopy, captions |
| `--color-border` | `#E8E1D6` | Hairlines, card borders, dividers |
| `--color-accent` | `#1F7A5C` | The single accent — WhatsApp CTAs, links, active states |
| `--color-accent-hover` | `#18604A` | Accent hover/press state |
| `--color-accent-soft` | `#E7F3EE` | Light accent tint — badge backgrounds, subtle highlights |

**On the accent color**: default WhatsApp green (`#25D366`) reads as "app icon," not "premium brand." `#1F7A5C` is a deeper, more refined emerald that still clearly signals "WhatsApp" without looking borrowed from the app itself — it's the one color decision that most separates this from a generic template.

**Rule**: this is a light-only, single-theme site. No dark mode. One accent color used consistently — if a second color is ever needed (e.g. an error state on a form later), borrow a warm terracotta rather than a cold red, but this should be rare enough that it never competes with the green CTA for attention.

---

## 3. Typography

**Headings**: Plus Jakarta Sans (weights 600 / 700 / 800) — geometric but with rounded terminals, so headlines read as confident *and* approachable rather than sharp and corporate.

**Body & UI text**: Inter (weights 400 / 500 / 600) — near-invisible legibility, does its job at small sizes (property specs, microcopy, footer) without competing with the headline voice.

Both are free via Google Fonts / `next/font`, and share similar x-heights and proportions, so they pair cleanly without the visual clash of mixing very different type personalities (e.g. a script face against a bold sans) — a common way "friendly" branding accidentally reads as unfinished.

| Role | Size (mobile → desktop) | Weight | Notes |
|---|---|---|---|
| Hero headline | 2.25rem → 3.5rem | 700 | line-height 1.15, letter-spacing -0.02em |
| Section heading | 1.75rem → 2.5rem | 700 | line-height 1.2 |
| Card title | 1.125rem → 1.25rem | 600 | line-height 1.3 |
| Body | 1rem | 400 | line-height 1.6 |
| Microcopy / captions | 0.875rem | 500 | `--color-text-secondary` |

**Rule**: one typeface family per role, used consistently everywhere. Warmth is carried by copy voice, color, and photography — not by introducing a second expressive typeface into headlines.

---

## 4. Spacing, Radius & Elevation

**Grid**: 8px base unit. Section vertical padding: 4rem mobile, 7rem desktop. Max content width: 1200px, with generous side gutters (minimum 1.5rem mobile, 4rem+ desktop) — whitespace is doing real work here, not just filling space.

**Radius scale**:

| Token | Value | Used on |
|---|---|---|
| `--radius-sm` | 12px | Badges, tags, small UI elements |
| `--radius-md` | 20px | Property cards, content blocks |
| `--radius-lg` | 28px | Hero photography, large image blocks |
| `--radius-full` | 9999px | All buttons — pill-shaped |

Pill-shaped buttons specifically (rather than slightly-rounded rectangles) are a deliberate warmth choice — fully rounded reads as more approachable and human than a softened rectangle.

**Shadows** — soft and warm-tinted, never generic gray:

| Token | Value | Used on |
|---|---|---|
| `--shadow-resting` | `0 2px 12px rgba(28,26,23,0.06)` | Cards at rest |
| `--shadow-hover` | `0 12px 28px rgba(28,26,23,0.12)` | Cards on hover |
| `--shadow-cta` | `0 8px 20px rgba(31,122,92,0.25)` | Primary WhatsApp buttons — a faint green-tinted glow, a small premium detail that a flat design skips |

---

## 5. Component Visual Language

- **Navbar**: sticky, transparent-to-white on scroll (subtle backdrop blur is fine here — restrained, not glassmorphism-heavy). Logo left, anchor links center/right, WhatsApp pill button always visible.
- **Primary button**: pill, `--color-accent` fill, white text, `--shadow-cta`. Hover: darken to `--color-accent-hover`, lift 1px. Press: scale to 0.98.
- **Secondary button**: pill, transparent fill, `1px solid --color-border`, `--color-text-primary` text. Hover: border darkens to `--color-text-secondary`.
- **Property card**: `--color-surface` background, `--radius-md`, `--shadow-resting` at rest → `--shadow-hover` + 4px lift on hover, image at `--radius-md` (matching card), dark pill location badge overlaid top-left of the image, price in `--color-text-primary` at weight 600.
- **Trust/response-time indicator**: a small solid `--color-accent` dot (not an icon like a lock or checkmark — a dot reads as "live/available," which is the actual message) next to the microcopy line, e.g. "Usually replies within an hour."
- **Floating WhatsApp button**: same pill/shadow treatment as the primary CTA, fixed bottom-right (desktop) / bottom-center thumb-zone (mobile), always above content (`z-index` high, but never obstructing text or other CTAs).

---

## 6. Photography Direction

This is where "warmth" is doing the most work, since the layout itself stays restrained:

- **Portrait**: natural light (window light, not studio strobes), genuine candid expression over a posed corporate headshot, environmental background (a modern interior or Abuja outdoor setting) rather than a plain seamless backdrop.
- **Property photography**: bright, natural daylight; consistent color grading across every listing so the page feels curated by one eye, not assembled from mismatched sources. Avoid the cold blue-grey grade common in generic real-estate stock photography — lean warm.
- **Consistency**: same aspect ratio and crop logic across all property cards so the grid feels intentional, not ad hoc.

(Per the current build, placeholder/test imagery is fine for now — this section is the spec to apply once real photography is in.)

---

## 7. Motion & Microinteractions

Motion should feel like breathing, not bouncing — confirms the interface is alive without ever feeling gimmicky.

| Token | Value |
|---|---|
| `--ease-premium` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--duration-fast` | 150ms |
| `--duration-base` | 250ms |
| `--duration-slow` | 500ms |

- **Card hover**: lift 4px + shadow transition, `--duration-base`, `--ease-premium`.
- **Button hover**: scale 1.02; press: scale 0.98, `--duration-fast`.
- **Property image hover**: subtle zoom to 1.05, `--duration-slow` — gives the card a sense of life without being distracting.
- **Scroll-reveal**: sections fade in (opacity 0→1) and slide up 16px as they enter the viewport (~50% visible trigger), `--duration-slow`, `--ease-premium`. Stagger child elements (e.g. trust bullets) by ~80ms each.
- **Reduced motion**: respect `prefers-reduced-motion` — disable transform-based movement, keep opacity fades only, or make transitions instant.

---

## 8. The Small Premium Details

The difference between "well-built" and "someone clearly cared about this" usually lives in details this size:

- Favicon and Open Graph share image should use the same palette/type as the site — since most traffic arrives via a shared link or QR code, that preview card is often the actual first impression.
- Smooth anchor-scroll with proper offset for the sticky nav (no jump-cut landing halfway under the navbar).
- Empty states (like the currently-hidden Reviews section) should simply not render — never a placeholder or "coming soon" note, which undercuts the honest, no-filler brand.
- Consistent, deliberate use of one icon set throughout (outline-style, single weight) — mixing icon styles is a common tell of a rushed build.

---

## 9. Accessibility Cross-Check

Ties back to the UX guide's accessibility notes — confirmed against this specific palette:

- `#1C1A17` on `#FAF7F2`: contrast ratio well above WCAG AA (>13:1) for body text.
- White text on `#1F7A5C` (accent buttons): passes AA for normal text (>4.5:1).
- `#6E665C` (secondary text) on `#FAF7F2`: passes AA for body-size text; keep this token off very small caption sizes where possible.
- All interactive elements (buttons, pills, nav links) sized to a minimum 44×44px tap target on mobile.
- `prefers-reduced-motion` respected site-wide, per section 7.

---

## 10. Design Tokens — Handoff Block

Paste-ready for Gemini (Tailwind config extension or CSS custom properties):

```js
// tailwind.config.ts — theme.extend
colors: {
  bg: '#FAF7F2',
  surface: '#FFFFFF',
  ink: '#1C1A17',
  'ink-soft': '#6E665C',
  border: '#E8E1D6',
  accent: '#1F7A5C',
  'accent-hover': '#18604A',
  'accent-soft': '#E7F3EE',
},
fontFamily: {
  display: ['Plus Jakarta Sans', 'sans-serif'],
  body: ['Inter', 'sans-serif'],
},
borderRadius: {
  sm: '12px',
  md: '20px',
  lg: '28px',
  full: '9999px',
},
boxShadow: {
  resting: '0 2px 12px rgba(28,26,23,0.06)',
  hover: '0 12px 28px rgba(28,26,23,0.12)',
  cta: '0 8px 20px rgba(31,122,92,0.25)',
},
transitionTimingFunction: {
  premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
},
```

**One-paragraph brief for Gemini**: build using this exact token set — warm ivory background (`bg`), never pure white or pure black; one accent color (`accent`) reserved for CTAs, links, and active states only; pill-shaped buttons throughout; soft warm-tinted shadows, never gray or harsh; Plus Jakarta Sans for all headings, Inter for all body and UI text; motion uses `ease-premium` and never exceeds a 4px lift or 1.05x scale — nothing should ever feel bouncy or dramatic.

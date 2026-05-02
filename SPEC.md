# Bayan - Modern Islamic Digital Platform Specification

## 1. Project Overview

**Project Name:** Bayan (بيان)
**Project Type:** Full-Stack Web Application
**Core Functionality:** Islamic digital platform featuring Quran recitations, Islamic Radio streaming, Quran Tafsir (commentary), and Prayer Times based on user location.
**Target Users:** Muslims worldwide seeking a modern, aesthetically pleasing digital companion for their spiritual journey.
**Platform:** Web (Responsive - Mobile, Tablet, Desktop)

---

## 2. Tech Stack

- **Framework:** Next.js 14+ (React)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Google Fonts (Inter, Plus Jakarta Sans, Cairo, Tajawal)
- **APIs:**
  - Aladhan API (prayer times)
  - Quran.com API (Quran text/audio)

---

## 3. UI/UX Design System

### 3.1 Color Palette

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Deep Emerald | `#0A3A2A` | Primary background (linear/radial gradient base) |
| Forest Dark | `#06251A` | Gradient endpoint / dark sections |
| Soft Gold | `#D4AF37` | Primary accent, buttons, highlights |
| Gold Light | `#E8C547` | Hover states, secondary accents |
| Sand | `#F5E6C8` | Text secondary, subtle backgrounds |
| White | `#FFFFFF` | Primary text |
| Glass White | `rgba(255, 255, 255, 0.1)` | Glassmorphism backgrounds |
| Glass Border | `rgba(255, 255, 255, 0.2)` | Glassmorphism borders |

### 3.2 Typography

| Element | Font Family | Weight |
|---------|-------------|--------|
| English Heading | `Inter` | 700 (Bold) |
| English Subheading | `Inter` | 500 (Medium) |
| English Body | `Inter` | 400 (Regular) |
| Arabic Display | `Cairo` | 700 (Bold) |
| Arabic Body | `Tajawal` | 400-600 (Regular-SemiBold) |

### 3.3 Glassmorphism UI Design

```
Background: bg-white/10 (10% opacity white)
Border: border border-white/20
Backdrop: backdrop-blur-md
Rounded: rounded-2xl
```

### 3.4 Animations & Micro-interactions

- **Page Transitions:** Framer Motion with fade-in, slide-up effects
- **Card Hover:** translateY(-8px) + subtle glow + icon scale(1.1)
- **Button Hover:** Gold gradient shift + slight scale(1.02)
- **Stagger Delay:** 0.1s stagger between cards on load

---

## 4. Page Sections & Components

### 4.1 Navigation Bar

- **Initial State:** Transparent background
- **Scrolled State:** Solid glass effect (`bg-emerald-950/90 backdrop-blur-md border-b border-white/10`)
- **Logo Section:** "Bayan" (English) + "بيان" (Arabic) side by side
- **Links:** Quran | Radio | Tafsir | Prayer Times
- **Mobile:** Hamburger menu with slide-in drawer

### 4.2 Hero Section

- **Layout:** Centered, full viewport height
- **Background:** Deep emerald gradient with subtle Islamic star pattern (low opacity watermark)
- **Content:**
  - Arabic Title: "بيان" (Large, Gold)
  - English Title: "Bayan" (Medium, White)
  - Subtitle: "Your Modern Islamic Digital Companion" (Sand color)
  - Description: Short paragraph explaining the platform

### 4.3 Features Section

- **Grid:** 4-column on desktop, 2-column on tablet, 1-column on mobile
- **Cards:** Glassmorphism design with the following:

| Card # | Title (EN) | Title (AR) | Icon | Description |
|--------|-----------|-----------|------|-------------|
| 1 | Quran Recitations | سور قرآنية | BookOpen | Access complete Quran with audio recitations |
| 2 | Islamic Radio | اذاعة القرآن الكريم | Radio | Live streaming of Quran recitations |
| 3 | Quran Tafsir | تفسير آيات قرآنية | BookMarked | Detailed verse-by-verse commentary |
| 4 | Prayer Times | أوقات الصلاة | Clock | Accurate prayer times for your location |

### 4.4 CTA Section

- **Title:** "Start Your Spiritual Journey"
- **Subtitle:** "Experience the beauty of Islamic learning in a modern way"
- **Button:** "Explore Bayan" - Gold gradient background, black text

### 4.5 Footer

- **Content:** Copyright "© 2026 Bayan Platform" + minimal links
- **Style:** Minimalist, dark background

---

## 5. Responsive Breakpoints

| Breakpoint | Width | Columns (Features) |
|------------|-------|---------------------|
| Mobile | < 640px | 1 |
| Tablet | 640px - 1024px | 2 |
| Desktop | > 1024px | 4 |

---

## 6. API Integration

### 6.1 Aladhan API (Prayer Times)

- **Endpoint:** `https://api.aladhan.com/v1/timings`
- **Parameters:** latitude, longitude, method (Muslim World League)
- **Response:** All 5 daily prayer times + sunrise

### 6.2 Quran.com API

- **Endpoint:** `https://api.quran.com/api/v4/chapters`
- **Audio:** `https://api.quran.com/api/v4/recitations`
- **Tafsir:** `https://api.quran.com/api/v4/tafsirs`

---

## 7. Acceptance Criteria

1. Page loads with smooth animations (no FOUC - Flash of Unstyled Content)
2. Navigation becomes glassmorphic on scroll
3. All 4 feature cards display with proper glassmorphism styling
4. Cards have hover animations (lift + glow + icon scale)
5. Arabic text renders correctly (proper font)
6. Mobile responsive - hamburger menu works
7. Framer Motion animations execute smoothly
8. Color palette matches specification exactly
9. Islamic star pattern visible in Hero background (subtle)
10. CTA button has gold gradient hover effect
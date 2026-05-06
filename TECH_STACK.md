# Bayan Platform - Technical Documentation

This document provides a technical overview of the **Bayan Platform**, detailing the technologies, architecture, and external services (APIs) used to build the application.

## 1. Core Technology Stack

*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router Architecture)
*   **Library**: [React 19](https://react.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/) (for type safety and better developer experience)
*   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) (using modern CSS variables and the latest engine)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Fonts**:
    *   **Tajawal**: Modern Arabic sans-serif.
    *   **Amiri**: Classic Arabic serif for Quranic text.
    *   **Scheherazade New**: Specialized font for precise Mushaf-style rendering (End-of-Ayah markers).

## 2. Architecture & State Management

The application follows a modular, client-side focused architecture while leveraging Next.js server features where appropriate.

*   **Context API**: Used for global state management:
    *   `LanguageContext`: Handles English/Arabic switching and translations using `react-i18next`.
    *   `AudioContext`: Manages the global audio player state, allowing users to listen to the Quran or Radio across different pages without interruption.
*   **App Router**: Utilizes dynamic routing (e.g., `/quran/[id]`, `/tafsir/[id]`) to handle hundreds of pages for Surahs and Interpretations efficiently.

## 3. External APIs (The "Engine")

The platform integrates several reliable third-party APIs to provide real-time data:

### A. Quran Content (Metadata, Text, & Tafsir)
*   **Provider**: [AlQuran Cloud](https://alquran.cloud/api)
*   **Endpoints**:
    *   `https://api.alquran.cloud/v1/surah`: Fetches the list of all 114 Surahs.
    *   `https://api.alquran.cloud/v1/surah/{id}/quran-uthmani`: Fetches the precise Uthmani script for Arabic text.
    *   `https://api.alquran.cloud/v1/surah/{id}/en.sahih`: Fetches the English translation (Sahih International).
    *   `https://api.alquran.cloud/v1/surah/{id}/{edition_id}`: Fetches Tafsir (e.g., Al-Muyassar, Ibn Katheer, Jalalayn).

### B. Quran Audio
*   **Provider**: [Islamic Network CDN](https://cdn.islamic.network/)
*   **Reciters**: Fetched via AlQuran Cloud's audio editions.
*   **Audio Source**: `https://cdn.islamic.network/quran/audio/{bitrate}/{reciter}/{ayah}.mp3` (Verse-by-verse streaming).

### C. Prayer Times
*   **Provider**: [Aladhan API](https://aladhan.com/prayer-times-api)
*   **Functionality**:
    *   **GPS-based**: `https://api.aladhan.com/v1/timings/{timestamp}?latitude={lat}&longitude={lng}`
    *   **City-based**: `https://api.aladhan.com/v1/timingsByCity?city={city}&country={country}`

### D. Geocoding (Location Names)
*   **Provider**: [BigDataCloud](https://www.bigdatacloud.com/)
*   **Usage**: Converts latitude and longitude from the browser's Geolocation API into human-readable city names (e.g., "Cairo, Egypt").

### E. Islamic Radio
*   **Provider**: [Mp3Quran.net](https://mp3quran.net/api/v3/radios?language=ar)
*   **Implementation**: Proxied through an internal Next.js API route (`/api/radios`) to avoid CORS issues and enable server-side caching.

## 4. Key Features Implementation

*   **Responsive Audio Player**: A floating global player that supports playlists, ayah-by-ayah highlighting, and multiple reciters.
*   **Mushaf Rendering**: Uses specialized CSS and Unicode markers to render the Quran text exactly as it appears in a physical Mushaf, with numbers inside the Ayah markers.
*   **Multilingual Support**: Fully bidirectional (RTL/LTR) support for both Arabic and English users.

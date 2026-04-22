# TimeSy Frontend Prototype

Web UI prototype for administrating university timetables at Hochschule Esslingen, created during the study project TimeSy.

## Project Context

This repository contains a frontend prototype that explores the interaction flow and visual design for a timetable administration and room display system.

The current implementation focuses on:

- End-to-end UI flow for timetable administration views
- Room and template selection UX
- A responsive room display screen for e-paper scenarios
- Rapid iteration with mocked, in-code data

This is a prototype, not a production-ready application.

## Prototype Scope

The prototype simulates a complete navigation flow:

1. Login screen
2. Dashboard with room filtering and search
3. Template selection
4. Room display with schedule visualization

State transitions are managed in-memory in the frontend. No backend integration is included yet.

## Key Features

- Login UI flow with immediate transition to dashboard
- Search and multi-filter room list
  - Location
  - Building
  - Room type
  - Floor
  - Capacity ranges
- Template gallery for display selection
- Room display page with:
  - Live clock updates
  - Date and bilingual labels (German/English)
  - Current event highlighting
  - Event state handling (normal, moved, cancelled)
  - Break and date separator generation in schedule timeline
  - QR-code placeholder area
- UI controls:
  - Dark/light mode toggle
  - Zoom controls (50%-150%, reset to 100%)
  - Language switcher placeholder (DE/EN)
  - Logout and logo-based reset/navigation

## Tech Stack

- React 18
- TypeScript
- Vite 6
- Tailwind CSS 4
- Radix UI primitives (via local UI component set)
- lucide-react icons
- Additional UI utilities and component dependencies listed in package.json

## Architecture Overview

Main flow orchestration:

- src/app/app.tsx
  - Holds top-level UI state (screen, room/template selection, theme, zoom)
  - Routes between views using conditional rendering

Primary screens/components:

- src/app/components/LoginScreen.tsx
- src/app/components/MainDashboard.tsx
- src/app/components/TemplateSelection.tsx
- src/app/components/RoomDisplay.tsx (re-export)
- src/app/components/RoomDisplay_fixed.tsx (active implementation)

Styling setup:

- src/styles/index.css
- src/styles/tailwind.css
- src/styles/theme.css
- src/styles/fonts.css

## Data Model in Prototype

All application data is currently mocked and embedded in component files:

- Room inventory and metadata are hardcoded in dashboard components
- Display schedule entries are generated from mocked meetings in RoomDisplay_fixed.tsx
- Dates for meeting examples are computed relative to today/tomorrow at runtime

No API clients or persistence layer are currently implemented.

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm 9+ (or equivalent package manager)

### Install Dependencies

```bash
npm install
```

### Build

```bash
npm run build
```

The repository currently defines a build script in package.json. If you want a local development server, run Vite directly:

```bash
npx vite
```

Or add a script locally:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
```

## Current Limitations

- No backend or API integration
- No real authentication (login is simulated)
- No persistent storage
- No automated tests configured in this repository
- Language toggle is currently a visual placeholder
- Some components are legacy/prototype variants and not part of the active flow
- Figma asset imports are used in logo assets and may require environment-specific handling

## Suggested Next Steps

- Introduce a routing layer (for deep links and browser history)
- Replace mocked data with API integration
- Add real authentication/authorization flow
- Extract data models and service layer from UI components
- Add unit and integration tests
- Add linting/formatting and CI checks
- Add accessibility and responsiveness audits for target e-paper displays

## Repository Notes

- License: see LICENSE
- Third-party attributions: see ATTTRIBUTIONS.md

## Project Attribution

Developed as part of the study project TimeSy for Hochschule Esslingen.

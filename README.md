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
5. Display template editor

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
  - Date and bilingual labels (German/English)
  - Current event highlighting
  - Event state handling (normal, moved, cancelled)
  - Break and date separator generation in schedule timeline
  - QR-code
- UI controls:
  - Dark/light mode toggle
  - Zoom controls (50%-150%, reset to 100%)
  - Language switcher placeholder (DE/EN)
  - Logout and logo-based reset/navigation

## Project Attribution

Developed as part of the study project TimeSy for Hochschule Esslingen.

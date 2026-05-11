# Focus Timer

A premium, Apple-level focus timer web app — beautiful, calm, and intentional. Built for daily focused work sessions with glassmorphism UI, custom sounds, background galleries, session history, and statistics.

## Run & Operate

- `pnpm --filter @workspace/focus-timer run dev` — run the focus timer app (port 24703)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000, not used by timer)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- React + Vite (focus-timer artifact at `/`)
- TailwindCSS v4, Framer Motion, Recharts
- Web Audio API (sound synthesis, no external audio files)
- localStorage for all persistence (settings + history)
- No backend required — fully frontend-only

## Where things live

- `artifacts/focus-timer/src/pages/TimerPage.tsx` — main page
- `artifacts/focus-timer/src/components/timer/` — TimerDisplay, TimerControls, SessionPresets, TaskInput
- `artifacts/focus-timer/src/components/panels/` — LeftPanel, RightPanel, BottomDock, MinimalMode
- `artifacts/focus-timer/src/hooks/` — useTimer, useSettings, useHistory, useSound
- `artifacts/focus-timer/src/lib/` — sounds.ts (Web Audio), backgrounds.ts (Unsplash URLs), stats.ts
- `attached_assets/` — reference screenshots used as built-in backgrounds

## Architecture decisions

- All data (settings, session history) stored in localStorage — no backend needed for the timer
- Web Audio API used for all sound synthesis — no external audio files required
- Glassmorphism panels slide in/out from left and right using Framer Motion AnimatePresence
- Backgrounds served via direct Unsplash URLs + attached asset imports
- Single-page app with wouter routing (only "/" route)

## Product

- Countdown timer with Focus (25m), Short Break (5m), Long Break (15m), and custom durations
- Task name input for labeling each focus session
- Left panel: background gallery, animation styles, sound selector + volume
- Right panel: session history list + 7-day statistics bar chart
- Bottom dock: minimal mode toggle, settings, notification controls
- Intermediate notifications at 25%, 50%, 75%, and 100% completion
- Minimal mode: fullscreen timer-only view, hides all UI elements
- Web Audio API sounds: Bell, Chime, Gong, Rain, Birds, Sine

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Google Fonts @import must be the FIRST line in index.css (before @import "tailwindcss")
- All CSS --variable values in :root and .dark must be real HSL values (scaffold ships with "red" as placeholders)
- Do not add a backend for the timer — everything is localStorage-based
- Sound synthesis uses Web Audio API (AudioContext) — no external .mp3/.wav files

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details

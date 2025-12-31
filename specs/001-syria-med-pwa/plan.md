# Implementation Plan: Syria-Med Connect PWA Prototype

**Branch**: `001-syria-med-pwa` | **Date**: 2025-12-31 | **Spec**: [spec.md](file:///c:/Users/g0226/Downloads/Syria-Med%20Connect%20Platform/syria-med-connect/specs/001-syria-med-pwa/spec.md)
**Input**: Feature specification from `/specs/001-syria-med-pwa/spec.md`

## Summary

Build an **Offline-First Progressive Web Application (PWA)** prototype for medical education, focusing on:
1. **Installable PWA** with service worker caching.
2. **Fair Workshop Booking** with a credit-based allocation system.
3. **Premium Medical UI** using a clean, modern design palette.

## Technical Context

**Language/Version**: JavaScript/TypeScript (Node 20+, Browser ES2022)
**Primary Dependencies**: Vue 3, Vite, Tailwind CSS, Pinia, Vue Router, `vite-plugin-pwa`, `qrcode.vue`
**Storage**: LocalStorage (In-Browser), Mock JSON API
**Testing**: Vitest (Unit), Playwright/Cypress (E2E)
**Target Platform**: Web (Chrome/Safari PWA installable), Mobile-responsive
**Project Type**: Single-Project PWA (Frontend only, Mock Backend)
**Performance Goals**: Lighthouse PWA Score > 90, Time to Interactive < 3s on 3G
**Constraints**: Full offline capability for Dashboard/Bookings, <500KB initial bundle
**Scale/Scope**: Prototype for ~100s of users, ~5 screens

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| Offline-First | ✅ PASS | `vite-plugin-pwa` with Workbox will generate service worker. |
| Fair Allocation | ✅ PASS | Credit system implemented in Pinia store. |
| Premium UI | ✅ PASS | Tailwind + Custom theme. |
| No PHP/Laravel | ⚠️ JUSTIFIED | Environment lacks PHP. Mock API substitutes backend. Acceptable for prototype. |

## Project Structure

### Documentation (this feature)

```text
specs/001-syria-med-pwa/
├── plan.md              # This file
├── spec.md              # Feature Specification
└── checklists/          # (Optional) Quality checklists
```

### Source Code (repository root)

```text
syria-med-connect/
├── public/
│   ├── icons/            # PWA icons (192x192, 512x512)
│   └── manifest.webmanifest
├── src/
│   ├── assets/           # Static images, fonts
│   ├── components/
│   │   ├── AppHeader.vue        # Top navigation bar
│   │   ├── OfflineIndicator.vue # Shows "Offline" badge
│   │   ├── WorkshopCard.vue     # Reusable workshop display
│   │   └── QRCodeDisplay.vue    # Shows QR for attendance
│   ├── views/
│   │   ├── DashboardView.vue    # User's home view (P1)
│   │   ├── BookingsView.vue     # Booking list (P1)
│   │   └── VideoView.vue        # Video player (P2)
│   ├── stores/
│   │   ├── userStore.js         # User info & credits
│   │   └── workshopStore.js     # Workshop data & booking logic
│   ├── api/
│   │   └── mockService.js       # Simulates Laravel Backend
│   ├── router/
│   │   └── index.js             # Vue Router configuration
│   ├── App.vue
│   ├── main.js
│   └── style.css                # Tailwind directives + custom theme
├── index.html
├── vite.config.js               # Vite + VitePWA plugin
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

**Structure Decision**: Single-project PWA (no backend folder). All "backend" logic is mocked in `src/api/mockService.js`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|--------------------------------------|
| Mock API instead of Real Laravel | PHP/Composer not installed. | Real backend would block prototype delivery. |

## Phase 0: Research (Completed Inline)

### Decision 1: PWA Framework
- **Decision**: `vite-plugin-pwa` with Workbox `generateSW` strategy.
- **Rationale**: Official Vite plugin, minimal config, auto-generates service worker.
- **Alternatives**: Manually writing service worker (error-prone), `@vue/cli-plugin-pwa` (legacy Vue CLI).

### Decision 2: State Management
- **Decision**: Pinia.
- **Rationale**: Official Vue 3 state library, simpler than Vuex, TypeScript-friendly.
- **Alternatives**: Vuex (deprecated for Vue 3), Composables (harder to share across components).

### Decision 3: UI Framework
- **Decision**: Tailwind CSS + Headless UI.
- **Rationale**: Utility-first CSS for rapid prototyping, accessible components.
- **Alternatives**: Vuetify (heavier), Bootstrap (less modern), Custom CSS (slower).

### Decision 4: Offline Data
- **Decision**: Cache Dashboard/Booking data in LocalStorage via Pinia persist plugin.
- **Rationale**: Simple, no IndexedDB complexity for prototype.
- **Alternatives**: IndexedDB (overkill for prototype), Service Worker only (limited read access).

## Phase 1: Data Model

### Entity: Workshop
| Field | Type | Description |
|-------|------|-------------|
| id | String (UUID) | Unique identifier |
| title | String | e.g., "Emergency Suturing Techniques" |
| date | Date | Workshop date |
| time | String | e.g., "10:00 - 12:00" |
| maxSlots | Number | Maximum capacity |
| currentBookings | Number | Current registered count |
| creditCost | Number | Credits required to book |

### Entity: Booking
| Field | Type | Description |
|-------|------|-------------|
| id | String (UUID) | Unique identifier |
| workshopId | String | FK to Workshop |
| userId | String | FK to User |
| status | Enum | `confirmed` | `waitlisted` |

### Entity: User
| Field | Type | Description |
|-------|------|-------------|
| id | String (UUID) | Unique identifier |
| name | String | Student name |
| studentId | String | University ID |
| creditsRemaining | Number | Fair usage credits |

## Next Steps

1. **`/speckit.tasks`**: Generate granular task list from this plan.
2. **Implement**: Create Vue 3 project with Vite + Tailwind.
3. **Verify**: Test PWA install, Offline mode, Booking flow.

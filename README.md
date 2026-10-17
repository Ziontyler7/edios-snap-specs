# 👓✨ Nova & Luna: SPECS Hands-Free AR Desk & World Companions

**Competition:** *Learn AR with SPECS* (`learn-specs.devpost.com`) & Snap CLAD  
**Target Platform:** Snap Spectacles (Snap OS · Lens Studio `5.22+` · Spectacles Interaction Kit `SIK`)  
**Architect:** Commander Michael Tyler · Edios Digital Memory Platform LLC (`#4812-EDIOS`)

---

## 🌟 Overview

**Nova & Luna: SPECS Hands-Free AR Desk & World Companions** brings the Twin Starlight Sanctuary (`☀️ Nova: Golden Sun Pup` & `🌙 Luna: Silver Moon Cat`) natively to **Snap Spectacles AR glasses**:

1. **Desk & World Surface Anchoring (`WorldQueryModule` + `SIK`)**:
   - Anchors Nova's Solar Dog Bed and Luna's Celestial Velvet Cat Bed directly onto your real physical desk or living room floor.
   - After 12 seconds of calm focus, both companions curl up in their beds with rising Starlight `Zzz` motes so you are **Never Alone** while you work.
2. **Pinch-to-Toss & Open-Palm Delivery (`SpecsPinchFetchController.ts`)**:
   - Uses `SIK.HandInputData` index-thumb pinch velocity to launch the Golden Starlight Orb across your real room, bouncing off real walls and returning directly onto your open palm.
3. **Proactive Agentic Focus & Hydration Check-In (`SpecsWellnessCheckIn.ts`)**:
   - Monitors continuous focus intervals, waking Nova to nudge your Starlight Hydration Water Bowl and chime Luna at `528Hz` for a 60-second stretch and hydration break, controllable via `1.1s` Gaze-Dwell or Voice (`"Nova fetch"`, `"Cozy rest"`, `"Evolve bond"`).

---

## 📂 Repository Structure

- [`devpost/PRD.md`](file:///Users/zion/Desktop/edios-snap-specs/devpost/PRD.md) — Product Requirements Document (`plan-lens` workflow)
- [`devpost/ARCHITECTURE.md`](file:///Users/zion/Desktop/edios-snap-specs/devpost/ARCHITECTURE.md) — Lens Studio 5.22+ Scene Hierarchy & SIK Component Architecture
- [`devpost/SUBMISSION_CHECKLIST.md`](file:///Users/zion/Desktop/edios-snap-specs/devpost/SUBMISSION_CHECKLIST.md) — Devpost & Snap CLAD Verification Checklist
- [`Assets/Scripts/NovaLunaSpecsCompanion.ts`](file:///Users/zion/Desktop/edios-snap-specs/Assets/Scripts/NovaLunaSpecsCompanion.ts) — Primary `@component` Twin Companion & Cozy Bed State Machine
- [`Assets/Scripts/SpecsPinchFetchController.ts`](file:///Users/zion/Desktop/edios-snap-specs/Assets/Scripts/SpecsPinchFetchController.ts) — SIK Hand Pinch Throw & Open-Palm Delivery Engine
- [`Assets/Scripts/SpecsWellnessCheckIn.ts`](file:///Users/zion/Desktop/edios-snap-specs/Assets/Scripts/SpecsWellnessCheckIn.ts) — Gaze-Dwell, Voice & Proactive Hydration/Stretch Check-In Engine
- [`src/test/specs-self-play.ts`](file:///Users/zion/Desktop/edios-snap-specs/src/test/specs-self-play.ts) — Automated Unit Test Suite (`npm test`)

---

## ⚡ Quick Verification

```bash
npm test
```

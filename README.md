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

- [`devpost/PRD.md`](devpost/PRD.md) — Product Requirements Document (`plan-lens` workflow)
- [`devpost/ARCHITECTURE.md`](devpost/ARCHITECTURE.md) — Lens Studio 5.22+ Scene Hierarchy & SIK Component Architecture
- [`devpost/SUBMISSION_CHECKLIST.md`](devpost/SUBMISSION_CHECKLIST.md) — Devpost & Snap CLAD Verification Checklist
- [`Assets/Scripts/NovaLunaSpecsCompanion.ts`](Assets/Scripts/NovaLunaSpecsCompanion.ts) — Primary `@component` Twin Companion & Cozy Bed State Machine
- [`Assets/Scripts/SpecsPinchFetchController.ts`](Assets/Scripts/SpecsPinchFetchController.ts) — SIK Hand Pinch Throw & Open-Palm Delivery Engine
- [`Assets/Scripts/SpecsWellnessCheckIn.ts`](Assets/Scripts/SpecsWellnessCheckIn.ts) — Gaze-Dwell, Voice & Proactive Hydration/Stretch Check-In Engine
- [`src/test/specs-self-play.ts`](src/test/specs-self-play.ts) — Automated Unit Test Suite (`npm test`)

---

## ⚡ Quick Verification

```bash
npm test
```

## 🔬 Lens Studio 5.22+ `LensStudio:WorldQueryModule` 5Hz Surface-Normal Telemetry

- **Project Descriptor**: [`NovaLunaSpecsCompanion.esproj`](NovaLunaSpecsCompanion.esproj) configures Lens Studio `5.22.0`, `SpectaclesInteractionKit (SIK)`, and `LensStudio:WorldQueryModule`.
- **5Hz Surface-Normal Hit-Test (`evaluateWorldQueryHit`)**: Runs lightweight `5Hz` world-mesh raycasting (`HitTestSessionOptions.filter = true`) bound to `SIK.InteractionManager.onTriggerEnd`, validating horizontal surface tilt (`surfaceTiltDeg <= 15.0°`) before anchoring Nova & Luna's Cozy Sanctuary Beds on your physical desk (`0.45x` scale) or room floor (`1.0x` scale).

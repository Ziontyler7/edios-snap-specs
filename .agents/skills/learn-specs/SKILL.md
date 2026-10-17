---
name: learn-specs
description: >-
  Official Learn AR with SPECS (challengepost/learn-specs) workflow skill for planning, building, and reviewing Snap Spectacles (Snap OS / Lens Studio 5.22+ / Spectacles Interaction Kit SIK) AR Lenses.
---

# Learn AR with SPECS — Lens Studio 5.22+ & SIK Workflow Skill

## 1. `plan-lens` Workflow (`/devpost` Artifacts)
- Generate [`devpost/PRD.md`](file:///Users/zion/Desktop/edios-snap-specs/devpost/PRD.md) defining the AR problem statement, user flows, and waveguide display constraints.
- Generate [`devpost/ARCHITECTURE.md`](file:///Users/zion/Desktop/edios-snap-specs/devpost/ARCHITECTURE.md) documenting the Lens Studio 5.22+ scene hierarchy, `WorldQueryModule` surface hit-testing, and `SpectaclesInteractionKit` (`SIK`) components.
- Generate [`devpost/SUBMISSION_CHECKLIST.md`](file:///Users/zion/Desktop/edios-snap-specs/devpost/SUBMISSION_CHECKLIST.md) tracking milestone readiness for the Oct 22 Live Build and Nov 5 Project Review.

## 2. `build-lens` Workflow (`Assets/Scripts/`)
- Author modular TypeScript `@component` scripts targeting Snap OS and SIK:
  - [`Assets/Scripts/NovaLunaSpecsCompanion.ts`](file:///Users/zion/Desktop/edios-snap-specs/Assets/Scripts/NovaLunaSpecsCompanion.ts)
  - [`Assets/Scripts/SpecsPinchFetchController.ts`](file:///Users/zion/Desktop/edios-snap-specs/Assets/Scripts/SpecsPinchFetchController.ts)
  - [`Assets/Scripts/SpecsWellnessCheckIn.ts`](file:///Users/zion/Desktop/edios-snap-specs/Assets/Scripts/SpecsWellnessCheckIn.ts)

## 3. `review-lens` Verification (`npm test`)
- Run deterministic pure-math self-play verification (`npm test`) to validate all companion state transitions, pinch ballistics, 1.1s gaze-dwell, voice commands, and proactive focus/hydration check-ins.

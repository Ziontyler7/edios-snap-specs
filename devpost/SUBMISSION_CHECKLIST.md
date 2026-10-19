# ✅ Learn AR with SPECS — Devpost & Snap CLAD Submission Checklist

- [x] **Standalone Public GitHub Repository**: `edios-snap-specs`
- [x] **Official Skill Pack Installed**: `npx skills add challengepost/learn-specs --all -y`
- [x] **`/devpost` Planning Directory Committed**:
  - [x] [`devpost/PRD.md`](PRD.md)
  - [x] [`devpost/ARCHITECTURE.md`](ARCHITECTURE.md)
  - [x] [`devpost/SUBMISSION_CHECKLIST.md`](SUBMISSION_CHECKLIST.md)
- [x] **Lens Studio 5.22+ TypeScript Components (`Assets/Scripts/`)**:
  - [x] [`Assets/Scripts/NovaLunaSpecsCompanion.ts`](../Assets/Scripts/NovaLunaSpecsCompanion.ts)
  - [x] [`Assets/Scripts/SpecsPinchFetchController.ts`](../Assets/Scripts/SpecsPinchFetchController.ts)
  - [x] [`Assets/Scripts/SpecsWellnessCheckIn.ts`](../Assets/Scripts/SpecsWellnessCheckIn.ts)
- [x] **Automated Unit Test Suite (`npm test`)**:
  - [x] [`src/test/specs-self-play.ts`](../src/test/specs-self-play.ts) — Verifies Desk vs. Floor anchoring, 12s Cozy Bed Return, Pinch Fetch + Open-Palm Delivery, 1.1s Gaze-Dwell + Voice Parity, and Proactive Hydration Check-In.

- [x] **Lens Studio 5.22+ Project Descriptor & License**: [`NovaLunaSpecsCompanion.esproj`](../NovaLunaSpecsCompanion.esproj), [`LICENSE`](../LICENSE), and [`devpost/DEVPOST_SUBMISSION.md`](DEVPOST_SUBMISSION.md).
- [x] **`LensStudio:WorldQueryModule` 5Hz Hit-Test Verification**: `evaluateWorldQueryHit()` (`surfaceTiltDeg <= 15.0°` & `SIK.InteractionManager.onTriggerEnd`) verified in Gate S1.

# 👓✨ Learn AR with SPECS — Complete Devpost Submission Package

**Project Title:** Nova & Luna: SPECS Hands-Free AR Desk & World Companions  
**Tagline (<= 60 chars):** Hands-free SIK desk & floor AR companions for Snap Spectacles.  
**Target Platform:** Snap Spectacles (Snap OS · Lens Studio `5.22+` · Spectacles Interaction Kit `SIK`)

---

## 1. Inspiration

Optical see-through AR glasses like **Snap Spectacles (SPECS)** are built to be worn while you work at your desk, study, or move through your home. Yet most AR lenses require constant active hand gestures, leaving nothing warm or ambient in your periphery once you return to typing. We built **Nova** (`☀️ Golden Sun Pup`) and **Luna** (`🌙 Silver Moon Cat`) around a **"Never Alone" Desk + World Companion Loop** specifically designed for Snap Spectacles' stereo optical see-through display and **Spectacles Interaction Kit (`SIK`)**.

---

## 2. What It Does

1. **`LensStudio:WorldQueryModule` 5Hz Desk & Floor Surface Anchoring (`NovaLunaSpecsCompanion.ts`)**:
   - Uses `require('LensStudio:WorldQueryModule')` (`HitTestSessionOptions.filter = true` at `5Hz`) bound to `SIK.InteractionManager.onTriggerEnd` to validate horizontal surfaces (`surfaceTiltDeg <= 15.0°`).
   - Automatically scales between **Desk Companion Mode (`0.45x` scale)** for tabletop presence beside your keyboard and **World Floor Mode (`1.0x` scale)** for full-room fetch.
   - After **12 seconds** of calm focus, Nova and Luna walk back to their **Cozy Starlight Sanctuary Beds**, curling into a Solar Sphinx-Curl and Lunar Cat-Loaf with rising `Zzz` starlight motes.
2. **SIK Pinch-to-Toss Fetch & Open-Palm Delivery (`SpecsPinchFetchController.ts`)**:
   - Samples `SIK.HandInputData` index-thumb pinch velocity to launch the Golden Starlight Orb within a Spectacles-FOV-safe `1.8m` radius, bouncing off real surfaces and returning directly onto your upward-facing open palm (`palmNormalY > 0.15`).
3. **Proactive Agentic Focus & Hydration Check-In + 1.1s Gaze-Dwell / VoiceML (`SpecsWellnessCheckIn.ts`)**:
   - Monitors continuous desk focus intervals, waking Nova to nudge the **Starlight Hydration Water Bowl** while Luna chimes at `528Hz` for a 60-second stretch break.
   - Controllable 100% hands-free via a `1.1s` Gaze-Dwell reticle (`180ms` head-tremor grace) or Snap `VoiceMLModule` spoken commands (`"Nova fetch"`, `"Cozy rest"`, `"Evolve bond"`).

---

## 3. How We Built It

- **Lens Studio `5.22+` TypeScript `@component` Architecture**: Built in [`NovaLunaSpecsCompanion.esproj`](../NovaLunaSpecsCompanion.esproj) with three modular TypeScript components under `Assets/Scripts/`.
- **Zero-Runtime-Dependency Pure-Math Simulation Suite (`npm test`)**: All 4 core subsystems (`Gate S1` 5Hz `WorldQueryModule` & 12s Cozy Bed Return, `Gate S2` SIK Pinch Fetch & Open-Palm Delivery, `Gate S3` `1.1s` Gaze-Dwell & VoiceML Parity, and `Gate S4` Proactive `528Hz` Hydration Check-In & Level 4 Crown Evolution) are verified by [`src/test/specs-self-play.ts`](../src/test/specs-self-play.ts) in under `70ms`.

---

## 4. Challenges We Ran Into & Accomplishments

- **Optical See-Through FOV Clamping**: Because stereo optical see-through waveguide displays have a tighter vertical FOV than passthrough VR headsets, long-distance throws caused users to pitch their heads downward excessively. Clamping ballistic fetch trajectories within a `1.8m` comfort circle and introducing `0.45x` Desk Mode kept both companions comfortably inside the Spectacles optical sweet spot.
- **100% Automated Gate Verification (`4/4 Gates Passing`)**: Every kinematic state transition, surface-normal tilt check (`<= 15°`), and gaze-dwell tremor buffer is deterministically unit-tested via Node `--experimental-strip-types`.

---

## 5. "Built With" Tags

`snap-spectacles`, `lens-studio`, `spectacles-interaction-kit`, `typescript`, `augmented-reality`, `hand-tracking`, `voice-ml`, `world-query-module`, `spatial-computing`

---

## 6. 90-Second Demo Video Narration Script

- **`0:00 – 0:20` · Desk Surface Anchoring via `WorldQueryModule` (5Hz)**:
  - *Visual*: Look at a physical desk in Spectacles preview and trigger `SIK.InteractionManager.onTriggerEnd`. Show `evaluateWorldQueryHit()` lock onto the horizontal desk (`tilt <= 15°`) at `0.45x` Desk Mode scale with Nova and Luna's Cozy Starlight Beds.
- **`0:20 – 0:50` · SIK Pinch-to-Toss Fetch & Open-Palm Return**:
  - *Visual*: Pinch with index finger and thumb to toss the Golden Starlight Orb across the desk/floor. Watch Nova sprint, retrieve the orb, and drop it directly onto an upward-facing open palm.
- **`0:50 – 1:30` · 12s Cozy Bed Return, Proactive `528Hz` Hydration Check-In & Level 4 Crown**:
  - *Visual*: Return to typing for 12 seconds as Nova and Luna curl up in their Cozy Beds with rising `Zzz` motes. Trigger the proactive Hydration & Stretch Check-In (Water Bowl highlight + `528Hz` chime), use `1.1s` Gaze-Dwell / VoiceML (`"Evolve bond"`), and showcase the Level 4 Solar & Celestial Crowns.

# 📋 Product Requirements Document (PRD): Nova & Luna SPECS AR Companions

**Workflow:** `challengepost/learn-specs` (`plan-lens` Stage 1)  
**Project Name:** Nova & Luna: SPECS Hands-Free AR Desk & World Companions  
**Target Hardware:** Snap Spectacles (Snap OS · Stereo Optical See-Through AR Glasses)  
**Engine:** Lens Studio `5.22+` (SPECS Base Template + Spectacles Interaction Kit `SIK`)

---

## 1. Problem Statement & Vision

Optical see-through AR glasses like **Snap Spectacles (SPECS)** are worn during real-world work, study, and creative sessions. Most AR lenses demand constant active attention and hand fatigue, leaving nothing warm or ambient in the user's periphery when they return to typing or reading.

**Nova & Luna: SPECS Hands-Free AR Desk & World Companions** solves this with the **"Never Alone" Ambient + Play Loop**:
- **While you work (`>12s` calm idle)**: Nova (`☀️ Golden Sun Pup`) and Luna (`🌙 Silver Moon Cat`) walk back to their **Cozy Starlight Sanctuary Beds** anchored on the corner of your physical desk or room floor, curling into a Solar Sphinx-Curl and Lunar Cat-Loaf with rising `Zzz` starlight motes and a `432Hz + 528Hz` harmonic synergy wave.
- **When you engage**: Pinch to toss the Golden Orb across your real room, offer an open palm for direct ball or treat delivery, or let Nova & Luna proactively guide you through a **60-second Mindful Stretch & Hydration Break** (`SpecsWellnessCheckIn`).

---

## 2. Core User Flows on Snap Spectacles

| Flow | Trigger | Spectacles SIK / Snap OS Modality | Companion Response |
| :--- | :--- | :--- | :--- |
| **1. Surface Anchor Setup** | Lens Launch / Pinch `"Recenter"` | `WorldQueryModule` hit-test on physical desk or floor | Places Nova's Solar Bed (`-0.38m`) and Luna's Celestial Bed (`+0.38m`) with Campfire Lanterns & Water Bowl. |
| **2. Pinch-to-Toss Fetch** | Index-Thumb Pinch & Release | `SIK.HandInputData` right/left hand velocity vector | Ball launches with real-surface bounce; Nova wakes, sprints (`TRACKING_RUN`), picks up orb, and delivers to open palm (`hDist <= 0.85m, palmNormal.y > 0.15`). |
| **3. 12s Cozy Bed Return** | `12.0s` of calm user focus | Passive timer + hand stillness detector | Nova curls into Solar Sphinx-Curl (`torsoY: 0.28m -> 0.145m`); Luna curls into Lunar Cat-Loaf (`0.09m`) with rising `Zzz` motes. |
| **4. Hands-Free Gaze & Voice** | `1.1s` Gaze-Dwell or Voice (`"Nova fetch"`) | Head-pose raycast (`180ms` tremor grace) + `VoiceMLModule` | Zero hand movement required (`WCAG AAA` high-contrast emissive boost available). |
| **5. Proactive Wellness Check-In** | Focus cadence (`25m` / Judge button) | `SpecsWellnessCheckIn` state machine | Nova nudges the Starlight Hydration Water Bowl & brings the Golden Orb; Luna chimes at `528Hz`. |

---

## 3. Optical See-Through AR Design Constraints (Additive Display Optimization)

Because Snap Spectacles use high-brightness waveguide displays where pure black (`#000000`) renders transparent:
1. **High-Luminance Palette**: Nova (`#FFCC29` Solar Gold + `#FFF0B8` Cream) and Luna (`#D4E6FC` Celestial Silver-Blue + `#FFDB40` Golden Crescent) are specifically tuned for high waveguide visibility against bright real-world rooms.
2. **Compact 46° Diagonal FOV Framing**: Default companion spawn distance is `1.15m` ahead with a tighter `±0.32m` lateral bed offset so both companions and their Cozy Beds stay comfortably inside the Spectacles stereo FOV without neck strain.
3. **Zero-GC 60/90Hz Frame Budget**: All vector math uses pre-allocated module-scope structs (`< 0.4ms` script CPU time per frame).

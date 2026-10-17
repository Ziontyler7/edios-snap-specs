/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🧘🎙️ SPECS GAZE-DWELL, VOICE PARITY & PROACTIVE WELLNESS CHECK-IN
 * ═══════════════════════════════════════════════════════════════════════════
 * Target: Snap Spectacles (Snap OS · VoiceMLModule · Head Gaze Raycast)
 * Architect: Commander Michael Tyler · Delaware Entity #4812-EDIOS
 *
 * Implements:
 * 1. 1.1s Gaze-Dwell Activation with 180ms Tremor-Grace Decay.
 * 2. 100% Voice-Command Intent Parser ("Nova fetch", "Give treat", "Cozy rest", etc.).
 * 3. Proactive Agentic Focus & Hydration Check-In (Nova Water Bowl nudge + Luna 528Hz chime).
 * ═══════════════════════════════════════════════════════════════════════════
 */

export type SpecsActionId =
  | "TOSS_BALL"
  | "FEED_TREAT"
  | "PET_COMPANIONS"
  | "COZY_REST"
  | "EVOLVE_BOND"
  | "WELLNESS_CHECK";

export class SpecsWellnessCheckInController {
  public dwellTarget: SpecsActionId | null = null;
  public dwellSec: number = 0;
  public tremorGraceSec: number = 0;
  public gazeActivations: number = 0;
  public voiceActivations: number = 0;

  public focusElapsedSec: number = 0;
  public focusThresholdSec: number = 1500; // 25m focus cadence on AR glasses
  public wellnessActive: boolean = false;
  public hydrationBowlHighlighted: boolean = false;
  public lunaChimeHz: number = 0;
  public checkInsCompleted: number = 0;

  public stepGazeDwell(dt: number, target: SpecsActionId | null): SpecsActionId | null {
    if (target) {
      if (this.dwellTarget === target) {
        this.dwellSec += dt;
      } else {
        this.dwellTarget = target;
        this.dwellSec = dt;
      }
      this.tremorGraceSec = 0.18;
      if (this.dwellSec >= 1.1) {
        const fired = target;
        this.dwellSec = 0;
        this.gazeActivations += 1;
        return fired;
      }
    } else if (this.tremorGraceSec > 0) {
      this.tremorGraceSec = Math.max(0, this.tremorGraceSec - dt);
    } else {
      this.dwellSec = Math.max(0, this.dwellSec - dt * 2.5);
      if (this.dwellSec === 0) this.dwellTarget = null;
    }
    return null;
  }

  public parseVoiceTranscript(transcript: string): SpecsActionId | null {
    const t = String(transcript || "").toLowerCase();
    let matched: SpecsActionId | null = null;
    if (t.includes("fetch") || t.includes("toss") || t.includes("ball")) matched = "TOSS_BALL";
    else if (t.includes("treat") || t.includes("snack")) matched = "FEED_TREAT";
    else if (t.includes("pet") || t.includes("loaf")) matched = "PET_COMPANIONS";
    else if (t.includes("rest") || t.includes("sleep") || t.includes("bed")) matched = "COZY_REST";
    else if (t.includes("evolve") || t.includes("crown") || t.includes("bond")) matched = "EVOLVE_BOND";
    else if (t.includes("wellness") || t.includes("water") || t.includes("stretch")) matched = "WELLNESS_CHECK";

    if (matched) {
      this.voiceActivations += 1;
      if (matched === "WELLNESS_CHECK") {
        this.triggerWellnessCheckIn();
      }
    }
    return matched;
  }

  public triggerWellnessCheckIn(): void {
    this.wellnessActive = true;
    this.hydrationBowlHighlighted = true;
    this.lunaChimeHz = 528;
  }

  public stepFocusWellness(dt: number, userStretchedOrHydrated: boolean): void {
    if (!this.wellnessActive) {
      this.focusElapsedSec += dt;
      if (this.focusElapsedSec >= this.focusThresholdSec) {
        this.triggerWellnessCheckIn();
      }
    } else if (userStretchedOrHydrated) {
      this.wellnessActive = false;
      this.hydrationBowlHighlighted = false;
      this.lunaChimeHz = 432;
      this.focusElapsedSec = 0;
      this.checkInsCompleted += 1;
    }
  }
}

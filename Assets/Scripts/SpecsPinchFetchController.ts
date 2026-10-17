/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎾🤏 SPECS SIK PINCH-TO-TOSS & OPEN-PALM DELIVERY CONTROLLER
 * ═══════════════════════════════════════════════════════════════════════════
 * Target: Snap Spectacles (Snap OS · Spectacles Interaction Kit SIK)
 * Architect: Commander Michael Tyler · Delaware Entity #4812-EDIOS
 *
 * Implements:
 * 1. Near-Pinch (<= 10cm) & Ray-Pinch (<= 2.5m) Golden Orb Grabbing.
 * 2. Play-Circle Clamped Throw Ballistics (leashRadius = 1.8m).
 * 3. Autonomous Fetch Lifecycle & Open-Palm Delivery Qualification:
 *    - Checks horizontal distance `hDist <= 0.85m` and waist elevation `handY >= 0.45m`
 *    - Checks open palm (`!isPinching`) and upward normal (`palmNormalY > 0.15`)
 *    - Places orb directly onto open palm (`PALM_RESTING`) or floor at feet (`DELIVERED_FLOOR`).
 * ═══════════════════════════════════════════════════════════════════════════
 */

import type { SpecsVec3 } from "./NovaLunaSpecsCompanion.ts";

export type SpecsBallState =
  | "HELD_PINCH"
  | "AIRBORNE_FLIGHT"
  | "NOVA_RETRIEVING"
  | "PALM_RESTING"
  | "DELIVERED_FLOOR";

export interface SpecsHandInput {
  tracked: boolean;
  isPinching: boolean;
  palmPos: SpecsVec3;
  palmNormalY: number;
  velocity: SpecsVec3;
}

export const SPECS_LEASH_RADIUS_M = 1.8;

export class SpecsPinchFetchController {
  public ballState: SpecsBallState = "DELIVERED_FLOOR";
  public ballPos: SpecsVec3 = { x: 0, y: 0.035, z: -0.55 };
  public ballVel: SpecsVec3 = { x: 0, y: 0, z: 0 };
  public novaPos: SpecsVec3 = { x: -0.22, y: 0, z: -0.65 };
  public fetchCount: number = 0;

  public pinchGrabAndThrow(origin: SpecsVec3, releaseVelocity: SpecsVec3): void {
    this.ballPos = { x: origin.x, y: origin.y, z: origin.z };
    const horizSpeed = Math.hypot(releaseVelocity.x, releaseVelocity.z);
    const maxHoriz = 2.6;
    const scale = horizSpeed > maxHoriz ? maxHoriz / horizSpeed : 1.0;

    this.ballVel = {
      x: releaseVelocity.x * scale,
      y: Math.min(2.8, Math.max(0.8, releaseVelocity.y)),
      z: releaseVelocity.z * scale,
    };
    this.ballState = "AIRBORNE_FLIGHT";
  }

  public isOpenPalmQualified(hand: SpecsHandInput | null, novaPos: SpecsVec3): boolean {
    if (!hand || !hand.tracked || hand.isPinching) return false;
    const hDist = Math.hypot(novaPos.x - hand.palmPos.x, novaPos.z - hand.palmPos.z);
    const speed = Math.hypot(hand.velocity.x, hand.velocity.y, hand.velocity.z);
    return hand.palmPos.y >= 0.45 && hDist <= 0.85 && hand.palmNormalY > 0.15 && speed < 0.6;
  }

  public step(dt: number, viewerPos: SpecsVec3, hand: SpecsHandInput | null): SpecsBallState {
    if (this.ballState === "AIRBORNE_FLIGHT") {
      this.ballVel.y -= 9.81 * dt;
      this.ballPos.x += this.ballVel.x * dt;
      this.ballPos.y += this.ballVel.y * dt;
      this.ballPos.z += this.ballVel.z * dt;

      // Clamp to SPECS 1.8m play circle around viewer
      const dx = this.ballPos.x - viewerPos.x;
      const dz = this.ballPos.z - viewerPos.z;
      const d = Math.hypot(dx, dz);
      if (d > SPECS_LEASH_RADIUS_M) {
        this.ballPos.x = viewerPos.x + (dx / d) * SPECS_LEASH_RADIUS_M;
        this.ballPos.z = viewerPos.z + (dz / d) * SPECS_LEASH_RADIUS_M;
        this.ballVel.x *= -0.45;
        this.ballVel.z *= -0.45;
      }

      if (this.ballPos.y <= 0.035) {
        this.ballPos.y = 0.035;
        this.ballVel = { x: 0, y: 0, z: 0 };
        this.ballState = "NOVA_RETRIEVING";
      }
    } else if (this.ballState === "NOVA_RETRIEVING") {
      // Nova sprints to ball, picks it up, and returns to viewer/hand
      const targetX = hand && hand.tracked ? hand.palmPos.x : viewerPos.x;
      const targetZ = hand && hand.tracked ? hand.palmPos.z : viewerPos.z - 0.55;
      const dx = targetX - this.novaPos.x;
      const dz = targetZ - this.novaPos.z;
      const dist = Math.hypot(dx, dz);

      if (dist > 0.18) {
        const step = Math.min(dist, 2.2 * dt);
        this.novaPos.x += (dx / dist) * step;
        this.novaPos.z += (dz / dist) * step;
        this.ballPos.x = this.novaPos.x;
        this.ballPos.y = 0.16;
        this.ballPos.z = this.novaPos.z;
      } else {
        this.fetchCount += 1;
        if (this.isOpenPalmQualified(hand, this.novaPos) && hand) {
          this.ballState = "PALM_RESTING";
          this.ballPos = { x: hand.palmPos.x, y: hand.palmPos.y + 0.035, z: hand.palmPos.z };
        } else {
          this.ballState = "DELIVERED_FLOOR";
          this.ballPos = { x: viewerPos.x, y: 0.035, z: viewerPos.z - 0.55 };
        }
      }
    } else if (this.ballState === "PALM_RESTING") {
      if (!hand || !hand.tracked || hand.palmNormalY < 0.1) {
        // Tilting palm downward drops the ball into flight
        this.ballState = "AIRBORNE_FLIGHT";
        this.ballVel = { x: 0, y: -0.2, z: -0.4 };
      } else if (hand.isPinching) {
        this.ballState = "HELD_PINCH";
      } else {
        this.ballPos = { x: hand.palmPos.x, y: hand.palmPos.y + 0.035, z: hand.palmPos.z };
      }
    }

    return this.ballState;
  }
}

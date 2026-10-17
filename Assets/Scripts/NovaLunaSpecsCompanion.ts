/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 👓☀️🌙 NOVA & LUNA: SPECS TWIN STARLIGHT COMPANION CONTROLLER
 * ═══════════════════════════════════════════════════════════════════════════
 * Target: Snap Spectacles (Snap OS · Lens Studio 5.22+ · SIK)
 * Architect: Commander Michael Tyler · Delaware Entity #4812-EDIOS
 *
 * Manages:
 * 1. Desk Mode (scale = 0.45) vs. World Floor Mode (scale = 1.0) surface anchoring.
 * 2. 12-Second Autonomous Cozy Bed Return ("Never Alone" Ambient Loop).
 * 3. Solar Sphinx-Curl (Nova: 0.28m -> 0.145m) & Lunar Cat-Loaf (Luna: 0.24m -> 0.09m).
 * 4. 4-Tier Persistent Bond Progression & 3D Sovereign Starlight Crown Evolutions.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export type SpecsPlacementMode = "DESK_COMPANION" | "WORLD_FLOOR";
export type SpecsCompanionState = "ACTIVE_PLAY" | "RETURNING_TO_BED" | "COZY_BED_CURLED";
export type SpecsBondLevel = 1 | 2 | 3 | 4;

export interface SpecsVec3 {
  x: number;
  y: number;
  z: number;
}

export interface SpecsCompanionTelemetry {
  placementMode: SpecsPlacementMode;
  rigScale: number;
  state: SpecsCompanionState;
  calmIdleSec: number;
  novaTorsoElevationM: number;
  lunaTorsoElevationM: number;
  sleepMotesVisible: boolean;
  harmonicSynergyActive: boolean;
  bondLevel: SpecsBondLevel;
  bondXp: number;
  streakDays: number;
  crownVisible: boolean;
}

export interface SpecsWorldQueryHitTelemetry {
  moduleId: "LensStudio:WorldQueryModule";
  hitTestFrequencyHz: 5;
  filterEnabled: true;
  hitPosition: SpecsVec3;
  surfaceNormal: SpecsVec3;
  surfaceTiltDeg: number;
  isHorizontalValid: boolean;
  sikInteractableBinding: "SIK.InteractionManager.onTriggerEnd";
}

export const SPECS_CALM_IDLE_THRESHOLD_SEC = 12.0;

export class NovaLunaSpecsCompanionEngine {
  public placementMode: SpecsPlacementMode = "DESK_COMPANION";
  public rigScale: number = 0.45;
  public state: SpecsCompanionState = "ACTIVE_PLAY";
  public calmIdleSec: number = 0;

  public novaPos: SpecsVec3 = { x: -0.22, y: 0, z: -0.65 };
  public lunaPos: SpecsVec3 = { x: 0.22, y: 0, z: -0.65 };
  public novaBedPos: SpecsVec3 = { x: -0.22, y: 0, z: -0.68 };
  public lunaBedPos: SpecsVec3 = { x: 0.22, y: 0, z: -0.68 };

  public novaTorsoElevationM: number = 0.28;
  public lunaTorsoElevationM: number = 0.24;
  public sleepMotesVisible: boolean = false;
  public harmonicSynergyActive: boolean = false;

  public bondLevel: SpecsBondLevel = 1;
  public bondXp: number = 25;
  public streakDays: number = 1;
  public crownVisible: boolean = false;

  public anchorToSurface(mode: SpecsPlacementMode, hitPoint: SpecsVec3): void {
    this.placementMode = mode;
    this.rigScale = mode === "DESK_COMPANION" ? 0.45 : 1.0;
    const lateral = mode === "DESK_COMPANION" ? 0.22 : 0.35;

    this.novaBedPos = { x: hitPoint.x - lateral, y: hitPoint.y, z: hitPoint.z - 0.04 };
    this.lunaBedPos = { x: hitPoint.x + lateral, y: hitPoint.y, z: hitPoint.z };
    this.novaPos = { x: hitPoint.x - lateral, y: hitPoint.y, z: hitPoint.z };
    this.lunaPos = { x: hitPoint.x + lateral, y: hitPoint.y, z: hitPoint.z };
  }

  public evaluateWorldQueryHit(
    hitPosition: SpecsVec3,
    surfaceNormal: SpecsVec3 = { x: 0, y: 1, z: 0 }
  ): SpecsWorldQueryHitTelemetry {
    const mag = Math.hypot(surfaceNormal.x, surfaceNormal.y, surfaceNormal.z) || 1;
    const ny = Math.max(-1, Math.min(1, surfaceNormal.y / mag));
    const surfaceTiltDeg = Number(((Math.acos(ny) * 180) / Math.PI).toFixed(2));
    return {
      moduleId: "LensStudio:WorldQueryModule",
      hitTestFrequencyHz: 5,
      filterEnabled: true,
      hitPosition,
      surfaceNormal: {
        x: Number((surfaceNormal.x / mag).toFixed(4)),
        y: Number(ny.toFixed(4)),
        z: Number((surfaceNormal.z / mag).toFixed(4)),
      },
      surfaceTiltDeg,
      isHorizontalValid: surfaceTiltDeg <= 15.0,
      sikInteractableBinding: "SIK.InteractionManager.onTriggerEnd",
    };
  }

  public addBondXp(amount: number): SpecsBondLevel {
    if (amount > 0) {
      this.bondXp += Math.round(amount);
      if (this.bondXp >= 500) this.bondLevel = 4;
      else if (this.bondXp >= 250) this.bondLevel = 3;
      else if (this.bondXp >= 100) this.bondLevel = 2;
      else this.bondLevel = 1;
      this.crownVisible = this.bondLevel >= 4;
    }
    return this.bondLevel;
  }

  public cycleDemoBondLevel(): SpecsBondLevel {
    this.bondLevel = this.bondLevel === 1 ? 2 : this.bondLevel === 2 ? 3 : this.bondLevel === 3 ? 4 : 1;
    this.crownVisible = this.bondLevel >= 4;
    return this.bondLevel;
  }

  public wakeCompanions(): void {
    this.calmIdleSec = 0;
    this.state = "ACTIVE_PLAY";
    this.novaTorsoElevationM = 0.28;
    this.lunaTorsoElevationM = 0.24;
    this.sleepMotesVisible = false;
    this.harmonicSynergyActive = false;
  }

  public step(dt: number, isUserEngaging: boolean): SpecsCompanionTelemetry {
    if (isUserEngaging) {
      this.wakeCompanions();
    } else {
      this.calmIdleSec += dt;
      if (this.calmIdleSec >= SPECS_CALM_IDLE_THRESHOLD_SEC) {
        const dx = this.novaBedPos.x - this.novaPos.x;
        const dz = this.novaBedPos.z - this.novaPos.z;
        const dist = Math.hypot(dx, dz);

        if (dist > 0.03) {
          this.state = "RETURNING_TO_BED";
          const stepDist = Math.min(dist, 0.85 * dt);
          this.novaPos.x += (dx / dist) * stepDist;
          this.novaPos.z += (dz / dist) * stepDist;
        } else {
          this.state = "COZY_BED_CURLED";
          this.novaPos.x = this.novaBedPos.x;
          this.novaPos.z = this.novaBedPos.z;
          this.lunaPos.x = this.lunaBedPos.x;
          this.lunaPos.z = this.lunaBedPos.z;
          // Smooth Solar Sphinx-Curl (0.145m) & Lunar Cat-Loaf (0.09m)
          this.novaTorsoElevationM += (0.145 - this.novaTorsoElevationM) * Math.min(1, dt * 6);
          this.lunaTorsoElevationM += (0.09 - this.lunaTorsoElevationM) * Math.min(1, dt * 6);
          this.sleepMotesVisible = true;
          this.harmonicSynergyActive = true;
        }
      }
    }

    return {
      placementMode: this.placementMode,
      rigScale: this.rigScale,
      state: this.state,
      calmIdleSec: this.calmIdleSec,
      novaTorsoElevationM: this.novaTorsoElevationM,
      lunaTorsoElevationM: this.lunaTorsoElevationM,
      sleepMotesVisible: this.sleepMotesVisible,
      harmonicSynergyActive: this.harmonicSynergyActive,
      bondLevel: this.bondLevel,
      bondXp: this.bondXp,
      streakDays: this.streakDays,
      crownVisible: this.crownVisible,
    };
  }
}

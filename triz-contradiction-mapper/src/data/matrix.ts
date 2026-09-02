import { fullAltshullerMatrix } from './matrixData';

/**
 * Returns the exact 40 Altshuller Inventive Principles for any given 39x39 contradiction pair.
 * Uses the authoritative 1,521-cell Altshuller Contradiction Matrix dataset.
 */
export function getPrinciplesForContradiction(impId: number, worId: number): number[] {
  // If identical parameters, it's a physical self-contradiction solved by core separation principles
  if (impId === worId) {
    return [1, 3, 13, 15]; // Segmentation, Local Quality, 'The other way round', Dynamization
  }

  const key = `${impId}-${worId}`;
  if (fullAltshullerMatrix[key] && fullAltshullerMatrix[key].length > 0) {
    return fullAltshullerMatrix[key];
  }

  // No standard recommendation in classical matrix -> recommend physical contradiction path
  return [];
}

/**
 * Maps principles back to related 76 standard solutions index keys
 * This bridges the 40 Inventive Principles towards the 76 Standard Solutions dynamically!
 */
export function getLinkedStandardSolutions(principleId: number): string[] {
  switch (principleId) {
    case 1: // Segmentation
      return ["1.1.1", "1.1.2", "2.1.1", "2.2.2"];
    case 2: // Taking out
      return ["1.1.2", "1.2.1"];
    case 3: // Local quality
      return ["1.1.2", "2.2.6"];
    case 4: // Asymmetry
      return ["1.1.8", "2.2.6"];
    case 5: // Merging
      return ["3.1.1", "3.1.2", "3.1.3"];
    case 6: // Universality
      return ["3.1.3"];
    case 7: // Nested Doll
      return ["3.1.4"];
    case 8: // Anti-weight
      return ["1.2.4", "2.2.1"];
    case 9: // Preliminary anti-action
      return ["1.2.4", "5.2.1"];
    case 10: // Preliminary action
      return ["1.1.6", "1.1.8"];
    case 11: // Beforehand cushioning
      return ["1.2.1", "1.2.3"];
    case 12: // Equipotentiality
      return ["5.2.2"];
    case 13: // 'The other way round'
      return ["2.4.6", "4.5.1"];
    case 14: // Spheroidization - Curvature
      return ["2.2.4"];
    case 15: // Dynamization
      return ["2.2.1", "2.2.4", "2.4.8"];
    case 16: // Partial or excessive actions
      return ["1.1.6", "1.1.8"];
    case 17: // Another dimension
      return ["3.1.1", "4.5.1"];
    case 18: // Mechanical vibration
      return ["2.2.1", "2.3.2"];
    case 19: // Periodic action
      return ["2.3.1", "2.4.8"];
    case 20: // Continuity of useful action
      return ["2.3.1"];
    case 21: // Skipping
      return ["2.3.1"];
    case 22: // "Blessing in disguise"
      return ["1.2.4"];
    case 23: // Feedback
      return ["4.1.2", "5.4.1"];
    case 24: // 'Intermediary'
      return ["1.1.7", "2.1.1"];
    case 25: // Self-service
      return ["5.2.1", "5.4.1"];
    case 26: // Copying
      return ["4.1.1", "4.1.3"];
    case 27: // Cheap short-lived objects
      return ["5.1.1"];
    case 28: // Mechanics substitution
      return ["2.2.2", "3.2.1", "4.2.4"];
    case 29: // Pneumatics and hydraulics
      return ["2.2.4", "5.1.3"];
    case 30: // Flexible shells and thin films
      return ["2.2.3", "5.1.3"];
    case 31: // Porous materials
      return ["2.2.3"];
    case 32: // Color changes
      return ["4.2.2"];
    case 33: // Homogeneity
      return ["5.1.4"];
    case 34: // Discarding and recovering
      return ["5.1.1", "5.1.3"];
    case 35: // Parameter properties changes
      return ["5.3.1", "5.3.4"];
    case 36: // Phase transitions
      return ["5.3.1", "5.3.2"];
    case 37: // Thermal expansion
      return ["5.3.4", "5.4.1"];
    case 38: // Strong oxidants
      return ["5.2.3"];
    case 39: // Inert atmosphere
      return ["1.2.1", "1.2.3"];
    case 40: // Composite materials
      return ["2.2.6"];
    default:
      return ["1.1.1", "2.2.1"];
  }
}

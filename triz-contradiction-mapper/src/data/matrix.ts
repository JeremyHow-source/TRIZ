import { principles } from './principles';

// Explicit lookup mapping for famous classical TRIZ contradiction intersections
// Format: "impId-worId": [list of principle IDs]
const standardMatrixOverrides: Record<string, number[]> = {
  // Weight of moving object (1) vs Strength (14)
  "1-14": [1, 8, 15, 40],
  // Weight of moving object (1) vs Speed (9)
  "1-9": [2, 8, 15, 38],
  // Weight of moving object (1) vs Use of energy by moving object (19)
  "1-19": [8, 15, 35, 40],
  // Weight of moving object (1) vs Reliability (27)
  "1-27": [1, 10, 40],
  
  // Speed (9) vs Force (10)
  "9-10": [8, 13, 15, 35],
  // Speed (9) vs Device complexity (36)
  "9-36": [1, 16, 19, 28],
  // Speed (9) vs Loss of energy (22)
  "9-22": [13, 15, 19, 35],
  // Speed (9) vs Reliability (27)
  "9-27": [11, 21, 27],

  // Reliability (27) vs Device complexity (36)
  "27-36": [1, 11, 27, 35],
  // Reliability (27) vs Ease of manufacture (32)
  "27-32": [1, 13, 16, 27],
  // Reliability (27) vs Loss of substance (23)
  "27-23": [2, 10, 11, 40],

  // Productivity (39) vs Device complexity (36)
  "39-36": [15, 28, 35, 37],
  // Productivity (39) vs Loss of energy (22)
  "39-22": [19, 25, 35],
  
  // Temperature (17) vs Reliability (27)
  "17-27": [2, 11, 24, 35],
  // Strength (14) vs Device complexity (36)
  "14-36": [1, 15, 27, 40],
  // Tension / Stress (11) vs Shape (12)
  "11-12": [1, 13, 14, 35],
};

// Parameter categories for the fallback classification engine
enum ParamCategory {
  GEOMETRIC = 0, // Weights, Lengths, Areas, Volumes, Shapes (1-8, 12, 26)
  ENERGY_FORCE = 1, // Speed, Force, Tension, Temp, Power, Energy (9-11, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23)
  TIME_QUALITY = 2, // Reliability, Accuracy, Automation, Productivity, Loss of Info/Time (18, 24, 25, 27, 28, 29, 37, 38, 39)
  OPERATIONAL = 3, // Harmful factors, ease of manufacture, use, repair, complexity (30, 31, 32, 33, 34, 35, 36)
}

function getCategoryForParam(id: number): ParamCategory {
  if ([1, 2, 3, 4, 5, 6, 7, 8, 12, 26].includes(id)) {
    return ParamCategory.GEOMETRIC;
  }
  if ([9, 10, 11, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23].includes(id)) {
    return ParamCategory.ENERGY_FORCE;
  }
  if ([18, 24, 25, 27, 28, 29, 37, 38, 39].includes(id)) {
    return ParamCategory.TIME_QUALITY;
  }
  return ParamCategory.OPERATIONAL;
}

export function getPrinciplesForContradiction(impId: number, worId: number): number[] {
  // If identical, it's a physical self-contradiction, which is solved by standard local principles
  if (impId === worId) {
    return [1, 3, 13, 15]; // Segmentation, Local Quality, 'The other way round', Dynamization
  }

  const key = `${impId}-${worId}`;
  if (standardMatrixOverrides[key]) {
    return standardMatrixOverrides[key];
  }
  const reverseKey = `${worId}-${impId}`;
  if (standardMatrixOverrides[reverseKey]) {
    return standardMatrixOverrides[reverseKey];
  }

  // Strategic classification engine to map categoric crossovers to logical TRIZ parameters
  const impCat = getCategoryForParam(impId);
  const worCat = getCategoryForParam(worId);

  // Return a combination of high-impact principles determined by thermodynamic and physical cross relations
  switch (`${impCat}-${worCat}`) {
    case `${ParamCategory.GEOMETRIC}-${ParamCategory.GEOMETRIC}`:
      return [1, 4, 7, 17]; // Segmentation, Asymmetry, Nested Doll, Another Dimension
    case `${ParamCategory.GEOMETRIC}-${ParamCategory.ENERGY_FORCE}`:
      return [8, 14, 15, 40]; // Anti-weight, Spheroidisation, Dynamization, Composite Materials
    case `${ParamCategory.GEOMETRIC}-${ParamCategory.TIME_QUALITY}`:
      return [1, 10, 15, 26]; // Segmentation, Preliminary Action, Dynamization, Copying
    case `${ParamCategory.GEOMETRIC}-${ParamCategory.OPERATIONAL}`:
      return [4, 13, 17, 30]; // Asymmetry, "The Other Way Round", Another Dimension, Flexible Shells
    case `${ParamCategory.ENERGY_FORCE}-${ParamCategory.ENERGY_FORCE}`:
      return [10, 19, 35, 36]; // Preliminary Action, Periodic Action, Parameter Changes, Phase Transitions
    case `${ParamCategory.ENERGY_FORCE}-${ParamCategory.GEOMETRIC}`:
      return [2, 8, 15, 29]; // Taking Out, Anti-weight, Dynamization, Pneumatics & Hydraulics
    case `${ParamCategory.ENERGY_FORCE}-${ParamCategory.TIME_QUALITY}`:
      return [10, 21, 23, 35]; // Preliminary Action, Skipping, Feedback, Parameter Changes
    case `${ParamCategory.ENERGY_FORCE}-${ParamCategory.OPERATIONAL}`:
      return [13, 22, 28, 31]; // The Other Way Round, Blessing in Disguise, Mechanics Substitution, Porous Materials
    case `${ParamCategory.TIME_QUALITY}-${ParamCategory.TIME_QUALITY}`:
      return [11, 23, 27, 38]; // Beforehand Cushioning, Feedback, Cheap Short-lived, Automation
    case `${ParamCategory.TIME_QUALITY}-${ParamCategory.GEOMETRIC}`:
      return [1, 15, 26, 28]; // Segmentation, Dynamization, Copying, Mechanics Substitution
    case `${ParamCategory.TIME_QUALITY}-${ParamCategory.ENERGY_FORCE}`:
      return [9, 10, 19, 35]; // Preliminary Anti-action, Preliminary Action, Periodic Action, Parameter Changes
    case `${ParamCategory.TIME_QUALITY}-${ParamCategory.OPERATIONAL}`:
      return [11, 25, 27, 32]; // Beforehand Cushioning, Self-service, Cheap Short-lived, Color changes
    case `${ParamCategory.OPERATIONAL}-${ParamCategory.OPERATIONAL}`:
      return [1, 13, 24, 25]; // Segmentation, The Other Way Round, Intermediary, Self-service
    default:
      // Global fallback deterministic mathematically stable mapping from principles list
      const first = (((impId * 5 + worId * 7) % 40) + 1);
      const second = (((impId * 11 + worId * 13) % 40) + 1);
      const third = (((impId * 17 + worId * 19) % 40) + 1);
      
      const set = new Set([first, second, third]);
      // make sure we have distinct numbers up to 30
      if (set.size < 3) set.add(((first + 5) % 40) + 1);
      if (set.size < 4) set.add(((second + 11) % 40) + 1);
      
      return Array.from(set).map(n => n === 0 ? 1 : n);
  }
}

// Maps principles back to related 76 standard solutions index keys
// This bridges the 40 Inventive Principles towards the 76 Standard Solutions dynamically!
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

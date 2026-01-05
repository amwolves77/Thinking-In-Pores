
import { QuestionSet } from './types';

export const QUESTIONS: QuestionSet[] = [
  {
    id: 1,
    topic: 'Pressure Regimes',
    difficultyLabel: 'Beginner',
    difficultyIcon: '🟢',
    statements: {
      A: 'The Oil-Water Contact (OWC) sits above the Free Water Level (FWL) due to entry pressure.',
      B: 'Between the OWC and FWL, a formation probe measures the oil pressure gradient.',
      C: 'Hydrocarbons are buoyant and maintain higher pressure than water at the same depth.'
    },
    incorrect: 'B',
    explanation: 'In the zone between OWC and FWL, oil has not entered the pores; a probe measures the continuous water phase.'
  },
  {
    id: 2,
    topic: "Darcy's Law",
    difficultyLabel: 'Beginner',
    difficultyIcon: '🟢',
    statements: {
      A: 'Darcy velocity (q) is the actual speed of a water molecule in the pores.',
      B: 'Permeability (K) has units of area (L²).',
      C: 'The area in Darcy’s law is the total rock cross-section, not just pore area.'
    },
    incorrect: 'A',
    explanation: 'Darcy velocity is an average flux; actual molecular velocity depends on porosity and tortuosity.'
  },
  {
    id: 3,
    topic: 'Buckley-Leverett Analysis',
    difficultyLabel: 'Intermediate',
    difficultyIcon: '🟡',
    statements: {
      A: 'The water front moves as a sharp shock in strongly water-wet systems.',
      B: 'In oil-wet rocks, water flooding is the most efficient recovery method.',
      C: 'The velocity of a saturation point is the derivative of the fractional flow curve.'
    },
    incorrect: 'B',
    explanation: 'Oil-wet systems are inefficient; water channels through large pores, leading to early breakthrough.'
  },
  {
    id: 4,
    topic: 'Transport Physics',
    difficultyLabel: 'Advanced',
    difficultyIcon: '🔴',
    statements: {
      A: 'Diffusion spreading is proportional to time (t).',
      B: 'Advection movement scales linearly with time (t).',
      C: 'Sorption slows the contaminant plume without necessarily removing mass.'
    },
    incorrect: 'A',
    explanation: 'Diffusion/dispersion spreads proportional to the square root of time (√t).'
  },
  {
    id: 5,
    topic: 'Pore-Scale Trapping',
    difficultyLabel: 'Intermediate',
    difficultyIcon: '🟡',
    statements: {
      A: 'Snap-off is the primary mechanism for trapping non-wetting phases.',
      B: 'Trapping occurs because the non-wetting phase becomes hydraulically disconnected.',
      C: 'Pumping water for infinite time eventually removes all residual oil.'
    },
    incorrect: 'C',
    explanation: 'Capillary forces trap residual oil permanently unless the capillary number is altered.'
  },
  {
    id: 6,
    topic: 'Capillarity and Hysteresis',
    difficultyLabel: 'Beginner',
    difficultyIcon: '🟢',
    statements: {
      A: 'Pc is inversely proportional to the radius of the pore or throat.',
      B: 'Capillary pressure curves are identical for drainage and imbibition.',
      C: 'Irreducible water saturation is a practical minimum achieved at high pressure.'
    },
    incorrect: 'B',
    explanation: 'In Blunt’s lectures, hysteresis occurs because displacement mechanisms like snap-off and piston-like advance differ.'
  },
  {
    id: 7,
    topic: 'Transport Physics',
    difficultyLabel: 'Intermediate',
    difficultyIcon: '🟡',
    statements: {
      A: 'Advection displacement scales linearly with time.',
      B: 'Diffusion spreading scales with the square root of time.',
      C: 'Linear sorption permanently removes solute mass from the system.'
    },
    incorrect: 'C',
    explanation: "In Blunt's view, sorption is an equilibrium process that slows the plume but conserves the total mass."
  },
  {
    id: 8,
    topic: 'Wettability Quantification',
    difficultyLabel: 'Advanced',
    difficultyIcon: '🔴',
    statements: {
      A: 'Mixed-wet rocks can spontaneously imbibe both oil and water.',
      B: 'The Amott-Harvey index provides a complete description of mixed-wettability.',
      C: 'Water-wet rocks trap oil in the largest pore spaces via snap-off.'
    },
    incorrect: 'B',
    explanation: 'Blunt argues subtracting indices loses information; a zero index could mean neutral-wet or strongly mixed-wet.'
  },
  {
    id: 9,
    topic: 'Darcy Fundamentals',
    difficultyLabel: 'Beginner',
    difficultyIcon: '🟢',
    statements: {
      A: 'Darcy velocity is the actual molecular speed in the pores.',
      B: 'Permeability scales with the square of the pore radius.',
      C: 'The area used in Darcy’s law is the bulk rock cross-section.'
    },
    incorrect: 'A',
    explanation: 'Darcy velocity is a flux; actual speed is higher and depends on porosity.'
  },
  {
    id: 10,
    topic: 'Pressure Regimes',
    difficultyLabel: 'Intermediate',
    difficultyIcon: '🟡',
    statements: {
      A: 'Total velocity is constant in space for 1D incompressible flow.',
      B: 'Fluid and rock pressure gradients are identical.',
      C: 'Oil pressure exceeds water pressure above the Free Water Level.'
    },
    incorrect: 'B',
    explanation: 'Fluid pressure depends on fluid density, whereas rock pressure relates to the overburden weight.'
  }
];

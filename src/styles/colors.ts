// Mirrors the Bloom palette in tokens.css. Kept as plain JS values too because
// Three.js materials need real color values, not CSS custom-property references.
export const COLORS = {
  bg: '#F7ECE8',
  bgRaised: '#EEDFDA',
  ink: '#3D2A2E',
  muted: '#9C7A7C',
  hair: '#EEDCD6',
  hairStrong: '#A9787C',
  accent: '#FF6D76',
  accentInk: '#FFF3EF',
  accentInfo: '#4EA3C0',
  accentWarm: '#F3BD55',
  statusActive: '#77C384',
  introBg: '#2F2730',
} as const;

// Deliberately separate from placeholderVariants.ts, which imports all of
// three.js. This file has zero dependencies so the eagerly-loaded
// CompanionVariantContext (mounted in App.tsx, outside the lazy 3D boundary)
// can know the set of variant keys without pulling three.js into the main
// bundle.
export type VariantKey = 'stopwatch' | 'soccer' | 'dice' | 'code';

export const VARIANT_KEYS: VariantKey[] = ['stopwatch', 'soccer', 'dice', 'code'];

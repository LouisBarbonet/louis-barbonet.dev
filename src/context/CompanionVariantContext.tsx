import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { VARIANT_KEYS, type VariantKey } from '../three/variantKeys';

interface CompanionVariantContextValue {
  variant: VariantKey;
  cycle: () => void;
}

const CompanionVariantContext = createContext<CompanionVariantContextValue | null>(null);

export function CompanionVariantProvider({ children }: { children: ReactNode }) {
  // One random starting shape per visit; hero, dock, and the intro all read
  // the same value so it's clearly "one companion" seen in different spots.
  const [index, setIndex] = useState(() => Math.floor(Math.random() * VARIANT_KEYS.length));

  const value = useMemo<CompanionVariantContextValue>(
    () => ({
      variant: VARIANT_KEYS[index],
      cycle: () => setIndex((i) => (i + 1) % VARIANT_KEYS.length),
    }),
    [index],
  );

  return (
    <CompanionVariantContext.Provider value={value}>{children}</CompanionVariantContext.Provider>
  );
}

export function useCompanionVariant(): CompanionVariantContextValue {
  const ctx = useContext(CompanionVariantContext);
  if (!ctx) throw new Error('useCompanionVariant must be used within a CompanionVariantProvider');
  return ctx;
}

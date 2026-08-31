import { createContext, useContext, useState, type ReactNode } from 'react';

interface MotionContextValue {
  motionOn: boolean;
  setMotionOn: (on: boolean) => void;
}

const MotionContext = createContext<MotionContextValue | null>(null);

export function MotionProvider({ children }: { children: ReactNode }) {
  // Auto-detected once from the OS signal on first render; the manual toggle
  // in the nav takes full ownership of the value from that point on.
  const [motionOn, setMotionOn] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  return (
    <MotionContext.Provider value={{ motionOn, setMotionOn }}>{children}</MotionContext.Provider>
  );
}

export function useMotion(): MotionContextValue {
  const ctx = useContext(MotionContext);
  if (!ctx) throw new Error('useMotion must be used within a MotionProvider');
  return ctx;
}

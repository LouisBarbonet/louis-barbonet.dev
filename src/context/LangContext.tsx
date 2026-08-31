import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { copy, type Copy, type Lang } from '../content/copy';

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Copy;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  const value = useMemo<LangContextValue>(
    () => ({ lang, setLang, t: copy[lang] }),
    [lang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within a LangProvider');
  return ctx;
}

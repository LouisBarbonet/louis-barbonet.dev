import { useEffect, useRef, useState } from 'react';
import { useDockTracking } from '../hooks/useDockTracking';
import { CompanionObject } from './LazyCompanionObject';
import { useCompanionVariant } from '../context/CompanionVariantContext';
import { useLang } from '../context/LangContext';

const SECTION_IDS = ['about', 'projects', 'experience'] as const;

export function Dock() {
  const { t } = useLang();
  const { showDock, currentSection } = useDockTracking([...SECTION_IDS]);
  const { variant, cycle } = useCompanionVariant();
  const [pulseSignal, setPulseSignal] = useState(0);
  const lastSection = useRef<string | null>(null);

  // The object gives a little pulse each time you scroll into a new
  // section -- a quiet "it noticed" touch -- alongside the label below.
  useEffect(() => {
    if (currentSection && currentSection !== lastSection.current) {
      lastSection.current = currentSection;
      setPulseSignal((n) => n + 1);
    }
  }, [currentSection]);

  const label =
    currentSection && currentSection in t.dock.sections
      ? t.dock.sections[currentSection as keyof typeof t.dock.sections]
      : null;

  return (
    <div className={`dock${showDock ? ' show' : ''}`}>
      <div className="dock-obj">
        <CompanionObject
          mode="interactive"
          variant={variant}
          spin={[0.22, 0.35]}
          pulseSignal={pulseSignal}
          onRequestCycle={cycle}
        />
      </div>
      {label && <span className="dock-label">{label}</span>}
    </div>
  );
}

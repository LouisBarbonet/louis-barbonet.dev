import { useEffect, useRef, useState } from 'react';
import { useLang } from '../context/LangContext';
import { useDockTracking } from '../hooks/useDockTracking';
import { CompanionObject } from './LazyCompanionObject';

const SECTION_IDS = ['about', 'projects', 'experience'] as const;

export function Dock() {
  const { t } = useLang();
  const { showDock, currentSection } = useDockTracking([...SECTION_IDS]);
  const [pulseSignal, setPulseSignal] = useState(0);
  const lastSection = useRef<string | null>(null);

  useEffect(() => {
    if (currentSection && currentSection !== lastSection.current) {
      lastSection.current = currentSection;
      setPulseSignal((n) => n + 1);
    }
  }, [currentSection]);

  const label = currentSection && currentSection in t.dock.sections
    ? t.dock.sections[currentSection as keyof typeof t.dock.sections]
    : t.dock.sections.about;

  return (
    <div className={`dock${showDock ? ' show' : ''}`}>
      <div className="dock-obj">
        <CompanionObject mode="interactive" spin={[0.22, 0.35]} pulseSignal={pulseSignal} />
      </div>
      <span className="dock-label">{label.toUpperCase()}</span>
    </div>
  );
}

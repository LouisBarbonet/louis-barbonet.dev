import { useEffect, useState } from 'react';

/**
 * Drives the persistent companion-object dock: shows it once the hero
 * scrolls out of view, and reports which tracked section id is currently
 * the most in-view one, so the dock label can follow the visitor down
 * the page.
 */
export function useDockTracking(sectionIds: string[]) {
  const [showDock, setShowDock] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const heroEl = document.getElementById('hero');
    let heroObserver: IntersectionObserver | undefined;
    if (heroEl) {
      heroObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => setShowDock(!entry.isIntersecting));
        },
        { threshold: 0 },
      );
      heroObserver.observe(heroEl);
    }

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: [0.35] },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    return () => {
      heroObserver?.disconnect();
      sectionObserver.disconnect();
    };
  }, [sectionIds.join(',')]);

  return { showDock, currentSection };
}

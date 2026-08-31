import { useLang } from '../context/LangContext';
import { useReveal } from '../hooks/useReveal';

export function About() {
  const { t } = useLang();
  const bio = useReveal<HTMLDivElement>();
  const offduty = useReveal<HTMLDivElement>();

  return (
    <section className="block" id="about">
      <div className="frame about-body">
        <div ref={bio.ref} className={`reveal${bio.visible ? ' in' : ''}`}>
          <p>
            <strong>{t.about.p1}</strong>
          </p>
          <p>{t.about.p2}</p>
        </div>

        <div ref={offduty.ref} className={`offduty reveal d1${offduty.visible ? ' in' : ''}`}>
          <p className="olabel">{t.about.offdutyLabel}</p>
          <p className="oline">{t.about.offdutyLine}</p>
          <div className="chips">
            {t.about.chips.map((chip) => (
              <span key={chip.key} className={`chip chip-${chip.key}`}>
                {chip.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

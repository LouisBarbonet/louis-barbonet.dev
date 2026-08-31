import { useState, type RefObject } from 'react';
import { useLang } from '../context/LangContext';
import { CompanionObject } from './LazyCompanionObject';
import { MagneticCta } from './MagneticCta';
import { CONTACT_EMAIL } from '../content/copy';
import { useCopyEmail } from '../hooks/useCopyEmail';

interface HeroProps {
  scrollVelocityRef: RefObject<number>;
}

export function Hero({ scrollVelocityRef }: HeroProps) {
  const { t } = useLang();
  const [engaged, setEngaged] = useState(false);
  const copyEmail = useCopyEmail();

  return (
    <header className="hero" id="hero">
      <div className="frame">
        <div className="hero-copy">
          <p className="role-eyebrow">{t.hero.eyebrow}</p>
          <h1>
            {t.hero.name.split('\n').map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>
          <p className="sub">{t.hero.sub}</p>
          <MagneticCta href={`mailto:${CONTACT_EMAIL}`} onClick={copyEmail}>
            {t.hero.cta}
          </MagneticCta>
        </div>
        <div className="hero-object">
          <CompanionObject
            mode="interactive"
            scrollVelocityRef={scrollVelocityRef}
            onEngageChange={setEngaged}
          />
          <div className="obj-label">
            <span>{t.dock.self}</span>
            <span className="state">{engaged ? t.dock.engaged.toUpperCase() : t.dock.idle.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

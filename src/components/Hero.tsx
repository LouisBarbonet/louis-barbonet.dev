import type { RefObject } from 'react';
import { useLang } from '../context/LangContext';
import { CompanionObject } from './LazyCompanionObject';
import { MagneticCta } from './MagneticCta';
import { CONTACT_EMAIL } from '../content/copy';
import { useCopyEmail } from '../hooks/useCopyEmail';
import { useCompanionVariant } from '../context/CompanionVariantContext';

interface HeroProps {
  scrollVelocityRef: RefObject<number>;
}

export function Hero({ scrollVelocityRef }: HeroProps) {
  const { t } = useLang();
  const copyEmail = useCopyEmail();
  const { variant, cycle } = useCompanionVariant();

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
            variant={variant}
            scrollVelocityRef={scrollVelocityRef}
            onRequestCycle={cycle}
          />
          <p className="obj-label">{t.variantLabels[variant]}</p>
        </div>
      </div>
    </header>
  );
}

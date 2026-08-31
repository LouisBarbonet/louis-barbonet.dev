import { useLang } from '../context/LangContext';
import { useMotion } from '../context/MotionContext';

export function Nav() {
  const { lang, setLang, t } = useLang();
  const { motionOn, setMotionOn } = useMotion();

  return (
    <nav className="top">
      <div className="frame">
        <span className="brandmark">{t.nav.brand}</span>
        <div className="navctrls">
          <div className="toggle-group" role="group" aria-label="Language">
            <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>
              EN
            </button>
            <button type="button" aria-pressed={lang === 'fr'} onClick={() => setLang('fr')}>
              FR
            </button>
          </div>
          <div className="toggle-group" role="group" aria-label="Motion">
            <button type="button" aria-pressed={motionOn} onClick={() => setMotionOn(true)}>
              Motion
            </button>
            <button type="button" aria-pressed={!motionOn} onClick={() => setMotionOn(false)}>
              Reduced
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

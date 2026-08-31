import { useLang } from '../context/LangContext';
import { useReveal } from '../hooks/useReveal';
import { MagneticCta } from './MagneticCta';
import { CONTACT_EMAIL, LINKEDIN_URL } from '../content/copy';
import { useCopyEmail } from '../hooks/useCopyEmail';

export function Footer() {
  const { t } = useLang();
  const close = useReveal<HTMLDivElement>();
  const copyEmail = useCopyEmail();

  return (
    <footer id="footer">
      <div className="footer-close">
        <div ref={close.ref} className={`frame reveal${close.visible ? ' in' : ''}`}>
          <p className="fclose-eyebrow">{t.footer.eyebrow}</p>
          <h2>{t.footer.headline}</h2>
          <p className="fclose-sub">{t.footer.sub}</p>
          <div className="fclose-actions">
            <MagneticCta href={`mailto:${CONTACT_EMAIL}`} onClick={copyEmail}>
              {t.footer.reachOut}
            </MagneticCta>
            <a className="li-link" href={LINKEDIN_URL} target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bar">
        <div className="frame">
          <span className="fmeta">{t.footer.copyright}</span>
          <nav className="footer-nav">
            <a href="#about">{t.footer.navAbout}</a>
            <a href="#projects">{t.footer.navProjects}</a>
            <a href="#experience">{t.footer.navExperience}</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

import { useLang } from '../context/LangContext';
import { useReveal } from '../hooks/useReveal';
import { StatFlip } from './StatFlip';
import { COFFEE_LIVE_URL, GITHUB_COFFEE_URL } from '../content/copy';

// Lives in public/, served as-is -- referenced by URL, not imported as a module.
const coffeeShot = '/images/coffeeexplorer.png';

export function Projects() {
  const { t } = useLang();
  const coffee = useReveal<HTMLDivElement>();
  const museum = useReveal<HTMLDivElement>();

  return (
    <section className="block" id="projects">
      <div className="frame">
        <div className="block-head">
          <h2>{t.projects.heading}</h2>
          <span className="tag">{t.projects.tag}</span>
        </div>

        <div ref={coffee.ref} className={`project-card reveal${coffee.visible ? ' in' : ''}`}>
          <div className="project-shot">
            <img
              src={coffeeShot}
              alt="CoffeeExplorer dashboard showing a map of Montreal coffee shops"
            />
          </div>
          <div className="project-top">
            <p className="pname">{t.projects.coffee.name}</p>
            <p className="pdesc">{t.projects.coffee.desc}</p>
            <div className="plinks">
              <a className="primary" href={COFFEE_LIVE_URL} target="_blank" rel="noopener">
                {t.projects.coffee.liveSite}
              </a>
              <a href={GITHUB_COFFEE_URL} target="_blank" rel="noopener">
                {t.projects.coffee.repository}
              </a>
            </div>
          </div>
          <div className="spec-grid">
            <div className="spec-cluster">
              <p className="clabel">{t.projects.coffee.stackLabel}</p>
              <ul>
                {t.projects.coffee.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="spec-cluster">
              <p className="clabel">{t.projects.coffee.deployLabel}</p>
              <ul>
                {t.projects.coffee.deploy.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="spec-cluster">
              <p className="clabel">{t.projects.coffee.infraLabel}</p>
              <ul>
                {t.projects.coffee.infra.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="note">{t.projects.coffee.infraNote}</p>
            </div>
          </div>
        </div>

        <div ref={museum.ref} className={`project-card reveal d1${museum.visible ? ' in' : ''}`}>
          <div className="project-top">
            <p className="psub">{t.projects.museum.teamLine}</p>
            <p className="pname">{t.projects.museum.name}</p>
            <p className="pdesc">{t.projects.museum.desc}</p>
            <div className="plinks">
              <span className="flag">{t.projects.museum.privateFlag}</span>
            </div>
          </div>
          <div className="spec-grid">
            <div className="spec-cluster">
              <p className="clabel">{t.projects.museum.stackLabel}</p>
              <ul>
                {t.projects.museum.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="spec-cluster">
              <p className="clabel">{t.projects.museum.modelsLabel}</p>
              <ul>
                {t.projects.museum.models.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="spec-cluster">
              <p className="clabel">{t.projects.museum.resultLabel}</p>
              <StatFlip
                front={t.projects.museum.resultStat}
                back={t.projects.museum.flipStat}
                backTag={t.projects.museum.flipTag}
                ariaLabel="Flip for confusion matrix detail"
              />
              <p className="note">
                {t.projects.museum.resultNote} <span className="hint">{t.projects.museum.flipHint}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

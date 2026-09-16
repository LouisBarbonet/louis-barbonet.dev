import { useLang } from '../context/LangContext';
import { useReveal } from '../hooks/useReveal';
import type { LogEntry } from '../content/copy';

function LogRow({ entry }: { entry: LogEntry }) {
  const { ref, visible } = useReveal<HTMLLIElement>();
  return (
    <li ref={ref} className={`log-row${visible ? ' in' : ''}`}>
      <p className="when">
        <time dateTime={entry.datetime}>{entry.when}</time>
      </p>
      <div className="dotcell">
        <span className={`dot ${entry.pillTone}`} />
      </div>
      <div>
        <p className="org">
          {entry.org} <span className={`pill ${entry.pillTone}`}>{entry.pillLabel}</span>
        </p>
        <p className="role">{entry.role}</p>
      </div>
    </li>
  );
}

export function Experience() {
  const { t } = useLang();

  return (
    <section className="block" id="experience">
      <div className="frame">
        <div className="block-head">
          <h2>{t.experience.heading}</h2>
        </div>
        <ol className="log">
          {t.experience.entries.map((entry) => (
            <LogRow key={`${entry.org}-${entry.datetime}`} entry={entry} />
          ))}
        </ol>
      </div>
    </section>
  );
}

import { useEffect, useState } from 'react';

function formatMontreal(date: Date): string {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'America/Toronto',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return `MTL ${fmt.format(date)}`;
}

interface StatusBarProps {
  onReplayIntro: () => void;
}

export function StatusBar({ onReplayIntro }: StatusBarProps) {
  const [clock, setClock] = useState(() => formatMontreal(new Date()));

  useEffect(() => {
    const id = setInterval(() => setClock(formatMontreal(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="statusbar">
      <div className="frame">
        <span>Bloom · Archivo / Plex · Locked</span>
        <span className="right">
          <span id="clock">{clock}</span>
          <button type="button" onClick={onReplayIntro}>
            Replay Intro
          </button>
        </span>
      </div>
    </div>
  );
}

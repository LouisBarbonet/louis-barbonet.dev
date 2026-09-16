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

export function StatusBar() {
  const [clock, setClock] = useState(() => formatMontreal(new Date()));

  useEffect(() => {
    const id = setInterval(() => setClock(formatMontreal(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="statusbar">
      <div className="frame">
        <span id="clock">{clock}</span>
      </div>
    </div>
  );
}

import { useState } from 'react';

interface StatFlipProps {
  front: string;
  back: string;
  backTag: string;
  ariaLabel: string;
}

export function StatFlip({ front, back, backTag, ariaLabel }: StatFlipProps) {
  const [flipped, setFlipped] = useState(false);

  const toggle = () => setFlipped((f) => !f);

  return (
    <div
      className={`stat-flip${flipped ? ' flipped' : ''}`}
      tabIndex={0}
      role="button"
      aria-label={ariaLabel}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <div className="stat-flip-inner">
        <div className="stat-face stat-front">
          <p className="stat">{front}</p>
        </div>
        <div className="stat-face stat-back">
          <p className="stat">{back}</p>
          <p className="stat-tag">{backTag}</p>
        </div>
      </div>
    </div>
  );
}

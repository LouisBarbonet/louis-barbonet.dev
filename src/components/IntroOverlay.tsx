import { useEffect, useState } from 'react';
import { useLang } from '../context/LangContext';
import { useMotion } from '../context/MotionContext';
import { CompanionObject } from './LazyCompanionObject';

/**
 * First-visit (or replayed) loading gate. Remount this component (give it a
 * fresh `key` from the parent) to run the sequence again -- all of its
 * timers live in one mount-time effect, so a remount restarts cleanly.
 */
export function IntroOverlay() {
  const { t } = useLang();
  const { motionOn } = useMotion();
  const [gone, setGone] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [barFilled, setBarFilled] = useState(false);

  const dismiss = () => {
    setGone(true);
    document.body.classList.remove('locked');
  };

  useEffect(() => {
    document.body.classList.add('locked');
    const quoteCount = t.intro.quotes.length;

    if (!motionOn) {
      setQuoteIndex(quoteCount - 1);
      setBarFilled(true);
      const timeout = setTimeout(dismiss, 500);
      return () => clearTimeout(timeout);
    }

    const raf = requestAnimationFrame(() => setBarFilled(true));
    const interval = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % quoteCount);
    }, 620);
    const timeout = setTimeout(dismiss, 2500);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(interval);
      clearTimeout(timeout);
    };
    // Intentionally mount-only: a fresh `key` from the parent is how a replay restarts this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="intro" className={gone ? 'gone' : ''} onClick={dismiss}>
      <div className="intro-obj">
        <CompanionObject mode="auto-pulse" />
      </div>
      <p className="intro-text">{t.intro.quotes[quoteIndex]}</p>
      <div className="intro-bar">
        <div
          className="intro-bar-fill"
          style={{
            width: barFilled ? '100%' : '0%',
            transition: motionOn ? 'width 2.4s linear' : 'none',
          }}
        />
      </div>
      <span className="intro-skip">{t.intro.skip}</span>
    </div>
  );
}

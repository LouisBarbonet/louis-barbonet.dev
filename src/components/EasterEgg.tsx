import { useEffect, useRef } from 'react';
import { useToast } from '../context/ToastContext';
import { useMotion } from '../context/MotionContext';
import { useLang } from '../context/LangContext';
import { COLORS } from '../styles/colors';

const BURST_COLORS = [COLORS.accent, COLORS.accentInfo, COLORS.accentWarm];

/** Type "sudo" anywhere on the page. A small wink at the visitors who'd think to try it. */
export function EasterEgg() {
  const { showToast } = useToast();
  const { motionOn } = useMotion();
  const { t } = useLang();
  const bufferRef = useRef('');

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.length === 1) {
        bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(-4);
      }
      if (bufferRef.current === 'sudo') {
        bufferRef.current = '';
        showToast(t.toast.accessGranted);
        if (motionOn) burstParticles();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showToast, motionOn, t]);

  return null;
}

function burstParticles() {
  for (let i = 0; i < 14; i++) {
    const sq = document.createElement('div');
    sq.className = 'egg-particle';
    sq.style.background = BURST_COLORS[i % BURST_COLORS.length];
    sq.style.left = `${45 + Math.random() * 10}vw`;
    sq.style.top = `${45 + Math.random() * 10}vh`;
    const ang = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 160;
    sq.style.setProperty('--dx', `${(Math.cos(ang) * dist).toFixed(0)}px`);
    sq.style.setProperty('--dy', `${(Math.sin(ang) * dist).toFixed(0)}px`);
    document.body.appendChild(sq);
    sq.addEventListener('animationend', () => sq.remove());
  }
}

import { useEffect, useRef } from 'react';

/**
 * Tracks a smoothed scroll velocity in a ref (not state -- this changes every
 * frame while scrolling, and re-rendering React for it would be wasteful).
 * Consumers read `.current` inside their own animation loop, e.g. a
 * react-three-fiber useFrame callback.
 */
export function useScrollVelocity() {
  const velocityRef = useRef(0);

  useEffect(() => {
    let lastY = window.scrollY;
    let lastT = performance.now();
    let frame: number;

    const tick = () => {
      const now = performance.now();
      const dt = Math.max(now - lastT, 1);
      const v = Math.min(Math.abs(window.scrollY - lastY) / dt, 2.5);
      velocityRef.current += (v - velocityRef.current) * 0.15;
      lastY = window.scrollY;
      lastT = now;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return velocityRef;
}

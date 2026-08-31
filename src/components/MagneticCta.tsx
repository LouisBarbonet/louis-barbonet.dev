import { useRef, type MouseEvent, type ReactNode } from 'react';
import { useMotion } from '../context/MotionContext';

interface MagneticCtaProps {
  href: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  children: ReactNode;
}

/** The "Reach Out" buttons pull slightly toward the cursor on hover. */
export function MagneticCta({ href, onClick, target, rel, children }: MagneticCtaProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { motionOn } = useMotion();

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!motionOn || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);
    ref.current.style.transform = `translate(${(mx * 0.12).toFixed(1)}px, ${(my * 0.3).toFixed(1)}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <a
      ref={ref}
      className="cta"
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </a>
  );
}

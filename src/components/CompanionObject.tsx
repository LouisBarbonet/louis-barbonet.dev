import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { buildVariantObject, type VariantKey } from '../three/placeholderVariants';
import { COLORS } from '../styles/colors';
import { useMotion } from '../context/MotionContext';

export type ObjectMode = 'interactive' | 'auto-pulse';

// A pointer that moves less than this between down and up counts as a click
// (cycles the placeholder), not a drag (orbits it).
const CLICK_DRAG_THRESHOLD = 6;

interface HeadMeshProps {
  mode: ObjectMode;
  variant: VariantKey;
  spin?: [number, number];
  scrollVelocityRef?: RefObject<number>;
  onEngageChange?: (engaged: boolean) => void;
  onRequestCycle?: () => void;
  pulseSignal?: number;
}

function HeadMesh({
  mode,
  variant,
  spin = [0.15, 0.08],
  scrollVelocityRef,
  onEngageChange,
  onRequestCycle,
  pulseSignal,
}: HeadMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { motionOn } = useMotion();

  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ roughness: 0.55, metalness: 0.05, flatShading: true }),
    [],
  );
  const object = useMemo(() => buildVariantObject(variant, material), [variant, material]);

  const [engaged, setEngaged] = useState(false);
  const engageTRef = useRef(0);
  const dragRef = useRef<{ x: number; y: number } | null>(null);
  const movedRef = useRef(false);
  const t0 = useRef(performance.now());

  const inkColor = useMemo(() => new THREE.Color(COLORS.ink), []);
  const accentColor = useMemo(() => new THREE.Color(COLORS.accent), []);
  const scratchColor = useMemo(() => new THREE.Color(), []);

  // Flash the engaged/accent color briefly whenever the shape itself changes,
  // so switching feels like a deliberate little event, not a silent swap.
  const isFirstVariant = useRef(true);
  useEffect(() => {
    if (isFirstVariant.current) {
      isFirstVariant.current = false;
      return;
    }
    setEngaged(true);
    const timer = setTimeout(() => setEngaged(false), 380);
    return () => clearTimeout(timer);
  }, [variant]);

  useEffect(() => {
    if (pulseSignal === undefined || pulseSignal === 0) return;
    setEngaged(true);
    const timer = setTimeout(() => setEngaged(false), 380);
    return () => clearTimeout(timer);
  }, [pulseSignal]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    let targetEngageT = engaged ? 1 : 0;
    if (mode === 'auto-pulse') {
      const elapsed = (performance.now() - t0.current) / 1000;
      targetEngageT = 0.35 + 0.35 * (0.5 + 0.5 * Math.sin(elapsed * 2.4));
    }
    engageTRef.current += (targetEngageT - engageTRef.current) * 0.08;
    scratchColor.copy(inkColor).lerp(accentColor, engageTRef.current);
    material.color.copy(scratchColor);

    if (!motionOn || dragRef.current) return;

    if (mode === 'auto-pulse') {
      group.rotation.y += 0.3 * delta;
      return;
    }

    const scrollBoost = scrollVelocityRef?.current ?? 0;
    group.rotation.y += spin[0] * delta + scrollBoost * 0.5 * delta;
    group.rotation.x += spin[1] * delta + scrollBoost * 0.7 * delta;
  });

  if (mode === 'auto-pulse') {
    return <primitive object={object} ref={groupRef} />;
  }

  const handleDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    dragRef.current = { x: e.clientX, y: e.clientY };
    movedRef.current = false;
    setEngaged(true);
    onEngageChange?.(true);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const handleMove = (e: ThreeEvent<PointerEvent>) => {
    if (!dragRef.current || !groupRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    if (Math.abs(dx) + Math.abs(dy) > CLICK_DRAG_THRESHOLD) movedRef.current = true;
    groupRef.current.rotation.y += dx * 0.01;
    groupRef.current.rotation.x += dy * 0.01;
    dragRef.current = { x: e.clientX, y: e.clientY };
  };
  const release = () => {
    if (!dragRef.current) return;
    const wasClick = !movedRef.current;
    dragRef.current = null;
    setEngaged(false);
    onEngageChange?.(false);
    if (wasClick) onRequestCycle?.();
  };

  return (
    <primitive
      object={object}
      ref={groupRef}
      onPointerDown={handleDown}
      onPointerMove={handleMove}
      onPointerUp={release}
      onPointerLeave={release}
    />
  );
}

interface CompanionObjectProps {
  mode?: ObjectMode;
  variant: VariantKey;
  spin?: [number, number];
  scrollVelocityRef?: RefObject<number>;
  onEngageChange?: (engaged: boolean) => void;
  onRequestCycle?: () => void;
  /** Increment this number from the parent to trigger a brief engage flash. */
  pulseSignal?: number;
}

export function CompanionObject({
  mode = 'interactive',
  variant,
  spin,
  scrollVelocityRef,
  onEngageChange,
  onRequestCycle,
  pulseSignal,
}: CompanionObjectProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 3.4], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ touchAction: 'none' }}
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[2, 2, 3]} intensity={1.1} />
      <directionalLight position={[-2, -1, -2]} intensity={0.25} />
      <HeadMesh
        mode={mode}
        variant={variant}
        spin={spin}
        scrollVelocityRef={scrollVelocityRef}
        onEngageChange={onEngageChange}
        onRequestCycle={onRequestCycle}
        pulseSignal={pulseSignal}
      />
    </Canvas>
  );
}

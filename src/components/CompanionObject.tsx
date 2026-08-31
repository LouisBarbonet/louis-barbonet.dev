import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { createHeadGeometry } from '../three/headGeometry';
import { COLORS } from '../styles/colors';
import { useMotion } from '../context/MotionContext';

export type ObjectMode = 'interactive' | 'auto-pulse';

interface HeadMeshProps {
  mode: ObjectMode;
  spin?: [number, number];
  scrollVelocityRef?: RefObject<number>;
  onEngageChange?: (engaged: boolean) => void;
  pulseSignal?: number;
}

function HeadMesh({
  mode,
  spin = [0.15, 0.08],
  scrollVelocityRef,
  onEngageChange,
  pulseSignal,
}: HeadMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const geometry = useMemo(() => createHeadGeometry(1), []);
  const { motionOn } = useMotion();

  const [engaged, setEngaged] = useState(false);
  const engageTRef = useRef(0);
  const dragRef = useRef<{ x: number; y: number } | null>(null);
  const t0 = useRef(performance.now());

  // External trigger (e.g. the dock reacting to a scroll-section change): briefly
  // flash the engaged/accent state without needing the pointer to be down.
  useEffect(() => {
    if (pulseSignal === undefined || pulseSignal === 0) return;
    setEngaged(true);
    const timer = setTimeout(() => setEngaged(false), 380);
    return () => clearTimeout(timer);
  }, [pulseSignal]);

  const inkColor = useMemo(() => new THREE.Color(COLORS.ink), []);
  const accentColor = useMemo(() => new THREE.Color(COLORS.accent), []);
  const scratchColor = useMemo(() => new THREE.Color(), []);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    const material = materialRef.current;
    if (!mesh || !material) return;

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
      mesh.rotation.y += 0.3 * delta;
      return;
    }

    const scrollBoost = scrollVelocityRef?.current ?? 0;
    mesh.rotation.y += spin[0] * delta + scrollBoost * 0.5 * delta;
    mesh.rotation.x += spin[1] * delta + scrollBoost * 0.7 * delta;
  });

  if (mode === 'auto-pulse') {
    return (
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial ref={materialRef} roughness={0.55} metalness={0.05} flatShading />
      </mesh>
    );
  }

  const handleDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    dragRef.current = { x: e.clientX, y: e.clientY };
    setEngaged(true);
    onEngageChange?.(true);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const handleMove = (e: ThreeEvent<PointerEvent>) => {
    if (!dragRef.current || !meshRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    meshRef.current.rotation.y += dx * 0.01;
    meshRef.current.rotation.x += dy * 0.01;
    dragRef.current = { x: e.clientX, y: e.clientY };
  };
  const release = () => {
    if (!dragRef.current) return;
    dragRef.current = null;
    setEngaged(false);
    onEngageChange?.(false);
  };

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      onPointerDown={handleDown}
      onPointerMove={handleMove}
      onPointerUp={release}
      onPointerLeave={release}
    >
      <meshStandardMaterial ref={materialRef} roughness={0.55} metalness={0.05} flatShading />
    </mesh>
  );
}

interface CompanionObjectProps {
  mode?: ObjectMode;
  spin?: [number, number];
  scrollVelocityRef?: RefObject<number>;
  onEngageChange?: (engaged: boolean) => void;
  /** Increment this number from the parent to trigger a brief engage flash. */
  pulseSignal?: number;
}

export function CompanionObject({
  mode = 'interactive',
  spin,
  scrollVelocityRef,
  onEngageChange,
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
        spin={spin}
        scrollVelocityRef={scrollVelocityRef}
        onEngageChange={onEngageChange}
        pulseSignal={pulseSignal}
      />
    </Canvas>
  );
}

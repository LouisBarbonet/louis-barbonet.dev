import { lazy, Suspense, type ComponentProps } from 'react';
import type { CompanionObject as CompanionObjectType } from './CompanionObject';

// Three.js is the single largest dependency in this project. Splitting it into
// its own chunk keeps the initial page shell fast; the visitor only pays for
// it once the companion object is actually about to render.
const RealCompanionObject = lazy(() =>
  import('./CompanionObject').then((m) => ({ default: m.CompanionObject })),
);

type Props = ComponentProps<typeof CompanionObjectType>;

export function CompanionObject(props: Props) {
  return (
    <Suspense fallback={null}>
      <RealCompanionObject {...props} />
    </Suspense>
  );
}

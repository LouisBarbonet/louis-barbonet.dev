import * as THREE from 'three';
import type { VariantKey } from './variantKeys';

/**
 * Temporary placeholder objects standing in for Louis's real 3D scan.
 * Each one nods to something real (half-marathon training, soccer, board
 * games, the day job) rather than being generic filler. Every builder
 * returns a self-contained Object3D built from primitives, sharing the one
 * material passed in so the idle/engage color-blend animates all of them
 * uniformly. Geometries are kept simple and radially/axially regular on
 * purpose -- silhouettes read reliably at low-poly, faceted shading;
 * asymmetric shapes (an early running-shoe attempt) didn't.
 *
 * This file (and its `three` import) only ever loads inside the lazy 3D
 * chunk -- see variantKeys.ts for the dependency-free type/list used by
 * code outside that boundary.
 */

export type { VariantKey };

// Fixed light accent used for small detail marks (die pips, watch ticks) so
// they stay legible against the body's animated color in both idle and
// engaged states, instead of risking dark-on-dark.
const DETAIL_COLOR = 0xf4ebe4;

function buildSoccerBall(material: THREE.MeshStandardMaterial): THREE.Object3D {
  // An undeformed low-poly icosahedron already reads as a faceted ball.
  const geometry = new THREE.IcosahedronGeometry(1, 1);
  return new THREE.Mesh(geometry, material);
}

function buildDie(material: THREE.MeshStandardMaterial): THREE.Object3D {
  const group = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.3, 1.3), material);
  group.add(body);

  const pipMaterial = new THREE.MeshStandardMaterial({
    color: DETAIL_COLOR,
    roughness: 0.4,
  });
  const pipGeometry = new THREE.SphereGeometry(0.12, 14, 14);
  const addPip = (x: number, y: number, z: number) => {
    const pip = new THREE.Mesh(pipGeometry, pipMaterial);
    pip.position.set(x, y, z);
    group.add(pip);
  };

  const o = 0.38; // pip offset from face center
  const f = 0.67; // face distance from cube center

  // Front face (+z): five pips.
  [
    [-o, -o],
    [-o, o],
    [0, 0],
    [o, -o],
    [o, o],
  ].forEach(([x, y]) => addPip(x, y, f));

  // Right face (+x): two pips.
  [
    [-o, -o],
    [o, o],
  ].forEach(([y, z]) => addPip(f, y, z));

  // Top face (+y): three pips.
  [
    [-o, -o],
    [0, 0],
    [o, o],
  ].forEach(([x, z]) => addPip(x, f, z));

  return group;
}

function buildStopwatch(material: THREE.MeshStandardMaterial): THREE.Object3D {
  const group = new THREE.Group();

  const face = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.3, 24), material);
  face.rotation.x = Math.PI / 2;
  group.add(face);

  const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.32, 10), material);
  crown.position.set(0, 1.05, 0);
  group.add(crown);

  const buttonGeometry = new THREE.BoxGeometry(0.16, 0.16, 0.16);
  const buttonLeft = new THREE.Mesh(buttonGeometry, material);
  buttonLeft.position.set(-0.55, 0.85, 0);
  buttonLeft.rotation.z = Math.PI / 5;
  group.add(buttonLeft);
  const buttonRight = new THREE.Mesh(buttonGeometry, material);
  buttonRight.position.set(0.55, 0.85, 0);
  buttonRight.rotation.z = -Math.PI / 5;
  group.add(buttonRight);

  // Hands, sitting just proud of the face so they don't z-fight with it.
  const handMaterial = new THREE.MeshStandardMaterial({ color: DETAIL_COLOR, roughness: 0.4 });
  const minuteHand = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.6, 0.05), handMaterial);
  minuteHand.position.set(0, 0.28, 0.17);
  minuteHand.rotation.z = -Math.PI / 8;
  group.add(minuteHand);
  const secondHand = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.42, 0.05), handMaterial);
  secondHand.position.set(0.14, -0.12, 0.17);
  secondHand.rotation.z = Math.PI / 2.6;
  group.add(secondHand);

  // Tick marks at the cardinal points.
  const tickGeometry = new THREE.SphereGeometry(0.07, 10, 10);
  [
    [0, 0.78],
    [0.78, 0],
    [0, -0.78],
    [-0.78, 0],
  ].forEach(([x, y]) => {
    const tick = new THREE.Mesh(tickGeometry, handMaterial);
    tick.position.set(x, y, 0.17);
    group.add(tick);
  });

  return group;
}

function buildCodeSymbol(material: THREE.MeshStandardMaterial): THREE.Object3D {
  const group = new THREE.Group();
  const bar = (length: number) => new THREE.Mesh(new THREE.BoxGeometry(length, 0.18, 0.18), material);

  // "<" from two angled segments meeting at a point on the left.
  const lt1 = bar(0.95);
  lt1.position.set(-0.55, 0.42, 0);
  lt1.rotation.z = Math.PI / 5;
  group.add(lt1);

  const lt2 = bar(0.95);
  lt2.position.set(-0.55, -0.42, 0);
  lt2.rotation.z = -Math.PI / 5;
  group.add(lt2);

  // ">" mirrors "<" on the right.
  const gt1 = bar(0.95);
  gt1.position.set(0.55, 0.42, 0);
  gt1.rotation.z = -Math.PI / 5;
  group.add(gt1);

  const gt2 = bar(0.95);
  gt2.position.set(0.55, -0.42, 0);
  gt2.rotation.z = Math.PI / 5;
  group.add(gt2);

  // "/" through the middle.
  const slash = bar(1.5);
  slash.rotation.z = Math.PI / 2.7;
  group.add(slash);

  return group;
}

export function buildVariantObject(
  key: VariantKey,
  material: THREE.MeshStandardMaterial,
): THREE.Object3D {
  switch (key) {
    case 'soccer':
      return buildSoccerBall(material);
    case 'dice':
      return buildDie(material);
    case 'stopwatch':
      return buildStopwatch(material);
    case 'code':
      return buildCodeSymbol(material);
  }
}

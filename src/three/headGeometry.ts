import * as THREE from 'three';

/**
 * Placeholder companion-object geometry: a subdivided icosahedron pushed
 * into a rough head-like silhouette (elongated crown, tapered jaw, a
 * flattened front "face" plane). This is a stand-in only -- swap this
 * module out for a loaded GLTF once the real 3D scan is available; every
 * consumer of CompanionObject just expects a BufferGeometry, so the swap
 * is a one-file change.
 */
function headDeform(v: THREE.Vector3): void {
  v.y *= 1.3;
  if (v.y < 0) {
    const f = Math.max(0.55, 1 - 0.35 * -v.y);
    v.x *= f;
    v.z *= f;
  }
  if (v.z > 0) v.z *= 0.72;
  if (v.y > -0.15 && v.y < 0.4) v.x *= 1.06;
}

export function createHeadGeometry(radius = 1): THREE.BufferGeometry {
  const geometry = new THREE.IcosahedronGeometry(radius, 1);
  const position = geometry.getAttribute('position');
  const v = new THREE.Vector3();

  for (let i = 0; i < position.count; i++) {
    v.fromBufferAttribute(position, i);
    headDeform(v);
    position.setXYZ(i, v.x, v.y, v.z);
  }

  position.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

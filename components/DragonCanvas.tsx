"use client";
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Preload, Environment } from "@react-three/drei";
import { MotionValue } from "framer-motion";
import * as THREE from "three";

useGLTF.preload("/models/dragon.glb");

const MANA = new THREE.Color("#00E5C5");
const SKILL = new THREE.Color("#FF2DAA");
const GOLEM = new THREE.Color("#FFE600");

function clamp01(x: number) { return Math.max(0, Math.min(1, x)); }
function smoothstep(a: number, b: number, x: number) {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
}
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

// CHROME PBR — gunmetal base + low roughness + envMapIntensity high.
// Bardzo niska emisja żeby metal został metalem.
function applyMetallic(group: THREE.Group) {
  group.traverse((o) => {
    const mesh = o as THREE.Mesh;
    const m = mesh.material as THREE.MeshStandardMaterial | THREE.MeshStandardMaterial[] | undefined;
    if (!m) return;
    const mats = Array.isArray(m) ? m : [m];
    for (const mat of mats) {
      if (mat.color) mat.color.set("#2c3038");
      const std = mat as THREE.MeshStandardMaterial;
      if ("metalness" in std) std.metalness = 1.0;
      if ("roughness" in std) std.roughness = 0.22;
      if ("envMapIntensity" in std) std.envMapIntensity = 2.0;
      if (std.emissive) {
        std.emissive.set("#000000");
        std.emissiveIntensity = 0;
      }
      std.toneMapped = true;
      std.needsUpdate = true;
    }
  });
}

function Dragon({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef<THREE.Group>(null);
  const setupDone = useRef(false);
  const { scene } = useGLTF("/models/dragon.glb") as unknown as { scene: THREE.Group };

  useFrame((state, dt) => {
    if (!ref.current) return;

    if (!setupDone.current) {
      applyMetallic(ref.current);
      setupDone.current = true;
    }

    const p = clamp01(progress.get());
    const t = state.clock.elapsedTime;

    // 3/4 frontal view + constant idle sway (visible without scroll)
    const baseRotY = 0; // domyślna orientacja modelu
    const scrollRotY = -0.3 + p * 0.6;
    const idleSwayY = Math.sin(t * 0.5) * 0.06;
    const targetRotY = baseRotY + scrollRotY + idleSwayY;
    ref.current.rotation.y += (targetRotY - ref.current.rotation.y) * Math.min(1, dt * 4);

    // Rise from shadow + constant breath
    const rise = smoothstep(0, 0.18, p);
    const baseY = lerp(-1.4, -0.5, rise);
    const breathY = Math.sin(t * 0.9) * 0.08;
    ref.current.position.y += (baseY + breathY - ref.current.position.y) * Math.min(1, dt * 4);

    // PUSH GESTURE on GOLEM — dramatic
    const tPush = smoothstep(0.62, 0.88, p);
    const targetZ = lerp(0, 1.6, tPush);
    ref.current.position.z += (targetZ - ref.current.position.z) * Math.min(1, dt * 3.5);
    const targetRotX = lerp(0.0, 0.25, tPush);
    ref.current.rotation.x += (targetRotX - ref.current.rotation.x) * Math.min(1, dt * 4);
    const targetScale = lerp(1.0, 1.3, tPush);
    ref.current.scale.x += (targetScale - ref.current.scale.x) * Math.min(1, dt * 3);
    ref.current.scale.y += (targetScale - ref.current.scale.y) * Math.min(1, dt * 3);
    ref.current.scale.z += (targetScale - ref.current.scale.z) * Math.min(1, dt * 3);

    // Emission color — stepped per panel
    const tmp = new THREE.Color().copy(MANA);
    const tSkill = smoothstep(0.30, 0.40, p);
    tmp.lerp(SKILL, tSkill);
    const tGolem = smoothstep(0.63, 0.73, p);
    tmp.lerp(GOLEM, tGolem);

    // Pulse — VERY LOW tint na chrome, mocniej tylko na SKILL ("dynamicznie pulsują")
    const skillActive = smoothstep(0.30, 0.40, p) * (1 - smoothstep(0.63, 0.73, p));
    const pulseSpeed = lerp(1.4, 4.2, skillActive);
    const pulseAmp = lerp(0.02, 0.06, skillActive);
    const pulseBase = lerp(0.05, 0.12, skillActive);
    const pulse = pulseBase + Math.sin(t * pulseSpeed) * pulseAmp;

    ref.current.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | THREE.MeshStandardMaterial[] | undefined;
      if (!m) return;
      const mats = Array.isArray(m) ? m : [m];
      for (const mat of mats) {
        if (mat && mat.emissive) {
          mat.emissive.copy(tmp);
          mat.emissiveIntensity = pulse;
        }
      }
    });
  });

  return <primitive ref={ref} object={scene} scale={0.85} position={[0.3, -1.0, 0]} />;
}

// REARING dragon for Tribe — static pose, metallic chrome, constant breath
function DragonRearing() {
  const ref = useRef<THREE.Group>(null);
  const setupDone = useRef(false);
  const { scene } = useGLTF("/models/dragon.glb") as unknown as { scene: THREE.Group };

  useFrame((state) => {
    if (!ref.current) return;

    if (!setupDone.current) {
      applyMetallic(ref.current);
      setupDone.current = true;
    }

    const t = state.clock.elapsedTime;

    // Visible sway + head turn
    ref.current.rotation.y = Math.sin(t * 0.5) * 0.15;
    ref.current.rotation.x = -0.1 + Math.sin(t * 0.7) * 0.05;
    ref.current.position.y = -0.5 + Math.sin(t * 0.9) * 0.12;

    // Color breath — yellow ↔ cyan ↔ magenta tint
    const breath = (Math.sin(t * 0.9) + 1) / 2;
    const tmp = new THREE.Color().copy(GOLEM);
    if (breath > 0.66) tmp.lerp(MANA, (breath - 0.66) * 3);
    else if (breath < 0.33) tmp.lerp(SKILL, (0.33 - breath) * 3);

    const pulse = 0.08 + Math.sin(t * 1.8) * 0.03;

    ref.current.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | THREE.MeshStandardMaterial[] | undefined;
      if (!m) return;
      const mats = Array.isArray(m) ? m : [m];
      for (const mat of mats) {
        if (mat && mat.emissive) {
          mat.emissive.copy(tmp);
          mat.emissiveIntensity = pulse;
        }
      }
    });
  });

  return <primitive ref={ref} object={scene} scale={1.0} position={[0, -0.4, 0]} />;
}

export default function DragonCanvas({ progress }: { progress: MotionValue<number> }) {
  return (
    <Canvas
      dpr={[1.5, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.3, 5.2], fov: 36 }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.7} />
      {/* Key biały top-front — czysty specular na pancerzu */}
      <directionalLight position={[3, 6, 5]} color="#ffffff" intensity={4.0} />
      {/* Rim biały z tyłu — krawędziowy highlight */}
      <directionalLight position={[-2, 3, -4]} color="#ffffff" intensity={2.0} />
      {/* Color accents — niskie, tylko jako fill */}
      <pointLight position={[-4, 3, 2]} color="#00E5C5" intensity={1.2} />
      <pointLight position={[3, 1, 3]} color="#FF2DAA" intensity={1.0} />
      <pointLight position={[0, -2, 3]} color="#FFE600" intensity={0.8} />
      <Suspense fallback={null}>
        <Environment preset="studio" />
        <Dragon progress={progress} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}

export function DragonCanvasRearing() {
  return (
    <Canvas
      dpr={[1.5, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.3, 5.6], fov: 32 }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 6, 5]} color="#ffffff" intensity={4.5} />
      <directionalLight position={[-3, 3, -4]} color="#ffffff" intensity={2.4} />
      <pointLight position={[-3, 4, 2]} color="#00E5C5" intensity={1.4} />
      <pointLight position={[3, 1, 3]} color="#FF2DAA" intensity={1.2} />
      <pointLight position={[0, -2, 3]} color="#FFE600" intensity={1.0} />
      <Suspense fallback={null}>
        <Environment preset="studio" />
        <DragonRearing />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}

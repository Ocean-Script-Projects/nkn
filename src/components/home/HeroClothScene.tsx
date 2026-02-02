"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export type Vec2 = { x: number; y: number };

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

const vertexShader = /* glsl */ `
varying vec2 vUv;
varying vec3 vN;
uniform float uTime;
uniform vec2 uPointer;
uniform float uWind;
uniform float uAmp;

// 2D hash/noise (cheap, stable)
float hash(vec2 p){
  p = fract(p*vec2(123.34, 456.21));
  p += dot(p, p+45.32);
  return fract(p.x*p.y);
}
float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(a, b, u.x) + (c - a)*u.y*(1.0 - u.x) + (d - b)*u.x*u.y;
}

void main() {
  vUv = uv;
  vN = normal;

  vec3 p = position;
  float t = uTime;

  // base cloth waves
  float n1 = noise(p.xy * 1.35 + vec2(t*0.12, t*0.10));
  float n2 = noise(p.xy * 2.15 + vec2(-t*0.10, t*0.14));
  float waves = (n1*0.65 + n2*0.35);

  // pointer attractor (in UV space)
  float d = distance(vUv, uPointer);
  float influence = smoothstep(0.55, 0.0, d);

  float z = (waves - 0.5) * uAmp;
  z += influence * (0.14 + 0.10*sin(t*1.3)) * uWind;

  // subtle diagonal drift to feel “alive”
  z += sin((p.x*1.2 + p.y*0.9) + t*0.9) * 0.02 * uAmp;

  p.z += z;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

const fragmentShader = /* glsl */ `
precision highp float;
varying vec2 vUv;
varying vec3 vN;
uniform float uTime;
uniform vec2 uPointer;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uBrass;
uniform vec3 uRed;
uniform float uGloss;

float sat(float x){ return clamp(x, 0.0, 1.0); }

void main() {
  // faux light direction
  vec3 N = normalize(vN);
  vec3 L = normalize(vec3(0.35, 0.55, 0.75));
  vec3 V = normalize(vec3(0.0, 0.0, 1.0));
  float ndl = sat(dot(N, L));

  // soft gradient base
  float g = smoothstep(0.05, 0.95, vUv.y);
  vec3 base = mix(uColorA, uColorB, g);

  // subtle brass sheen
  float sweep = sin((vUv.x*3.0 + vUv.y*1.8) + uTime*0.6) * 0.5 + 0.5;
  float sheen = pow(ndl, 1.7) * (0.25 + 0.25*sweep);
  base = mix(base, uBrass, sheen * 0.35);

  // specular
  vec3 H = normalize(L + V);
  float spec = pow(sat(dot(N, H)), mix(18.0, 48.0, uGloss)) * (0.25 + 0.25*sweep);

  // signature red dot
  vec2 dotPos = vec2(0.86, 0.16);
  float dd = distance(vUv, dotPos);
  float r = 0.018;
  float redMask = 1.0 - smoothstep(r, r+0.006, dd);
  base = mix(base, uRed, redMask * 0.92);

  // pointer glow
  float pd = distance(vUv, uPointer);
  float pGlow = (1.0 - smoothstep(0.0, 0.42, pd));
  base += uBrass * (pGlow * 0.08);

  vec3 col = base + vec3(spec);
  gl_FragColor = vec4(col, 1.0);
}
`;

function ClothPlane({ pointer, wind }: { pointer: Vec2; wind: number }) {
  const matRef = React.useRef<THREE.ShaderMaterial | null>(null);
  const reduced = usePrefersReducedMotion();

  const uniforms = React.useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0.7, 0.3) },
      uWind: { value: 1.0 },
      uAmp: { value: 0.22 },
      uColorA: { value: new THREE.Color("#f6f2ea") },
      uColorB: { value: new THREE.Color("#ece3d6") },
      uBrass: { value: new THREE.Color("#c7a76a") },
      uRed: { value: new THREE.Color("#b1002e") },
      uGloss: { value: 0.55 },
    }),
    []
  );

  useFrame((_, dt) => {
    const m = matRef.current;
    if (!m) return;
    uniforms.uTime.value += dt;
    const target = new THREE.Vector2(pointer.x, pointer.y);
    uniforms.uPointer.value.lerp(target, 1 - Math.pow(0.001, dt));
    uniforms.uWind.value = reduced ? 0.4 : wind;
  });

  const { viewport } = useThree();
  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 180, 180]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

export function HeroClothScene({
  pointer,
  wind,
  className,
}: {
  pointer: Vec2;
  wind: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1.35], fov: 35 }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[1, 1, 2]} intensity={0.75} />
        <ClothPlane pointer={pointer} wind={wind} />
      </Canvas>
    </div>
  );
}


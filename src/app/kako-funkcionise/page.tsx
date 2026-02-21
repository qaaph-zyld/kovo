"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Center } from "@react-three/drei";
import { Suspense, useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Pause, RotateCcw, ChevronRight } from "lucide-react";
import Link from "next/link";
import * as THREE from "three";

// --- Assembly Steps ---
const STEPS = [
  {
    id: 1,
    title: "Priprema bočnih ramova",
    desc: "Postavite levi i desni zavareni ram. Ovi ramovi nose kompletnu strukturu. Izrađeni su od 25x25mm cevi.",
    targetCamera: [-1.5, 1, 1.5],
  },
  {
    id: 2,
    title: "Montaža prečki (M8)",
    desc: "Povežite ramove pomoću dve prečke. Zatezanje se vrši imbus ključem direktno u navarene matice (DIN 929).",
    targetCamera: [0, 1.2, 2],
  },
  {
    id: 3,
    title: "Poravnanje sedišta",
    desc: "Drveno sedište se savršeno pozicionira zahvaljujući ugrađenim čeličnim pinovima (Ø6mm DIN 7).",
    targetCamera: [0, 1.5, 1],
  },
  {
    id: 4,
    title: "Fiksiranje sedišta",
    desc: "Uvrnite 4 donja M8 vijka kako bi masivno drvo postalo jedno sa čeličnom bazom.",
    targetCamera: [0, -0.5, 1.5],
  },
  {
    id: 5,
    title: "Naslon po izboru",
    desc: "Postavite željeni naslon na zadnje cevi i fiksirajte sa 4 vijka. Gotovo za 15 minuta.",
    targetCamera: [-1.2, 1.2, -1.5],
  }
];

// --- 3D Parts (with animation logic) ---

function SideFrame({ position, isLeft, visible }: { position: [number, number, number], isLeft: boolean, visible: boolean }) {
  const x = isLeft ? -0.2125 : 0.2125;
  const targetX = visible ? x : (isLeft ? -1 : 1);
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetX, delta * 3);
      ref.current.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          if (!child.material) return;
          // @ts-ignore
          child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, visible ? 1 : 0, delta * 5);
          // @ts-ignore
          child.material.transparent = true;
        }
      });
    }
  });

  return (
    <group ref={ref} position={[targetX, position[1], position[2]]}>
      <mesh position={[0, 0.225, 0.2125]}>
        <boxGeometry args={[0.025, 0.45, 0.025]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.45, -0.2125]}>
        <boxGeometry args={[0.025, 0.9, 0.025]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.4375, 0]}>
        <boxGeometry args={[0.025, 0.025, 0.45]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
      </mesh>
    </group>
  );
}

function CrossRails({ visible }: { visible: boolean }) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (ref.current) {
      const targetY = visible ? 0 : 1;
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, delta * 4);
      ref.current.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          // @ts-ignore
          child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, visible ? 1 : 0, delta * 5);
          // @ts-ignore
          child.material.transparent = true;
        }
      });
    }
  });

  return (
    <group ref={ref}>
      <mesh position={[0, 0.4375, 0.2125]}>
        <boxGeometry args={[0.4, 0.025, 0.025]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.4375, -0.2125]}>
        <boxGeometry args={[0.4, 0.025, 0.025]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
      </mesh>
    </group>
  );
}

function WoodSeat({ visible, step }: { visible: boolean, step: number }) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (ref.current) {
      let targetY = 0.465;
      if (!visible) targetY = 2;
      else if (step === 3) targetY = 0.55;
      
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, delta * 3);
      // @ts-ignore
      ref.current.material.opacity = THREE.MathUtils.lerp(ref.current.material.opacity, visible ? 1 : 0, delta * 5);
      // @ts-ignore
      ref.current.material.transparent = true;
    }
  });

  return (
    <mesh ref={ref} position={[0, 2, 0]}>
      <boxGeometry args={[0.45, 0.03, 0.45]} />
      <meshStandardMaterial color="#c08457" roughness={0.6} />
    </mesh>
  );
}

function BackrestGrid({ visible }: { visible: boolean }) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (ref.current) {
      const targetZ = visible ? -0.2125 : -1;
      ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, targetZ, delta * 3);
      ref.current.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          // @ts-ignore
          child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, visible ? 1 : 0, delta * 5);
          // @ts-ignore
          child.material.transparent = true;
        }
      });
    }
  });

  return (
    <group ref={ref} position={[0, 0.7, -1]}>
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.4, 0.03, 0.006]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
      </mesh>
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.4, 0.03, 0.006]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
      </mesh>
      {[-0.15, -0.075, 0, 0.075, 0.15].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.3]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function CameraController({ step }: { step: number }) {
  useFrame((state, delta) => {
    const targetPos = STEPS[step - 1].targetCamera;
    state.camera.position.lerp(new THREE.Vector3(...targetPos), delta * 2);
    state.camera.lookAt(0, 0.4, 0);
  });
  return null;
}

export default function AssemblyAnimationPage() {
  const [step, setStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setStep(s => {
        if (s >= STEPS.length) {
          setIsPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="flex min-h-screen flex-col bg-iron-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 p-4 relative z-10 bg-iron-deep">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className="text-white hover:bg-white/10">
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="font-display text-xl">Kako funkcioniše</h1>
              <p className="text-xs text-white/50">Interaktivni prikaz montaže (DNK sistema)</p>
            </div>
          </div>
          <Badge variant="outline" className="border-forge-amber/30 text-forge-amber-light">
            Sklapanje za 15min
          </Badge>
        </div>
      </header>

      <main className="flex flex-1 flex-col lg:flex-row relative">
        {/* Playback Controls (Floating over 3D) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-iron-black/80 p-2 backdrop-blur-md">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => { setStep(1); setIsPlaying(false); }}
            className="text-white hover:bg-white/10"
            title="Kreni ispočetka"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-forge-amber text-white hover:bg-forge-amber-light"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          
          <div className="flex px-4 gap-2">
            {STEPS.map(s => (
              <div 
                key={s.id}
                className={`h-2 w-8 rounded-full transition-all duration-300 ${
                  step >= s.id ? 'bg-forge-amber' : 'bg-white/20'
                }`}
              />
            ))}
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => {
              setStep(s => Math.min(STEPS.length, s + 1));
              setIsPlaying(false);
            }}
            disabled={step >= STEPS.length}
            className="text-white hover:bg-white/10"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* 3D Canvas */}
        <div className="relative flex-1 bg-workshop-gray min-h-[500px] lg:min-h-auto">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.55_0.14_55_/_0.15),transparent_70%)] pointer-events-none" />
          
          <Canvas shadows camera={{ position: [-1.5, 1, 1.5], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <Environment preset="studio" />

              <Center>
                <group>
                  <SideFrame position={[0, 0, 0]} isLeft={true} visible={step >= 1} />
                  <SideFrame position={[0, 0, 0]} isLeft={false} visible={step >= 1} />
                  <CrossRails visible={step >= 2} />
                  <WoodSeat visible={step >= 3} step={step} />
                  <BackrestGrid visible={step >= 5} />
                </group>
              </Center>

              <ContactShadows position={[0, -0.45, 0]} opacity={0.7} scale={5} blur={2.5} far={4} />
              
              {!isPlaying && <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} enableZoom={true} minDistance={1} maxDistance={4} />}
              <CameraController step={step} />
            </Suspense>
          </Canvas>
        </div>

        {/* Step Information Sidebar */}
        <div className="w-full border-l border-white/10 bg-iron-deep p-8 lg:w-[400px] flex flex-col justify-center relative overflow-hidden">
          {STEPS.map(s => (
            <div 
              key={s.id}
              className={`absolute top-1/2 -translate-y-1/2 left-8 right-8 transition-all duration-500 ${
                step === s.id 
                  ? 'opacity-100 translate-x-0 pointer-events-auto' 
                  : (step > s.id ? 'opacity-0 -translate-x-10 pointer-events-none' : 'opacity-0 translate-x-10 pointer-events-none')
              }`}
            >
              <div className="mb-4 inline-flex h-8 items-center rounded-md border border-forge-amber/30 bg-forge-amber/10 px-3 text-xs font-mono text-forge-amber">
                KORAK {s.id} OD {STEPS.length}
              </div>
              <h2 className="mb-4 font-display text-2xl tracking-tight text-white">
                {s.title}
              </h2>
              <p className="text-white/60 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

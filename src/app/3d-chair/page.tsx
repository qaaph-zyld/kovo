"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Center } from "@react-three/drei";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Layers } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/data/products";

// --- Configuration Data ---
const BACKRESTS = [
  { id: "classic", name: "Klasik", price: 2900, desc: "Tradicionalni luk sa blagim detaljima" },
  { id: "grid", name: "Rešetka", price: 3400, desc: "Moderni vertikalni raster" },
  { id: "arch", name: "Luk", price: 3900, desc: "Minimalistički LINEA potpis" },
];

const SEATS = [
  { id: "oak-natural", name: "Hrast Natur", color: "#c08457", price: 1900 },
  { id: "oak-dark", name: "Tamni Hrast", color: "#3e2723", price: 1900 },
];

// --- 3D Chair Components (Parametric 450mm Grid) ---
// Scale: 1 unit = 1 meter
// Tube thickness = 25x25mm (0.025m)

function SideFrame({ position, isLeft }: { position: [number, number, number], isLeft: boolean }) {
  const x = isLeft ? -0.2125 : 0.2125; // 450mm width / 2 - half tube
  const zFront = 0.2125;
  const zBack = -0.2125;
  
  return (
    <group position={position}>
      {/* Front Leg */}
      <mesh position={[x, 0.225, zFront]}>
        <boxGeometry args={[0.025, 0.45, 0.025]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
      </mesh>
      
      {/* Rear Leg (Extended for backrest) */}
      <mesh position={[x, 0.45, zBack]}>
        <boxGeometry args={[0.025, 0.9, 0.025]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
      </mesh>
      
      {/* Side Seat Rail */}
      <mesh position={[x, 0.4375, 0]}>
        <boxGeometry args={[0.025, 0.025, 0.45]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
      </mesh>
    </group>
  );
}

function CrossRails() {
  return (
    <group>
      {/* Front Cross Rail */}
      <mesh position={[0, 0.4375, 0.2125]}>
        <boxGeometry args={[0.4, 0.025, 0.025]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
      </mesh>
      {/* Rear Cross Rail */}
      <mesh position={[0, 0.4375, -0.2125]}>
        <boxGeometry args={[0.4, 0.025, 0.025]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
      </mesh>
    </group>
  );
}

function WoodSeat({ color }: { color: string }) {
  return (
    <mesh position={[0, 0.465, 0]}>
      <boxGeometry args={[0.45, 0.03, 0.45]} />
      {/* Beveled edge approximation through material smoothing */}
      <meshStandardMaterial color={color} roughness={0.6} />
    </mesh>
  );
}

function BackrestGrid() {
  return (
    <group position={[0, 0.7, -0.2125]}>
      {/* Top and Bottom Rails (30x6mm flat bar approximation) */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.4, 0.03, 0.006]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
      </mesh>
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.4, 0.03, 0.006]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
      </mesh>
      
      {/* Vertical Grid Bars (10mm rods) */}
      {[-0.15, -0.075, 0, 0.075, 0.15].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.3]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function BackrestArch() {
  return (
    <group position={[0, 0.7, -0.2125]}>
      {/* The LINEA Arch (Approximated with a torus segment) */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        {/* We use a thin box for the bottom rail */}
        <mesh position={[0, -0.15, 0]}>
          <boxGeometry args={[0.4, 0.03, 0.006]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
        </mesh>
        
        {/* The Arch */}
        <mesh position={[0, -0.15, 0]}>
          <torusGeometry args={[0.2, 0.005, 16, 50, Math.PI]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
        </mesh>
      </mesh>
    </group>
  );
}

function BackrestClassic() {
  return (
    <group position={[0, 0.7, -0.2125]}>
      {/* Top and Bottom Rails */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.4, 0.03, 0.006]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
      </mesh>
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.4, 0.03, 0.006]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
      </mesh>
      
      {/* Center "X" or Scroll approximation */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.01, 0.35, 0.006]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.01, 0.35, 0.006]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
      </mesh>
    </group>
  );
}

export default function ChairConfiguratorPage() {
  const [backrest, setBackrest] = useState<string>("grid");
  const [seat, setSeat] = useState<string>("oak-natural");

  const selectedSeatColor = SEATS.find(s => s.id === seat)?.color || "#c08457";
  const totalPrice = 12500 + (BACKRESTS.find(b => b.id === backrest)?.price || 0);

  return (
    <div className="flex min-h-screen flex-col bg-iron-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 p-4">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className="text-white hover:bg-white/10">
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="font-display text-xl">LINEA Stolica — 3D Konfigurator</h1>
              <p className="text-xs text-white/50">Zavareni ramovi + modularni nasloni (M8 spojevi)</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-white/50 uppercase tracking-widest">Ukupna Cena</p>
              <p className="font-mono text-lg text-forge-amber">{formatPrice(totalPrice)}</p>
            </div>
            <Button className="bg-forge-amber text-white hover:bg-forge-amber-light">
              Dodaj u Korpu
            </Button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col lg:flex-row">
        {/* 3D Canvas */}
        <div className="relative flex-1 bg-workshop-gray min-h-[500px] lg:min-h-auto">
          {/* Atmospheric background gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.55_0.14_55_/_0.15),transparent_70%)] pointer-events-none" />
          
          <Canvas shadows camera={{ position: [-1.5, 1.2, 1.5], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <spotLight
                position={[5, 5, 5]}
                angle={0.15}
                penumbra={1}
                intensity={1}
                castShadow
              />
              <Environment preset="studio" />

              <Center>
                <group>
                  {/* Primary Welded Structure */}
                  <SideFrame position={[0, 0, 0]} isLeft={true} />
                  <SideFrame position={[0, 0, 0]} isLeft={false} />
                  
                  {/* Secondary Bolted Structure */}
                  <CrossRails />
                  
                  {/* Replaceable Wear Part */}
                  <WoodSeat color={selectedSeatColor} />
                  
                  {/* Interchangeable Module (80x120mm M8 pitch circle) */}
                  {backrest === "grid" && <BackrestGrid />}
                  {backrest === "arch" && <BackrestArch />}
                  {backrest === "classic" && <BackrestClassic />}
                </group>
              </Center>

              <ContactShadows
                position={[0, -0.45, 0]}
                opacity={0.7}
                scale={5}
                blur={2.5}
                far={4}
              />
              
              <OrbitControls 
                makeDefault 
                minPolarAngle={0} 
                maxPolarAngle={Math.PI / 2 - 0.05}
                enableZoom={true}
                minDistance={1}
                maxDistance={4}
              />
            </Suspense>
          </Canvas>

          {/* Overlay Instructions */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-iron-black/80 px-4 py-2 backdrop-blur-md flex items-center gap-2">
            <Layers className="h-4 w-4 text-forge-amber" />
            <p className="text-xs font-medium text-white/80">
              Uživo vizualizacija 450mm modula
            </p>
          </div>
        </div>

        {/* Controls Sidebar */}
        <div className="w-full border-l border-white/10 bg-iron-deep p-6 lg:w-[400px] overflow-y-auto">
          <div className="space-y-8">
            
            {/* Structural Info */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-forge-amber-light">
                DNK Sistema
              </h3>
              <ul className="space-y-2 text-xs text-white/70">
                <li className="flex justify-between">
                  <span>Osnovni modul:</span>
                  <span className="font-mono text-white">450mm (širina)</span>
                </li>
                <li className="flex justify-between">
                  <span>Sistem spojeva:</span>
                  <span className="font-mono text-white">M8 + DIN 929 matice</span>
                </li>
                <li className="flex justify-between">
                  <span>Pozicioniranje:</span>
                  <span className="font-mono text-white">Ø6mm pinovi (DIN 7)</span>
                </li>
              </ul>
            </div>

            {/* Backrest Selection */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold tracking-tight uppercase text-white">
                  1. Zamenljivi Naslon
                </h3>
                <Badge variant="outline" className="border-forge-amber/30 text-forge-amber text-[10px]">
                  4 M8 Vijka
                </Badge>
              </div>
              <div className="grid gap-3">
                {BACKRESTS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setBackrest(item.id)}
                    className={`relative flex flex-col items-start rounded-xl border p-4 text-left transition-all duration-200 outline-none ${
                      backrest === item.id
                        ? "border-forge-amber bg-white/5 shadow-warm"
                        : "border-white/10 bg-transparent hover:border-white/30 hover:bg-white-[0.02]"
                    }`}
                  >
                    {backrest === item.id && (
                      <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-forge-amber text-white">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                    <span className="font-semibold">{item.name}</span>
                    <span className="mt-1 text-xs text-white/50">{item.desc}</span>
                    <span className="mt-3 font-mono text-xs text-forge-amber-light">
                      +{formatPrice(item.price)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Seat Selection */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold tracking-tight uppercase text-white">
                  2. Drveno Sedište
                </h3>
                <Badge variant="outline" className="border-white/20 text-white/60 text-[10px]">
                  Zamenljivo
                </Badge>
              </div>
              <div className="flex gap-3">
                {SEATS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSeat(item.id)}
                    className={`group relative flex flex-1 flex-col items-center rounded-xl border p-3 transition-all duration-200 outline-none ${
                      seat === item.id
                        ? "border-forge-amber bg-white/5"
                        : "border-white/10 bg-transparent hover:border-white/30"
                    }`}
                  >
                    <div 
                      className="mb-2 h-10 w-10 rounded-full border-2 border-iron-black shadow-inner"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs font-medium text-center">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

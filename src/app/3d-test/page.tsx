"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Center } from "@react-three/drei";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Layers } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/data/products";
import { QuoteModal } from "@/components/QuoteModal";

// --- Placeholder 3D Components ---
// In a real application, these would load actual .glb files using useGLTF()
// e.g., const { nodes, materials } = useGLTF('/models/bistro-base.glb')

function BistroBase() {
  return (
    <group>
      {/* Central column */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.7]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
      </mesh>
      {/* Base plate */}
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.5} />
      </mesh>
      {/* Top mounting plate */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.3, 0.01, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
      </mesh>
    </group>
  );
}

function FamilyBase() {
  return (
    <group>
      {/* Left Leg */}
      <mesh position={[-0.6, 0.35, 0]}>
        <boxGeometry args={[0.08, 0.7, 0.08]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
      </mesh>
      {/* Right Leg */}
      <mesh position={[0.6, 0.35, 0]}>
        <boxGeometry args={[0.08, 0.7, 0.08]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
      </mesh>
      {/* Crossbar */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[1.2, 0.04, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.6} />
      </mesh>
    </group>
  );
}

function RoundOakTop() {
  return (
    <mesh position={[0, 0.715, 0]}>
      {/* 70cm diameter -> 0.35m radius */}
      <cylinderGeometry args={[0.35, 0.35, 0.03]} />
      {/* Amber/Oak wood approximation */}
      <meshStandardMaterial color="#c08457" roughness={0.4} />
    </mesh>
  );
}

function SquareOakTop() {
  return (
    <mesh position={[0, 0.715, 0]}>
      {/* 160x90cm -> 1.6x0.9m */}
      <boxGeometry args={[1.6, 0.03, 0.9]} />
      <meshStandardMaterial color="#c08457" roughness={0.4} />
    </mesh>
  );
}

const BASES = [
  { id: "bistro", price: 100 },
  { id: "family", price: 150 },
];

const TOPS = [
  { id: "round", price: 50 },
  { id: "rectangular", price: 75 },
];

export default function ThreeDTestPage() {
  const [baseType, setBaseType] = useState<"bistro" | "family">("bistro");
  const [topType, setTopType] = useState<"round" | "rectangular">("round");
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const basePrice = BASES.find(b => b.id === baseType)?.price || 0;
  const topPrice = TOPS.find(t => t.id === topType)?.price || 0;
  const totalPrice = basePrice + topPrice;

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
              <h1 className="font-display text-xl">LINEA Sto — 3D Konfigurator</h1>
              <p className="text-xs text-white/50">Univerzalne baze + drvene ploče (Flanš spojevi)</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-white/50 uppercase tracking-widest">Ukupna Cena</p>
              <p className="font-mono text-lg text-forge-amber">{formatPrice(totalPrice)}</p>
            </div>
            <Button 
              className="bg-forge-amber text-white hover:bg-forge-amber-light"
              onClick={() => setIsQuoteModalOpen(true)}
            >
              Zatražite ponudu
            </Button>
          </div>
        </div>
      </header>

      {/* Tabs / Cross-links */}
      <div className="border-b border-white/10 bg-iron-deep px-4 py-2">
        <div className="mx-auto flex max-w-[1400px] gap-4">
          <Link href="/3d-chair" className="text-sm font-medium text-white/60 hover:text-white px-3 py-1 transition-colors">
            Stolica (45cm)
          </Link>
          <Link href="/3d-klupa" className="text-sm font-medium text-white/60 hover:text-white px-3 py-1 transition-colors">
            Klupa (120cm)
          </Link>
          <Link href="/3d-test" className="text-sm font-medium text-forge-amber px-3 py-1 border-b-2 border-forge-amber">
            Sto (Baze)
          </Link>
        </div>
      </div>

      <main className="flex flex-1 flex-col lg:flex-row">
        {/* Controls Sidebar */}
        <div className="w-full border-r border-white/10 bg-iron-deep p-6 lg:w-80">
          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-sm font-semibold tracking-tight text-forge-amber-light uppercase">
                1. Baza Stola
              </h3>
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
                <Button
                  variant={baseType === "bistro" ? "default" : "outline"}
                  onClick={() => setBaseType("bistro")}
                  className={baseType !== "bistro" ? "border-white/10 bg-transparent" : ""}
                >
                  Bistro Baza
                </Button>
                <Button
                  variant={baseType === "family" ? "default" : "outline"}
                  onClick={() => setBaseType("family")}
                  className={baseType !== "family" ? "border-white/10 bg-transparent" : ""}
                >
                  Family Baza
                </Button>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold tracking-tight text-forge-amber-light uppercase">
                2. Ploča Stola
              </h3>
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
                <Button
                  variant={topType === "round" ? "default" : "outline"}
                  onClick={() => setTopType("round")}
                  className={topType !== "round" ? "border-white/10 bg-transparent" : ""}
                >
                  Okrugla Ø70
                </Button>
                <Button
                  variant={topType === "rectangular" ? "default" : "outline"}
                  onClick={() => setTopType("rectangular")}
                  className={topType !== "rectangular" ? "border-white/10 bg-transparent" : ""}
                >
                  Pravougaona 160x90
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-forge-amber/20 bg-forge-amber/5 p-4">
              <p className="text-xs text-white/60 leading-relaxed">
                Ovo je tehnički demonstrator (Proof of Concept) koji pokazuje kako se različiti 3D moduli mogu dinamički učitavati i sklapati u React Three Fiber okruženju. Pravi modeli bi se učitavali iz .glb fajlova.
              </p>
            </div>
          </div>
        </div>

        {/* 3D Canvas */}
        <div className="relative flex-1 bg-workshop-gray">
          {/* Atmospheric background gradient matching KOVO brand */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.55_0.14_55_/_0.15),transparent_70%)] pointer-events-none" />
          
          <Canvas shadows camera={{ position: [2, 1.5, 2], fov: 45 }}>
            <Suspense fallback={null}>
              {/* Lighting optimized for metallic materials */}
              <ambientLight intensity={0.5} />
              <spotLight
                position={[5, 5, 5]}
                angle={0.15}
                penumbra={1}
                intensity={1}
                castShadow
              />
              <Environment preset="studio" />

              {/* Modular Assembly */}
              <Center>
                <group>
                  {baseType === "bistro" ? <BistroBase /> : <FamilyBase />}
                  {topType === "round" ? <RoundOakTop /> : <SquareOakTop />}
                </group>
              </Center>

              {/* Realistic ground shadow */}
              <ContactShadows
                position={[0, -0.5, 0]}
                opacity={0.7}
                scale={5}
                blur={2.5}
                far={4}
              />
              
              <OrbitControls 
                makeDefault 
                minPolarAngle={0} 
                maxPolarAngle={Math.PI / 2 - 0.05} // Prevent camera going below ground
                enableZoom={true}
                minDistance={1.5}
                maxDistance={5}
              />
            </Suspense>
          </Canvas>

          {/* Overlay Instructions */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-iron-black/80 px-4 py-2 backdrop-blur-md">
            <p className="text-xs font-medium text-white/60">
              Rotirajte klikom • Zumirajte točkićem
            </p>
          </div>
        </div>
      </main>

      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
        productName="LINEA Sto"
        configuration={{
          base: baseType === "bistro" ? "Bistro Baza" : "Porodična Baza",
          top: topType === "round" ? "Okrugla Ploča (Ø70cm)" : "Pravougaona Ploča (160×90cm)",
          unitPrice: totalPrice
        }}
      />
    </div>
  );
}

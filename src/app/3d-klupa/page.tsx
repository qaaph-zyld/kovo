"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Center } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Layers, Info } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/data/products";
import { RAL_COLORS, RALColor } from "@/data/colors";
import { QuoteModal } from "@/components/QuoteModal";

// --- Configuration Data ---
const BACKRESTS = [
  { id: "classic", name: "Klasik", price: 2900, desc: "Tradicionalni luk sa blagim detaljima" },
  { id: "grid", name: "Rešetka", price: 3400, desc: "Moderni vertikalni raster" },
  { id: "arch", name: "Luk", price: 3900, desc: "Minimalistički LINEA potpis" },
];

const SEATS = [
  { id: "oak-natural", name: "Hrast Natur", color: "#c08457", price: 3400 },
  { id: "oak-dark", name: "Tamni Hrast", color: "#3e2723", price: 3400 },
];

// --- 3D Bench Components (Parametric 1200mm width, 450mm backrest module) ---
// Scale: 1 unit = 1 meter
// Tube thickness = 25x25mm (0.025m)

function BenchSideFrame({ position, isLeft, color }: { position: [number, number, number], isLeft: boolean, color: RALColor }) {
  const x = isLeft ? -0.5875 : 0.5875; // 1200mm width / 2 - half tube
  const zFront = 0.2125;
  const zBack = -0.2125;
  
  return (
    <group position={position}>
      {/* Front Leg */}
      <mesh position={[x, 0.225, zFront]}>
        <boxGeometry args={[0.025, 0.45, 0.025]} />
        <meshStandardMaterial color={color.hex} roughness={color.roughness ?? 0.8} metalness={color.metalness ?? 0.6} />
      </mesh>
      
      {/* Rear Leg (Extended for backrest, but lower than chair - total 700mm) */}
      <mesh position={[x, 0.35, zBack]}>
        <boxGeometry args={[0.025, 0.7, 0.025]} />
        <meshStandardMaterial color={color.hex} roughness={color.roughness ?? 0.8} metalness={color.metalness ?? 0.6} />
      </mesh>
      
      {/* Side Seat Rail */}
      <mesh position={[x, 0.4375, 0]}>
        <boxGeometry args={[0.025, 0.025, 0.45]} />
        <meshStandardMaterial color={color.hex} roughness={color.roughness ?? 0.8} metalness={color.metalness ?? 0.6} />
      </mesh>
    </group>
  );
}

function BenchCrossRails({ color }: { color: RALColor }) {
  return (
    <group>
      {/* Front Cross Rail (1200mm - 50mm for legs = 1150mm inner) */}
      <mesh position={[0, 0.4375, 0.2125]}>
        <boxGeometry args={[1.15, 0.025, 0.025]} />
        <meshStandardMaterial color={color.hex} roughness={color.roughness ?? 0.8} metalness={color.metalness ?? 0.6} />
      </mesh>
      {/* Rear Cross Rail */}
      <mesh position={[0, 0.4375, -0.2125]}>
        <boxGeometry args={[1.15, 0.025, 0.025]} />
        <meshStandardMaterial color={color.hex} roughness={color.roughness ?? 0.8} metalness={color.metalness ?? 0.6} />
      </mesh>
      {/* Center Support Rail (prevents wood sagging) */}
      <mesh position={[0, 0.4375, 0]}>
        <boxGeometry args={[0.025, 0.025, 0.45]} />
        <meshStandardMaterial color={color.hex} roughness={color.roughness ?? 0.8} metalness={color.metalness ?? 0.6} />
      </mesh>
    </group>
  );
}

function BenchWoodSeat({ color }: { color: string }) {
  // 3 planks instead of 1 solid piece for the bench
  return (
    <group position={[0, 0.465, 0]}>
      <mesh position={[0, 0, 0.14]}>
        <boxGeometry args={[1.2, 0.03, 0.12]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.03, 0.12]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0, -0.14]}>
        <boxGeometry args={[1.2, 0.03, 0.12]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
    </group>
  );
}

// These are exactly the same backrests as the chair, just mounted on the bench
function BackrestGrid({ color }: { color: RALColor }) {
  return (
    <group position={[0, 0.6, -0.2125]}>
      {/* Top and Bottom Rails */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.4, 0.03, 0.006]} />
        <meshStandardMaterial color={color.hex} roughness={color.roughness ?? 0.8} metalness={color.metalness ?? 0.6} />
      </mesh>
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.4, 0.03, 0.006]} />
        <meshStandardMaterial color={color.hex} roughness={color.roughness ?? 0.8} metalness={color.metalness ?? 0.6} />
      </mesh>
      
      {/* Vertical Grid Bars */}
      {[-0.15, -0.075, 0, 0.075, 0.15].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.3]} />
          <meshStandardMaterial color={color.hex} roughness={color.roughness ?? 0.8} metalness={color.metalness ?? 0.6} />
        </mesh>
      ))}
    </group>
  );
}

function BackrestArch({ color }: { color: RALColor }) {
  return (
    <group position={[0, 0.6, -0.2125]}>
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <mesh position={[0, -0.15, 0]}>
          <boxGeometry args={[0.4, 0.03, 0.006]} />
          <meshStandardMaterial color={color.hex} roughness={color.roughness ?? 0.8} metalness={color.metalness ?? 0.6} />
        </mesh>
        
        <mesh position={[0, -0.15, 0]}>
          <torusGeometry args={[0.2, 0.005, 16, 50, Math.PI]} />
          <meshStandardMaterial color={color.hex} roughness={color.roughness ?? 0.8} metalness={color.metalness ?? 0.6} />
        </mesh>
      </mesh>
    </group>
  );
}

function BackrestClassic({ color }: { color: RALColor }) {
  return (
    <group position={[0, 0.6, -0.2125]}>
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.4, 0.03, 0.006]} />
        <meshStandardMaterial color={color.hex} roughness={color.roughness ?? 0.8} metalness={color.metalness ?? 0.6} />
      </mesh>
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.4, 0.03, 0.006]} />
        <meshStandardMaterial color={color.hex} roughness={color.roughness ?? 0.8} metalness={color.metalness ?? 0.6} />
      </mesh>
      
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.01, 0.35, 0.006]} />
        <meshStandardMaterial color={color.hex} roughness={color.roughness ?? 0.8} metalness={color.metalness ?? 0.6} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.01, 0.35, 0.006]} />
        <meshStandardMaterial color={color.hex} roughness={color.roughness ?? 0.8} metalness={color.metalness ?? 0.6} />
      </mesh>
    </group>
  );
}

export default function BenchConfiguratorPage() {
  const [backrest, setBackrest] = useState<string>("grid");
  const [seat, setSeat] = useState<string>("oak-natural");
  const [frameColor, setFrameColor] = useState<string>("jet-black");
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Show tooltip when backrest changes
  useEffect(() => {
    setShowTooltip(true);
    const timer = setTimeout(() => setShowTooltip(false), 4000);
    return () => clearTimeout(timer);
  }, [backrest]);

  const selectedSeatColor = SEATS.find(s => s.id === seat)?.color || "#c08457";
  const selectedFrameColor = RAL_COLORS.find(c => c.id === frameColor) || RAL_COLORS[0];
  
  const basePrice = 24500; // Bench frame is more expensive than chair
  const backrestPrice = BACKRESTS.find(b => b.id === backrest)?.price || 0;
  const colorPremium = basePrice * (selectedFrameColor.premiumPercent / 100);
  const totalPrice = basePrice + backrestPrice + colorPremium;

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
              <h1 className="font-display text-xl">LINEA Klupa — 3D Konfigurator</h1>
              <p className="text-xs text-white/50">Zavareni ramovi + modularni nasloni (M8 spojevi)</p>
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
          <Link href="/3d-klupa" className="text-sm font-medium text-forge-amber px-3 py-1 border-b-2 border-forge-amber">
            Klupa (120cm)
          </Link>
          <Link href="/3d-test" className="text-sm font-medium text-white/60 hover:text-white px-3 py-1 transition-colors">
            Sto (Baze)
          </Link>
        </div>
      </div>

      <main className="flex flex-1 flex-col lg:flex-row">
        {/* 3D Canvas */}
        <div className="relative flex-1 bg-workshop-gray min-h-[500px] lg:min-h-auto">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.55_0.14_55_/_0.15),transparent_70%)] pointer-events-none" />
          
          {/* Interchangeability Tooltip */}
          <div className={`absolute top-6 left-1/2 -translate-x-1/2 z-10 transition-all duration-500 ${showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
            <div className="flex items-center gap-3 rounded-xl border border-forge-amber/30 bg-iron-black/90 px-4 py-3 backdrop-blur-md shadow-2xl">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-forge-amber/20 text-forge-amber">
                <Info className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Isti naslon panel kao LINEA Stolica</p>
                <p className="text-xs text-white/70">Zamenljivi između proizvoda (450mm modul)</p>
              </div>
            </div>
          </div>
          
          <Canvas shadows camera={{ position: [-2, 1.5, 2.5], fov: 45 }}>
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
                  <BenchSideFrame position={[0, 0, 0]} isLeft={true} color={selectedFrameColor} />
                  <BenchSideFrame position={[0, 0, 0]} isLeft={false} color={selectedFrameColor} />
                  
                  {/* Secondary Bolted Structure */}
                  <BenchCrossRails color={selectedFrameColor} />
                  
                  {/* Replaceable Wear Part */}
                  <BenchWoodSeat color={selectedSeatColor} />
                  
                  {/* Shared Interchangeable Module (450mm, centered) */}
                  {backrest === "grid" && <BackrestGrid color={selectedFrameColor} />}
                  {backrest === "arch" && <BackrestArch color={selectedFrameColor} />}
                  {backrest === "classic" && <BackrestClassic color={selectedFrameColor} />}
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
                maxDistance={5}
              />
            </Suspense>
          </Canvas>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-iron-black/80 px-4 py-2 backdrop-blur-md flex items-center gap-2">
            <Layers className="h-4 w-4 text-forge-amber" />
            <p className="text-xs font-medium text-white/80">
              Cross-product modularnost
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
                  <span>Širina klupe:</span>
                  <span className="font-mono text-white">1200mm</span>
                </li>
                <li className="flex justify-between">
                  <span>Naslon modul:</span>
                  <span className="font-mono text-white">450mm (deljeno)</span>
                </li>
                <li className="flex justify-between">
                  <span>Sistem spojeva:</span>
                  <span className="font-mono text-white">M8 + DIN 929 matice</span>
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
                  Univerzalni deo
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

            {/* Color Selection (RAL) */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold tracking-tight uppercase text-white">
                  2. Boja Konstrukcije
                </h3>
                <Badge variant="outline" className="border-white/20 text-white/60 text-[10px]">
                  Plastifikacija
                </Badge>
              </div>
              
              <div className="grid grid-cols-6 gap-2">
                {RAL_COLORS.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setFrameColor(color.id)}
                    title={`${color.name} ${color.ralCode ? `(${color.ralCode})` : ''}`}
                    className={`relative aspect-square w-full rounded-full transition-all outline-none flex items-center justify-center ${
                      frameColor === color.id 
                        ? "ring-2 ring-forge-amber ring-offset-2 ring-offset-iron-deep scale-110" 
                        : "hover:scale-105 border border-white/10"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {frameColor === color.id && (
                      <Check className={`h-4 w-4 ${color.hex === '#F1ECE1' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex justify-between items-center text-xs">
                <span className="font-medium text-white">{selectedFrameColor.name}</span>
                {selectedFrameColor.ralCode && (
                  <span className="font-mono text-white/50">{selectedFrameColor.ralCode}</span>
                )}
              </div>
              {selectedFrameColor.premiumPercent > 0 && (
                <p className="mt-1 text-xs text-forge-amber-light font-mono">
                  + {selectedFrameColor.premiumPercent}% na osnovnu cenu rama
                </p>
              )}
            </div>

            {/* Seat Selection */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold tracking-tight uppercase text-white">
                  3. Drveno Sedište (×3 Daske)
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

      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
        productName="LINEA Klupa (120cm)"
        configuration={{
          backrest: BACKRESTS.find(b => b.id === backrest)?.name,
          seat: SEATS.find(s => s.id === seat)?.name,
          color: selectedFrameColor.name + (selectedFrameColor.ralCode ? ` (${selectedFrameColor.ralCode})` : ''),
          unitPrice: totalPrice
        }}
      />
    </div>
  );
}

export interface RALColor {
  id: string;
  name: string;
  ralCode: string | null;
  hex: string;
  category: "Core" | "Nature" | "Light" | "Warm" | "Premium" | "Special";
  premiumPercent: number; // e.g. 0 for standard, 15 for 15% extra
  metalness?: number; // Override default metalness
  roughness?: number; // Override default roughness
}

export const RAL_COLORS: RALColor[] = [
  {
    id: "jet-black",
    name: "Jet Black",
    ralCode: "RAL 9005",
    hex: "#0A0A0A",
    category: "Core",
    premiumPercent: 0,
  },
  {
    id: "anthracite-grey",
    name: "Anthracite Grey",
    ralCode: "RAL 7016",
    hex: "#293133",
    category: "Core",
    premiumPercent: 0,
  },
  {
    id: "moss-green",
    name: "Moss Green",
    ralCode: "RAL 6005",
    hex: "#0F4336",
    category: "Nature",
    premiumPercent: 0,
  },
  {
    id: "pure-white",
    name: "Pure White",
    ralCode: "RAL 9010",
    hex: "#F1ECE1",
    category: "Light",
    premiumPercent: 0,
  },
  {
    id: "terra-brown",
    name: "Terra Brown",
    ralCode: "RAL 8028",
    hex: "#4E3B31",
    category: "Warm",
    premiumPercent: 0,
  },
  {
    id: "raw-steel",
    name: "Raw Steel (Clear Coat)",
    ralCode: null,
    hex: "#8B8878",
    category: "Special",
    premiumPercent: 15,
    metalness: 0.8,
    roughness: 0.4,
  },
];

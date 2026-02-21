# Research Plan: 3D Models and Modular Components for KOVO

This document outlines strategies and sources for acquiring or creating 3D models and modular components for the KOVO configurator and product visualization.

## 1. Finding Existing 3D Models (Wrought Iron & Furniture)

If we want to avoid modeling everything from scratch, we can source base models and adapt them.

### Best Platforms for Furniture & Metalwork
*   **CGTrader (cgtrader.com):** Excellent for high-quality furniture. Search terms: "wrought iron furniture", "metal chair", "iron table base". Filter by "PBR" and "Low Poly" if using them in a web viewer (like Three.js/React Three Fiber).
*   **TurboSquid (turbosquid.com):** Similar to CGTrader, huge library. Good for finding specific ornate metal details (scrolls, finials).
*   **Sketchfab (sketchfab.com):** Industry standard, but often more expensive. Very high quality.
*   **3D Sky (3dsky.org):** Very popular for interior design and arch-viz. Models are usually pre-optimized for rendering. Excellent source for chairs and tables.

### Sourcing Specific "Primitives" (Scrolls, Rosettes, Bars)
*   For the raw materials (the "DNK" of KOVO), finding pre-made modular pieces is harder.
*   **GrabCAD:** Sometimes has engineering-focused models of basic metal profiles or stamped metal parts.
*   **Manufacturer CAD libraries:** Some industrial suppliers (like King Architectural Metals in the US, or local European suppliers) offer CAD files (.step, .dwg) of their wrought iron components which can be converted to .gltf/.glb for the web.

## 2. Creating Custom 3D Models (The Recommended Approach)

Since KOVO is a *modular* system with specific "DNK" (25x25mm tubes, specific LINEA arches), sourcing exact matches online is unlikely. Custom modeling ensures the pieces fit together perfectly in a configurator.

### Recommended Toolchain
1.  **Modeling:** **Blender (Free/Open Source)**. It is perfect for polygonal modeling of furniture. You can easily create the base modules (legs, seat frames, backrests).
2.  **Parametric/CAD (Optional):** **Fusion 360** or **FreeCAD**. If the exact physical dimensions and hole placements (M8/M10 hex, slot holes) need to be millimeter-perfect for manufacturing export later, CAD is better than Blender.
3.  **Texturing:** **Substance 3D Painter**. Essential for creating the realistic "workshop-gray" or "iron-deep" hammered metal textures, edge wear, and warm-toned reflections defined in the design tokens.
4.  **Web Export:** Export models as `.glb` or `.gltf`. These formats are optimized for the web and retain PBR (Physically Based Rendering) materials.

## 3. Integrating 3D Models into the KOVO Website

To make the `ModuleConfigurator` and `ModuleExplodedView` truly interactive, we need to move beyond static PNGs.

### Web 3D Libraries
*   **React Three Fiber (R3F):** This is the absolute standard for React applications (Next.js). It's a React wrapper around Three.js.
*   **Three.js:** The underlying WebGL engine.
*   **Drei ( @react-three/drei ):** A collection of useful helpers for R3F (controls, environment lighting, shadows).

### Strategy for the Configurator
1.  **Componentize the Models:** Do not export a whole chair. Export the *Base*, the *Seat*, and the *Backrest* as separate `.glb` files.
2.  **Dynamic Assembly in R3F:** Load the individual `.glb` files in React. When the user clicks "Rešetka" backrest in the UI, unmount the "Klasik" backrest component and mount the "Rešetka" component at the exact same coordinates.
3.  **Applying Textures:** Use Drei's `<Environment>` component to load an HDR image (perhaps a warm workshop environment) to give the metal realistic, warm-toned reflections matching the brand identity.

## 4. Immediate Next Actions for 3D Integration

1.  **Create a Proof of Concept (PoC) Model:** Model *one* simple table base (e.g., the Bistro base) and one interchangeable top.
2.  **Texture the PoC:** Apply a basic dark, slightly rough metal PBR material. Export as `.glb`.
3.  **Build an R3F Sandbox:** Create a hidden route (e.g., `/3d-test`) in the Next.js app to experiment with loading the `.glb` files using React Three Fiber, ensuring lighting matches the KOVO dark aesthetic.

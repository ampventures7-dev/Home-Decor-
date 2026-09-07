import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCw, ZoomIn, ZoomOut, Sparkles, Info, Eye, Check, Compass, Play, Pause } from "lucide-react";

// Available artisan glaze finishes
const GLAZES = [
  {
    id: "emerald",
    name: "Forest Jade Glaze",
    subtitle: "High-fire botanical glaze",
    color: "#18382B",
    roughness: 0.22,
    metalness: 0.08,
    clearcoat: 0.95,
    clearcoatRoughness: 0.08,
    swatch: "bg-[#18382B]",
    tag: "High Gloss",
  },
  {
    id: "terracotta",
    name: "Raw Terracotta",
    subtitle: "Sun-dried Konkan red clay",
    color: "#B85438",
    roughness: 0.75,
    metalness: 0.05,
    clearcoat: 0.08,
    clearcoatRoughness: 0.5,
    swatch: "bg-[#B85438]",
    tag: "Traditional",
  },
  {
    id: "ochre",
    name: "Sun-fired Ochre",
    subtitle: "Warm mineral pigment finish",
    color: "#C58334",
    roughness: 0.42,
    metalness: 0.06,
    clearcoat: 0.45,
    clearcoatRoughness: 0.25,
    swatch: "bg-[#C58334]",
    tag: "Semi-Gloss",
  },
  {
    id: "chalk",
    name: "Riverbed Chalk",
    subtitle: "Silky matte porcelain slip",
    color: "#E5DDD2",
    roughness: 0.82,
    metalness: 0.02,
    clearcoat: 0.05,
    clearcoatRoughness: 0.6,
    swatch: "bg-[#E5DDD2]",
    tag: "Matte Satin",
  },
];

const HOTSPOTS = [
  {
    id: "handle",
    title: "Hand-Pulled Clay Handle",
    desc: "Sculpted and pulled from a single lump of damp river clay, bonded to the shoulder using clay slip.",
  },
  {
    id: "seal",
    title: "Front Artisan Medallion",
    desc: "Embossed with the traditional Konkan floral emblem before wood firing.",
  },
  {
    id: "back",
    title: "Reverse Kiln Seal (180°)",
    desc: "Turn 180° to inspect the master potter's serial stamp impressed at the rear.",
  },
];

// Generates procedural fine grain & throwing wheel ridges bump texture
function createCeramicNoiseTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, 512, 512);

  const imgData = ctx.getImageData(0, 0, 512, 512);
  const data = imgData.data;

  for (let y = 0; y < 512; y++) {
    const wave = Math.sin((y / 512) * Math.PI * 40) * 14;
    for (let x = 0; x < 512; x++) {
      const idx = (y * 512 + x) * 4;
      const noise = (Math.random() - 0.5) * 20;
      const val = Math.min(255, Math.max(0, 128 + wave + noise));
      data[idx] = val;
      data[idx + 1] = val;
      data[idx + 2] = val;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 6);
  return texture;
}

export default function PotteryViewer3D() {
  const containerRef = useRef(null);
  const [selectedGlaze, setSelectedGlaze] = useState(GLAZES[0]); // Default to Forest Jade (Dark Green!)
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [currentDegrees, setCurrentDegrees] = useState(0);

  // References for Three.js objects
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const vaseGroupRef = useRef(null);
  const materialRef = useRef(null);
  const reqIdRef = useRef(null);

  // Rotation and momentum state
  const rotationState = useRef({
    targetY: 0,
    currentY: 0,
    targetX: 0.1,
    currentX: 0.1,
    targetZoom: 6.2,
    currentZoom: 6.2,
    isPointerDown: false,
    lastPointerX: 0,
    lastPointerY: 0,
    pointerVelocityX: 0,
    autoRotateSpeed: 0.006,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 550;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 6.2);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 0.9);
    scene.add(ambientLight);

    // Warm Key Light (Front Right)
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 1.8);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 15;
    scene.add(keyLight);

    // Cool Rim Light (Back Left) - highlights 360° rotation silhouette
    const rimLight = new THREE.DirectionalLight(0xdbeafe, 1.5);
    rimLight.position.set(-4, 3, -4);
    scene.add(rimLight);

    // Subtle Fill Light from Front Left
    const fillLight = new THREE.DirectionalLight(0xfef3c7, 0.7);
    fillLight.position.set(-3, 2, 3);
    scene.add(fillLight);

    // 5. Studio Pedestal & Ground Shadow
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.28 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.15;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    const pedestalGeo = new THREE.CylinderGeometry(1.65, 1.75, 0.06, 48);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x18281d,
      roughness: 0.9,
      metalness: 0.05,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -2.18;
    pedestal.receiveShadow = true;
    scene.add(pedestal);

    // 6. Vase & Handcrafted Geometry Group
    const vaseGroup = new THREE.Group();
    vaseGroupRef.current = vaseGroup;
    scene.add(vaseGroup);

    const bumpMap = createCeramicNoiseTexture();

    // Urn Profile Curve
    const points = [
      new THREE.Vector2(0.55, 2.5),
      new THREE.Vector2(0.68, 2.45),
      new THREE.Vector2(0.62, 2.32),
      new THREE.Vector2(0.48, 2.0),
      new THREE.Vector2(0.52, 1.6),
      new THREE.Vector2(0.95, 1.1),
      new THREE.Vector2(1.35, 0.4),
      new THREE.Vector2(1.45, -0.1),
      new THREE.Vector2(1.38, -0.6),
      new THREE.Vector2(1.1, -1.2),
      new THREE.Vector2(0.85, -1.7),
      new THREE.Vector2(0.92, -1.95),
      new THREE.Vector2(0.92, -2.1),
      new THREE.Vector2(0.0, -2.1),
    ];

    const vaseGeo = new THREE.LatheGeometry(points, 64);
    vaseGeo.computeVertexNormals();

    const vaseMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(selectedGlaze.color),
      roughness: selectedGlaze.roughness,
      metalness: selectedGlaze.metalness,
      clearcoat: selectedGlaze.clearcoat,
      clearcoatRoughness: selectedGlaze.clearcoatRoughness,
      bumpMap: bumpMap,
      bumpScale: 0.015,
      reflectivity: 0.55,
    });
    materialRef.current = vaseMaterial;

    const vaseMesh = new THREE.Mesh(vaseGeo, vaseMaterial);
    vaseMesh.castShadow = true;
    vaseMesh.receiveShadow = true;
    vaseGroup.add(vaseMesh);

    // 7. Distinct Asymmetric Handcrafted Handle (Provides unmistakable 360° visual orientation)
    const handleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.5, 1.65, 0),
      new THREE.Vector3(1.3, 1.45, 0),
      new THREE.Vector3(1.42, 0.45, 0),
      new THREE.Vector3(0.98, -0.15, 0),
    ]);
    const handleGeo = new THREE.TubeGeometry(handleCurve, 32, 0.11, 16, false);
    const handleMesh = new THREE.Mesh(handleGeo, vaseMaterial);
    handleMesh.castShadow = true;
    handleMesh.receiveShadow = true;
    vaseGroup.add(handleMesh);

    // 8. Front Artisan Medallion (at 0° Front)
    const frontSealGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.05, 32);
    frontSealGeo.rotateX(Math.PI / 2);
    const frontSealMat = new THREE.MeshStandardMaterial({
      color: 0xd4a359, // Golden terracotta badge
      roughness: 0.35,
      metalness: 0.5,
    });
    const frontSealMesh = new THREE.Mesh(frontSealGeo, frontSealMat);
    frontSealMesh.position.set(0, 0.25, 1.44);
    frontSealMesh.castShadow = true;
    vaseGroup.add(frontSealMesh);

    // 9. Reverse Kiln Stamp (at 180° Back)
    const backSealGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.04, 32);
    backSealGeo.rotateX(-Math.PI / 2);
    const backSealMat = new THREE.MeshStandardMaterial({
      color: 0x8f4e31,
      roughness: 0.8,
      metalness: 0.1,
    });
    const backSealMesh = new THREE.Mesh(backSealGeo, backSealMat);
    backSealMesh.position.set(0, -0.3, -1.39);
    vaseGroup.add(backSealMesh);

    // 10. Animation Loop with continuous 360° rotation & degree tracker
    let lastDegreeReport = 0;

    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);
      const state = rotationState.current;

      // Auto-rotation when not user-interacting
      if (isAutoRotate && !state.isPointerDown) {
        state.targetY += state.autoRotateSpeed;
      } else if (!state.isPointerDown && Math.abs(state.pointerVelocityX) > 0.0001) {
        // Inertia flick coasting
        state.targetY += state.pointerVelocityX;
        state.pointerVelocityX *= 0.94; // friction
      }

      // Spring damping interpolation
      state.currentY += (state.targetY - state.currentY) * 0.1;
      state.currentX += (state.targetX - state.currentX) * 0.1;
      state.currentZoom += (state.targetZoom - state.currentZoom) * 0.1;

      if (vaseGroupRef.current) {
        vaseGroupRef.current.rotation.y = state.currentY;
        vaseGroupRef.current.rotation.x = state.currentX;
      }

      if (cameraRef.current) {
        cameraRef.current.position.z = state.currentZoom;
      }

      // Calculate normalized 0° to 360° orientation for HUD
      const twoPi = Math.PI * 2;
      const normRad = ((state.currentY % twoPi) + twoPi) % twoPi;
      const deg = Math.round((normRad / twoPi) * 360);
      if (Math.abs(deg - lastDegreeReport) >= 1) {
        lastDegreeReport = deg;
        setCurrentDegrees(deg);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 11. Resize Observer
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      vaseGeo.dispose();
      handleGeo.dispose();
      frontSealGeo.dispose();
      backSealGeo.dispose();
      vaseMaterial.dispose();
      frontSealMat.dispose();
      backSealMat.dispose();
      bumpMap.dispose();
    };
  }, []);

  // Update material when glaze changes
  useEffect(() => {
    if (!materialRef.current) return;
    const mat = materialRef.current;
    mat.color.set(selectedGlaze.color);
    mat.roughness = selectedGlaze.roughness;
    mat.metalness = selectedGlaze.metalness;
    mat.clearcoat = selectedGlaze.clearcoat;
    mat.clearcoatRoughness = selectedGlaze.clearcoatRoughness;
    mat.needsUpdate = true;
  }, [selectedGlaze]);

  // Window-level fluid dragging so drag never stops outside canvas borders
  const handlePointerDown = (e) => {
    setIsDragging(true);
    const state = rotationState.current;
    state.isPointerDown = true;
    state.lastPointerX = e.clientX;
    state.lastPointerY = e.clientY;
    state.pointerVelocityX = 0;

    const onPointerMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - state.lastPointerX;
      const deltaY = moveEvent.clientY - state.lastPointerY;

      // Higher sensitivity (0.016) so a swipe rotates smoothly past 360°
      const moveSpeed = 0.016;
      state.targetY += deltaX * moveSpeed;
      state.pointerVelocityX = deltaX * moveSpeed * 0.35;

      // Vertical tilt clamp
      state.targetX = Math.max(-0.4, Math.min(0.45, state.targetX + deltaY * 0.006));

      state.lastPointerX = moveEvent.clientX;
      state.lastPointerY = moveEvent.clientY;
    };

    const onPointerUp = () => {
      setIsDragging(false);
      state.isPointerDown = false;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
  };

  // Preset Angle Snapping
  const rotateToDegree = (deg) => {
    const state = rotationState.current;
    const twoPi = Math.PI * 2;
    // Current base revolutions
    const currentBase = Math.floor(state.targetY / twoPi) * twoPi;
    const targetRad = currentBase + (deg / 360) * twoPi;
    state.targetY = targetRad;
  };

  // Full 360° continuous spin animation
  const handleSpin360 = () => {
    const state = rotationState.current;
    state.targetY += Math.PI * 2; // Full 360 degree spin
  };

  // Zoom controls
  const handleZoom = (direction) => {
    const state = rotationState.current;
    if (direction === "in") {
      state.targetZoom = Math.max(4.2, state.targetZoom - 0.8);
    } else {
      state.targetZoom = Math.min(8.5, state.targetZoom + 0.8);
    }
  };

  const handleResetView = () => {
    const state = rotationState.current;
    state.targetX = 0.1;
    state.targetY = 0;
    state.targetZoom = 6.2;
    state.pointerVelocityX = 0;
    setActiveHotspot(null);
  };

  return (
    <section className="relative overflow-hidden bg-[#1E3025] text-white py-20 sm:py-28 border-y border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#A85C3A]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="container-page relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-[11px] tracking-[0.2em] uppercase font-medium mb-4 backdrop-blur-sm border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-[#E6B87D]" />
            Interactive 360° Craft Studio
          </div>
          <h2 className="display text-4xl sm:text-5xl lg:text-6xl text-white tracking-wide">
            The Konkan Urn in 360°
          </h2>
          <p className="mt-4 text-white/80 text-sm sm:text-base leading-relaxed font-light">
            Crafted with riverbed clay and fired in wood kilns. Spin full 360° to inspect the hand-pulled handle, front medallion, and reverse maker's seal.
          </p>
        </div>

        {/* 3D Studio Workspace */}
        <div className="grid lg:grid-cols-12 gap-8 items-center bg-[#15241B]/90 backdrop-blur-md rounded-2xl border border-white/10 p-4 sm:p-8 shadow-2xl">
          
          {/* Left / Canvas Column */}
          <div className="lg:col-span-7 xl:col-span-8 relative flex flex-col items-center">
            
            {/* 3D WebGL Canvas */}
            <div
              ref={containerRef}
              onPointerDown={handlePointerDown}
              className={`w-full h-[380px] sm:h-[480px] md:h-[540px] rounded-xl overflow-hidden cursor-grab select-none relative bg-gradient-to-b from-[#18281e] to-[#121f17] border border-white/5 shadow-inner ${
                isDragging ? "cursor-grabbing" : ""
              }`}
              style={{ touchAction: "none" }}
            >
              {/* 360° Live Angle Compass Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-md border border-white/15 text-white text-xs font-mono tracking-wider shadow">
                <Compass className={`w-4 h-4 text-[#E6B87D] ${isDragging ? "animate-spin" : ""}`} />
                <span className="font-semibold text-[#E6B87D]">{currentDegrees}°</span>
                <span className="text-white/40">/ 360°</span>
              </div>

              {/* Status & Hint Overlay */}
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-md border border-white/15 text-white/80 text-[11px] tracking-wider uppercase font-mono shadow">
                <RotateCw className={`w-3.5 h-3.5 ${isAutoRotate ? "animate-spin text-emerald-400" : "text-white/60"}`} />
                {isDragging ? "Free 360° Drag" : isAutoRotate ? "Auto Spinning" : "Drag anywhere"}
              </div>

              {/* Angle Quick-Snap Pills (Front, Side, Back, 360 Spin) */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-auto flex-wrap">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={() => rotateToDegree(0)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wider transition ${
                      currentDegrees >= 345 || currentDegrees <= 15
                        ? "bg-[#A85C3A] text-white font-semibold shadow"
                        : "bg-black/60 text-white/80 hover:bg-black/80 backdrop-blur-sm border border-white/10"
                    }`}
                  >
                    Front (0°)
                  </button>
                  <button
                    onClick={() => rotateToDegree(90)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wider transition ${
                      currentDegrees >= 75 && currentDegrees <= 105
                        ? "bg-[#A85C3A] text-white font-semibold shadow"
                        : "bg-black/60 text-white/80 hover:bg-black/80 backdrop-blur-sm border border-white/10"
                    }`}
                  >
                    Handle (90°)
                  </button>
                  <button
                    onClick={() => rotateToDegree(180)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wider transition ${
                      currentDegrees >= 165 && currentDegrees <= 195
                        ? "bg-[#A85C3A] text-white font-semibold shadow"
                        : "bg-black/60 text-white/80 hover:bg-black/80 backdrop-blur-sm border border-white/10"
                    }`}
                  >
                    Back Seal (180°)
                  </button>
                  <button
                    onClick={() => rotateToDegree(270)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wider transition ${
                      currentDegrees >= 255 && currentDegrees <= 285
                        ? "bg-[#A85C3A] text-white font-semibold shadow"
                        : "bg-black/60 text-white/80 hover:bg-black/80 backdrop-blur-sm border border-white/10"
                    }`}
                  >
                    Profile (270°)
                  </button>
                </div>

                {/* 360° Instant Spin Action */}
                <button
                  onClick={handleSpin360}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#E6B87D] text-[#1E3025] hover:bg-[#ffcf96] text-xs font-semibold tracking-wider transition shadow"
                  title="Spin a complete 360 revolution"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  Spin 360°
                </button>
              </div>
            </div>

            {/* 360° Angle Scrubber Slider */}
            <div className="w-full mt-4 px-2 flex items-center gap-4 bg-black/30 p-3 rounded-xl border border-white/10">
              <span className="text-xs text-[#E6B87D] font-mono font-semibold shrink-0">
                360° Scrubber:
              </span>
              <input
                type="range"
                min="0"
                max="360"
                value={currentDegrees}
                onChange={(e) => rotateToDegree(Number(e.target.value))}
                className="w-full accent-[#E6B87D] cursor-pointer h-1.5 bg-white/20 rounded-lg appearance-none"
              />
              <span className="text-xs font-mono text-white/80 w-12 text-right">
                {currentDegrees}°
              </span>
            </div>

            {/* Canvas Toolbar Controls */}
            <div className="w-full mt-3 flex items-center justify-between gap-2 px-2 flex-wrap text-xs text-white/70">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAutoRotate(!isAutoRotate)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition ${
                    isAutoRotate
                      ? "bg-emerald-600/30 border-emerald-500/50 text-emerald-300"
                      : "bg-white/5 border-white/10 hover:bg-white/10 text-white/75"
                  }`}
                >
                  {isAutoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  Auto Spin: {isAutoRotate ? "ON" : "OFF"}
                </button>

                <button
                  onClick={handleResetView}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
                >
                  Reset Camera
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleZoom("in")}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleZoom("out")}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Hotspots Info */}
            <div className="w-full mt-3 flex flex-wrap gap-2">
              {HOTSPOTS.map((spot) => {
                const isActive = activeHotspot?.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    onClick={() => {
                      setActiveHotspot(isActive ? null : spot);
                      if (spot.id === "handle") rotateToDegree(90);
                      if (spot.id === "seal") rotateToDegree(0);
                      if (spot.id === "back") rotateToDegree(180);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition border ${
                      isActive
                        ? "bg-[#A85C3A] text-white border-[#A85C3A] shadow"
                        : "bg-white/5 border-white/10 hover:bg-white/10 text-white/80"
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {spot.title}
                  </button>
                );
              })}
            </div>

            {activeHotspot && (
              <div className="w-full mt-3 p-4 rounded-xl bg-black/50 border border-[#A85C3A]/50 backdrop-blur-md animate-fadeIn flex items-start gap-3">
                <Info className="w-5 h-5 text-[#E6B87D] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-white">
                    {activeHotspot.title}
                  </h4>
                  <p className="text-xs text-white/80 mt-1 leading-relaxed">
                    {activeHotspot.desc}
                  </p>
                </div>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="text-white/50 hover:text-white text-xs px-2 py-1"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Finish Selector & Spec Sheet */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 lg:border-l lg:border-white/10 lg:pl-8">
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#E6B87D] font-mono">
                Handmade Atelier • Series 07
              </span>
              <h3 className="display text-2xl sm:text-3xl text-white mt-1">
                Classical Konkan Urn
              </h3>
              <p className="text-white/70 text-xs mt-2 leading-relaxed">
                Hand-pulled clay handle, authentic wheel-thrown belly, and embossed master stamp. Inspect all 360 degrees using touch or the degree scrubber.
              </p>
            </div>

            {/* Glaze Selector */}
            <div className="space-y-3">
              <label className="text-xs tracking-[0.15em] uppercase text-white/90 flex items-center justify-between">
                <span>Select Artisan Glaze</span>
                <span className="text-[#E6B87D] font-mono text-[11px]">
                  {selectedGlaze.name}
                </span>
              </label>

              <div className="grid grid-cols-2 gap-2.5">
                {GLAZES.map((glaze) => {
                  const isSelected = selectedGlaze.id === glaze.id;
                  return (
                    <button
                      key={glaze.id}
                      onClick={() => setSelectedGlaze(glaze)}
                      className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all relative ${
                        isSelected
                          ? "bg-white/15 border-[#E6B87D] ring-1 ring-[#E6B87D] shadow-lg"
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full shrink-0 mt-0.5 border border-white/30 shadow-inner flex items-center justify-center ${glaze.swatch}`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-white drop-shadow" />}
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-white truncate">
                          {glaze.name}
                        </div>
                        <div className="text-[10px] text-white/60 truncate mt-0.5">
                          {glaze.tag}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Specifications */}
            <div className="border border-white/10 rounded-xl p-4 bg-black/30 space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/60">Rotation Freedom</span>
                <span className="font-mono text-[#E6B87D]">Full 360° Continuous</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/60">Unique Features</span>
                <span className="text-white/90">Handle + Front/Back Seals</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/60">Dimensions</span>
                <span className="font-mono text-white/90">H: 34 cm • Ø: 22 cm</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-white/60">Firing Method</span>
                <span className="text-white/90">Wood-Kiln (1,150°C)</span>
              </div>
            </div>

            {/* Custom Inquiry CTA */}
            <div className="pt-2 space-y-3">
              <a
                href={`https://wa.me/919999999999?text=Hello%20Malhar%20Team,%20I%20am%20interested%20in%20custom%20ordering%20the%20Konkan%20Urn%20with%20the%20glaze:%20${encodeURIComponent(
                  selectedGlaze.name
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#A85C3A] hover:bg-[#8F4E31] text-white py-3.5 px-6 rounded-xl text-center text-xs tracking-[0.18em] uppercase font-semibold transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Inquire & Custom Order This Finish &rarr;
              </a>
              <p className="text-[11px] text-center text-white/50 italic">
                * Each batch is hand-thrown in limited editions of 15 pieces.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

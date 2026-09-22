import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Compass, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  RotateCcw, 
  Layers, 
  Armchair, 
  Calendar,
  Volume2,
  VolumeX
} from 'lucide-react';
import { SALON_HOTSPOTS } from '../data/mockData';
import { Hotspot } from '../types';
import { buildRealisticSalonScene } from '../utils/salonSceneBuilder';

interface Salon3DExperienceProps {
  onOpenBooking: () => void;
}

export const Salon3DExperience: React.FC<Salon3DExperienceProps> = ({ onOpenBooking }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeHotspotIndex, setActiveHotspotIndex] = useState(0);
  const [isLiteMode, setIsLiteMode] = useState(false);
  const [webGLError, setWebGLError] = useState(false);
  const [ambientSound, setAmbientSound] = useState(false);

  // References to keep Three.js state across renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(...SALON_HOTSPOTS[0].cameraPos));
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(...SALON_HOTSPOTS[0].targetPos));
  const currentLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(...SALON_HOTSPOTS[0].targetPos));

  // Audio synthesizer for ambient luxury salon atmosphere
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const activeHotspot: Hotspot = SALON_HOTSPOTS[activeHotspotIndex];

  // Initialize Three.js scene
  useEffect(() => {
    if (isLiteMode) return;
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability safely
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLError(true);
        setIsLiteMode(true);
        return;
      }
    } catch {
      setWebGLError(true);
      setIsLiteMode(true);
      return;
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // Scene with dark atmospheric backdrop & subtle depth fog
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0910);
    scene.fog = new THREE.FogExp2(0x0a0910, 0.035);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 80);
    camera.position.set(...SALON_HOTSPOTS[0].cameraPos);
    cameraRef.current = camera;

    // Renderer with ACES Filmic Tone Mapping and realistic lighting computation
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      rendererRef.current = renderer;

      // Clean old canvases
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.appendChild(renderer.domElement);
    } catch {
      setWebGLError(true);
      setIsLiteMode(true);
      return;
    }

    // Build the fully solid, rich cinematic luxury salon interior
    const sceneObjects = buildRealisticSalonScene(scene);

    // Mouse drag interaction for manual camera orbit
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      const cam = cameraRef.current;
      if (cam) {
        // Orbit slightly around current target position
        cam.position.x += deltaX * 0.008;
        cam.position.y = Math.max(0.8, Math.min(4.2, cam.position.y - deltaY * 0.008));
      }
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    // Mobile touch controls for 3D navigation
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      const cam = cameraRef.current;
      if (cam) {
        cam.position.x += deltaX * 0.008;
        cam.position.y = Math.max(0.8, Math.min(4.2, cam.position.y - deltaY * 0.008));
      }
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Resize handling with ResizeObserver
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Animation Loop with current recommended THREE.Timer API (replaces deprecated THREE.Clock)
    const timer = new THREE.Timer();

    const animate = (timestamp: number) => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      // Update timer with current timestamp
      timer.update(timestamp);
      const elapsedTime = timer.getElapsed();

      // Smooth camera interpolation towards active zone target
      if (cameraRef.current) {
        cameraRef.current.position.lerp(targetCamPosRef.current, 0.045);
        currentLookAtRef.current.lerp(targetLookAtRef.current, 0.05);
        cameraRef.current.lookAt(currentLookAtRef.current);
      }

      // Micro subtle breathing pulsation of salon lights & chair alignment
      if (sceneObjects.primaryChair) {
        sceneObjects.primaryChair.position.y = Math.sin(elapsedTime * 1.2) * 0.006;
      }

      renderer.render(scene, camera);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      timer.dispose();
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, [isLiteMode]);

  // Update camera target when active hotspot changes
  useEffect(() => {
    const hp = SALON_HOTSPOTS[activeHotspotIndex];
    if (hp) {
      targetCamPosRef.current.set(...hp.cameraPos);
      targetLookAtRef.current.set(...hp.targetPos);
    }
  }, [activeHotspotIndex]);

  // Handle ambient luxury sound synthesis
  useEffect(() => {
    if (ambientSound) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // 174 Hz Solfeggio frequency for calm relaxation
        osc.type = 'sine';
        osc.frequency.setValueAtTime(174, ctx.currentTime);

        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        oscillatorRef.current = osc;
        gainNodeRef.current = gain;
      } catch {
        // Audio playback gracefully handles autoplay restrictions
      }
    } else {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
        } catch {
          // ignore
        }
        oscillatorRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }
    }

    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
        } catch {
          // ignore
        }
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [ambientSound]);

  const goToHotspot = (index: number) => {
    setActiveHotspotIndex(index);
  };

  const handleNext = () => {
    setActiveHotspotIndex((prev) => (prev + 1) % SALON_HOTSPOTS.length);
  };

  const handlePrev = () => {
    setActiveHotspotIndex((prev) => (prev - 1 + SALON_HOTSPOTS.length) % SALON_HOTSPOTS.length);
  };

  const resetCamera = () => {
    const hp = SALON_HOTSPOTS[activeHotspotIndex];
    if (hp && cameraRef.current) {
      targetCamPosRef.current.set(...hp.cameraPos);
      targetLookAtRef.current.set(...hp.targetPos);
    }
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[#09080e]">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-950/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-950/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-zinc-800/80 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-widest mb-3">
              <Compass className="w-3.5 h-3.5 text-purple-400" />
              <span>Interactive 3D Virtual Studio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white tracking-tight">
              THE SALON{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">
                ARCHITECTURE
              </span>
            </h2>
          </div>

          {/* Mode Switcher & Fallback controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLiteMode(!isLiteMode)}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 hover:border-purple-500/40 text-xs font-medium text-zinc-300 hover:text-white flex items-center gap-2 transition-all shadow-sm cursor-pointer"
              title="Toggle between 3D WebGL and 2.5D schematic mode"
              id="toggle-3d-lite-mode-btn"
            >
              <Layers className="w-4 h-4 text-purple-400" />
              <span>{isLiteMode ? 'Switch to 3D WebGL' : 'Lite / 2.5D Mode'}</span>
            </button>

            <button
              onClick={() => setAmbientSound(!ambientSound)}
              className={`p-2 rounded-xl border text-xs font-medium flex items-center transition-all cursor-pointer ${
                ambientSound 
                  ? 'bg-purple-950/60 border-purple-500/40 text-purple-300' 
                  : 'bg-zinc-900 border-zinc-700/80 text-zinc-400 hover:text-zinc-200'
              }`}
              title={ambientSound ? 'Ambient Sound Enabled' : 'Enable Ambient Sound Pulse'}
              id="ambient-sound-toggle-btn"
            >
              {ambientSound ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={resetCamera}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-700/80 hover:border-purple-500/40 text-zinc-300 hover:text-white transition-all cursor-pointer"
              title="Recenter Camera"
              id="recenter-camera-btn"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3D Stage Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main 3D Canvas / Lite View */}
          <div className="lg:col-span-8 rounded-3xl glass-panel relative overflow-hidden min-h-[460px] md:min-h-[540px] flex flex-col justify-between border border-purple-500/20 shadow-2xl shadow-purple-950/20">
            {!isLiteMode && !webGLError ? (
              <div
                ref={mountRef}
                className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing"
                id="threejs-canvas-mount"
              />
            ) : (
              // 2.5D High-Fidelity Interactive Schematic Fallback
              <div className="absolute inset-0 bg-gradient-to-br from-[#0c0a15] via-[#100d1d] to-[#08070d] p-8 flex flex-col justify-center items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center mb-6 shadow-lg shadow-purple-600/20">
                  <Armchair className="w-10 h-10 text-purple-300" />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
                  HIGH-FIDELITY ARCHITECTURAL SCHEMATIC
                </div>
                <h3 className="text-2xl font-bold font-heading text-white mb-2">
                  {activeHotspot.title}
                </h3>
                <p className="text-zinc-300 max-w-lg text-sm mb-6 leading-relaxed">
                  {activeHotspot.description}
                </p>
                <div className="grid grid-cols-3 gap-3 max-w-md w-full">
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300">
                    <span className="block font-mono text-purple-400 text-sm font-semibold">5500K</span>
                    Daylight Lux
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300">
                    <span className="block font-mono text-purple-400 text-sm font-semibold">Ergonomic</span>
                    Memory Recline
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300">
                    <span className="block font-mono text-purple-400 text-sm font-semibold">Acoustic</span>
                    Sound Sealed
                  </div>
                </div>
              </div>
            )}

            {/* Overlay Navigation Bars */}
            <div className="relative z-10 p-5 flex items-center justify-between pointer-events-none">
              <div className="pointer-events-auto flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-purple-500/30 text-xs font-mono text-purple-300 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Zone {activeHotspotIndex + 1} of {SALON_HOTSPOTS.length}</span>
              </div>

              <div className="pointer-events-auto text-[11px] font-mono text-zinc-300 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-zinc-800/80 hidden sm:block">
                Drag to orbit view • Select zones below to tour
              </div>
            </div>

            {/* Bottom Controls inside canvas */}
            <div className="relative z-10 p-5 flex items-center justify-between pointer-events-none">
              <div className="pointer-events-auto flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-xl bg-black/70 hover:bg-purple-950/80 text-white border border-purple-500/30 hover:border-purple-400 transition-all backdrop-blur-md cursor-pointer"
                  aria-label="Previous Zone"
                  id="tour-prev-btn"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-xl bg-black/70 hover:bg-purple-950/80 text-white border border-purple-500/30 hover:border-purple-400 transition-all backdrop-blur-md cursor-pointer"
                  aria-label="Next Zone"
                  id="tour-next-btn"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="pointer-events-auto">
                <button
                  onClick={onOpenBooking}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-purple-900/40 cursor-pointer"
                  id="tour-book-direct-btn"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book In This Zone</span>
                </button>
              </div>
            </div>
          </div>

          {/* Hotspots Tour Directory Card */}
          <div className="lg:col-span-4 flex flex-col justify-between glass-panel p-6 rounded-3xl border border-purple-500/20">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-purple-400">
                  Guided Architectural Tour
                </span>
                <span className="text-xs text-zinc-400">
                  Step {activeHotspotIndex + 1}/{SALON_HOTSPOTS.length}
                </span>
              </div>

              {/* Active Zone Detail Card */}
              <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-900/40 border border-purple-500/40 flex items-center justify-center text-purple-300">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">
                      {activeHotspot.title}
                    </h3>
                    <p className="text-xs text-purple-300 font-mono">
                      {activeHotspot.name}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans mt-3">
                  {activeHotspot.description}
                </p>
              </div>

              {/* Interactive Zone Buttons (Entrance -> Reception -> Waiting -> Chair -> Mirror -> Products) */}
              <div className="space-y-2">
                {SALON_HOTSPOTS.map((hotspot, idx) => {
                  const isActive = idx === activeHotspotIndex;
                  return (
                    <button
                      key={hotspot.id}
                      onClick={() => goToHotspot(idx)}
                      className={`w-full p-3 rounded-xl text-left text-xs font-medium transition-all flex items-center justify-between border cursor-pointer ${
                        isActive
                          ? 'bg-purple-950/60 border-purple-400 text-white shadow-md shadow-purple-900/30'
                          : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                      }`}
                      id={`hotspot-btn-${hotspot.id}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-mono font-bold ${
                            isActive
                              ? 'bg-purple-600 text-white'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className="font-sans font-medium">{hotspot.name}</span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isActive ? 'text-purple-400 translate-x-1' : 'text-zinc-600'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800/80">
              <button
                onClick={onOpenBooking}
                className="w-full py-3 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700 hover:border-purple-500/40 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                id="tour-schedule-session-btn"
              >
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>Schedule A Studio Session</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

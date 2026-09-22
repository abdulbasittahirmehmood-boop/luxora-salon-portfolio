import * as THREE from 'three';

/**
 * Builds a rich, fully solid, cinematic futuristic luxury salon environment.
 * Features:
 * - Architectural room envelope (walls, ceiling with recessed warm & neon linear lights, polished dark marble floor)
 * - Waiting lounge with luxurious velvet sofa, marble coffee table, espresso cups, design magazine, potted ficus plant
 * - Reception desk with glowing front panel, curved minimalist monitor, digital tablet, appointment bell
 * - Dual master styling stations with large beveled smart mirrors, halo ring lights, black leather barber chairs with chrome hydraulic bases
 * - Solid stone countertops, walnut cabinetry, glass product display shelves with cosmetics & serums
 * - Barber tool arsenal: Damascus steel shears, ceramic clippers, spray bottles
 * - Potted luxury flora / indoor plants with ceramic planters
 */
export function buildRealisticSalonScene(scene: THREE.Scene) {
  // Clear any existing children to prevent duplicates
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }

  // ==========================================
  // 1. MATERIAL PALETTE (High tactile quality)
  // ==========================================
  const floorMarbleMat = new THREE.MeshStandardMaterial({
    color: 0x111018,
    roughness: 0.12,
    metalness: 0.35,
  });

  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x181622,
    roughness: 0.7,
    metalness: 0.1,
  });

  const wallAccentWood = new THREE.MeshStandardMaterial({
    color: 0x241d24, // dark smoked walnut with purple warmth
    roughness: 0.45,
    metalness: 0.15,
  });

  const ceilingMat = new THREE.MeshStandardMaterial({
    color: 0x0f0e16,
    roughness: 0.8,
  });

  const blackLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x1c1a24,
    roughness: 0.4,
    metalness: 0.15,
  });

  const polishedChromeMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.95,
    roughness: 0.08,
  });

  const brushedGoldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.85,
    roughness: 0.25,
  });

  const mirrorGlassMat = new THREE.MeshStandardMaterial({
    color: 0x2a2838,
    roughness: 0.04,
    metalness: 0.96,
  });

  const frostedGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x93c5fd,
    transmission: 0.8,
    opacity: 0.85,
    transparent: true,
    roughness: 0.15,
    metalness: 0.1,
  });

  const stoneCountertopMat = new THREE.MeshStandardMaterial({
    color: 0x22202c,
    roughness: 0.25,
    metalness: 0.2,
  });

  const neonPurpleMat = new THREE.MeshBasicMaterial({
    color: 0xc084fc,
  });

  const neonCyanMat = new THREE.MeshBasicMaterial({
    color: 0x818cf8,
  });

  const warmLedMat = new THREE.MeshBasicMaterial({
    color: 0xfef08a,
  });

  const plantLeafMat = new THREE.MeshStandardMaterial({
    color: 0x15803d,
    roughness: 0.5,
    metalness: 0.1,
  });

  const plantPotMat = new THREE.MeshStandardMaterial({
    color: 0x3f3f46,
    roughness: 0.4,
    metalness: 0.2,
  });

  // ==========================================
  // 2. LIGHTING RIG (Cinematic & Depth-Focused)
  // ==========================================
  // Soft atmospheric ambient light for base fill
  const ambientLight = new THREE.AmbientLight(0x352d4e, 1.6);
  scene.add(ambientLight);

  // Key directional light providing primary illumination and casting soft architectural shadows
  const keyLight = new THREE.DirectionalLight(0xfff5ea, 1.8);
  keyLight.position.set(4, 8, 5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 25;
  keyLight.shadow.camera.left = -8;
  keyLight.shadow.camera.right = 8;
  keyLight.shadow.camera.top = 8;
  keyLight.shadow.camera.bottom = -8;
  keyLight.shadow.bias = -0.0005;
  scene.add(keyLight);

  // Soft purple accent rim light from back wall
  const purpleBackLight = new THREE.PointLight(0xa855f7, 2.5, 14);
  purpleBackLight.position.set(0, 3.5, -3.2);
  scene.add(purpleBackLight);

  // Studio Mirror Daylight Wash
  const mirrorKey1 = new THREE.PointLight(0xfff7ed, 2.2, 7);
  mirrorKey1.position.set(0, 2.4, -1.2);
  scene.add(mirrorKey1);

  const mirrorKey2 = new THREE.PointLight(0xfff7ed, 1.8, 7);
  mirrorKey2.position.set(-2.8, 2.4, -1.2);
  scene.add(mirrorKey2);

  // Lounge warm spotlight with shadows
  const loungeLight = new THREE.SpotLight(0xfef08a, 2.8, 10, Math.PI / 4, 0.4);
  loungeLight.position.set(2.8, 4.5, 2.5);
  loungeLight.target.position.set(2.5, 0.5, 2.0);
  loungeLight.castShadow = true;
  loungeLight.shadow.mapSize.width = 512;
  loungeLight.shadow.mapSize.height = 512;
  loungeLight.shadow.bias = -0.001;
  scene.add(loungeLight);
  scene.add(loungeLight.target);

  // Reception desk subtle violet spotlight with shadows
  const receptionLight = new THREE.SpotLight(0xc084fc, 3.0, 10, Math.PI / 3, 0.4);
  receptionLight.position.set(-3.2, 4.5, 3.2);
  receptionLight.target.position.set(-3.0, 1.0, 3.0);
  receptionLight.castShadow = true;
  receptionLight.shadow.mapSize.width = 512;
  receptionLight.shadow.mapSize.height = 512;
  receptionLight.shadow.bias = -0.001;
  scene.add(receptionLight);
  scene.add(receptionLight.target);

  // ==========================================
  // 3. ARCHITECTURAL ENVELOPE (Walls, Floor, Ceiling)
  // ==========================================
  // Floor (wide solid dark marble)
  const floorGeo = new THREE.PlaneGeometry(16, 16);
  const floor = new THREE.Mesh(floorGeo, floorMarbleMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0;
  scene.add(floor);

  // Decorative brass inlay floor strips for luxury touch
  for (let i = -6; i <= 6; i += 3) {
    const stripGeo = new THREE.PlaneGeometry(0.04, 15.6);
    const strip = new THREE.Mesh(stripGeo, brushedGoldMat);
    strip.rotation.x = -Math.PI / 2;
    strip.position.set(i, 0.002, 0);
    scene.add(strip);
  }

  // Ceiling
  const ceilingGeo = new THREE.PlaneGeometry(16, 16);
  const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = 4.5;
  scene.add(ceiling);

  // Ceiling Recessed Light Channels (Solid Linear Luminaires)
  const cChannelGeo = new THREE.BoxGeometry(0.12, 0.04, 12);
  const cLightL = new THREE.Mesh(cChannelGeo, warmLedMat);
  cLightL.position.set(-2, 4.48, 0);
  scene.add(cLightL);

  const cLightR = new THREE.Mesh(cChannelGeo, warmLedMat);
  cLightR.position.set(2, 4.48, 0);
  scene.add(cLightR);

  // Ceiling Neon Purple Trim
  const neonCoveGeo = new THREE.BoxGeometry(14, 0.03, 0.06);
  const neonCove = new THREE.Mesh(neonCoveGeo, neonPurpleMat);
  neonCove.position.set(0, 4.48, -4.5);
  scene.add(neonCove);

  // Back Wall (Barber Stations Wall)
  const backWallGeo = new THREE.BoxGeometry(16, 5, 0.2);
  const backWall = new THREE.Mesh(backWallGeo, wallMat);
  backWall.position.set(0, 2.25, -4.6);
  scene.add(backWall);

  // Back Wall Smoked Wood Feature Paneling behind mirrors
  const woodPanelGeo = new THREE.BoxGeometry(8, 3.8, 0.08);
  const woodPanel = new THREE.Mesh(woodPanelGeo, wallAccentWood);
  woodPanel.position.set(-0.8, 2.0, -4.48);
  scene.add(woodPanel);

  // Left Wall (Product Vault & Retail Wall)
  const leftWallGeo = new THREE.BoxGeometry(0.2, 5, 16);
  const leftWall = new THREE.Mesh(leftWallGeo, wallMat);
  leftWall.position.set(-6, 2.25, 0);
  scene.add(leftWall);

  // Right Wall (Lounge Wall)
  const rightWallGeo = new THREE.BoxGeometry(0.2, 5, 16);
  const rightWall = new THREE.Mesh(rightWallGeo, wallMat);
  rightWall.position.set(6, 2.25, 0);
  scene.add(rightWall);

  // ==========================================
  // 4. FUNCTIONAL BARBER CHAIR BUILDER
  // ==========================================
  function createBarberChair(x: number, z: number, rotationY = 0) {
    const chairGroup = new THREE.Group();

    // Chrome Circular Base
    const baseGeo = new THREE.CylinderGeometry(0.55, 0.6, 0.08, 32);
    const base = new THREE.Mesh(baseGeo, polishedChromeMat);
    base.position.y = 0.04;
    chairGroup.add(base);

    // Hydraulic Foot Pedal
    const pedalArmGeo = new THREE.BoxGeometry(0.3, 0.04, 0.12);
    const pedalArm = new THREE.Mesh(pedalArmGeo, polishedChromeMat);
    pedalArm.position.set(0, 0.08, 0.5);
    chairGroup.add(pedalArm);

    // Chrome Cylinder Piston
    const pistonGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.5, 24);
    const piston = new THREE.Mesh(pistonGeo, polishedChromeMat);
    piston.position.y = 0.32;
    chairGroup.add(piston);

    // Seat Support Plate
    const seatPlateGeo = new THREE.BoxGeometry(0.7, 0.06, 0.7);
    const seatPlate = new THREE.Mesh(seatPlateGeo, polishedChromeMat);
    seatPlate.position.y = 0.58;
    chairGroup.add(seatPlate);

    // Plush Tufted Leather Seat Cushion
    const seatCushionGeo = new THREE.BoxGeometry(0.85, 0.18, 0.85);
    const seatCushion = new THREE.Mesh(seatCushionGeo, blackLeatherMat);
    seatCushion.position.y = 0.7;
    chairGroup.add(seatCushion);

    // Chair Backrest
    const backrestGeo = new THREE.BoxGeometry(0.8, 0.85, 0.16);
    const backrest = new THREE.Mesh(backrestGeo, blackLeatherMat);
    backrest.position.set(0, 1.18, -0.38);
    backrest.rotation.x = 0.1;
    chairGroup.add(backrest);

    // Headrest
    const headrestStemGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.2, 12);
    const stemL = new THREE.Mesh(headrestStemGeo, polishedChromeMat);
    stemL.position.set(-0.15, 1.65, -0.42);
    chairGroup.add(stemL);
    const stemR = new THREE.Mesh(headrestStemGeo, polishedChromeMat);
    stemR.position.set(0.15, 1.65, -0.42);
    chairGroup.add(stemR);

    const headrestGeo = new THREE.BoxGeometry(0.45, 0.22, 0.14);
    const headrest = new THREE.Mesh(headrestGeo, blackLeatherMat);
    headrest.position.set(0, 1.76, -0.42);
    chairGroup.add(headrest);

    // Chrome Armrests
    [-0.45, 0.45].forEach((armX) => {
      const armPostGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.35, 16);
      const armPost = new THREE.Mesh(armPostGeo, polishedChromeMat);
      armPost.position.set(armX, 0.88, -0.05);
      chairGroup.add(armPost);

      const armPadGeo = new THREE.BoxGeometry(0.12, 0.06, 0.6);
      const armPad = new THREE.Mesh(armPadGeo, blackLeatherMat);
      armPad.position.set(armX, 1.05, -0.05);
      chairGroup.add(armPad);
    });

    // Footrest Assembly
    const footstemGeo = new THREE.BoxGeometry(0.1, 0.05, 0.45);
    const footstem = new THREE.Mesh(footstemGeo, polishedChromeMat);
    footstem.position.set(0, 0.35, 0.55);
    footstem.rotation.x = 0.25;
    chairGroup.add(footstem);

    const footpadGeo = new THREE.BoxGeometry(0.5, 0.06, 0.25);
    const footpad = new THREE.Mesh(footpadGeo, blackLeatherMat);
    footpad.position.set(0, 0.2, 0.8);
    chairGroup.add(footpad);

    chairGroup.position.set(x, 0, z);
    chairGroup.rotation.y = rotationY;
    return chairGroup;
  }

  // Station 1 Chair (Primary Focus)
  const chair1 = createBarberChair(0, -0.2, Math.PI);
  scene.add(chair1);

  // Station 2 Chair (Secondary Station)
  const chair2 = createBarberChair(-2.8, -0.2, Math.PI);
  scene.add(chair2);

  // ==========================================
  // 5. BARBER STATIONS & SMART MIRRORS
  // ==========================================
  function createMirrorStation(x: number) {
    const stationGroup = new THREE.Group();

    // Stone Countertop Base Cabinet
    const cabinetGeo = new THREE.BoxGeometry(2.2, 0.9, 0.7);
    const cabinet = new THREE.Mesh(cabinetGeo, stoneCountertopMat);
    cabinet.position.set(0, 0.45, -3.8);
    stationGroup.add(cabinet);

    // Polished Counter Surface Top
    const topGeo = new THREE.BoxGeometry(2.3, 0.08, 0.75);
    const top = new THREE.Mesh(topGeo, stoneCountertopMat);
    top.position.set(0, 0.92, -3.8);
    stationGroup.add(top);

    // Large Smart Arch Mirror
    const mirrorFrameGeo = new THREE.BoxGeometry(1.6, 2.2, 0.06);
    const mirrorFrame = new THREE.Mesh(mirrorFrameGeo, brushedGoldMat);
    mirrorFrame.position.set(0, 2.25, -4.38);
    stationGroup.add(mirrorFrame);

    const mirrorGlassGeo = new THREE.PlaneGeometry(1.48, 2.08);
    const mirrorGlass = new THREE.Mesh(mirrorGlassGeo, mirrorGlassMat);
    mirrorGlass.position.set(0, 2.25, -4.34);
    stationGroup.add(mirrorGlass);

    // Halo Glow Ring Around Mirror (Futuristic illumination)
    const haloRingGeo = new THREE.RingGeometry(0.85, 0.88, 36);
    const haloRing = new THREE.Mesh(haloRingGeo, neonPurpleMat);
    haloRing.position.set(0, 2.45, -4.33);
    stationGroup.add(haloRing);

    // Tools on Countertop:
    // Hair clipper
    const clipperGeo = new THREE.BoxGeometry(0.08, 0.06, 0.22);
    const clipper = new THREE.Mesh(clipperGeo, polishedChromeMat);
    clipper.position.set(-0.4, 0.98, -3.7);
    stationGroup.add(clipper);

    // Damascus shears
    const shearsGeo = new THREE.BoxGeometry(0.04, 0.02, 0.24);
    const shears = new THREE.Mesh(shearsGeo, polishedChromeMat);
    shears.position.set(-0.15, 0.97, -3.72);
    shears.rotation.y = 0.3;
    stationGroup.add(shears);

    // Amber Glass spray tonic bottle
    const sprayGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.22, 16);
    const sprayMat = new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.1,
      metalness: 0.3,
    });
    const spray = new THREE.Mesh(sprayGeo, sprayMat);
    spray.position.set(0.35, 1.05, -3.7);
    stationGroup.add(spray);

    // Glass water tumbler
    const glassCupGeo = new THREE.CylinderGeometry(0.04, 0.035, 0.12, 16);
    const glassCup = new THREE.Mesh(glassCupGeo, frostedGlassMat);
    glassCup.position.set(0.6, 1.0, -3.7);
    stationGroup.add(glassCup);

    stationGroup.position.x = x;
    return stationGroup;
  }

  scene.add(createMirrorStation(0));
  scene.add(createMirrorStation(-2.8));

  // ==========================================
  // 6. PRODUCT VAULT / RETAIL DISPLAY SHELVES
  // ==========================================
  const productVaultGroup = new THREE.Group();

  // Wall Display Niche (Recessed dark wood)
  const nicheBackGeo = new THREE.BoxGeometry(0.1, 3.2, 3.8);
  const nicheBack = new THREE.Mesh(nicheBackGeo, wallAccentWood);
  nicheBack.position.set(-5.88, 2.0, -1.5);
  productVaultGroup.add(nicheBack);

  // Glass Shelves
  const shelfPositionsY = [1.0, 1.6, 2.2, 2.8];
  shelfPositionsY.forEach((sy) => {
    const shelfGeo = new THREE.BoxGeometry(0.4, 0.04, 3.6);
    const shelf = new THREE.Mesh(shelfGeo, frostedGlassMat);
    shelf.position.set(-5.68, sy, -1.5);
    productVaultGroup.add(shelf);

    // Glowing LED underside strip
    const ledStripGeo = new THREE.BoxGeometry(0.02, 0.015, 3.5);
    const ledStrip = new THREE.Mesh(ledStripGeo, neonPurpleMat);
    ledStrip.position.set(-5.5, sy - 0.02, -1.5);
    productVaultGroup.add(ledStrip);

    // Luxury Cosmetic bottles & jars on shelves
    for (let k = -1.4; k <= 1.4; k += 0.45) {
      if (Math.abs(k) < 0.2 && sy === 2.2) continue; // organic gap
      const isJar = Math.abs(k) > 0.8;
      const prodGeo = isJar
        ? new THREE.CylinderGeometry(0.065, 0.065, 0.09, 16)
        : new THREE.CylinderGeometry(0.04, 0.04, 0.22, 16);
      const prodMat = new THREE.MeshStandardMaterial({
        color: Math.abs(k) > 0.6 ? 0xd4af37 : 0x09090b,
        roughness: 0.15,
        metalness: 0.85,
      });
      const prod = new THREE.Mesh(prodGeo, prodMat);
      prod.position.set(-5.65, sy + (isJar ? 0.065 : 0.13), -1.5 + k);
      productVaultGroup.add(prod);
    }
  });

  scene.add(productVaultGroup);

  // ==========================================
  // 7. WAITING LOUNGE & EXECUTIVE SEATING
  // ==========================================
  const loungeGroup = new THREE.Group();

  // Luxurious Velvet Sofa Base & Plinth
  const sofaPlinthGeo = new THREE.BoxGeometry(1.1, 0.1, 2.8);
  const sofaPlinth = new THREE.Mesh(sofaPlinthGeo, brushedGoldMat);
  sofaPlinth.position.set(4.5, 0.05, 2.0);
  loungeGroup.add(sofaPlinth);

  // Deep Charcoal Velvet Cushions
  const sofaSeatGeo = new THREE.BoxGeometry(1.0, 0.35, 2.6);
  const sofaSeatMat = new THREE.MeshStandardMaterial({
    color: 0x1f1d2b,
    roughness: 0.85,
    metalness: 0.05,
  });
  const sofaSeat = new THREE.Mesh(sofaSeatGeo, sofaSeatMat);
  sofaSeat.position.set(4.5, 0.28, 2.0);
  loungeGroup.add(sofaSeat);

  // Sofa Backrest
  const sofaBackGeo = new THREE.BoxGeometry(0.28, 0.65, 2.6);
  const sofaBack = new THREE.Mesh(sofaBackGeo, sofaSeatMat);
  sofaBack.position.set(5.05, 0.65, 2.0);
  loungeGroup.add(sofaBack);

  // Sofa Armrests
  [-1.25, 1.25].forEach((armZ) => {
    const armGeo = new THREE.BoxGeometry(1.0, 0.55, 0.22);
    const arm = new THREE.Mesh(armGeo, sofaSeatMat);
    arm.position.set(4.5, 0.48, 2.0 + armZ);
    loungeGroup.add(arm);
  });

  // Throw pillows with purple silk accent
  const pillowMat = new THREE.MeshStandardMaterial({
    color: 0x6b21a8,
    roughness: 0.6,
  });
  const pillow1 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.3, 0.3), pillowMat);
  pillow1.position.set(4.8, 0.55, 1.2);
  pillow1.rotation.y = 0.25;
  loungeGroup.add(pillow1);

  const pillow2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.3, 0.3), pillowMat);
  pillow2.position.set(4.8, 0.55, 2.7);
  pillow2.rotation.y = -0.25;
  loungeGroup.add(pillow2);

  // Marble & Brass Coffee Table
  const tableTopGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.05, 32);
  const tableTop = new THREE.Mesh(tableTopGeo, stoneCountertopMat);
  tableTop.position.set(3.2, 0.38, 2.0);
  loungeGroup.add(tableTop);

  const tableLegGeo = new THREE.CylinderGeometry(0.04, 0.18, 0.35, 16);
  const tableLeg = new THREE.Mesh(tableLegGeo, brushedGoldMat);
  tableLeg.position.set(3.2, 0.18, 2.0);
  loungeGroup.add(tableLeg);

  // Table Decor: Espresso cup & luxury magazine
  const cupGeo = new THREE.CylinderGeometry(0.045, 0.035, 0.07, 16);
  const cup = new THREE.Mesh(cupGeo, frostedGlassMat);
  cup.position.set(3.1, 0.44, 1.85);
  loungeGroup.add(cup);

  const magGeo = new THREE.BoxGeometry(0.22, 0.02, 0.3);
  const magMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.3 });
  const mag = new THREE.Mesh(magGeo, magMat);
  mag.position.set(3.3, 0.42, 2.15);
  mag.rotation.y = 0.4;
  loungeGroup.add(mag);

  scene.add(loungeGroup);

  // ==========================================
  // 8. RECEPTION DESK & ENTRANCE SANCTUARY
  // ==========================================
  const receptionGroup = new THREE.Group();

  // Main Curved/Chiseled Reception Desk Body
  const deskGeo = new THREE.BoxGeometry(2.4, 1.05, 0.85);
  const desk = new THREE.Mesh(deskGeo, wallMat);
  desk.position.set(-2.8, 0.525, 4.0);
  receptionGroup.add(desk);

  // Desk Stone Top
  const deskTopGeo = new THREE.BoxGeometry(2.5, 0.08, 0.95);
  const deskTop = new THREE.Mesh(deskTopGeo, stoneCountertopMat);
  deskTop.position.set(-2.8, 1.08, 4.0);
  receptionGroup.add(deskTop);

  // Front Backlit Inlay Feature Panel
  const deskFrontGeo = new THREE.BoxGeometry(2.1, 0.7, 0.04);
  const deskFront = new THREE.Mesh(deskFrontGeo, wallAccentWood);
  deskFront.position.set(-2.8, 0.52, 3.56);
  receptionGroup.add(deskFront);

  // Glowing Ambient Bottom Plinth
  const deskGlowGeo = new THREE.BoxGeometry(2.2, 0.03, 0.04);
  const deskGlow = new THREE.Mesh(deskGlowGeo, neonPurpleMat);
  deskGlow.position.set(-2.8, 0.03, 3.55);
  receptionGroup.add(deskGlow);

  // Concierge Tablet & Screen
  const monitorGeo = new THREE.BoxGeometry(0.55, 0.35, 0.02);
  const monitor = new THREE.Mesh(monitorGeo, polishedChromeMat);
  monitor.position.set(-2.6, 1.3, 4.0);
  monitor.rotation.x = -0.2;
  receptionGroup.add(monitor);

  const monitorStandGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.18, 12);
  const monitorStand = new THREE.Mesh(monitorStandGeo, polishedChromeMat);
  monitorStand.position.set(-2.6, 1.18, 4.02);
  receptionGroup.add(monitorStand);

  // Service Bell
  const bellGeo = new THREE.CylinderGeometry(0.04, 0.06, 0.04, 16);
  const bell = new THREE.Mesh(bellGeo, brushedGoldMat);
  bell.position.set(-3.4, 1.14, 3.8);
  receptionGroup.add(bell);

  scene.add(receptionGroup);

  // ==========================================
  // 9. BIOPHILIC BOTANICALS (Indoor Plants in Planters)
  // ==========================================
  function createPottedPlant(x: number, z: number, scale = 1) {
    const plantGroup = new THREE.Group();

    // Geometric Minimalist Planter
    const potGeo = new THREE.CylinderGeometry(0.28 * scale, 0.22 * scale, 0.65 * scale, 24);
    const pot = new THREE.Mesh(potGeo, plantPotMat);
    pot.position.y = (0.65 * scale) / 2;
    plantGroup.add(pot);

    // Soil Top
    const soilGeo = new THREE.CylinderGeometry(0.27 * scale, 0.27 * scale, 0.05 * scale, 24);
    const soilMat = new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.9 });
    const soil = new THREE.Mesh(soilGeo, soilMat);
    soil.position.y = 0.64 * scale;
    plantGroup.add(soil);

    // Lush Palm / Ficus Fronds
    const leafCount = 8;
    for (let i = 0; i < leafCount; i++) {
      const angle = (i / leafCount) * Math.PI * 2;
      const leafGeo = new THREE.BoxGeometry(0.12 * scale, 0.02, 0.7 * scale);
      const leaf = new THREE.Mesh(leafGeo, plantLeafMat);
      leaf.position.set(
        Math.cos(angle) * 0.15 * scale,
        0.8 * scale + (i % 2) * 0.1 * scale,
        Math.sin(angle) * 0.15 * scale
      );
      leaf.rotation.y = angle;
      leaf.rotation.x = 0.55;
      leaf.rotation.z = (Math.random() - 0.5) * 0.2;
      plantGroup.add(leaf);
    }

    plantGroup.position.set(x, 0, z);
    return plantGroup;
  }

  // Corner Biophilic Elements
  scene.add(createPottedPlant(-4.8, -4.0, 1.2)); // Near Back Left
  scene.add(createPottedPlant(4.8, -4.0, 1.2));  // Near Back Right
  scene.add(createPottedPlant(5.2, 0.2, 0.9));   // Beside Lounge Sofa
  scene.add(createPottedPlant(-4.5, 4.2, 0.95)); // Beside Reception

  // Configure castShadow and receiveShadow across all solid meshes
  scene.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      // Floor, walls, and countertops receive shadows
      obj.receiveShadow = true;
      // Furniture, chairs, plants, and decorative objects cast realistic shadows
      if (obj !== floor && obj !== ceiling && obj !== backWall && obj !== leftWall && obj !== rightWall) {
        obj.castShadow = true;
      }
    }
  });

  // Return the main barber chair if caller wants levitation or subtle animation
  return {
    primaryChair: chair1,
    secondaryChair: chair2,
  };
}

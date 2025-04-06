
// Three.js Background Implementations for all eight themes

// Cyberpunk Theme - Neon Grid Cityscape
function createCyberpunkBackground(scene, objects) {
    // Clear existing objects
    clearScene(scene, objects);
    
    // Add atmospheric fog for depth
    const fog = new THREE.FogExp2(0x0a0a1e, 0.035);
    scene.fog = fog;
    
    // Main grid - ground plane
    const gridHelper = new THREE.GridHelper(100, 50, 0xff00ff, 0x00ffff);
    gridHelper.position.y = -5;
    scene.add(gridHelper);
    objects.push(gridHelper);
    
    // Vertical buildings with neon outlines
    for (let i = 0; i < 100; i++) {
        const height = Math.random() * 15 + 5;
        const width = Math.random() * 2 + 0.5;
        const depth = Math.random() * 2 + 0.5;
        
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const edges = new THREE.EdgesGeometry(geometry);
        
        // Randomize neon colors
        const color = Math.random() > 0.5 ? 0xff00ff : 0x00ffff;
        
        const material = new THREE.LineBasicMaterial({
            color: color,
            transparent: true,
            opacity: Math.random() * 0.5 + 0.5
        });
        
        const building = new THREE.LineSegments(edges, material);
        
        // Position buildings in a grid pattern
        const gridHalfSize = 50;
        building.position.x = Math.random() * 100 - 50;
        building.position.y = height / 2 - 5; // Half height to place on grid
        building.position.z = Math.random() * 100 - 50;
        
        // Animation parameters
        building.userData.pulseSpeed = Math.random() * 0.002 + 0.001;
        building.userData.originalOpacity = material.opacity;
        
        building.userData.animate = function(time) {
            // Pulse opacity effect
            material.opacity = building.userData.originalOpacity * (0.7 + 0.3 * Math.sin(time * building.userData.pulseSpeed));
        };
        
        scene.add(building);
        objects.push(building);
    }
    
    // Flying data streams
    for (let i = 0; i < 50; i++) {
        const points = [];
        const segmentCount = Math.floor(Math.random() * 10) + 5;
        
        // Create a curved path for data stream
        const curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(Math.random() * 100 - 50, Math.random() * 30 - 5, Math.random() * 100 - 50),
            new THREE.Vector3(Math.random() * 100 - 50, Math.random() * 30 - 5, Math.random() * 100 - 50),
            new THREE.Vector3(Math.random() * 100 - 50, Math.random() * 30 - 5, Math.random() * 100 - 50)
        ]);
        
        const curvePoints = curve.getPoints(50);
        const streamGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
        
        const streamMaterial = new THREE.LineBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.6
        });
        
        const stream = new THREE.Line(streamGeometry, streamMaterial);
        
        // Animation parameters
        stream.userData.speed = Math.random() * 0.01 + 0.005;
        stream.userData.time = Math.random() * 1000;
        
        stream.userData.animate = function(time) {
            stream.userData.time += stream.userData.speed;
            stream.position.y = Math.sin(stream.userData.time) * 2;
            stream.material.opacity = 0.3 + Math.sin(time * 0.001) * 0.3;
        };
        
        scene.add(stream);
        objects.push(stream);
    }
    
    // Holographic floating elements
    for (let i = 0; i < 20; i++) {
        const geometry = new THREE.TorusGeometry(Math.random() * 2 + 1, 0.2, 16, 50);
        const material = new THREE.MeshBasicMaterial({
            color: 0xff00ff,
            wireframe: true,
            transparent: true,
            opacity: 0.5
        });
        
        const hologram = new THREE.Mesh(geometry, material);
        hologram.position.set(
            Math.random() * 80 - 40,
            Math.random() * 20 + 5,
            Math.random() * 80 - 40
        );
        
        hologram.userData.rotSpeed = {
            x: Math.random() * 0.01,
            y: Math.random() * 0.01,
            z: Math.random() * 0.01
        };
        
        hologram.userData.animate = function(time) {
            hologram.rotation.x += hologram.userData.rotSpeed.x;
            hologram.rotation.y += hologram.userData.rotSpeed.y;
            hologram.rotation.z += hologram.userData.rotSpeed.z;
            
            hologram.material.opacity = 0.3 + Math.sin(time * 0.001) * 0.2;
        };
        
        scene.add(hologram);
        objects.push(hologram);
    }
    
    // Add neon lights
    const light1 = new THREE.PointLight(0xff00ff, 1, 100);
    light1.position.set(20, 15, 20);
    scene.add(light1);
    
    const light2 = new THREE.PointLight(0x00ffff, 1, 100);
    light2.position.set(-20, 15, -20);
    scene.add(light2);
    
    objects.push(light1, light2);
}

// Minimalist Theme - Elegant Geometric Patterns
function createMinimalistBackground(scene, objects) {
    // Clear existing objects
    clearScene(scene, objects);
    
    // Create a clean, minimal geometric background
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
        // Create a spherical distribution
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = Math.random() * 30 + 10;
        
        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi);
        
        // Subtle gray colors
        const shade = 0.7 + Math.random() * 0.3;
        colors[i] = shade;
        colors[i + 1] = shade;
        colors[i + 2] = shade;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    
    particlesMesh.userData.animate = function(time) {
        particlesMesh.rotation.y += 0.0005;
    };
    
    scene.add(particlesMesh);
    objects.push(particlesMesh);
    
    // Floating geometric shapes
    const shapes = [];
    const shapeCount = 15;
    
    for (let i = 0; i < shapeCount; i++) {
        let geometry;
        const shapeType = Math.floor(Math.random() * 3);
        
        switch(shapeType) {
            case 0: // Cube
                geometry = new THREE.BoxGeometry(1, 1, 1);
                break;
            case 1: // Sphere
                geometry = new THREE.SphereGeometry(0.5, 16, 16);
                break;
            case 2: // Torus
                geometry = new THREE.TorusGeometry(0.5, 0.2, 16, 32);
                break;
        }
        
        const material = new THREE.MeshBasicMaterial({
            color: 0xcccccc,
            wireframe: true,
            transparent: true,
            opacity: 0.7
        });
        
        const shape = new THREE.Mesh(geometry, material);
        
        // Position in a spherical pattern
        const radius = Math.random() * 15 + 5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        shape.position.x = radius * Math.sin(phi) * Math.cos(theta);
        shape.position.y = radius * Math.sin(phi) * Math.sin(theta);
        shape.position.z = radius * Math.cos(phi);
        
        // Animation parameters
        shape.userData.rotationSpeed = {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
            z: (Math.random() - 0.5) * 0.01
        };
        
        shape.userData.animate = function(time) {
            shape.rotation.x += shape.userData.rotationSpeed.x;
            shape.rotation.y += shape.userData.rotationSpeed.y;
            shape.rotation.z += shape.userData.rotationSpeed.z;
            
            // Subtle breathing effect
            const scale = 1 + Math.sin(time * 0.001) * 0.05;
            shape.scale.set(scale, scale, scale);
        };
        
        scene.add(shape);
        objects.push(shape);
        shapes.push(shape);
    }
    
    // Connecting lines between shapes
    for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
            if (Math.random() > 0.7) continue; // Only connect some shapes
            
            const distance = shapes[i].position.distanceTo(shapes[j].position);
            if (distance > 10) continue; // Only connect nearby shapes
            
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                shapes[i].position,
                shapes[j].position
            ]);
            
            const lineMaterial = new THREE.LineBasicMaterial({
                color: 0xcccccc,
                transparent: true,
                opacity: 0.3 * (1 - distance / 10) // Fade with distance
            });
            
            const line = new THREE.Line(lineGeometry, lineMaterial);
            
            line.userData.points = {
                from: i,
                to: j
            };
            
            line.userData.animate = function() {
                // Update line positions to follow shapes
                const positions = line.geometry.attributes.position.array;
                
                positions[0] = shapes[line.userData.points.from].position.x;
                positions[1] = shapes[line.userData.points.from].position.y;
                positions[2] = shapes[line.userData.points.from].position.z;
                
                positions[3] = shapes[line.userData.points.to].position.x;
                positions[4] = shapes[line.userData.points.to].position.y;
                positions[5] = shapes[line.userData.points.to].position.z;
                
                line.geometry.attributes.position.needsUpdate = true;
            };
            
            scene.add(line);
            objects.push(line);
        }
    }
    
    // Subtle ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    objects.push(ambientLight);
}

// Space Theme - Cosmic Nebula and Planets
function createSpaceBackground(scene, objects) {
    // Clear existing objects
    clearScene(scene, objects);
    
    // Create a cosmic space scene
    
    // Stars - multiple layers for parallax effect
    for (let layer = 0; layer < 3; layer++) {
        const starsGeometry = new THREE.BufferGeometry();
        const starsCount = layer === 0 ? 2000 : (layer === 1 ? 1000 : 500);
        
        const positions = new Float32Array(starsCount * 3);
        const sizes = new Float32Array(starsCount);
        const colors = new Float32Array(starsCount * 3);
        
        const layerDistance = 30 + layer * 20;
        
        for (let i = 0; i < starsCount; i++) {
            // Spherical distribution
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = layerDistance + (Math.random() - 0.5) * 10;
            
            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);
            
            // Random sizes
            sizes[i] = Math.random() * 2 + (layer === 0 ? 0.5 : 0.2);
            
            // Star colors - mostly white with some blue, yellow and red
            const colorChoice = Math.random();
            if (colorChoice > 0.9) { // Blue stars
                colors[i * 3] = 0.7;
                colors[i * 3 + 1] = 0.8;
                colors[i * 3 + 2] = 1.0;
            } else if (colorChoice > 0.8) { // Yellow stars
                colors[i * 3] = 1.0;
                colors[i * 3 + 1] = 1.0;
                colors[i * 3 + 2] = 0.8;
            } else if (colorChoice > 0.7) { // Red stars
                colors[i * 3] = 1.0;
                colors[i * 3 + 1] = 0.7;
                colors[i * 3 + 2] = 0.7;
            } else { // White stars
                colors[i * 3] = 1.0;
                colors[i * 3 + 1] = 1.0;
                colors[i * 3 + 2] = 1.0;
            }
        }
        
        starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const starsMaterial = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });
        
        const stars = new THREE.Points(starsGeometry, starsMaterial);
        
        stars.userData.animate = function(time) {
            stars.rotation.y = time * 0.00005 * (layer + 1);
        };
        
        scene.add(stars);
        objects.push(stars);
    }
    
    // Nebula clouds
    for (let i = 0; i < 5; i++) {
        const nebulaGeometry = new THREE.SphereGeometry(Math.random() * 10 + 5, 32, 32);
        const nebulaMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color(
                Math.random() * 0.3 + 0.2,
                Math.random() * 0.3 + 0.2,
                Math.random() * 0.6 + 0.4
            ),
            transparent: true,
            opacity: 0.05,
            side: THREE.DoubleSide
        });
        
        const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
        
        nebula.position.set(
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50
        );
        
        nebula.userData.rotationSpeed = {
            x: (Math.random() - 0.5) * 0.0001,
            y: (Math.random() - 0.5) * 0.0001,
            z: (Math.random() - 0.5) * 0.0001
        };
        
        nebula.userData.animate = function(time) {
            nebula.rotation.x += nebula.userData.rotationSpeed.x;
            nebula.rotation.y += nebula.userData.rotationSpeed.y;
            nebula.rotation.z += nebula.userData.rotationSpeed.z;
            
            // Pulse opacity
            nebula.material.opacity = 0.05 + Math.sin(time * 0.0005) * 0.02;
        };
        
        scene.add(nebula);
        objects.push(nebula);
    }
    
    // Planets
    const planetCount = 3;
    for (let i = 0; i < planetCount; i++) {
        const radius = Math.random() * 1.5 + 0.5;
        const planetGeometry = new THREE.SphereGeometry(radius, 32, 32);
        
        // Create unique textures for each planet
        const planetColors = [
            new THREE.Color(0x4361ee), // Blue
            new THREE.Color(0x7209b7), // Purple
            new THREE.Color(0x3a0ca3)  // Deep blue
        ];
        
        const planetMaterial = new THREE.MeshBasicMaterial({
            color: planetColors[i % planetColors.length],
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });
        
        const planet = new THREE.Mesh(planetGeometry, planetMaterial);
        
        // Position planets in a circular pattern
        const angle = (i / planetCount) * Math.PI * 2;
        const distance = 15 + Math.random() * 5;
        
        planet.position.x = Math.cos(angle) * distance;
        planet.position.y = (Math.random() - 0.5) * 10;
        planet.position.z = Math.sin(angle) * distance;
        
        // Add rings to some planets
        if (Math.random() > 0.5) {
            const ringGeometry = new THREE.RingGeometry(radius + 0.5, radius + 1.5, 32);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: planetColors[(i + 1) % planetColors.length],
                side: THREE.DoubleSide,
                wireframe: true,
                transparent: true,
                opacity: 0.5
            });
            
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 2;
            
            planet.add(ring);
        }
        
        planet.userData.rotationSpeed = {
            x: (Math.random() - 0.5) * 0.005,
            y: (Math.random() - 0.5) * 0.005,
            z: (Math.random() - 0.5) * 0.005
        };
        
        planet.userData.orbitSpeed = 0.0005 + Math.random() * 0.0005;
        planet.userData.orbitRadius = distance;
        planet.userData.orbitAngle = angle;
        
        planet.userData.animate = function(time) {
            // Self rotation
            planet.rotation.x += planet.userData.rotationSpeed.x;
            planet.rotation.y += planet.userData.rotationSpeed.y;
            planet.rotation.z += planet.userData.rotationSpeed.z;
            
            // Orbit around center
            planet.userData.orbitAngle += planet.userData.orbitSpeed;
            planet.position.x = Math.cos(planet.userData.orbitAngle) * planet.userData.orbitRadius;
            planet.position.z = Math.sin(planet.userData.orbitAngle) * planet.userData.orbitRadius;
        };
        
        scene.add(planet);
        objects.push(planet);
    }
    
    // Add space lighting
    const blueLight = new THREE.PointLight(0x4361ee, 1, 100);
    blueLight.position.set(-5, 3, 5);
    scene.add(blueLight);
    
    const purpleLight = new THREE.PointLight(0x7209b7, 1, 100);
    purpleLight.position.set(5, -3, -5);
    scene.add(purpleLight);
    
    objects.push(blueLight, purpleLight);
}


function createDigitalBackground(scene, objects) {
    // Clear existing objects
    clearScene(scene, objects);
    
    // Add fog for depth
    const fog = new THREE.FogExp2(0x232931, 0.03);
    scene.fog = fog;
    
    // Digital grid
    const gridHelper = new THREE.GridHelper(100, 50, 0x4ecca3, 0x232931);
    gridHelper.position.y = -5;
    scene.add(gridHelper);
    objects.push(gridHelper);
    
    // Floating data cubes
    for (let i = 0; i < 100; i++) {
        const size = Math.random() * 0.5 + 0.2;
        const geometry = new THREE.BoxGeometry(size, size, size);
        const material = new THREE.MeshBasicMaterial({
            color: 0x4ecca3,
            wireframe: true,
            transparent: true,
            opacity: Math.random() * 0.5 + 0.3
        });
        
        const cube = new THREE.Mesh(geometry, material);
        
        // Position in a grid-like pattern but with some randomness
        cube.position.x = Math.floor(Math.random() * 20 - 10) * 5 + (Math.random() - 0.5) * 3;
        cube.position.y = Math.floor(Math.random() * 10) * 2 + (Math.random() - 0.5) * 3;
        cube.position.z = Math.floor(Math.random() * 20 - 10) * 5 + (Math.random() - 0.5) * 3;
        
        // Animation parameters
        cube.userData.floatSpeed = Math.random() * 0.01 + 0.005;
        cube.userData.rotationSpeed = {
            x: Math.random() * 0.02,
            y: Math.random() * 0.02,
            z: Math.random() * 0.02
        };
        cube.userData.originalY = cube.position.y;
        
        cube.userData.animate = function(time) {
            // Rotation
            cube.rotation.x += cube.userData.rotationSpeed.x;
            cube.rotation.y += cube.userData.rotationSpeed.y;
            cube.rotation.z += cube.userData.rotationSpeed.z;
            
            // Floating motion
            cube.position.y = cube.userData.originalY + Math.sin(time * cube.userData.floatSpeed) * 2;
            
            // Pulse opacity
            cube.material.opacity = 0.3 + Math.sin(time * 0.001) * 0.2;
        };
        
        scene.add(cube);
        objects.push(cube);
    }
    
    // Data streams
    for (let i = 0; i < 30; i++) {
        const points = [];
        const segmentCount = Math.floor(Math.random() * 10) + 5;
        
        // Start point
        let x = (Math.random() - 0.5) * 100;
        let y = Math.random() * 50;
        let z = (Math.random() - 0.5) * 100;
        
        for (let j = 0; j < segmentCount; j++) {
            points.push(new THREE.Vector3(x, y, z));
            
            // Next point with digital-like movement (90-degree angles)
            const direction = Math.floor(Math.random() * 3);
            const distance = Math.random() * 5 + 2;
            
            if (direction === 0) x += (Math.random() > 0.5 ? 1 : -1) * distance;
            else if (direction === 1) y += (Math.random() > 0.5 ? 1 : -1) * distance;
            else z += (Math.random() > 0.5 ? 1 : -1) * distance;
        }
        
        const streamGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const streamMaterial = new THREE.LineBasicMaterial({
            color: 0x4ecca3,
            transparent: true,
            opacity: Math.random() * 0.5 + 0.3
        });
        
        const stream = new THREE.Line(streamGeometry, streamMaterial);
        
        stream.userData.animate = function(time) {
            // Pulse opacity
            stream.material.opacity = 0.3 + Math.sin(time * 0.001 + i) * 0.2;
        };
        
        scene.add(stream);
        objects.push(stream);
    }
    
    // Circuit board patterns
    for (let i = 0; i < 10; i++) {
        const circuitGeometry = new THREE.PlaneGeometry(20, 20);
        const circuitMaterial = new THREE.MeshBasicMaterial({
            color: 0x4ecca3,
            wireframe: true,
            transparent: true,
            opacity: 0.2,
            side: THREE.DoubleSide
        });
        
        const circuit = new THREE.Mesh(circuitGeometry, circuitMaterial);
        
        // Position and rotate randomly
        circuit.position.set(
            (Math.random() - 0.5) * 80,
            Math.random() * 40,
            (Math.random() - 0.5) * 80
        );
        
        circuit.rotation.x = Math.random() * Math.PI;
        circuit.rotation.y = Math.random() * Math.PI;
        circuit.rotation.z = Math.random() * Math.PI;
        
        circuit.userData.animate = function(time) {
            // Subtle rotation
            circuit.rotation.x += 0.001;
            circuit.rotation.y += 0.001;
            
            // Pulse opacity
            circuit.material.opacity = 0.1 + Math.sin(time * 0.0005 + i) * 0.1;
        };
        
        scene.add(circuit);
        objects.push(circuit);
    }
    
    // Add digital lighting
    const greenLight = new THREE.PointLight(0x4ecca3, 1, 100);
    greenLight.position.set(20, 15, 20);
    scene.add(greenLight);
    
    objects.push(greenLight);
}


function createSurrealBackground(scene, objects) {
    // Clear existing objects
    clearScene(scene, objects);
    
    // Add fog for depth
    const fog = new THREE.FogExp2(0x1a1a2e, 0.02);
    scene.fog = fog;
    
    // Surreal shapes
    for (let i = 0; i < 20; i++) {
        const geometry = new THREE.TorusKnotGeometry(
            Math.random() * 1 + 0.5,
            Math.random() * 0.3 + 0.1,
            64,
            16
        );
        
        const material = new THREE.MeshBasicMaterial({
            color: i % 2 === 0 ? 0xff7700 : 0xff0077,
            wireframe: true,
            transparent: true,
            opacity: Math.random() * 0.5 + 0.3
        });
        
        const torusKnot = new THREE.Mesh(geometry, material);
        
        // Position randomly in 3D space
        torusKnot.position.set(
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30
        );
        
        // Animation parameters
        torusKnot.userData.rotationSpeed = {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
            z: (Math.random() - 0.5) * 0.01
        };
        
        torusKnot.userData.floatSpeed = {
            x: Math.random() * 0.005 + 0.001,
            y: Math.random() * 0.005 + 0.001,
            z: Math.random() * 0.005 + 0.001
        };
        
        torusKnot.userData.originalPosition = {
            x: torusKnot.position.x,
            y: torusKnot.position.y,
            z: torusKnot.position.z
        };
        
        torusKnot.userData.animate = function(time) {
            // Rotation
            torusKnot.rotation.x += torusKnot.userData.rotationSpeed.x;
            torusKnot.rotation.y += torusKnot.userData.rotationSpeed.y;
            torusKnot.rotation.z += torusKnot.userData.rotationSpeed.z;
            
            // Floating motion
            torusKnot.position.x = torusKnot.userData.originalPosition.x + Math.sin(time * torusKnot.userData.floatSpeed.x) * 3;
            torusKnot.position.y = torusKnot.userData.originalPosition.y + Math.cos(time * torusKnot.userData.floatSpeed.y) * 3;
            torusKnot.position.z = torusKnot.userData.originalPosition.z + Math.sin(time * torusKnot.userData.floatSpeed.z) * 3;
            
            // Pulse opacity
            torusKnot.material.opacity = 0.3 + Math.sin(time * 0.001) * 0.2;
        };
        
        scene.add(torusKnot);
        objects.push(torusKnot);
    }
    
    // Surreal waves
    for (let i = 0; i < 10; i++) {
        const wavePoints = [];
        const segments = 100;
        
        for (let j = 0; j < segments; j++) {
            const t = j / segments;
            const x = (t - 0.5) * 50;
            const y = Math.sin(t * Math.PI * 4 + i) * 5;
            const z = Math.cos(t * Math.PI * 6 + i) * 5;
            
            wavePoints.push(new THREE.Vector3(x, y, z));
        }
        
        const waveGeometry = new THREE.BufferGeometry().setFromPoints(wavePoints);
        const waveMaterial = new THREE.LineBasicMaterial({
            color: i % 2 === 0 ? 0xff7700 : 0xff0077,
            transparent: true,
            opacity: 0.7
        });
        
        const wave = new THREE.Line(waveGeometry, waveMaterial);
        
        // Position randomly
        wave.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
        );
        
        wave.userData.rotationSpeed = {
            x: (Math.random() - 0.5) * 0.005,
            y: (Math.random() - 0.5) * 0.005,
            z: (Math.random() - 0.5) * 0.005
        };
        
        wave.userData.animate = function(time) {
            // Rotation
            wave.rotation.x += wave.userData.rotationSpeed.x;
            wave.rotation.y += wave.userData.rotationSpeed.y;
            wave.rotation.z += wave.userData.rotationSpeed.z;
            
            // Pulse opacity
            wave.material.opacity = 0.5 + Math.sin(time * 0.001 + i) * 0.2;
        };
        
        scene.add(wave);
        objects.push(wave);
    }
    
    // Floating orbs
    for (let i = 0; i < 30; i++) {
        const radius = Math.random() * 1 + 0.2;
        const geometry = new THREE.SphereGeometry(radius, 16, 16);
        const material = new THREE.MeshBasicMaterial({
            color: 0xeeaa00,
            transparent: true,
            opacity: Math.random() * 0.3 + 0.1,
            wireframe: true
        });
        
        const orb = new THREE.Mesh(geometry, material);
        
        // Position randomly
        orb.position.set(
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50
        );
        
        orb.userData.floatSpeed = Math.random() * 0.005 + 0.001;
        orb.userData.originalPosition = {
            x: orb.position.x,
            y: orb.position.y,
            z: orb.position.z
        };
        
        orb.userData.animate = function(time) {
            // Floating motion
            orb.position.x = orb.userData.originalPosition.x + Math.sin(time * orb.userData.floatSpeed) * 2;
            orb.position.y = orb.userData.originalPosition.y + Math.cos(time * orb.userData.floatSpeed) * 2;
            
            // Pulse size
            const scale = 1 + Math.sin(time * 0.001) * 0.2;
            orb.scale.set(scale, scale, scale);
            
            // Pulse opacity
            orb.material.opacity = 0.1 + Math.sin(time * 0.001 + i) * 0.1;
        };
        
        scene.add(orb);
        objects.push(orb);
    }
    
    // Add surreal lighting
    const orangeLight = new THREE.PointLight(0xff7700, 1, 100);
    orangeLight.position.set(20, 15, 20);
    scene.add(orangeLight);
    
    const pinkLight = new THREE.PointLight(0xff0077, 1, 100);
    pinkLight.position.set(-20, -15, -20);
    scene.add(pinkLight);
    
    objects.push(orangeLight, pinkLight);
}
function createNeonFluxBackground(scene, objects) {
    // Clear existing objects
    clearScene(scene, objects);
    
    // Add fog for depth
    const fog = new THREE.FogExp2(0x0f0f1e, 0.025);
    scene.fog = fog;
    
    // Create neon grid
    const gridHelper = new THREE.GridHelper(100, 50, 0x00eeff, 0xff00aa);
    gridHelper.position.y = -5;
    scene.add(gridHelper);
    objects.push(gridHelper);
    
    // Neon particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
        // Position particles in a spherical distribution
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = Math.random() * 30 + 10;
        
        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi);
        
        // Assign neon colors
        if (Math.random() > 0.5) {
            // Cyan
            colors[i] = 0;
            colors[i + 1] = 0.9;
            colors[i + 2] = 1;
        } else {
            // Pink
            colors[i] = 1;
            colors[i + 1] = 0;
            colors[i + 2] = 0.7;
        }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    
    particlesMesh.userData.animate = function(time) {
        particlesMesh.rotation.y += 0.001;
        
        // Pulse size
        const scale = 1 + Math.sin(time * 0.001) * 0.1;
        particlesMaterial.size = 0.2 * scale;
    };
    
    scene.add(particlesMesh);
    objects.push(particlesMesh);
    
    // Neon light trails
    for (let i = 0; i < 20; i++) {
        const trailPoints = [];
        const segments = 100;
        
        // Create curved paths
        const curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(Math.random() * 60 - 30, Math.random() * 40 - 20, Math.random() * 60 - 30),
            new THREE.Vector3(Math.random() * 60 - 30, Math.random() * 40 - 20, Math.random() * 60 - 30),
            new THREE.Vector3(Math.random() * 60 - 30, Math.random() * 40 - 20, Math.random() * 60 - 30)
        ]);
        
        const points = curve.getPoints(segments);
        const trailGeometry = new THREE.BufferGeometry().setFromPoints(points);
        
        const trailMaterial = new THREE.LineBasicMaterial({
            color: i % 2 === 0 ? 0x00eeff : 0xff00aa,
            transparent: true,
            opacity: 0.7
        });
        
        const trail = new THREE.Line(trailGeometry, trailMaterial);
        
        trail.userData.animate = function(time) {
            // Rotate slowly
            trail.rotation.x += 0.002;
            trail.rotation.y += 0.001;
            
            // Pulse opacity
            trail.material.opacity = 0.5 + Math.sin(time * 0.001 + i) * 0.3;
        };
        
        scene.add(trail);
        objects.push(trail);
    }
    
    // Floating neon rings
    for (let i = 0; i < 15; i++) {
        const ringGeometry = new THREE.TorusGeometry(Math.random() * 3 + 1, 0.1, 16, 100);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: i % 2 === 0 ? 0x00eeff : 0xff00aa,
            transparent: true,
            opacity: Math.random() * 0.5 + 0.3,
            side: THREE.DoubleSide
        });
        
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        
        // Position randomly
        ring.position.set(
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50
        );
        
        // Random rotation
        ring.rotation.x = Math.random() * Math.PI;
        ring.rotation.y = Math.random() * Math.PI;
        
        ring.userData.rotationSpeed = {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
            z: (Math.random() - 0.5) * 0.01
        };
        
        ring.userData.animate = function(time) {
            // Rotation
            ring.rotation.x += ring.userData.rotationSpeed.x;
            ring.rotation.y += ring.userData.rotationSpeed.y;
            ring.rotation.z += ring.userData.rotationSpeed.z;
            
            // Pulse opacity
            ring.material.opacity = 0.3 + Math.sin(time * 0.001 + i) * 0.2;
        };
        
        scene.add(ring);
        objects.push(ring);
    }
    
    // Add neon lights
    const cyanLight = new THREE.PointLight(0x00eeff, 1, 100);
    cyanLight.position.set(20, 15, 20);
    scene.add(cyanLight);
    
    const pinkLight = new THREE.PointLight(0xff00aa, 1, 100);
    pinkLight.position.set(-20, -15, -20);
    scene.add(pinkLight);
    
    objects.push(cyanLight, pinkLight);
}

function createGlassmorphismBackground(scene, objects) {
    // Clear existing objects
    clearScene(scene, objects);
    
    // Add fog for depth
    const fog = new THREE.FogExp2(0x151c24, 0.02);
    scene.fog = fog;
    
    // Create floating glass panels
    for (let i = 0; i < 20; i++) {
        const width = Math.random() * 5 + 3;
        const height = Math.random() * 5 + 3;
        const geometry = new THREE.PlaneGeometry(width, height);
        
        const material = new THREE.MeshBasicMaterial({
            color: 0x4facfe,
            transparent: true,
            opacity: Math.random() * 0.1 + 0.05,
            side: THREE.DoubleSide
        });
        
        const panel = new THREE.Mesh(geometry, material);
        
        // Position randomly
        panel.position.set(
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 40
        );
        
        // Random rotation
        panel.rotation.x = Math.random() * Math.PI;
        panel.rotation.y = Math.random() * Math.PI;
        panel.rotation.z = Math.random() * Math.PI;
        
        panel.userData.rotationSpeed = {
            x: (Math.random() - 0.5) * 0.002,
            y: (Math.random() - 0.5) * 0.002,
            z: (Math.random() - 0.5) * 0.002
        };
        
        panel.userData.animate = function(time) {
            // Gentle rotation
            panel.rotation.x += panel.userData.rotationSpeed.x;
            panel.rotation.y += panel.userData.rotationSpeed.y;
            panel.rotation.z += panel.userData.rotationSpeed.z;
            
            // Pulse opacity
            panel.material.opacity = 0.05 + Math.sin(time * 0.0005) * 0.05;
        };
        
        scene.add(panel);
        objects.push(panel);
    }
    
    // Create glass orbs
    for (let i = 0; i < 30; i++) {
        const radius = Math.random() * 1.5 + 0.5;
        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: i % 2 === 0 ? 0x4facfe : 0xf093fb,
            transparent: true,
            opacity: Math.random() * 0.2 + 0.1,
            wireframe: false
        });
        
        const orb = new THREE.Mesh(geometry, material);
        
        // Position randomly
        orb.position.set(
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 40
        );
        
        orb.userData.floatSpeed = Math.random() * 0.001 + 0.0005;
        orb.userData.originalPosition = {
            x: orb.position.x,
            y: orb.position.y,
            z: orb.position.z
        };
        
        orb.userData.animate = function(time) {
            // Floating motion
            orb.position.y = orb.userData.originalPosition.y + Math.sin(time * orb.userData.floatSpeed) * 3;
            
            // Pulse opacity
            orb.material.opacity = 0.1 + Math.sin(time * 0.001 + i) * 0.1;
        };
        
        scene.add(orb);
        objects.push(orb);
    }
    
    // Create light beams
    for (let i = 0; i < 10; i++) {
        const height = Math.random() * 30 + 20;
        const geometry = new THREE.CylinderGeometry(0.1, 0.5, height, 32, 1, true);
        const material = new THREE.MeshBasicMaterial({
            color: i % 2 === 0 ? 0x4facfe : 0xf093fb,
            transparent: true,
            opacity: 0.05,
            side: THREE.DoubleSide
        });
        
        const beam = new THREE.Mesh(geometry, material);
        
        // Position randomly
        beam.position.set(
            (Math.random() - 0.5) * 40,
            0,
            (Math.random() - 0.5) * 40
        );
        
        // Rotate to make beams vertical
        beam.rotation.x = Math.PI / 2;
        
        beam.userData.animate = function(time) {
            // Rotate slowly
            beam.rotation.z += 0.002;
            
            // Pulse opacity
            beam.material.opacity = 0.03 + Math.sin(time * 0.0005 + i) * 0.02;
        };
        
        scene.add(beam);
        objects.push(beam);
    }
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    objects.push(ambientLight);
    
    // Add point lights
    const blueLight = new THREE.PointLight(0x4facfe, 1, 100);
    blueLight.position.set(20, 15, 20);
    scene.add(blueLight);
    
    const pinkLight = new THREE.PointLight(0xf093fb, 1, 100);
    pinkLight.position.set(-20, -15, -20);
    scene.add(pinkLight);
    
    objects.push(blueLight, pinkLight);
}

// Helper function to clear scene
function clearScene(scene, objects) {
    while(objects.length > 0) {
        const obj = objects.pop();
        scene.remove(obj);
        
        // Dispose geometries and materials to free memory
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
            if (Array.isArray(obj.material)) {
                obj.material.forEach(material => material.dispose());
            } else {
                obj.material.dispose();
            }
        }
    }
}

function createBiomimicryBackground(scene, objects) {
    // Clear existing objects
    clearScene(scene, objects);
    
    // Add fog for depth
    const fog = new THREE.FogExp2(0x1e272e, 0.02);
    scene.fog = fog;
    
    // Create organic particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
        // Position particles in a spherical distribution
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = Math.random() * 30 + 10;
        
        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi);
        
        // Assign natural colors
        if (Math.random() > 0.7) {
            // Green
            colors[i] = 0.2;
            colors[i + 1] = 0.8;
            colors[i + 2] = 0.4;
        } else if (Math.random() > 0.4) {
            // Blue
            colors[i] = 0.2;
            colors[i + 1] = 0.6;
            colors[i + 2] = 0.9;
        } else {
            // Yellow
            colors[i] = 0.9;
            colors[i + 1] = 0.8;
            colors[i + 2] = 0.2;
        }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.7
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    
    particlesMesh.userData.animate = function(time) {
        particlesMesh.rotation.y += 0.0005;
        
        // Breathing effect
        const scale = 1 + Math.sin(time * 0.0005) * 0.1;
        particlesMesh.scale.set(scale, scale, scale);
    };
    
    scene.add(particlesMesh);
    objects.push(particlesMesh);
    
    // Create organic shapes
    for (let i = 0; i < 15; i++) {
        // Create leaf-like shapes
        const leafShape = new THREE.Shape();
        const size = Math.random() * 2 + 1;
        
        leafShape.moveTo(0, 0);
        leafShape.bezierCurveTo(size, size, -size, 2 * size, 0, 3 * size);
        leafShape.bezierCurveTo(size, 2 * size, -size, size, 0, 0);
        
        const leafGeometry = new THREE.ShapeGeometry(leafShape);
        const leafMaterial = new THREE.MeshBasicMaterial({
            color: 0x2ecc71,
            transparent: true,
            opacity: Math.random() * 0.5 + 0.3,
            side: THREE.DoubleSide,
            wireframe: true
        });
        
        const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        
        // Position randomly
        leaf.position.set(
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 40
        );
        
        // Random rotation
        leaf.rotation.x = Math.random() * Math.PI;
        leaf.rotation.y = Math.random() * Math.PI;
        leaf.rotation.z = Math.random() * Math.PI;
        
        leaf.userData.rotationSpeed = {
            x: (Math.random() - 0.5) * 0.005,
            y: (Math.random() - 0.5) * 0.005,
            z: (Math.random() - 0.5) * 0.005
        };
        
        leaf.userData.originalPosition = {
            x: leaf.position.x,
            y: leaf.position.y,
            z: leaf.position.z
        };
        
        leaf.userData.floatSpeed = Math.random() * 0.001 + 0.0005;
        
        leaf.userData.animate = function(time) {
            // Gentle rotation
            leaf.rotation.x += leaf.userData.rotationSpeed.x;
            leaf.rotation.y += leaf.userData.rotationSpeed.y;
            leaf.rotation.z += leaf.userData.rotationSpeed.z;
            
            // Floating motion
            leaf.position.y = leaf.userData.originalPosition.y + Math.sin(time * leaf.userData.floatSpeed) * 2;
            
            // Pulse opacity
            leaf.material.opacity = 0.3 + Math.sin(time * 0.0005 + i) * 0.2;
        };
        
        scene.add(leaf);
        objects.push(leaf);
    }
    
    // DNA-like double helix
    const helixRadius = 5;
    const helixHeight = 20;
    const helixTurns = 3;
    const helixPoints = 100;
    
    for (let strand = 0; strand < 2; strand++) {
        const points = [];
        
        for (let i = 0; i < helixPoints; i++) {
            const t = i / helixPoints;
            const angle = t * Math.PI * 2 * helixTurns + (strand * Math.PI);
            
            const x = helixRadius * Math.cos(angle);
            const y = helixHeight * (t - 0.5);
            const z = helixRadius * Math.sin(angle);
            
            points.push(new THREE.Vector3(x, y, z));
        }
        
        const helixGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const helixMaterial = new THREE.LineBasicMaterial({
            color: strand === 0 ? 0x3498db : 0x2ecc71,
            transparent: true,
            opacity: 0.7
        });
        
        const helix = new THREE.Line(helixGeometry, helixMaterial);
        
        // Position the helix
        helix.position.set(0, 0, -15);
        
        helix.userData.animate = function(time) {
            // Rotate slowly
            helix.rotation.y += 0.005;
            
            // Pulse opacity
            helix.material.opacity = 0.5 + Math.sin(time * 0.001) * 0.2;
        };
        
        scene.add(helix);
        objects.push(helix);
        
        // Add connecting lines between strands
        for (let i = 0; i < helixPoints; i += 10) {
            if (strand === 0) {
                const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                    points[i],
                    new THREE.Vector3(
                        helixRadius * Math.cos(i / helixPoints * Math.PI * 2 * helixTurns + Math.PI),
                        helixHeight * (i / helixPoints - 0.5),
                        helixRadius * Math.sin(i / helixPoints * Math.PI * 2 * helixTurns + Math.PI)
                    )
                ]);
                
                const lineMaterial = new THREE.LineBasicMaterial({
                    color: 0xf1c40f,
                    transparent: true,
                    opacity: 0.5
                });
                
                const line = new THREE.Line(lineGeometry, lineMaterial);
                line.userData.animate = function(time) {
                    // Pulse opacity
                    line.material.opacity = 0.3 + Math.sin(time * 0.001 + i) * 0.2;
                };
                
                scene.add(line);
                objects.push(line);
            }
        }
    }
    
    // Create fractal tree
    function createBranch(startPoint, direction, length, thickness, depth) {
        if (depth <= 0) return null;
        
        const endPoint = new THREE.Vector3().addVectors(
            startPoint,
            direction.clone().multiplyScalar(length)
        );
        
        const branchGeometry = new THREE.BufferGeometry().setFromPoints([startPoint, endPoint]);
        const branchMaterial = new THREE.LineBasicMaterial({
            color: 0x2ecc71,
            transparent: true,
            opacity: 0.7,
            linewidth: thickness
        });
        
        const branch = new THREE.Line(branchGeometry, branchMaterial);
        
        branch.userData.animate = function(time) {
            // Subtle swaying motion
            branch.rotation.z = Math.sin(time * 0.001) * 0.05 * (5 - depth);
        };
        
        scene.add(branch);
        objects.push(branch);
        
        // Create sub-branches
        if (depth > 1) {
            const numBranches = 2;
            const newLength = length * 0.7;
            const newThickness = thickness * 0.7;
            
            for (let i = 0; i < numBranches; i++) {
                const angle = (i * Math.PI / 2) + Math.PI / 4;
                const newDirection = new THREE.Vector3(
                    direction.x * Math.cos(angle) - direction.y * Math.sin(angle),
                    direction.x * Math.sin(angle) + direction.y * Math.cos(angle),
                    direction.z
                ).normalize();
                
                createBranch(endPoint, newDirection, newLength, newThickness, depth - 1);
            }
        }
        
        return branch;
    }
    
    // Create the main trunk of the tree
    const treeStart = new THREE.Vector3(15, -10, 0);
    const treeDirection = new THREE.Vector3(0, 1, 0);
    createBranch(treeStart, treeDirection, 5, 2, 4);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    objects.push(ambientLight);
    
    // Add directional light to simulate sunlight
    const sunLight = new THREE.DirectionalLight(0xffffff, 0.8);
    sunLight.position.set(10, 20, 10);
    scene.add(sunLight);
    objects.push(sunLight);
    
    // Add point lights with natural colors
    const greenLight = new THREE.PointLight(0x2ecc71, 1, 50);
    greenLight.position.set(10, 5, 10);
    scene.add(greenLight);
    
    const blueLight = new THREE.PointLight(0x3498db, 1, 50);
    blueLight.position.set(-10, -5, -10);
    scene.add(blueLight);
    
    objects.push(greenLight, blueLight);
}


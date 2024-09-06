let scene, camera, renderer, particles;
const particleCount = 500;
let currentSection = 'home';
let targetPosition = { x: 0, y: 0, z: 0 };
let currentPosition = { x: 0, y: 0, z: 0 };
let mouse = new THREE.Vector2();
let mouseWorld = new THREE.Vector3();
let raycaster = new THREE.Raycaster();
let plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-1';
    document.body.insertBefore(renderer.domElement, document.body.firstChild);

    createParticles();

    camera.position.z = 5;

    window.addEventListener('mousemove', onMouseMove);
}

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const phases = new Float32Array(particleCount * 3);
    const amplitudes = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    const colorPalette = [
        new THREE.Color(0xCCCCCC),  // Light grey
        new THREE.Color(0x999999),  // Medium grey
        new THREE.Color(0x666666)   // Dark grey
    ];

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = originalPositions[i] = (Math.random() - 0.5) * 10;
        positions[i + 1] = originalPositions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = originalPositions[i + 2] = (Math.random() - 0.5) * 10;

        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;

        phases[i] = Math.random() * Math.PI * 2;
        phases[i + 1] = Math.random() * Math.PI * 2;
        phases[i + 2] = Math.random() * Math.PI * 2;

        amplitudes[i] = (Math.random() * 0.02 + 0.01) * (Math.random() < 0.5 ? 1 : -1);
        amplitudes[i + 1] = (Math.random() * 0.02 + 0.01) * (Math.random() < 0.5 ? 1 : -1);
        amplitudes[i + 2] = (Math.random() * 0.02 + 0.01) * (Math.random() < 0.5 ? 1 : -1);

        velocities[i] = 0;
        velocities[i + 1] = 0;
        velocities[i + 2] = 0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 3));
    geometry.setAttribute('amplitude', new THREE.BufferAttribute(amplitudes, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    geometry.setAttribute('originalPosition', new THREE.BufferAttribute(originalPositions, 3));

    const material = new THREE.PointsMaterial({ 
        size: 0.03, 
        vertexColors: true,
        transparent: true,
        opacity: 0.7
    });
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

let lastTime = 0;
function animate(currentTime) {
    requestAnimationFrame(animate);

    const deltaTime = Math.min((currentTime - lastTime) * 0.001, 0.1); // Convert to seconds, cap at 0.1
    lastTime = currentTime;

    currentPosition.x += (targetPosition.x - currentPosition.x) * 0.05;
    currentPosition.y += (targetPosition.y - currentPosition.y) * 0.05;
    currentPosition.z += (targetPosition.z - currentPosition.z) * 0.05;

    particles.position.set(currentPosition.x, currentPosition.y, currentPosition.z);

    animateParticles(deltaTime);

    renderer.render(scene, camera);
}

function animateParticles(deltaTime) {
    const positions = particles.geometry.attributes.position.array;
    const originalPositions = particles.geometry.attributes.originalPosition.array;
    const phases = particles.geometry.attributes.phase.array;
    const amplitudes = particles.geometry.attributes.amplitude.array;
    const velocities = particles.geometry.attributes.velocity.array;

    const repulsionForce = 5; // Repulsion force
    const repulsionRadius = 3; // Repulsion radius
    const friction = 0.95; // Increased friction for quicker settling
    const returnForce = 0.03; // Force pulling particles back to their original positions

    for (let i = 0; i < positions.length; i += 3) {
        // Apply subtle movement
        for (let j = 0; j < 3; j++) {
            const index = i + j;
            phases[index] += deltaTime * 0.5;
            if (phases[index] > Math.PI * 2) phases[index] -= Math.PI * 2;
            
            positions[index] += Math.sin(phases[index]) * amplitudes[index] * deltaTime;
        }

        // Apply cursor repulsion
        const particlePosition = new THREE.Vector3(positions[i], positions[i+1], positions[i+2]);
        const distance = particlePosition.distanceTo(mouseWorld);

        if (distance < repulsionRadius) {
            const force = (1 - distance / repulsionRadius) * repulsionForce;
            const repulsion = particlePosition.sub(mouseWorld).normalize().multiplyScalar(force);

            velocities[i] += repulsion.x * deltaTime;
            velocities[i+1] += repulsion.y * deltaTime;
            velocities[i+2] += repulsion.z * deltaTime;
        }

        // Apply return force
        for (let j = 0; j < 3; j++) {
            const index = i + j;
            const displacement = originalPositions[index] - positions[index];
            velocities[index] += displacement * returnForce * deltaTime;
        }

        // Apply velocity
        positions[i] += velocities[i];
        positions[i+1] += velocities[i+1];
        positions[i+2] += velocities[i+2];

        // Apply friction
        velocities[i] *= friction;
        velocities[i+1] *= friction;
        velocities[i+2] *= friction;
    }

    particles.geometry.attributes.position.needsUpdate = true;
    particles.geometry.attributes.velocity.needsUpdate = true;
}

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, mouseWorld);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onScroll() {
    const scrollPosition = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    
    targetPosition.y = -(scrollPosition / maxScroll) * 2;

    const windowHeight = window.innerHeight;
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop - windowHeight / 2 && 
            scrollPosition < sectionTop + sectionHeight - windowHeight / 2) {
            currentSection = section.dataset.section;
            
            switch(currentSection) {
                case 'home':
                    targetPosition.x = 0;
                    targetPosition.z = 0;
                    break;
                case 'resume':
                    targetPosition.x = 0.5;
                    targetPosition.z = -0.5;
                    break;
                case 'projects':
                    targetPosition.x = -0.5;
                    targetPosition.z = -1;
                    break;
                case 'coursework':
                    targetPosition.x = 0.5;
                    targetPosition.z = -1.5;
                    break;
            }
        }
    });
}

window.addEventListener('resize', onWindowResize);
window.addEventListener('scroll', onScroll);

init();
animate(0);
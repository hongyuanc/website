let scene, camera, renderer, particles;
const particleCount = 500;
let currentSection = 'home';
let targetPosition = { x: 0, y: 0, z: 0 };
let currentPosition = { x: 0, y: 0, z: 0 };

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
}

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPalette = [
        new THREE.Color(0xCCCCCC),  // Light grey
        new THREE.Color(0x999999),  // Medium grey
        new THREE.Color(0x666666)   // Dark grey
    ];

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 10;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 10;

        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({ 
        size: 0.03, 
        vertexColors: true,
        transparent: true,
        opacity: 0.7
    });
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function animate() {
    requestAnimationFrame(animate);

    currentPosition.x += (targetPosition.x - currentPosition.x) * 0.05;
    currentPosition.y += (targetPosition.y - currentPosition.y) * 0.05;
    currentPosition.z += (targetPosition.z - currentPosition.z) * 0.05;

    particles.position.set(currentPosition.x, currentPosition.y, currentPosition.z);

    renderer.render(scene, camera);
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
animate();
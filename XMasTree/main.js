import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

renderer.shadowMap.enabled = true;

const loader = new THREE.TextureLoader();

// tu zmien nazwe pliku na swoj
loader.load('Textures/background.jpg', function (texture) {
    scene.background = texture;
});

const snowflakeGeometry = new THREE.BufferGeometry();
const positions = [];

for (let i = 0; i < 1000; i++) {
    positions.push(
        THREE.MathUtils.randFloatSpread(20), // x
        THREE.MathUtils.randFloatSpread(20), // y
        THREE.MathUtils.randFloatSpread(20) // z
    );
}

snowflakeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
const snowflakeMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.05 });
const snowflakes = new THREE.Points(snowflakeGeometry, snowflakeMaterial);

scene.add(snowflakes);

const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({color: 0xFFFF00});
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);

const sunLight = new THREE.PointLight(0xFFFFFF, 1, 100);
sunMesh.add(sunLight);

sunMesh.position.set(-3, 6, -2);

scene.add(sunMesh);

sunLight.castShadow = true;

sunLight.shadow.mapSize.width = 512;
sunLight.shadow.mapSize.height = 512;

sunLight.shadow.camera.left = -10;
sunLight.shadow.camera.right = 10;
sunLight.shadow.camera.top = 10;
sunLight.shadow.camera.bottom = -10;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 500;

const sun = new THREE.DirectionalLight(0xFFFFFF, 1);
sun.position.set(-3, 6, -2); // Position the sun

sun.castShadow = true;

sun.shadow.mapSize.width = 512;
sun.shadow.mapSize.height = 512;

sun.shadow.camera.left = -10;
sun.shadow.camera.right = 10;
sun.shadow.camera.top = 10;
sun.shadow.camera.bottom = -10;
sun.shadow.camera.near = 0.5;
sun.shadow.camera.far = 500;

scene.add(sun);

// tu zmien nazwe pliku na swoj
const groundTexture = loader.load('Textures/snow_01_diff_4k.jpg');
const groundMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    map: groundTexture
});
const ground = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -2;

scene.add(ground);

const treeMaterial = new THREE.MeshBasicMaterial({color: 0x008000}); // Green color for the tree

const treeGroup = new THREE.Group(); // Group to hold all parts of the tree

const coneGeometry = new THREE.ConeGeometry(2, 5, 36);
const coneMesh = new THREE.Mesh(coneGeometry, treeMaterial);

coneMesh.position.y = 1;

treeGroup.add(coneMesh);

const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.5, 10);
const trunkMaterial = new THREE.MeshBasicMaterial({color: 0x8B4513});
const trunkMesh = new THREE.Mesh(trunkGeometry, trunkMaterial);

trunkMesh.position.y = -1.75;

treeGroup.add(trunkMesh);

scene.add(treeGroup);

// Create the material for the balls
const ballMaterial = new THREE.MeshPhongMaterial({ color: 0xFF0000 }); // Red color for the balls

// Create and position the balls
for (let i = 0; i < 15; i++) {
    const ballGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);

    const coneHeight = 5; // Height of the cone
    const coneRadius = 2; // Radius of the cone

    const heightRatio = Math.random(); // Random height ratio for the ball
    ballMesh.position.y = coneHeight * heightRatio - 1.5;
    const radiusAtHeight = coneRadius * (1 - heightRatio);
    const angle = Math.random() * Math.PI * 2;
    ballMesh.position.x = Math.cos(angle) * radiusAtHeight;
    ballMesh.position.z = Math.sin(angle) * radiusAtHeight;

    treeGroup.add(ballMesh);
}

// Create the star at the top of the tree
const starGeometry = new THREE.TetrahedronGeometry(0.5);
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 }); // Yellow color for the star
const starMesh = new THREE.Mesh(starGeometry, starMaterial);

// Position the star at the top of the tree
starMesh.position.y = 3.75;

treeGroup.add(starMesh);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

// Add point light
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 5, 0); // position the light above the tree
scene.add(pointLight)

starMesh.receiveShadow = true;
starMesh.castShadow = true;
coneMesh.receiveShadow = true;
coneMesh.castShadow = true;
trunkMesh.receiveShadow = true;
trunkMesh.castShadow = true;
ground.receiveShadow = true;


camera.position.z = 15;

function animate() {
    requestAnimationFrame(animate);

    const positions = snowflakes.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.01;

        if (positions[i + 1] < -10) {
            positions[i + 1] = 10;
        }
    }

    snowflakes.geometry.attributes.position.needsUpdate = true;

    controls.update();
    renderer.render(scene, camera);
}

animate();
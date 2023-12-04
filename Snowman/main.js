import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);

renderer.shadowMap.enabled = true;

const loader = new THREE.TextureLoader();

loader.load('Textures/background.jpg', function(texture) {
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
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });

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

const groundTexture = loader.load('Textures/snow_01_diff_4k.jpg');
const groundMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    map: groundTexture
});
const ground = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), groundMaterial);
ground.rotation.x = - Math.PI / 2;
ground.position.y = -2;

scene.add(ground);

const snowmanMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });

const bottomSphere = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), snowmanMaterial);
bottomSphere.position.y = -1.5;

const middleSphere = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 32), snowmanMaterial);
middleSphere.position.y = -0.5;

const topSphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), snowmanMaterial);
topSphere.position.y = 0.5;

const hatMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const hat = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.5, 32), hatMaterial);
hat.position.y = 1.2;

const hatBottom = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.1, 32), hatMaterial);
hatBottom.position.y = 1;

const buttonGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const buttonMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

const snowman = new THREE.Group();
snowman.add(bottomSphere);
snowman.add(middleSphere);
snowman.add(topSphere);
snowman.add(hat);
snowman.add(hatBottom);

const noseGeometry = new THREE.ConeGeometry(0.1, 0.5, 32);
const noseMaterial = new THREE.MeshBasicMaterial({ color: 0xFFA500 });

const nose = new THREE.Mesh(noseGeometry, noseMaterial);
nose.position.y = 0.5;
nose.position.z = 0.6;
nose.position.x = 0;
nose.rotation.x = Math.PI / 2;

snowman.add(nose);

// Create and position the buttons
for (let i = 0; i < 2; i++) {
    const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
    button.position.y = -0.25 + i * -0.3; // Position on the middle sphere
    button.position.z = 0.7;
    button.position.x = 0;
    snowman.add(button);
}

for (let i = 0; i < 3; i++) {
    const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
    button.position.y = -1 + i * -0.3; // Position on the bottom sphere
    button.position.z = 0.95;
    button.position.x = 0;
    snowman.add(button);
}

const eyeGeometry = new THREE.SphereGeometry(0.05, 32, 32);

const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0xCCCCCC, metalness: 1, roughness: 0 });

for (let i = 0; i < 2; i++) {
    const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye.position.y = 0.6;
    eye.position.z = 0.5;
    eye.position.x = (i - 0.5) * 0.2;

    snowman.add(eye);
}

scene.add(snowman);
snowman.castShadow = true;
snowman.receiveShadow = true;
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
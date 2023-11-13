import * as THREE from 'three';
import {OrbitControls} from "three/addons";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.shadowMap.enabled = true;

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const textureLoader = new THREE.TextureLoader();

const skyGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
const skyMaterial = new THREE.MeshBasicMaterial({
    color: 0x3E3B3B,
    side: THREE.BackSide, // render the inside faces of the cube
    map: new THREE.TextureLoader().load('textures/nightSky.jpg'),
});
const skybox = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(skybox);

camera.position.z = 15;

const light = new THREE.PointLight(0xffffff, 1000, 10000);
light.position.set(0,0,0);
scene.add(light);

light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default

// creating sun
const sunTexture = textureLoader.load("textures/sunTexture.jpg");
const sunGeometry = new THREE.SphereGeometry(3, 32, 16);
const sunMeshMaterial = new THREE.MeshBasicMaterial({
    map: sunTexture,
    color: 0xCDF302});
const sun = new THREE.Mesh(sunGeometry, sunMeshMaterial);
sun.castShadow = true;
scene.add(sun);



// other planets
const planetColors = [0xD69D29];

const moonAndEarthGroup = new THREE.Group();

const earthTexture = textureLoader.load("textures/earthTexture.jpg");
const earthGeometry = new THREE.SphereGeometry(1, 32, 16);
const earthMeshMaterial = new THREE.MeshStandardMaterial({
    map: earthTexture,
    roughness: 0.5,
    color: 0x18C4EA,
})
const earth = new THREE.Mesh(earthGeometry, earthMeshMaterial);
earth.position.set(0, 0, 0);
earth.castShadow = true;
earth.receiveShadow = true;

const moonTexture = textureLoader.load("textures/moonTexture.jpg");
const moonGeometry = new THREE.SphereGeometry(0.5, 32, 16);
const moonMeshMaterial = new THREE.MeshStandardMaterial({
    map: moonTexture,
    color: 0x5F5F5F,
})
const moon = new THREE.Mesh(moonGeometry, moonMeshMaterial);
moon.position.set(4, 0,0);
moon.castShadow = true;
moon.receiveShadow = true;

moonAndEarthGroup.position.set(15.7,0,0);
moonAndEarthGroup.add(moon, earth);
scene.add(moonAndEarthGroup);





const earthOrbitRadius = 15.7;
let earthOrbitSpeed = 0.01;
function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // Rotate the Earth around the Sun
    moonAndEarthGroup.position.x = Math.cos(earthOrbitSpeed) * earthOrbitRadius;
    moonAndEarthGroup.position.z = Math.sin(earthOrbitSpeed) * earthOrbitRadius;

    // Update the orbit speed for the next frame
    earthOrbitSpeed += 0.01;

    renderer.render(scene, camera);
}

animate();

window.addEventListener(
    'resize',
    function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    },
    false
);
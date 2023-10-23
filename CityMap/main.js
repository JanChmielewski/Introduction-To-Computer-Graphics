import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1;
camera.position.y = Math.PI / 7;
camera.position.x = 1;
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(new THREE.Color(0xA6D8FF));

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const loader = new GLTFLoader();

const cityBlock = new THREE.Group();
scene.add(cityBlock);

const cityBaseGeometry = new THREE.BoxGeometry(1, 0.01, 1);
const cityBaseMaterial = new THREE.MeshBasicMaterial({ color: 0x606060 });
const cityBase = new THREE.Mesh(cityBaseGeometry, cityBaseMaterial);
cityBase.position.set(0, 0, 0)
cityBlock.add(cityBase);

const sidewalkGeometry = new THREE.BoxGeometry(0.05, 0.02, 1);
const sideWalkMaterial = new THREE.MeshBasicMaterial({color: 0x737576})
const verticalSidewalk = new THREE.Mesh(sidewalkGeometry, sideWalkMaterial);
const horizontalSidewalk = new THREE.Mesh(sidewalkGeometry, sideWalkMaterial);

const buildingSurrounding = new THREE.Group();
const buildingSurroundingGeometry = new THREE.BoxGeometry(0.05, 0.02, 0.25);
const buildingSurroundingMaterial = new THREE.MeshBasicMaterial({color: 0x737576})
const horizontalSurr = new THREE.Mesh(buildingSurroundingGeometry, buildingSurroundingMaterial);
const verticalSurr = new THREE.Mesh(buildingSurroundingGeometry, buildingSurroundingMaterial);

buildingSurrounding.add();
cityBlock.add(buildingSurrounding);


const leftVerticalSidewalk = verticalSidewalk.clone();
const rightVerticalSidewalk = verticalSidewalk.clone();
const frontHorizontalSidewalk = horizontalSidewalk.clone();
const backHorizontalSidewalk = horizontalSidewalk.clone();



leftVerticalSidewalk.position.set(-0.475, 0.01, 0);
rightVerticalSidewalk.position.set(0.475, 0.01, 0);
frontHorizontalSidewalk.position.set(0, 0.01, 0.475);
frontHorizontalSidewalk.rotateY(Math.PI/2);
backHorizontalSidewalk.position.set(0, 0.01, -0.475);
backHorizontalSidewalk.rotateY(Math.PI/2);

cityBlock.add(leftVerticalSidewalk, rightVerticalSidewalk, frontHorizontalSidewalk, backHorizontalSidewalk);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

const rotation_step = 0.1;

document.addEventListener(
    'keydown',
    function (e) {
        switch (e.key) {
            case 'ArrowUp': // up
                cityBase.rotation.x -= rotation_step;
                break;
            case 'ArrowDown': // down
                cityBase.rotation.x += rotation_step;
                break;
            case 'ArrowLeft': // left
                cityBase.rotation.y -= rotation_step;
                break;
            case 'ArrowRight': // right
                cityBase.rotation.y += rotation_step;
                break;
            case 'w': // page up
                cityBase.rotation.z -= rotation_step;
                break;
            case 's': // page down
                cityBase.rotation.z += rotation_step;
                break;
            default:
                break;
        }
        camera.lookAt(scene.position);
        controls.update();
        renderer.render(scene, camera);
    },
    false
);

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
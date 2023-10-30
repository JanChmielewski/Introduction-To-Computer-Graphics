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

const sidewalkGeometry = new THREE.BoxGeometry(0.05, 0.01, 0.4);
const sideWalkMaterial = new THREE.MeshBasicMaterial({color: 0x737576})
const verticalSidewalk = new THREE.Mesh(sidewalkGeometry, sideWalkMaterial);
const horizontalSidewalk = new THREE.Mesh(sidewalkGeometry, sideWalkMaterial);

const leftVerticalSidewalk = verticalSidewalk.clone();
const rightVerticalSidewalk = verticalSidewalk.clone();
const frontHorizontalSidewalk = horizontalSidewalk.clone();
const backHorizontalSidewalk = horizontalSidewalk.clone();

const buildingSurr = new THREE.Group();

leftVerticalSidewalk.position.set(-0.475, 0.01, -0.3);
rightVerticalSidewalk.position.set(-0.125, 0.01, -0.3);
frontHorizontalSidewalk.position.set(-0.3, 0.01, -0.125);
frontHorizontalSidewalk.rotateY(Math.PI/2);
backHorizontalSidewalk.position.set(-0.3, 0.01, -0.475);
backHorizontalSidewalk.rotateY(Math.PI/2);
buildingSurr.add(leftVerticalSidewalk, rightVerticalSidewalk, frontHorizontalSidewalk, backHorizontalSidewalk);

const frontLeftBuildingSurr = buildingSurr.clone();
const frontRightBuildingSurr = buildingSurr.clone();
const backRightBuildingSurr = buildingSurr.clone();

frontLeftBuildingSurr.position.set(0, 0, 0.6);
frontRightBuildingSurr.position.set(0.6, 0, 0.6)
backRightBuildingSurr.position.set(0.6, 0, 0)

cityBlock.add(buildingSurr, frontLeftBuildingSurr, frontRightBuildingSurr, backRightBuildingSurr);

const grassGeometry = new THREE.BoxGeometry(0.3, 0.01, 0.3);
const grassMaterial = new THREE.MeshBasicMaterial({color: 0x23E044})
const grass = new THREE.Mesh(grassGeometry, grassMaterial);

const frontLeftGrass = grass.clone();
const frontRightGrass = grass.clone();
const backLeftGrass = grass.clone();
const backRightGrass = grass.clone();

frontLeftGrass.position.set(-0.3, 0.01,0.3);
frontRightGrass.position.set(0.3, 0.01,0.3);
backLeftGrass.position.set(-0.3, 0.01,-0.3);
backRightGrass.position.set(0.3, 0.01,-0.3);

cityBlock.add(frontLeftGrass, frontRightGrass, backLeftGrass, backRightGrass);

const laneDividersGeometry = new THREE.BoxGeometry(0.005, 0.0001, 0.015);
const laneDividersMaterial = new THREE.MeshBasicMaterial({colorL: 0xFFFFFF});
const laneDivider = new THREE.Mesh(laneDividersGeometry, laneDividersMaterial);

const laneDividers = new THREE.Group();

// to print lane dividers
for (let position = 0.485; position >= -0.5; position -= 0.025) {
    if(position > 0.11 || position < -0.11) {
        const verticalDivider = laneDivider.clone();
        verticalDivider.position.set(0, 0.01, position);

        const horizontalDivider = laneDivider.clone();
        horizontalDivider.rotateY(Math.PI / 2);
        horizontalDivider.position.set(position, 0.01, 0);

        laneDividers.add(verticalDivider, horizontalDivider);
    }
}


cityBlock.add(laneDividers);

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
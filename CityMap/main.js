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
const laneDividersMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
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

// creating an apartment building

const apartmentBuilding = new THREE.Group();

const apartmentBuildingStructureGeometry = new THREE.BoxGeometry(0.2, 0.4,0.2);
const apartmentBuildingStructureMaterial = new THREE.MeshBasicMaterial({color: 0x8D8D8D} )
const apartmentBuildingStructure = new THREE.Mesh(apartmentBuildingStructureGeometry, apartmentBuildingStructureMaterial);

const buildingRoofGeometry = new THREE.ConeGeometry(0.14, 0.1, 4, 1, false, 0.785,6.283185307179586);
const buildingRoofMaterial = new THREE.MeshBasicMaterial({color: 0x777777} );
const buildingRoof = new THREE.Mesh(buildingRoofGeometry, buildingRoofMaterial);

buildingRoof.position.set(0,0.25,0);

const buildingDoorGeometry = new THREE.BoxGeometry(0.04, 0.08,0.001);
const buildingDoorMaterial = new THREE.MeshBasicMaterial({color: 0x8C4A26});
const buildingDoor = new THREE.Mesh(buildingDoorGeometry, buildingDoorMaterial);

buildingDoor.position.set(0, -0.16, -0.1);

apartmentBuilding.add(apartmentBuildingStructure, buildingRoof, buildingDoor);

apartmentBuilding.position.set(-0.3, 0.214, 0.3);
cityBlock.add(apartmentBuilding);

const park = new THREE.Group();

const tree = new THREE.Group();

const leavesGeometry = new THREE.SphereGeometry(0.05, 4, 4);
const leavesMaterial = new THREE.MeshBasicMaterial({ color: 0x358C26 }); // Green color
const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);

const treeTrunkGeometry = new THREE.CylinderGeometry(0.01,0.01, 0.08, 16, 1, false, 0, 6.5);
const treeTrunkMaterial = new THREE.MeshBasicMaterial({color: 0x6A381D});
const treeTrunk = new THREE.Mesh(treeTrunkGeometry, treeTrunkMaterial);

treeTrunk.position.set(0.3,0.05,-0.3);
leaves.position.set(0.3,0.095, -0.3);

tree.add(treeTrunk, leaves);

const bush = new THREE.Group();

const bushGeometry = new THREE.SphereGeometry(0.03, 5, 4, 0, 3.14, 0, 3.14);
const bushMaterial = new THREE.MeshBasicMaterial({color: 0x53BD3F});
const bushLeaves = new THREE.Mesh(bushGeometry, bushMaterial);

bushLeaves.rotation.x = -Math.PI / 2;
bushLeaves.position.set(0.3,0.0005, -0.3);

// TODO: add fruits on the bush

bush.add(bushLeaves);

const parkWidth = 0.3;
const parkLength = 0.3;

const minDistance = 0.1;
const treePositions = [];
const bushPositions = [];


// Loop for the tree placement
for (let i = 0; i < 5; i++) {
    const parkTree = tree.clone();

    let validPosition = false;
    let attempts = 0;

    while (!validPosition) {
        // Generate random X and Z positions within the park area
        const randomX = (Math.random() * parkWidth) - parkWidth / 2;
        const randomZ = (Math.random() * parkLength) - parkLength / 2;

        let isCollision = false;
        for (const position of treePositions) {
            const distance = Math.sqrt(Math.pow(randomX - position.x, 2) + Math.pow(randomZ - position.z, 2));
            if (distance < minDistance) {
                isCollision = true;
                break;
            }
        }

        if (!isCollision) {
            parkTree.position.set(randomX, 0, randomZ);
            treePositions.push({ x: randomX, z: randomZ });
            validPosition = true;
        }

        attempts++;
        if (attempts > 1000) {
            console.error("Could not find a suitable position for the tree.");
            break;
        }
    }

    park.add(parkTree);
}

// Loop for the bush placement

for (let i = 0; i < 5; i++) {
    const parkBush = bush.clone();

    let validPosition = false;
    let attempts = 0;

    while (!validPosition) {
        // Generate random X and Z positions within the park area
        const randomX = (Math.random() * parkWidth) - parkWidth / 2;
        const randomZ = (Math.random() * parkLength) - parkLength / 2;

        let isCollision = false;
        for (const position of bushPositions) {
            const distance = Math.sqrt(Math.pow(randomX - position.x, 2) + Math.pow(randomZ - position.z, 2));
            if (distance < minDistance) {
                isCollision = true;
                break;
            }
        }

        if (!isCollision) {
            parkBush.position.set(randomX, 0.015, randomZ);
            bushPositions.push({ x: randomX, z: randomZ });
            validPosition = true;
        }

        attempts++;
        if (attempts > 1000) {
            console.error("Could not find a suitable position for the bush.");
            break;
        }
    }

    park.add(parkBush);
}
cityBlock.add(park);

const house = new THREE.Group();

const houseStructureGeometry = new THREE.BoxGeometry(0.08, 0.05, 0.08);
const houseStructureMaterial = new THREE.MeshBasicMaterial({color: 0xD3A84E});
const houseStructureMesh = new THREE.Mesh(houseStructureGeometry, houseStructureMaterial);

const houseRoofGeometry = new THREE.ConeGeometry(0.08, 0.03, 4, 1, false, 0.785, 6.285);
const houseRoofMaterial = new THREE.MeshBasicMaterial({color: 0xCD7436});
const houseRoofMesh = new THREE.Mesh(houseRoofGeometry, houseRoofMaterial);

const houseDoorGeometry = new THREE.BoxGeometry(0.02, 0.035,0.001);
const houseDoorMaterial = new THREE.MeshBasicMaterial({color: 0x8C4A26});
const houseDoorMesh = new THREE.Mesh(houseDoorGeometry, houseDoorMaterial);

houseStructureMesh.position.set(-0.3, 0.04, -0.3);
houseRoofMesh.position.set(-0.3, 0.08, -0.3);
houseDoorMesh.position.set(-0.3, 0.03, -0.26);

house.add(houseStructureMesh, houseRoofMesh, houseDoorMesh);

const house1 = house.clone();
const house2 = house.clone();
const house3 = house.clone();
const house4 = house.clone();
const house5 = house.clone();

house1.position.set(-0.1, 0, -0.1);
house2.position.set(0.1, 0, 0.1);
house3.position.set(0.08, 0, -0.075);
house4.position.set(-0.1, 0, -0.1);
house4.rotateY(Math.PI/1);
house5.position.set(0.1, 0, 0.1);
house5.rotateY(Math.PI/1);

cityBlock.add(house1, house2, house3, house4, house5);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
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
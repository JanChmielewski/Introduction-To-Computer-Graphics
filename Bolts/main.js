import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight,
    0.1, 1000 );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const bolt = new THREE.Group();
scene.add(bolt);

const headGeometry = new THREE.CylinderGeometry( 0.5, 0.5, 0.2, 6);
const headMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
const head = new THREE.Mesh(headGeometry, headMaterial);
head.position.set(0, 1, 0)
bolt.add(head);

const shaftGeometry = new THREE.CylinderGeometry( 0.2, 0.2, 2, 32);
const shaftMaterial = new THREE.MeshBasicMaterial( {color: 0x606060} );
const shaft = new THREE.Mesh(shaftGeometry, shaftMaterial);
shaft.position.set(0, 0, 0);
bolt.add(shaft);

const threadsGeometry = new THREE.CylinderGeometry( 0.3, 0.3, 0.3, 6);
const threadsMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
const threads = new THREE.Mesh(threadsGeometry, threadsMaterial);
threads.position.set(0, -0.5, 0);
bolt.add(threads);

const clonedBolt = bolt.clone();
clonedBolt.position.set(1,0,1);
clonedBolt.rotateX(Math.PI/2.5)
scene.add(clonedBolt);

const cameraRotationSpeed = 0.001;
const cameraDistance = 10;

function animate() {
    requestAnimationFrame(animate);

    camera.position.x = cameraDistance * Math.cos(cameraRotationSpeed * Date.now());
    camera.position.z = cameraDistance * Math.sin(cameraRotationSpeed * Date.now());
    camera.lookAt(0, 0, 0);

    bolt.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();
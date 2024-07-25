import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, object;

const init = () => {
    const container = document.getElementById('container3D');
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 2000;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    ambientLight.position.set(500, 500, 500);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load(
        `models/eye/scene.gltf`,
        (gltf) => {
            object = gltf.scene;
            scene.add(object);

            const box = new THREE.Box3().setFromObject(object);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scaleFactor = 500 / maxDim;

            object.scale.multiplyScalar(scaleFactor);
            object.position.sub(center.multiplyScalar(scaleFactor));

            animate();
        },
        (xhr) => {
            container.style.setProperty('--alpha', '1');
            console.log(`${(xhr.loaded / xhr.total * 100).toFixed(2)}% loaded`);
        },
        (error) => {
            console.error('An error happened', error);
        }
    );

    window.addEventListener('resize', onWindowResize);
}

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    init();

    document.addEventListener('mousemove', (e) => {
        if (object) {
            const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            const mouseY = (e.clientY / window.innerHeight) * 2 - 1;
            object.rotation.y = mouseX * 0.8;
            object.rotation.x = mouseY * 0.8;
        }
        const x = e.clientX;
        const y = e.clientY;
        cursor.style.setProperty('--x', `${e.clientX}px`);
        cursor.style.setProperty('--y', `${e.clientY}px`);
        cursor.style.setProperty('--alpha', '1');
    });
});
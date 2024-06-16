import * as THREE from 'three';

const scene = new THREE.Scene();

const loader = new THREE.TextureLoader();
loader.load('/img/image.jpg', function(texture) {
    const geometry = new THREE.PlaneGeometry(2,2,1);
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        depthTest: false
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.material.transparent = true;
    mesh.material.opacity = 0.3;

    const backgroundScene = new THREE.Scene();
    const backgroundCamera = new THREE.Camera();

    backgroundScene.add(backgroundCamera);
    backgroundScene.add(mesh);

    // criar câmera
    const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1;

    // criar o renderizador
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // função para adicionar estrelas
    function addStar() {
        const geometry = new THREE.SphereGeometry(0.20, 24, 24);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const star = new THREE.Mesh(geometry, material);

        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(800));

        star.position.set(x, y, z);
        scene.add(star);
    }

    Array(10000).fill().forEach(addStar);

    // criar animação
    function animate() {
        requestAnimationFrame(animate);

        scene.rotation.x += 0.0004;
        scene.rotation.y += 0.0004;

        renderer.autoClear = false;
        renderer.clear();
        renderer.render(backgroundScene, backgroundCamera);
        renderer.render(scene, camera);
    }

    animate();

    // ajustar tamanho da tela
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
});

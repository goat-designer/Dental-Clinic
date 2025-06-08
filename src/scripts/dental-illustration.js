// Dental Illustration using Three.js
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('dental-illustration');
    if (!container) return;

    // Basic Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0xffffff, 0);
    container.appendChild(renderer.domElement);
    
    // Create SVG paths for a tooth
    const toothSVGData = `
        M50,10 C80,10 95,30 95,50 C95,75 80,90 50,90 C20,90 5,75 5,50 C5,30 20,10 50,10 Z
        M50,20 C70,20 85,35 85,50 C85,70 70,80 50,80 C30,80 15,70 15,50 C15,35 30,20 50,20 Z
        M50,30 C65,30 75,40 75,50 C75,65 65,70 50,70 C35,70 25,65 25,50 C25,40 35,30 50,30 Z
        M35,50 L50,40 L65,50 L50,60 Z
    `;
    
    // Set up lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create SVG loader
    const loader = new THREE.SVGLoader();
    const paths = loader.parse(createSVG(toothSVGData)).paths;
    
    const group = new THREE.Group();
    group.scale.multiplyScalar(0.25);
    group.position.x = -25;
    group.position.y = -25;
    group.scale.y *= -1;
    
    // Convert SVG paths to meshes
    for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        const material = new THREE.MeshStandardMaterial({
            color: path.color,
            side: THREE.DoubleSide,
            depthWrite: true,
            transparent: true
        });
        
        const shapes = path.toShapes(true);
        
        for (let j = 0; j < shapes.length; j++) {
            const shape = shapes[j];
            const geometry = new THREE.ShapeGeometry(shape);
            const mesh = new THREE.Mesh(geometry, material);
            
            group.add(mesh);
        }
    }
    
    scene.add(group);
    
    // Create additional teeth using the same pattern
    const createTooth = (x, y, scale, rotation) => {
        const toothGroup = group.clone();
        toothGroup.position.set(x, y, 0);
        toothGroup.scale.multiplyScalar(scale);
        toothGroup.rotation.z = rotation;
        scene.add(toothGroup);
        return toothGroup;
    };
    
    const teeth = [
        createTooth(20, 0, 0.7, 0),
        createTooth(-20, 0, 0.7, 0),
        createTooth(40, 5, 0.6, 0.1),
        createTooth(-40, 5, 0.6, -0.1),
        createTooth(55, 15, 0.5, 0.2),
        createTooth(-55, 15, 0.5, -0.2)
    ];
    
    // Position camera
    camera.position.z = 100;
    
    // Create animation
    const animate = () => {
        requestAnimationFrame(animate);
        
        // Rotate teeth slightly for subtle animation
        group.rotation.z += 0.002;
        teeth.forEach((tooth, index) => {
            tooth.rotation.z += 0.001 * (index % 2 === 0 ? 1 : -1);
        });
        
        renderer.render(scene, camera);
    };
    
    // Helper function to create an SVG from path data
    function createSVG(pathData) {
        return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <path d="${pathData}" fill="#5465FF" />
            </svg>
        `;
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
    
    // Start animation
    animate();
}); 
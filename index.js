import * as THREE from './node_modules/three/build/three.module.js';
import { OrbitControls } from './node_modules/OrbitControls.js';


const canvas = document.querySelector(".threeJSSection")

console.log(canvas)

const scene = new THREE.Scene()

const aspect = canvas.clientWidth / canvas.clientHeight
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100)
camera.position.set(1, 1, 2)
camera.lookAt(0,0,0)
scene.add(camera)

// add controls to the camera
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0, 0)
controls.update()



const geometry = new THREE.BoxGeometry(1, 1, 1)


const material = new THREE.MeshStandardMaterial(
    {
        color: 'whitesmoke',
        metalness: 0.5,     
        roughness: 0.1,
        emissive: 0xff0000,
        emissiveIntensity: 0.01,
        normalScale: new THREE.Vector2(0.5, 0.5),
        });
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)



console.log(mesh)

const ambient = new THREE.AmbientLight(0xffffff, 0.5)
const point = new THREE.PointLight(0xffffff, 1, 100)
point.position.set(3, 3, 2)
scene.add(ambient)
scene.add(point)

const renderer = new THREE.WebGLRenderer({ alpha: true, canvas })
renderer.setClearColor(0x000000, 0)
renderer.setPixelRatio(canvas.devicePixelRatio)

function animate() {

    mesh.rotation.x += 0.003
    mesh.rotation.y += 0.004
    mesh.rotation.z += 0.005
    
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();        
    }

    renderer.render(scene, camera)
    
    window.requestAnimationFrame(animate)
}
    
function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height);
    }
    return needResize;
}
  
console.log("We have lift off")
animate()
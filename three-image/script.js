let canvas = document.getElementById('myscene');
let width = window.innerWidth;
let height = window.innerHeight;
let dots = 50;
let lines = 50;
let radius = 100;

// RENDERER
let renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.setSize(width, height);
renderer.setClearColor("#ffffff");
// RENDERER

// camera
var camera = new THREE.PerspectiveCamera(40, width / height, 1, 1000);
camera.position.set(0, 0, 300);
// camera

// SCENE
let scene = new THREE.Scene();
let group = new THREE.Group();
scene.add(group);

var controls = new THREE.OrbitControls(camera, renderer.domElement);
// SCENE

// LINE INIT
let material = new THREE.LineBasicMaterial({
  color: 0x000000
});

// IMAGE DRAWING
let canvas2d = document.createElement('canvas');
let ctx = canvas2d.getContext('2d');
let size = 200;
canvas2d.width = size;
canvas2d.height = size;

let image = document.getElementById('photo');

var img = new Image();   
img.crossOrigin = 'anonymous';
img.addEventListener('load', function() {
  ctx.drawImage(img, 0, 0, size, size);
  document.body.appendChild(canvas2d);

  let data = ctx.getImageData(0, 0, size, size);
  data = data.data;

  for (var y = 0; y < size; y++) {
    let geometry = new THREE.Geometry();
    let line = new THREE.Line(geometry, material);

    for (var x = 0; x < size; x++) {
      var bright = data[(size * y + x) * 4];
      let vector = new THREE.Vector3(x - 100, y - 100, bright/10 - 100);

      geometry.vertices.push(vector);
    }

    group.add(line);
  }
}, false);
img.src = './me.jpg'; //

let time = 0;
function Render() {
  time++;
  renderer.render(scene, camera);
  group.rotation.x = Math.PI;
  // group.rotation.x = (time/1000);
//   group.rotation.y = (time/500);
  window.requestAnimationFrame(Render);
}

Render();
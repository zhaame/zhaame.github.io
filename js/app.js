var camera, scene, renderer;
var geometry, material, mesh;

var __HUE__ = Math.random();
var isMouseDown = false;

init();
animate();

function init() {

    var canvas = document.getElementById('firstObject');

    renderer = new THREE.WebGLRenderer({canvas: canvas, antialias:true});
    canvas.width  = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    renderer.setViewport( 0, 0, canvas.clientWidth, canvas.clientHeight );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );

    camera = new THREE.PerspectiveCamera( 50, canvas.clientWidth / canvas.clientHeight, 1, 5000 );
    // camera.position.y = 150;
    camera.position.z = 500;
    camera.lookAt( scene.position );

    geometry = new THREE.BoxGeometry( 200, 200, 200, 1, 1, 1 );
    material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    });
    material.color.setHSL( __HUE__, 0.5, 0.5 ); //set color of wireframe

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    document.body.appendChild(renderer.domElement);

    onResize(canvas, function () {
        canvas.width  = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        renderer.setViewport( 0, 0, canvas.clientWidth, canvas.clientHeight );
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    });

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    // controls.addEventListener( 'change', render );

}

function onMouseDown() {
    isMouseDown = true;
    // console.log("Mouse DOWN");  
}

function onMouseUp() {
    isMouseDown = false;
    // console.log("Mouse UP");
}

function animate() {

    requestAnimationFrame(animate);

    if(!isMouseDown) {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;
    }
    
    //changes color
    __HUE__ = __HUE__ < 1 ? __HUE__ += 0.0005 : 0;
    material.color.setHSL( __HUE__, 1, 0.5 );

    renderer.render(scene, camera);
    controls.update();

}
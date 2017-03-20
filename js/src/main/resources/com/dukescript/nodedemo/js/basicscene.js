 // Get the canvas element from our HTML above
  var canvas = document.getElementById("renderCanvas");

  // Load the BABYLON 3D engine
  var engine = new BABYLON.Engine(canvas, true);
  
   var createScene = function () {

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

   new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    var cam = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0, 5, new BABYLON.Vector3(0, 3, 0), scene);
    cam.attachControl(canvas);

    var loader = new BABYLON.AssetsManager(scene);

    var position = -5;
    var pos = function(t) {
        t.loadedMeshes.forEach(function(m) {
            m.position.x -= position;
        });
        position += 5;
    };

    var bane = loader.addMeshTask("bane", "", "assets/", "Shelby.obj");
    bane.onSuccess = pos;


    loader.onFinish = function() {
        engine.runRenderLoop(function () {
            scene.render();
        });
    };

    loader.load();

    return scene;

};
   // Now, call the createScene function that you just finished creating
  var scene = createScene();
  // Register a render loop to repeatedly render the scene
  engine.runRenderLoop(function () {
    scene.render();
  });
  
    // Watch for browser/canvas resize events
  window.addEventListener("resize", function () {
    engine.resize();
  });

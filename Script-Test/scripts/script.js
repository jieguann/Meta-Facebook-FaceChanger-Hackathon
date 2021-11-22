const Scene = require('Scene');
const FaceTracking = require('FaceTracking');
const HandTracking = require('HandTracking');
const Reactive = require('Reactive');
const Diagnostics = require('Diagnostics');
const Materials = require('Materials');
const { randomInt } = require('crypto');
const Random = require('Random');
const Patches = require('Patches');



(async function() { // Enable async/await in JS [part 1]

  // Locate the plane in the scene
  
  //const planeFace = await Scene.root.findFirst('planeFace'); const planeFace = await new Entity("planeFace", Reactive.point(0.1, 0.1, 0.1)).create();
  //const planeHand = await Scene.root.findFirst('planeHand');
  

  
  // Create a reference to a detected face
    const face = FaceTracking.face(0);

    let indexFace = 0;
    let indexFaceClone = 0;
    let indexEmoji = 0;
    let indexEmojiClone = 0;

face.isTracked.onOff().subscribe(() => {
    indexFace = Math.floor(Math.random() * 4);
    if(indexFace != indexFaceClone){
      //faceMesh.material = materialList[indexMaterial];
      Patches.inputs.setScalar("indexFace", indexFace);
      indexFaceClone = indexFace;
    }

    indexEmoji = Math.floor(Math.random() * 4);
    if(indexEmoji != indexEmojiClone){
      //faceMesh.material = materialList[indexMaterial];
      Patches.inputs.setScalar("indexEmoji", indexEmoji);
      indexEmojiClone = indexEmoji;
    }
    
    

});
//await Patches.inputs.setScalar("indexFace", indexFace);
//Diagnostics.watch("Material Index", indexFace);

})(); // Enable async/await in JS [part 2]


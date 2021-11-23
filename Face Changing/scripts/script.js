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


    const face = FaceTracking.face(0);

    let indexFace = 0;
    let indexFaceClone = 0;
    let indexEmoji = 0;
    let indexEmojiClone = 0;

face.isTracked.onOff().subscribe(() => {
    indexFace = Math.floor(Math.random() * 5);
    if(indexFace != indexFaceClone){
      //faceMesh.material = materialList[indexMaterial];
      Patches.inputs.setScalar("indexFace", indexFace);
      indexFaceClone = indexFace;
    }

 
    
    

});

face.isTracked.onOff().subscribe(() => {
  

  indexEmoji = Math.floor(Math.random() * 5);
  if(indexEmoji != indexEmojiClone){
    //faceMesh.material = materialList[indexMaterial];
    Patches.inputs.setScalar("indexEmoji", indexEmoji);
    indexEmojiClone = indexEmoji; 
  }
  
  

});





})(); // Enable async/await in JS [part 2]


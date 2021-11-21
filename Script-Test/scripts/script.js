const Scene = require('Scene');
const FaceTracking = require('FaceTracking');
const HandTracking = require('HandTracking');
const Reactive = require('Reactive');
const Diagnostics = require('Diagnostics');
const Materials = require('Materials');
const { randomInt } = require('crypto');
const Random = require('Random');

function checkCollision(positionA, positionB, lengthA, lengthB) {
  return Reactive.abs(positionA.sub(positionB)).le(Reactive.add(lengthA.div(2), lengthB.div(2)));
}

function checkCollision3D(entityA, entityB) {
  return Reactive.andList([
      checkCollision(entityA.sceneObject.transform.x, entityB.sceneObject.transform.x, entityA.size.x, entityB.size.x),
      checkCollision(entityA.sceneObject.transform.y, entityB.sceneObject.transform.y, entityA.size.y, entityB.size.y),
      checkCollision(entityA.sceneObject.transform.z, entityB.sceneObject.transform.z, entityA.size.z, entityB.size.z)
  ]);
}

class Entity {
  constructor(name, size) {
      this.name = name;
      this.size = size;
  }

  async create() {
      this.sceneObject = await Scene.root.findFirst(this.name);
      return this;
  }
}


let XRight;
let YTop;
let XLeft;
let YButton;
//let BoundaryBox;
const BoundarySize = 0.5;

let boolOfHandinBox = false;

(async function() { // Enable async/await in JS [part 1]

  // Locate the plane in the scene
  
  //const planeFace = await Scene.root.findFirst('planeFace');
  const planeFace = await new Entity("planeFace", Reactive.point(0.1, 0.1, 0.1)).create();
  //const planeHand = await Scene.root.findFirst('planeHand');
  const planeHand = await new Entity("planeHand", Reactive.point(0.1, 0.1, 0.1)).create();
  const faceMesh = await Scene.root.findFirst('faceMesh0');

  const material1 = await Materials.findFirst('FaceMaterial1');
  const material2 = await Materials.findFirst('FaceMaterial2');
  const material3 = await Materials.findFirst('FaceMaterial3');
  const material4 = await Materials.findFirst('FaceMaterial4');
  const material5 = await Materials.findFirst('FaceMaterial5');
  const materialList = [material1, material2, material3, material4, material5];
  // Create a reference to a detected face
  const face = FaceTracking.face(0);
  const hand = HandTracking.hand(0);

  

  


  //==========================================================================
  // Control the rotation of the plane with the rotation of the face
  //==========================================================================

  // Create references to the transforms of the plane and face
  const planeFaceTransform = planeFace.sceneObject.transform;
  const faceTransform = face.cameraTransform;

  planeFaceTransform.x = faceTransform.x;
  planeFaceTransform.y = faceTransform.y;

  //the boundary of the face
  XRight = Reactive.add(faceTransform.x ,BoundarySize);
  XLeft = Reactive.add(faceTransform.x , -BoundarySize);
  YTop = Reactive.add(faceTransform.y , BoundarySize);
  YButton = Reactive.add(faceTransform.y , -BoundarySize);
  
  //==========================================================================
  //BoundaryBox = Reactive.box2d(faceTransform.x, faceTransform.y, BoundarySize, BoundarySize);


  //YButton = Reactive.add(faceTransform.y , -BoundarySize);

  let planeHandTransform = planeHand.sceneObject.transform;
  const handTransform = hand.cameraTransform;

  
  //let handCount = HandTracking.count;
  //const hand = HandTracking.hand(1);

/*
    Diagnostics.watch("collision X", checkCollision(planeFace.transform.x, planeHand.transform.x, Reactive.val(0.1), Reactive.val(0.1)));
    Diagnostics.watch("collision Y", checkCollision(planeFace.transform.y, planeHand.transform.y, Reactive.val(0.1), Reactive.val(0.1)));
    Diagnostics.watch("collision Z", checkCollision(planeFace.transform.z, planeHand.transform.z, Reactive.val(0.1), Reactive.val(0.1)));

    if(Reactive.eq(checkCollision(planeFace.transform.x, planeHand.transform.x, Reactive.val(0.1), Reactive.val(0.1)),true) ){
      faceMesh.material = material1;
    }
    else{
      faceMesh.material = material2;
    }
    */

    

    //planeHand.hidden = handCount.eq(0);

    let indexMaterial = 0;
    let indexMaterialClone = 0;

    /*
    planeHandTransform.x = Reactive.val(1);
    planeHandTransform.y = Reactive.val(1);

hand.isTracked.onOn().subscribe(() => { 
 planeHandTransform.x = handTransform.x;
 planeHandTransform.y = handTransform.y;

  checkCollision3D(planeFace, planeHand).onOn().subscribe(() => {
    //faceMesh.material = materialList[randomInt(0, 1)];
    //indexMaterial = indexMaterial + 1;
    indexMaterial = Math.floor(Math.random() * materialList.length);
    if(indexMaterial != indexMaterialClone){
      faceMesh.material = materialList[indexMaterial];
      indexMaterialClone = indexMaterial;
    }
    //if(indexMaterial > materialList.length -1){indexMaterial = 0;}
    //faceMesh.material = materialList[indexMaterial];
    Diagnostics.watch("Material Index", indexMaterial);
  });

});


hand.isTracked.onOff().subscribe(() => {
  planeHandTransform.x = Reactive.val(1);
  planeHandTransform.y = Reactive.val(1);

});

Diagnostics.watch("hand is Tracker", hand.isTracked);
Diagnostics.watch("plane0 with plane1", checkCollision3D(planeFace, planeHand));
*/
face.isTracked.onOff().subscribe(() => {
  indexMaterial = Math.floor(Math.random() * materialList.length);
    if(indexMaterial != indexMaterialClone){
      faceMesh.material = materialList[indexMaterial];
      indexMaterialClone = indexMaterial;
    }
    //if(indexMaterial > materialList.length -1){indexMaterial = 0;}
    //faceMesh.material = materialList[indexMaterial];
    Diagnostics.watch("Material Index", indexMaterial);

});
 





checkCollision3D(planeFace, planeHand).onOff().subscribe(() => {
  //faceMesh.material = material2;
});
  /*
  //if the hand is in the boundary of the face
  if(handTransform.x > XLeft && handTransform.x < XRight && handTransform.y > YTop && handTransform.y < YButton){
    Diagnostics.log("in the boundary");
  }
*/
/*
if(Reactive.gt(handTransform.x, XLeft) && Reactive.lt(handTransform.x, XRight) && Reactive.gt(handTransform.y, YTop) && Reactive.lt(handTransform.y, YButton)){
  //Diagnostics.watch(Reactive.gt(handTransform.x, XLeft));
  //boolOfHandinBox = true;
  faceMesh.material = material2;
}
else{
  //boolOfHandinBox = false
  faceMesh.material = material1;
  
  };
*/

/*
if(Reactive.lt(handTransform.x, XLeft)){
  faceMesh.material = material1;
}
else{
  faceMesh.material = material2;
}
  Diagnostics.watch("In box", Reactive.ge(handTransform.x, XLeft));

  Diagnostics.watch("XRight", XRight);
  Diagnostics.watch("XLeft", XLeft);
  Diagnostics.watch("YTop", YTop);
  Diagnostics.watch("YTop", YButton);

  Diagnostics.watch("handTransform.x", handTransform.x);
*/
  //planeTransform = 0.5;

  // Bind the rotation of the face to the rotation of the plane
  //planeTransform.rotationX = faceTransform.rotationX;
  //planeTransform.rotationY = faceTransform.rotationY;
  //planeTransform.rotationZ = faceTransform.rotationZ;

  


  //==========================================================================
  // Control the scale of the plane with mouth openness
  //==========================================================================

  // Create a reference to the mouth openness and amplify the signal using
  // the mul() and add() methods
  //const mouthOpenness = face.mouth.openness.mul(4).add(1);

  // Bind the mouthOpenness signal to the x and y-axis scale signal of
  // the plane
  //planeTransform.scaleX = mouthOpenness;
  //planeTransform.scaleY = mouthOpenness;

})(); // Enable async/await in JS [part 2]


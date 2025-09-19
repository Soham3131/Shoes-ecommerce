
// import React, { useRef, useEffect } from "react";
// import * as THREE from "three";
// import { useGLTF } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";

// const ShoeModel = ({ path, ...props }) => {
//   // useGLTF returns a gltf object, the scene is within gltf.scene
//   const gltf = useGLTF(path);
//   const ref = useRef();

//   useEffect(() => {
//     if (ref.current && gltf.scene) {
//       // Create a clone of the scene to avoid modifying the original
//       // which might be shared if multiple instances are used or re-rendered
//       const clonedScene = gltf.scene.clone();

//       // Clear any previous children, if this ref was reused
//       while(ref.current.children.length > 0){
//           ref.current.remove(ref.current.children[0]);
//       }
//       ref.current.add(clonedScene);


//       // Reset rotation & scale
//       clonedScene.rotation.set(0, 0, 0);
//       clonedScene.scale.set(1, 1, 1); // Start with default scale for bounding box calculation

//       // Calculate bounding box after adding to the scene
//       const box = new THREE.Box3().setFromObject(clonedScene);
//       const size = new THREE.Vector3();
//       box.getSize(size);

//       const targetHeight = 2.5; // Desired visual height in Three.js units
//       const maxDim = Math.max(size.x, size.y, size.z);
//       const scale = targetHeight / maxDim;

//       clonedScene.scale.set(scale, scale, scale);

//       // Recalculate box after scaling
//       box.setFromObject(clonedScene);
//       const center = new THREE.Vector3();
//       box.getCenter(center);

//       // Position to center and lift slightly
//       clonedScene.position.sub(center);
//       // Adjust Y position based on desired visual placement for most shoes
//       clonedScene.position.y += (targetHeight / 2) - 0.5; // Example adjustment
//     }
//   }, [gltf.scene, path]); // Re-run effect when scene or path changes

//   // Continuous rotation for presentation
//   useFrame(() => {
//     if (ref.current) {
//       ref.current.rotation.y += 0.005; // Slower rotation for a more premium feel
//     }
//   });

//   return <group ref={ref} {...props} />; // Render a group that will contain the cloned scene
// };

// export default ShoeModel;


// src/components/ShoeModel.js
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const ShoeModel = ({ path, ...props }) => {
  const gltf = useGLTF(path);
  const ref = useRef();

  useEffect(() => {
    if (ref.current && gltf.scene) {
      const clonedScene = gltf.scene.clone();

      while (ref.current.children.length > 0) {
        ref.current.remove(ref.current.children[0]);
      }
      ref.current.add(clonedScene);

      // Reset
      clonedScene.rotation.set(0, 0, 0);

      // Bounding box auto-scale
      const box = new THREE.Box3().setFromObject(clonedScene);
      const size = new THREE.Vector3();
      box.getSize(size);

      const targetHeight = 2.2;
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = targetHeight / maxDim;

      clonedScene.scale.set(scale, scale, scale);

      // Center model
      box.setFromObject(clonedScene);
      const center = new THREE.Vector3();
      box.getCenter(center);
      clonedScene.position.sub(center);
    }
  }, [gltf.scene, path]);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
    }
  });

  return <group ref={ref} {...props} />;
};

export default ShoeModel;

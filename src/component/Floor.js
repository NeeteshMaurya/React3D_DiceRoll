import React from 'react'
import { angleToRadians } from '../utils/angle'
import { useTexture } from "@react-three/drei";
import { usePlane } from "@react-three/cannon";
import { floorBodyMaterial } from "../utils/bodyMaterial";

const Floor = () => {
    // const boardWidth = 24;
    const boardTexture = useTexture("./img/wood-texture.jpg");
    //Solid Plane to catch dice which is free falling in negative Y direction due to gravity
    //our plane and our mesh should be in same position.So our mesh texture will work like solid plane.so we use ref.
    const [ref, api] = usePlane(() => ({
        type: "static",
        material: floorBodyMaterial,
        rotation: [-(angleToRadians(90)),0,0],
        position: [0,-1.5,0],
      }));
  return (
    <>
      <mesh ref={ref} rotation={[-(angleToRadians(90)),0,0]} position={[0,-1.5,0]} receiveShadow>        
        <planeGeometry args={[7,7]}/>
        <meshStandardMaterial map={boardTexture} />
      </mesh>
    </>
  )
}

export default Floor
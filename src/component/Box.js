import React, {  useEffect, useRef } from "react";
import { Clone, useGLTF } from "@react-three/drei";
import { boxSize } from "../utils/constant";
import { useBox } from "@react-three/cannon";
import { floorBodyMaterial } from "../utils/bodyMaterial";
import { useBoxStore } from "../store";
import { angleToRadians } from "../utils/angle";

const bape = [
  "./model/bape_0001.glb",
  "./model/bape_0002.glb",
  "./model/bape_0003.glb",
  "./model/bape_0004.glb",
  "./model/bape_0005.glb",
  "./model/bape_0006.glb",
  "./model/bape_0007.glb",
  "./model/bape_0008.glb",
  "./model/bape_0009.glb",
  "./model/bape_0010.glb",
  "./model/bape_0011.glb",
];
 
const Box = ({ position, num }) => {
  const { nodes } = useGLTF(bape[num]);
  nodes?.geo1?.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });

  const setPressed = useBoxStore((state) => state.setPressed);
  const inBoard = useBoxStore((state) => state.inBoard);

  const [ref, api] = useBox(() => ({
    type: "Dynamic",
    args: [boxSize + 0.8, boxSize + 0.8, boxSize],
    material: floorBodyMaterial,
    allowSleep: false,
    position: position,
    rotation: [angleToRadians(90), angleToRadians(180), angleToRadians(0)],
  }));

  const boxposi = useRef([0, 0, 0]);
  useEffect(() => {
    const unsubscribe = api.position.subscribe((v) => (boxposi.current = v));
  }, []);


  const handleDown = (e) => {
    setPressed(api);
  };
  const handleUp = (e) => {
    setPressed(null);
    !inBoard && api.position.set(...position);
  };

  
  return (
    <Clone
      ref={ref}
      castShadow
      onPointerDown={handleDown}
      onPointerUp={handleUp}
      scale={0.9}
      object={nodes.geo1}
    />
  );
};

export default Box;
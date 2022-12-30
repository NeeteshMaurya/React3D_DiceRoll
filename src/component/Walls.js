import React from 'react'
import { angleToRadians } from '../utils/angle'
import { useBox } from "@react-three/cannon"

const Walls = () => {
  const [topRef, api1] = useBox(() => ({
    type: "Static",
    args: [7.2,4,0.2],
    position: [0,-1.25,-3.5],
  }));
  const [bottomRef, api2] = useBox(() => ({
    type: "Static",
    args: [7.2,0.5,0.2],
    position: [0,-1.25,3.5],
  }));
  const [leftRef, api3] = useBox(() => ({
    type: "Static",
    args: [7.2,0.5,0.2],
    position: [-3.5,-1.25,0],
    rotation: [0,-(angleToRadians(90)),0],
  }));
  const [rightRef, api4] = useBox(() => ({
    type: "Static",
    position: [3.5,-1.25,0],
    args: [7.2,4,0.2],
    rotation: [0,-(angleToRadians(90)),0],
  }));
  return (
    <>
      <mesh ref={leftRef} rotation={[0,-(angleToRadians(90)),0]} position={[-3.5,-1.25,0]}>
        <boxGeometry args={[7.2,0.5,0.2]}/>
        <meshStandardMaterial color={'red'}/>
      </mesh>

      <mesh ref={rightRef} rotation={[0,-(angleToRadians(90)),0]} position={[3.5,-1.25,0]}>
        <boxGeometry args={[7.2,0.5,0.2]}/>
        <meshStandardMaterial color={'red'}/>
      </mesh>

      <mesh ref={bottomRef} position={[0,-1.25,3.5]}>
        <boxGeometry args={[7,0.5,0.2]}/>
        <meshStandardMaterial color={'red'}/>
      </mesh> 
      <mesh ref={topRef} position={[0,-1.25,-3.5]}>
        <boxGeometry args={[7,0.5,0.2]}/>
        <meshStandardMaterial color={'red'}/>
      </mesh>
    </>
  )
}

export default Walls
import React from 'react'
import { angleToRadians } from '../utils/angle'

const Walls = () => {
  return (
    <>
      <mesh rotation={[0,-(angleToRadians(90)),0]} position={[-3.5,-1.25,0]}>
        <boxGeometry args={[7.2,0.5,0.2]}/>
        <meshStandardMaterial color={'red'}/>
      </mesh>

      <mesh rotation={[0,-(angleToRadians(90)),0]} position={[3.5,-1.25,0]}>
        <boxGeometry args={[7.2,0.5,0.2]}/>
        <meshStandardMaterial color={'red'}/>
      </mesh>

      <mesh position={[0,-1.25,3.5]}>
        <boxGeometry args={[7,0.5,0.2]}/>
        <meshStandardMaterial color={'red'}/>
      </mesh> 
      <mesh position={[0,-1.25,-3.5]}>
        <boxGeometry args={[7,0.5,0.2]}/>
        <meshStandardMaterial color={'red'}/>
      </mesh>
    </>
  )
}

export default Walls
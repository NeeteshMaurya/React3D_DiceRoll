import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { angleToRadians } from '../utils/angle'
import { useBox } from "@react-three/cannon";
import * as CANNON from "cannon-es";

function Three() {
//After click functionality
  function randomNumberInRange(min, max) {
      const randomNum = (Math.floor(Math.random() * (max - min + 1)) + min);
      if (randomNum === 1) {
        setDiceDetail([d3,d2,d1,d4,d5,d6])
      }
      if (randomNum === 2) {
        setDiceDetail([d1,d3,d2,d4,d5,d6])
      }
      if (randomNum === 3) {
        setDiceDetail([d1,d2,d3,d4,d5,d6])
      }
      if (randomNum === 4) {
        setDiceDetail([d1,d2,d4,d3,d5,d6])
      }
      if (randomNum === 5) {
        setDiceDetail([d1,d2,d5,d4,d3,d6])
      }
      if (randomNum === 6) {
        setDiceDetail([d1,d2,d6,d4,d5,d3])
      }  
    
  }
  //Handling click on dice
  const handleClick = () => {
    mesh.current.position.z = 0
    randomNumberInRange(2, 6);  
  };
  //importing imaeges
  var d1 = 'textures/dice_1.webp'
  var d2 = 'textures/dice_2.webp'
  var d3 = 'textures/dice_3.webp'
  var d4 = 'textures/dice_4.webp'
  var d5 = 'textures/dice_5.webp'
  var d6 = 'textures/dice_6.webp'
//Initial State of Dice  #Dice3 will show on top always.So we exchange d3 with random number
  const [diceDetail,setDiceDetail]=useState([d1,d2,d3,d4,d5,d6])
//By using this hook we no need to use textureLoader 
  var map = useTexture(diceDetail)

  const mesh = useRef()
  // useFrame(() => {
  //   mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  // })
  
  return (
    <>
      
      <mesh ref={mesh} position={[0,-1.25,1.5]} onClick={handleClick}>
        <boxBufferGeometry attach="geometry" args={[0.4,0.4,0.4]} />
        {map.map((texture, idx) => (
          <meshBasicMaterial
            attach={`material-${idx}`}
            map={texture}
          />
        ))}
      </mesh>
      <mesh rotation={[-(angleToRadians(90)),0,0]} position={[0,-1.5,0]}>
        <planeGeometry args={[7,7]}/>
        <meshStandardMaterial color={'blue'} />
      </mesh>
      {/* //walls */}
  
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
export default Three
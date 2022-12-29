import React, { useRef, useState, forwardRef,useImperativeHandle } from 'react'
import { useTexture } from '@react-three/drei'
import { useBox } from "@react-three/cannon";
import * as CANNON from "cannon-es";

const Dice = (props,ref) => {
    useImperativeHandle(ref,()=>({
        throwDice
    }))
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

  //we apply this setting in our dice by using useBox and ref
  const settings = {
    mass: 1,
    type: "Dynamic",
    position: [100,100,1], //[-3.5, 0, 3.8],  //initial position of dice
    sleepTimeLimit: 0.01,
    linearDamping: 0.1,
    angularDamping: 0.1,
  };
  const [dice1, di] = useBox(() => ({ ...settings }));
  const throwDice = (x, y, velocity) => {
    let boardX = (7 / 2) * x * 0.95;
    let boardY = (7 / 2) * y * 0.95;
    changeDice(velocity, boardX, boardY, 0);
  };
  const changeDice = (velocity, boardX, boardY, i) => {
    let api;
    let pos = new CANNON.Vec3(-4, 0, 4);// position of throwing dice(Final position depends on velocity vector)
    if (i === 0) {
      // pos.z += diceSize * 1.1;
      api = di;
      console.log(pos.x);
      console.log(dice1);
    }
//Here x,y,z values with sign(sign shows direction of throw and number shows speed)
//exp- (10,0,-10) means from left of screen to right side of screen
    let velocityVector = new CANNON.Vec3(10, 0, -10); 

    // velocityVector = velocityVector.scale(-1);
    // velocityVector.normalize();
    // velocityVector = velocityVector.scale(velocity * 10);

    if (api) {
      api.position.copy(pos);
      //api.quaternion.set((45 * Math.PI) / 180, 0, (70 * Math.PI) / 180, 1);

      api.velocity.copy(velocityVector);
      api.angularVelocity.set(0, 0, 0);
    }
  };
  return (
    <>
      <mesh ref={dice1}  >
        <boxBufferGeometry attach="geometry" args={[0.4,0.4,0.4]} />
        {map.map((texture, idx) => (
          <meshBasicMaterial
            attach={`material-${idx}`}
            map={texture}
          />
        ))}
      </mesh>
    </>
  )
}

export default forwardRef(Dice);
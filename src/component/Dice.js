import React, { useState, forwardRef,useImperativeHandle } from 'react'
import { useTexture,useGLTF,Clone } from '@react-three/drei'
import { useBox } from "@react-three/cannon";
import * as CANNON from "cannon-es";

const Dice = (props,ref) => {
  
  useImperativeHandle(ref,()=>({
      throwDice,
  }))
  const { scene } = useGLTF("./model/dice.glb");
	scene.traverse((node) => {
		if (node.isMesh) {
			node.castShadow = true;
		}
	});
  //importing imaeges
  // var d1 = 'textures/dice_1.webp'
  // var d2 = 'textures/dice_2.webp'
  // var d3 = 'textures/dice_3.webp'
  // var d4 = 'textures/dice_4.webp'
  // var d5 = 'textures/dice_5.webp'
  // var d6 = 'textures/dice_6.webp'
  //Initial State of Dice  #Dice3 will show on top always.So we exchange d3 with random number
  // const [diceDetail,setDiceDetail]=useState([d1,d2,d3,d4,d5,d6])
//By using this hook we no need to use textureLoader 
  //var map = useTexture(diceDetail)

  //we apply this setting in our dice by using useBox and ref
  const settings = {
    mass: 1,
    type: "Dynamic",
    position: [100,100,1], //initial position of dice(Initially position of all boxes are same so they repell each other before rolling.So we use very far postion,by this there will be no effect of repultion on our screen)
    sleepTimeLimit: 0.01,
    linearDamping: 0.9, //increase linear Damping,results same but with less animation
    angularDamping: 0.1,
  };
  //Here dice1 is refrence and di is use to interact with box(like changing velocity position etc)
  const [dice1, di] = useBox(() => ({ ...settings }));
  const [dice2, di1] = useBox(() => ({ ...settings }));
  const [dice3, di2] = useBox(() => ({ ...settings }));
  console.log(dice1)
  console.log(di)
  const throwDice = (x, y, velocity) => {
    let boardX = (7 / 2) * x * 0.95;
    let boardY = (7 / 2) * y * 0.95;
    changeDice(velocity, boardX, boardY, 0);
    changeDice(velocity, boardX, boardY, 1);
    changeDice(velocity, boardX, boardY, 2);
  };
  const changeDice = (velocity, boardX, boardY, i) => {
    let api;
    let pos = new CANNON.Vec3(-4, 0, 4);// from here we will see dice animation.
    if (i === 0) {
      api = di;
      console.log(api)
    }
    if (i === 1) {
      pos.x += 1;
      api = di1;
    }
    if (i === 2) {
      pos.x += 2;
      api = di2;
    }
//Here x,y,z values with sign(sign shows direction of throw and number shows speed)
//exp- (10,0,-10) means from left of screen to right side of screen
    let velocityVector = new CANNON.Vec3(10, 0, -10); 

    //providing our position,velocity to our Dice, after throw.
    if (api) {
      api.position.copy(pos);
      api.velocity.copy(velocityVector);
      api.angularVelocity.set(0, 0, 0); //angular velocity should be 0 for repeated(same) value on dice.
    }
    
  };

  return (
    <>
      <Clone ref={dice1} scale={[.4,.4,.4]} object={scene} />
      <Clone ref={dice2} scale={[.4,.4,.4]} object={scene} />
      <Clone ref={dice3} scale={[.4,.4,.4]} object={scene} />
    </>
  )
}

export default forwardRef(Dice);
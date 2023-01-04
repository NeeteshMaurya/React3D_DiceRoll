import { useBox } from "@react-three/cannon";
import React, { useEffect } from "react";
import { useAppStore } from "../store";
import { boardWidth, diceSize } from "../utils/constant";
import * as CANNON from "cannon-es";
import { diceBodyMaterial } from "../utils/bodyMaterial";
import * as THREE from "three";
import { useTexture,useGLTF,Clone } from '@react-three/drei'

const Dices = () => {
  const { scene } = useGLTF("./model/dice.glb");
	scene.traverse((node) => {
		if (node.isMesh) {
			node.castShadow = true;
		}
  });

	const isThrow = useAppStore((state) => state.isThrow);
	const reset = useAppStore((state) => state.reset);
	const settings = {
		mass: 1,
		type: "Dynamic",
		material: diceBodyMaterial,
		position: [100, 100, 1],
		sleepTimeLimit: 0.01,
		linearDamping: 0.1,
		angularDamping: 0.1,
		args: [diceSize, diceSize, diceSize],
	};
	const [dice1, api1] = useBox(() => ({ ...settings }));
	const [dice2, api2] = useBox(() => ({ ...settings }));
	const [dice3, api3] = useBox(() => ({ ...settings }));

	useEffect(() => {
		if (isThrow) {
			throwDice(-1, -1, 4);
			reset();
		}
	}, [isThrow]);

	const throwDice = (x, y, velocity) => {
		let boardX = (boardWidth / 2) * x * 0.95;
		let boardY = (boardWidth / 2) * y * 0.95;

		changeDice(velocity, boardX, boardY, 0);
		changeDice(velocity, boardX, boardY, 1);
		changeDice(velocity, boardX, boardY, 2);
	};

	const changeDice = (velocity, boardX, boardY, i) => {
		let api;
		let pos = new CANNON.Vec3(boardX, boardY, boardWidth * 0.45);

		if (i === 0) {
			pos.z += diceSize * 1.1;
			api = api1;
		}

		if (i === 1) {
			pos.x -= diceSize * 1.2;
			pos.z -= diceSize * 1.3;
			api = api2;
		}

		if (i === 2) {
			pos.y += diceSize * 1.1;
			pos.z += diceSize * 0.4;
			api = api3;
		}

		let velocityVector = new CANNON.Vec3(pos.x, pos.y, 0);

		velocityVector = velocityVector.scale(-1);
		velocityVector.normalize();
		velocityVector = velocityVector.scale(velocity * 10);

		if (api) {
			api.wakeUp();
			api.position.copy(pos);
      //if not set result will be diffrent every time.It describe rotation in 3D Space
			api.quaternion.set((45 * Math.PI) / 180, 0, (70 * Math.PI) / 180, 1);
			api.velocity.copy(velocityVector);
			api.angularVelocity.set(0, 0, 0);
		}
	};

	const calcDiceResult = () => {
		let indexToResult = {
			1: [0, 2, 1, 2, 3, 1],
			3: [4, 6, 5, 6, 7, 5],
			2: [8, 9, 10, 10, 9, 11],
			4: [12, 13, 14, 14, 13, 15],
			5: [16, 17, 18, 18, 17, 19],
			6: [20, 21, 22, 22, 21, 23],
		};

		let tempMesh = new THREE.Mesh(
			new THREE.BoxGeometry(diceSize, diceSize, diceSize),
			new THREE.MeshPhongMaterial()
		);

		let result = [];

		// this.diceArr.forEach((dice, i) => {
		// 	tempMesh.position.copy(dice.body.position);
		// 	tempMesh.quaternion.copy(dice.body.quaternion);

		// 	let vector = new THREE.Vector3(0, 0, 1);
		// 	let closestIndex;
		// 	let closestAngle = Math.PI * 2;

		// 	let normals = tempMesh.geometry.getAttribute("normal").array;

		// 	let length = normals.length;
		// 	let normal = new THREE.Vector3();

		// 	for (let i = 0; i < length; i += 3) {
		// 		let index = i / 3;

		// 		normal.set(normals[i], normals[i + 1], normals[i + 2]);

		// 		let angle = normal
		// 			.clone()
		// 			.applyQuaternion(dice.body.quaternion)
		// 			.angleTo(vector);

		// 		if (angle < closestAngle) {
		// 			closestAngle = angle;
		// 			closestIndex = index;
		// 		}
		// 	}

		// 	for (let number in indexToResult) {
		// 		if (indexToResult[number].indexOf(closestIndex) !== -1) {
		// 			result.push(number);
		// 			break;
		// 		}
		// 	}
		// });

		return result;
	};

	return (
		<>
			<Clone ref={dice1} object={scene} />
      <Clone ref={dice2} object={scene} />
      <Clone ref={dice3} object={scene} />
		</>
	);
};

export default Dices;





// import React, { useState, forwardRef,useImperativeHandle } from 'react'
// import { useTexture,useGLTF,Clone } from '@react-three/drei'
// import { useBox } from "@react-three/cannon";
// import * as CANNON from "cannon-es";

// const Dice = (props,ref) => {
  
//   useImperativeHandle(ref,()=>({
//       throwDice,
//   }))
//   const { scene } = useGLTF("./model/dice.glb");
// 	scene.traverse((node) => {
// 		if (node.isMesh) {
// 			node.castShadow = true;
// 		}
// 	});
//   //importing imaeges
//   // var d1 = 'textures/dice_1.webp'
//   // var d2 = 'textures/dice_2.webp'
//   // var d3 = 'textures/dice_3.webp'
//   // var d4 = 'textures/dice_4.webp'
//   // var d5 = 'textures/dice_5.webp'
//   // var d6 = 'textures/dice_6.webp'
//   //Initial State of Dice  #Dice3 will show on top always.So we exchange d3 with random number
//   // const [diceDetail,setDiceDetail]=useState([d1,d2,d3,d4,d5,d6])
// //By using this hook we no need to use textureLoader 
//   //var map = useTexture(diceDetail)

//   //we apply this setting in our dice by using useBox and ref
//   const settings = {
//     mass: 1,
//     type: "Dynamic",
//     position: [100,100,1], //initial position of dice(Initially position of all boxes are same so they repell each other before rolling.So we use very far postion,by this there will be no effect of repultion on our screen)
//     sleepTimeLimit: 0.01,
//     linearDamping: 0.9, //increase linear Damping,results same but with less animation
//     angularDamping: 0.1,
//   };
//   //Here dice1 is refrence and di is use to interact with box(like changing velocity position etc)
//   const [dice1, di] = useBox(() => ({ ...settings }));
//   const [dice2, di1] = useBox(() => ({ ...settings }));
//   const [dice3, di2] = useBox(() => ({ ...settings }));
//   console.log(dice1)
//   console.log(di)
//   const throwDice = (x, y, velocity) => {
//     let boardX = (7 / 2) * x * 0.95;
//     let boardY = (7 / 2) * y * 0.95;
//     changeDice(velocity, boardX, boardY, 0);
//     changeDice(velocity, boardX, boardY, 1);
//     changeDice(velocity, boardX, boardY, 2);
//   };
//   const changeDice = (velocity, boardX, boardY, i) => {
//     let api;
//     let pos = new CANNON.Vec3(-4, 0, 4);// from here we will see dice animation.
//     if (i === 0) {
//       api = di;
//       console.log(api)
//     }
//     if (i === 1) {
//       pos.x += 1;
//       api = di1;
//     }
//     if (i === 2) {
//       pos.x += 2;
//       api = di2;
//     }
// //Here x,y,z values with sign(sign shows direction of throw and number shows speed)
// //exp- (10,0,-10) means from left of screen to right side of screen
//     let velocityVector = new CANNON.Vec3(10, 0, -10); 

//     //providing our position,velocity to our Dice, after throw.
//     if (api) {
//       api.position.copy(pos);
//       api.velocity.copy(velocityVector);
//       api.angularVelocity.set(0, 0, 0); //angular velocity should be 0 for repeated(same) value on dice.
//     }
    
//   };

//   return (
//     <>
//       <Clone ref={dice1} scale={[.4,.4,.4]} object={scene} />
//       <Clone ref={dice2} scale={[.4,.4,.4]} object={scene} />
//       <Clone ref={dice3} scale={[.4,.4,.4]} object={scene} />
//     </>
//   )
// }

// export default forwardRef(Dice);
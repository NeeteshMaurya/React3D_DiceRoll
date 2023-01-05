import React, { useContext, useEffect, useRef, useState } from "react";
import { Clone, useGLTF } from "@react-three/drei";
import { boxSize } from "../utils/constant";
import { useBox } from "@react-three/cannon";
import { floorBodyMaterial } from "../utils/bodyMaterial";
import { angleToRadians } from "../utils/angle";
import { useFrame } from "@react-three/fiber";
import { useBoxStore } from "../store";

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
  
    const pressed = useBoxStore((state) => state.pressed);
    const [sPos, setsPos] = useState([]);
    const setPressed = useBoxStore((state) => state.setPressed);
    const inBoard = useBoxStore((state) => state.inBoard);
    //const boxTexture = useTexture("./img/cement.jpg");
    const [ref, api] = useBox(() => ({
      type: "Dynamic",
      args: [boxSize + 0.8, boxSize + 0.8, boxSize],
      material: floorBodyMaterial,
      allowSleep: false,
      position: position,
      rotation: [angleToRadians(90), angleToRadians(180), angleToRadians(0)],
    }));
  
    //const { socket, setPlacement, reset, setReset } = useContext(AccountContext);
  
    const boxposi = useRef([0, 0, 0]);
    useEffect(() => {
      const unsubscribe = api.position.subscribe((v) => (boxposi.current = v));
    }, []);
 
  
    const handleDown = (e) => {
      setPressed(api);
    };
    const handleUp = (e) => {
      setPressed(null);
  
      //socket?.current?.emit("BoxData", { pos: boxposi.current, index: num });
      !inBoard && api.position.set(...position);
    };
  
    
  
    
  
    // const HandleMesh = () => {
    //   sPos.forEach((mesh) => {
    //     if (mesh.index === num) {
    //       api?.position?.set(mesh.pos[0], mesh.pos[1], 0.72);
    //       setsPos([]);
    //     }
    //   });
    // };
  
  
    // const UpdateMesh = () => {
    //   ref?.current?.position.set(
    //     boxposi.current[0],
    //     boxposi.current[1],
    //     boxposi.current[2]
    //   );
    // };
  
    // useFrame(() => {
    //   HandleMesh();
    //   UpdateMesh();
    // });
  
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


// const Box = ({ position, num }) => {
//   const { nodes } = useGLTF(bape[num]);
//   nodes?.geo1?.traverse((node) => {
//     if (node.isMesh) {
//       node.castShadow = true;
//     }
//   });

//   const pressed = useBoxStore((state) => state.pressed);
//   const [sPos, setsPos] = useState([]);
//   const setPressed = useBoxStore((state) => state.setPressed);
//   const inBoard = useBoxStore((state) => state.inBoard);
// //physics reference values for every bape.
//   const [ref, api] = useBox(() => ({
//     type: "Dynamic",
//     args: [boxSize + 0.8, boxSize + 0.8, boxSize],
//     material: floorBodyMaterial,
//     allowSleep: false,
//     position: position,
//     rotation: [angleToRadians(90), angleToRadians(180), angleToRadians(0)],
//   }));

//   const boxposi = useRef([0, 0, 0]);
//   useEffect(() => {
//     const unsubscribe = api.position.subscribe((v) => (boxposi.current = v));
//   }, []);

// //   if (reset) {
// //     api.position.set(...position);
// //     setReset(false);
// //   }

//   const handleDown = (e) => {
//     setPressed(api);
//   };
//   const handleUp = (e) => {
//     setPressed(null);

//     //socket?.current?.emit("BoxData", { pos: boxposi.current, index: num });
//     !inBoard && api.position.set(...position);
//   };

// //   const HandleSocket = () => {
// //     socket.current.on("BoxData", (boxes) => {
// //       setsPos(boxes);
// //     });
// //   };

// //   useEffect(() => {
// //     HandleSocket();
// //   }, [pressed]);

//   const HandleMesh = () => {
//     sPos.forEach((mesh) => {
//       if (mesh.index === num) {
//         api?.position?.set(mesh.pos[0], mesh.pos[1], 0.72);
//         setsPos([]);
//       }
//     });
//   };

// //   useEffect(() => {
// //     socket?.current?.emit("getBoxes", "hi");
// //     socket?.current?.on("getBoxes", (boxes) => {
// //       setsPos(boxes);
// //     });
// //   }, []);

//   const UpdateMesh = () => {
//     ref?.current?.position.set(
//       boxposi.current[0],
//       boxposi.current[1],
//       boxposi.current[2]
//     );
//   };

//   useFrame(() => {
//     HandleMesh();
//     UpdateMesh();
//   });

//   return (
//     <>
//       <Clone
//       ref={ref}
//       castShadow
//       onPointerDown={handleDown}
//       onPointerUp={handleUp}
//       scale={0.9}
//       object={nodes.geo1}
//     />
//     </>
//   )
// }

// export default Box
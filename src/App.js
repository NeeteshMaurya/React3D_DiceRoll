import './App.css';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import Floor from './component/Floor';
import Walls from './component/Walls';
import Dice from './component/Dice';
import { Physics } from "@react-three/cannon";
import { useRef } from 'react'

function App() {
  //where we pass this reference we will find reference of that component of component's function
  const DiceRef = useRef();
  let btnRef = useRef();

  const clickHandler =()=>{
    DiceRef.current.throwDice(1,0,0)
    btnRef.current.setAttribute("disabled","disabled")
  }
  return (
    <>
    {/* anything in a scene is called mesh . for any scene we need a geometry and a material */}
    <Canvas shadows> {/*when we use component it already has a camera and scene by default */}
      <PerspectiveCamera makeDefault position={[0,8,0]} />
      <OrbitControls enabled={false}/>

      <ambientLight intensity={0.25} />
      <directionalLight args={['white', 1]} position={[-4, 6, 0]} castShadow />

      <Suspense fallback={null}> {/* if component is taking time or loading this will show what inside fallback */}
        {/* direction of gravity wrt x,y,z axis */}
        <Physics gravity={[0, -9.8, 0]} > 
          <Floor />
          <Walls />
          <Dice ref={DiceRef} />
        </Physics>
      </Suspense>
    </Canvas>
    {/* <div> */}
    <button  onClick={()=>clickHandler()}>Roll Dice</button>
    {/* </div> */}
    </>
    );
}

export default App;

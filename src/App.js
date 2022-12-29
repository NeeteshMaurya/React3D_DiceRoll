import './App.css';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Three from './component/Three';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import Floor from './component/Floor';
import Walls from './component/Walls';
import Dice from './component/Dice';
import { Physics } from "@react-three/cannon";
import { useRef } from 'react'

function App() {
  //where we pass this reference we will find reference of that component of component's function
  const DiceRef = useRef();
  return (
    <>
    {/* anything in a scene is called mesh . for any scene we need a geometry and a material */}
    <Canvas> {/*when we use component it already has a camera and scene by default */}
      <PerspectiveCamera makeDefault position={[0,9,9]} />
      <OrbitControls enabled={false}/>
      <ambientLight intensity={0.3} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[0, 0, 5]} />
      <Suspense fallback={null}> {/* if component is taking time or loading this will show what inside fallback */}
        {/* direction of gravity wrt x,y,z axis */}
        <Physics gravity={[0, -9.8, 0]} > 
          <Floor />
          <Walls />
          <Dice ref={DiceRef} />
        </Physics>
      </Suspense>
    </Canvas>
    <button onClick={()=>DiceRef.current.throwDice(1,0,0)}>Roll Dice</button>
    </>
    );
}

export default App;

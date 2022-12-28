import './App.css';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Three from './component/Three';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

function App() {
  return (
    // anything in a scene is called mesh . for any scene we need a geometry and a material
    <Canvas> {/*when we use component it already has a camera and scene by default */}
      <PerspectiveCamera makeDefault position={[1.0,4.5,4.0]} />
      <OrbitControls />
      <ambientLight intensity={0.3} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[0, 0, 5]} />
      <Suspense fallback={null}> {/* if component is taking time or loading this will show what inside fallback */}
        <Three />
      </Suspense>
    </Canvas>
    );
}

export default App;

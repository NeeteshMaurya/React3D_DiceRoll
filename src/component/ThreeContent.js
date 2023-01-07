import { Bounds, OrbitControls } from "@react-three/drei";
import { Debug, Physics, useBox } from "@react-three/cannon";
import Walls from "./Walls";
import Dice from "./Dice";
import Floor from "./Floor";
import { borderWidth, boxSize } from "../utils/constant";
import { NaiveBroadphase } from "cannon-es";
import { BodyMaterial } from "../utils/bodyMaterial";
import Boxes from "./Boxes";
import { useBoxStore } from "../store";

const ThreeContent = () => {
	const w = borderWidth;
	//for Drag and Drop
	const pressed = useBoxStore((state) => state.pressed);
	const handleMove = (e) => {
		pressed && pressed.position.set(e.point.x, e.point.y, boxSize / 2);
		pressed && console.log(pressed.position)
	};

	return (
		<>
			<ambientLight intensity={1.3} color={0x707070} />
			<spotLight
				position={[-w / 3, w * 20, w * 20]}
				color={0xefdfd5}
				intensity={4.3}
				// target-position={[0, 0, 0]}
				distance={w * 60}
				castShadow
				shadow-camera-near={1}
				shadow-camera-far={100}
				shadow-mapSize-width={2024}
				shadow-mapSize-height={2024}
			/>
			<Physics
				gravity={[0, 0, -9.8 * 20]}
				solver-iterations={20}
				broadphase={"Naive"}
				allowSleep
			>

				<mesh position={[0, 0, -1]} onPointerMove={handleMove}>
					<planeGeometry args={[100, 100, 1, 1]} />
					<meshPhongMaterial />
				</mesh>

				<Bounds fit clip observe damping={6} margin={1.1}>
					<Floor />
				</Bounds>
				<Dice />
				<Walls />
				<Boxes />
				<BodyMaterial />
			</Physics>

		</>
	);
};

export default ThreeContent;

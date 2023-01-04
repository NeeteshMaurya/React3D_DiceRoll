import { Bounds, OrbitControls } from "@react-three/drei";
import { Debug, Physics, useBox } from "@react-three/cannon";
import Walls from "./Walls";
import * as THREE from "three";
import Dice from "./Dice";
import Floor from "./Floor";
import { borderWidth } from "../utils/constant";
import { NaiveBroadphase } from "cannon-es";
import { BodyMaterial } from "../utils/bodyMaterial";
import { useAppStore } from "../store";

const ThreeContent = () => {
	const w = borderWidth;

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

				<mesh position={[0, 0, -1]}>
					<planeGeometry args={[100, 100, 1, 1]} />
					<meshPhongMaterial />
				</mesh>

				<Bounds fit clip observe damping={6} margin={1.1}>
					<Floor />
				</Bounds>
				<Dice />
				<Walls />

				<BodyMaterial />
			</Physics>

		</>
	);
};

export default ThreeContent;

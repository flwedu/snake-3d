import React from "react";
import { useSnakeStore } from "../store";

export function Food() {
	const food = useSnakeStore((s) => s.food);
	const [x, z] = food;

	return (
		<mesh position={[x, 0.5, z]}>
			<sphereGeometry args={[0.5, 16, 16]} />
			<meshStandardMaterial color="#e74c3c" />
		</mesh>
	);
}

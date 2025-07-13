import { useSnakeStore } from "../store";

export function Food() {
	const food = useSnakeStore((s) => s.food);
	const { x, y } = food;

	return (
		<mesh position={[x + 0.5, y + 0.5, 0.5]}>
			<sphereGeometry args={[0.5, 16, 16]} />
			<meshStandardMaterial color="#e74c3c" />
		</mesh>
	);
}

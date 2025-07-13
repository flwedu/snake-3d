import { useSnakeStore } from "../store";

export function Snake() {
	const snake = useSnakeStore((s) => s.snake);

	return (
		<group>
			{snake.map(([x, z]) => (
				<mesh key={`${x},${z}`} position={[x, 0.5, z]}>
					<boxGeometry args={[1, 1, 1]} />
					<meshStandardMaterial color="#1abc9c" />
				</mesh>
			))}
		</group>
	);
}

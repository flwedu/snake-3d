import { useSnakeStore } from "../store";

export function Snake() {
	const snake = useSnakeStore((s) => s.snake);

	return (
		<group>
			{snake.map(({ x, y }) => (
				<mesh key={`${x},${y}`} position={[x + 0.5, y + 0.5, 0.5]}>
					<boxGeometry args={[1, 1, 1]} />
					<meshStandardMaterial color="#1abc9c" />
				</mesh>
			))}
		</group>
	);
}

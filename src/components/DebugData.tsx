import { useSnakeStore } from "../store";

export function DebugData() {
	const gridSize = useSnakeStore((s) => s.gridSize);
	const snake = useSnakeStore((s) => s.snake);
	const food = useSnakeStore((s) => s.food);

	return (
		<div>
			<p>
				Grid: {gridSize}x{gridSize}
			</p>
			<p>Snake: {JSON.stringify(snake)}</p>
			<p>Food: {JSON.stringify(food)}</p>
		</div>
	);
}

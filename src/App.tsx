import "./App.css";
import { Food } from "./components/Food";
import { Grid } from "./components/Grid";
import { Snake } from "./components/Snake";
import { useSnakeStore } from "./store";

function App() {
	const gridSize = useSnakeStore((s) => s.gridSize);
	const snake = useSnakeStore((s) => s.snake);
	const food = useSnakeStore((s) => s.food);

	return (
		<>
			<h1>Snake 3D</h1>
			<div>
				<strong>Grid:</strong> {gridSize}x{gridSize}
			</div>
			<div>
				<strong>Snake:</strong> {JSON.stringify(snake)}
			</div>
			<div>
				<strong>Food:</strong> {JSON.stringify(food)}
			</div>
			<Grid />
			<Snake />
			<Food />
		</>
	);
}

export default App;

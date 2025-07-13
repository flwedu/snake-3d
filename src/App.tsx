import "./App.css";
import { Canvas } from "@react-three/fiber";
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
			<div style={{ width: "600px", height: "600px", margin: "0 auto" }}>
				<Canvas camera={{ position: [0, 20, 20], fov: 50 }}>
					<ambientLight intensity={0.5} />
					<pointLight position={[10, 20, 10]} />
					<Grid />
					<Snake />
					<Food />
				</Canvas>
			</div>
		</>
	);
}

export default App;

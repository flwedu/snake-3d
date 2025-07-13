import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Food } from "./components/Food";
import { Grid } from "./components/Grid";
import { Snake } from "./components/Snake";
import { useControllerAndMovement } from "./hooks/useControllerAndMovement";
import { useSnakeStore } from "./store";

function App() {
	const gridSize = useSnakeStore((s) => s.gridSize);
	const snake = useSnakeStore((s) => s.snake);
	const food = useSnakeStore((s) => s.food);
	const gameOver = useSnakeStore((s) => s.gameOver);

	useControllerAndMovement(gameOver);

	return (
		<>
			<h1>Snake 3D</h1>
			<div
				style={{
					width: 600,
					height: 600,
					margin: "0 auto",
				}}
				id="canvas-container"
			>
				<Canvas
					camera={{
						position: [gridSize / 2, gridSize * 1.8, gridSize * 1.5],
						fov: 50,
						near: 0.1,
						far: 1000,
					}}
				>
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

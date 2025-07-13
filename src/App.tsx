import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Food } from "./components/Food";
import { GameOver } from "./components/GameOver";
import { Grid } from "./components/Grid";
import { Snake } from "./components/Snake";
import { Walls } from "./components/Walls";
import { useControllerAndMovement } from "./hooks/useControllerAndMovement";
import { useSnakeStore } from "./store";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

function CameraController({ gridSize }: { gridSize: number }) {
	const { camera } = useThree();
	const target = useRef<[number, number, number]>([
		gridSize / 2,
		gridSize * 0.5,
		5,
	]);
	useFrame(() => {
		camera.position.set(gridSize / 2, gridSize * 0.3, 20);
		camera.lookAt(...target.current);
	});
	return null;
}

function App() {
	const gridSize = useSnakeStore((s) => s.gridSize);
	const gameOver = useSnakeStore((s) => s.gameOver);

	useControllerAndMovement(gameOver);

	return (
		<>
			<h1>Snake 3D</h1>
			{gameOver && <GameOver />}
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
						fov: 50,
						near: 0.1,
						far: 1000,
					}}
				>
					<CameraController gridSize={gridSize} />
					<ambientLight intensity={0.5} />
					<pointLight position={[10, 10, 20]} />
					<Grid />
					<Walls />
					<Snake />
					<Food />
				</Canvas>
			</div>
		</>
	);
}

export default App;

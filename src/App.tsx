import { Canvas } from "@react-three/fiber";
import "./App.css";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Food } from "./components/Food";
import { GameOver } from "./components/GameOver";
import { Grid } from "./components/Grid";
import { Snake } from "./components/Snake";
import { Walls } from "./components/Walls";
import { useControllerAndMovement } from "./hooks/useControllerAndMovement";
import { useSnakeStore } from "./store";

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
	const score = useSnakeStore((s) => s.score);

	useControllerAndMovement(gameOver);

	return (
		<>
			<h1>Snake 3D</h1>
			<p style={{ fontSize: 20, fontWeight: "bold", margin: 8 }}>
				Pontuação: {score}
			</p>
			<div
				style={{
					width: 600,
					height: 600,
					margin: "0 auto",
					position: "relative",
				}}
				id="canvas-container"
			>
				<Canvas
					shadows
					camera={{
						fov: 50,
						near: 0.1,
						far: 1000,
					}}
				>
					<CameraController gridSize={gridSize} />
					<ambientLight intensity={0.4} />
					<directionalLight
						castShadow
						position={[10, 20, 20]}
						intensity={1.2}
						shadow-mapSize-width={1024}
						shadow-mapSize-height={1024}
						shadow-bias={-0.0005}
					/>
					<pointLight position={[10, 10, 20]} intensity={0.3} />
					<Grid />
					<Walls />
					<Snake />
					<Food />
				</Canvas>
				{gameOver && <GameOver />}
			</div>
		</>
	);
}

export default App;

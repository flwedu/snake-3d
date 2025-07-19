import React from "react";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { ActiveEffects } from "./components/ActiveEffects";
import { DifficultySelector } from "./components/DifficultySelector";
import { Food } from "./components/Food";
import { GameOver } from "./components/GameOver";
import { Grid } from "./components/Grid";
import { PowerUpInfo } from "./components/PowerUpInfo";
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
	const difficulty = useSnakeStore((s) => s.difficulty);
	const currentSpeed = useSnakeStore((s) => s.currentSpeed);

	useControllerAndMovement(gameOver);

	// Tradução das dificuldades para português
	const difficultyLabels: Record<string, string> = {
		easy: "Fácil",
		medium: "Médio",
		hard: "Difícil",
	};

	return (
		<>
			<h1>Snake 3D</h1>
			<div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "8px 0" }}>
				<p style={{ fontSize: 20, fontWeight: "bold", margin: 4 }}>
					Pontuação: {score}
				</p>
				<p style={{ fontSize: 14, margin: 2 }}>
					Dificuldade: <span style={{ fontWeight: "bold" }}>{difficultyLabels[difficulty]}</span> |
					Velocidade: <span style={{ fontWeight: "bold" }}>{Math.round(1000 / currentSpeed)} mov/s</span>
				</p>
			</div>
			<DifficultySelector />
			<div
				style={{
					width: 600,
					height: 600,
					margin: "0 auto",
					position: "relative",
				}}
				id="canvas-container"
			>
				<ActiveEffects />
				<PowerUpInfo />
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

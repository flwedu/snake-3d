import { Canvas } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import "./App.css";
import { Food } from "./components/Food";
import { Grid } from "./components/Grid";
import { Snake } from "./components/Snake";
import { useController } from "./hooks/useController";
import { useSnakeStore } from "./store";

function App() {
	const gridSize = useSnakeStore((s) => s.gridSize);
	const snake = useSnakeStore((s) => s.snake);
	const food = useSnakeStore((s) => s.food);
	const gameOver = useSnakeStore((s) => s.gameOver);
	const moveSnake = useSnakeStore((s) => s.moveSnake);
	const restart = useSnakeStore((s) => s.restart);

	// Tamanho da célula em pixels
	const cellPx = 32;
	const canvasSize = useMemo(() => gridSize * cellPx, [gridSize]);

	// Movimento automático
	useEffect(() => {
		if (gameOver) return;
		const interval = setInterval(() => {
			moveSnake();
		}, 200);
		return () => clearInterval(interval);
	}, [moveSnake, gameOver]);

	useController();

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
			{gameOver && (
				<div style={{ color: "red", fontWeight: "bold", margin: 16 }}>
					Game Over!
					<button type="button" onClick={restart} style={{ marginLeft: 8 }}>
						Reiniciar
					</button>
				</div>
			)}
			<div
				style={{
					width: canvasSize,
					height: canvasSize,
					margin: "0 auto",
				}}
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

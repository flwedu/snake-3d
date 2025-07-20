import { useSnakeStore } from "../store";

export function PauseButton() {
	const gameStarted = useSnakeStore((s) => s.gameStarted);
	const gameOver = useSnakeStore((s) => s.gameOver);
	const isPaused = useSnakeStore((s) => s.isPaused);
	const togglePause = useSnakeStore((s) => s.togglePause);

	// Só mostra o botão se o jogo foi iniciado e não está em game over
	if (!gameStarted || gameOver) {
		return null;
	}

	return (
		<div
			style={{
				position: "absolute",
				top: "10px",
				left: "50%",
				transform: "translateX(-50%)",
				zIndex: 1000,
			}}
		>
			<button
				type="button"
				onClick={togglePause}
				style={{
					padding: "8px 16px",
					fontSize: 14,
					borderRadius: 6,
					border: "none",
					background: isPaused ? "#ff9800" : "#2196f3",
					color: "#fff",
					fontWeight: "bold",
					cursor: "pointer",
					boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
					opacity: 0.9,
				}}
			>
				{isPaused ? "▶️ Continuar" : "⏸️ Pausar"}
			</button>
		</div>
	);
}

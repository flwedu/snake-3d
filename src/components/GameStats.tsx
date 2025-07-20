import { useSnakeStore } from "../store";

export function GameStats() {
	const score = useSnakeStore((s) => s.score);
	const difficulty = useSnakeStore((s) => s.difficulty);
	const currentSpeed = useSnakeStore((s) => s.currentSpeed);
	const isPaused = useSnakeStore((s) => s.isPaused);
	const gameStarted = useSnakeStore((s) => s.gameStarted);

	// Tradução das dificuldades para português
	const difficultyLabels: Record<string, string> = {
		easy: "Fácil",
		medium: "Médio",
		hard: "Difícil",
	};

	return (
		<div
			style={{
				position: "absolute",
				top: "10px",
				right: "10px",
				background: "rgba(0, 0, 0, 0.7)",
				color: "white",
				padding: "10px",
				borderRadius: "5px",
				fontSize: "12px",
				maxWidth: "200px",
				zIndex: 1000,
				opacity: 0.8,
			}}
		>
			<div style={{ fontWeight: "bold", marginBottom: "8px", textAlign: "center" }}>
				Pontuação: {score}
			</div>
			<div style={{ marginBottom: "5px" }}>
				<span style={{ fontWeight: "bold" }}>Dificuldade:</span> {difficultyLabels[difficulty]}
			</div>
			<div style={{ marginBottom: "5px" }}>
				<span style={{ fontWeight: "bold" }}>Velocidade:</span> {Math.round(1000 / currentSpeed)} mov/s
			</div>
			{gameStarted && (
				<div style={{
					marginTop: "8px",
					padding: "4px 8px",
					background: isPaused ? "#ff9800" : "#4caf50",
					borderRadius: "4px",
					fontSize: "10px",
					fontWeight: "bold",
					textAlign: "center"
				}}>
					{isPaused ? "⏸️ PAUSADO" : "▶️ JOGANDO"}
				</div>
			)}
		</div>
	);
}

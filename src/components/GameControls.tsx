import { type Difficulty, useSnakeStore } from "../store";

export function GameControls() {
	const difficulty = useSnakeStore((s) => s.difficulty);
	const setDifficulty = useSnakeStore((s) => s.setDifficulty);
	const restart = useSnakeStore((s) => s.restart);
	const startGame = useSnakeStore((s) => s.startGame);
	const gameOver = useSnakeStore((s) => s.gameOver);
	const gameStarted = useSnakeStore((s) => s.gameStarted);
	const score = useSnakeStore((s) => s.score);

	// O jogo está ativo se foi iniciado, não está game over E tem pontuação > 0
	const isGameActive = gameStarted && !gameOver && score >= 0;
	const isFirstTime = !gameStarted && !gameOver;

	// Tradução das dificuldades para português
	const difficultyLabels: Record<Difficulty, string> = {
		easy: "Fácil",
		medium: "Médio",
		hard: "Difícil",
	};

	// Cores para os botões de dificuldade
	const difficultyColors: Record<Difficulty, string> = {
		easy: "#4caf50", // Verde
		medium: "#ff9800", // Laranja
		hard: "#f44336", // Vermelho
	};

	// Função para criar um botão de dificuldade
	const DifficultyButton = ({ level }: { level: Difficulty }) => (
		<button
			type="button"
			onClick={() => setDifficulty(level)}
			disabled={difficulty === level}
			style={{
				padding: "8px 16px",
				fontSize: 14,
				borderRadius: 4,
				border: "none",
				background: difficulty === level ? difficultyColors[level] : "#555",
				color: "#fff",
				fontWeight: "bold",
				cursor: difficulty === level ? "default" : "pointer",
				opacity: difficulty === level ? 1 : 0.8,
				margin: "0 4px",
			}}
		>
			{difficultyLabels[level]}
		</button>
	);

	// Se o jogo está ativo, não mostra nada
	if (isGameActive) {
		return null;
	}

	return (
		<div
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: gameOver ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.3)",
				zIndex: 10,
			}}
		>
			<div
				style={{
					background: "#222",
					borderRadius: 16,
					padding: 32,
					boxShadow: "0 4px 32px #000a",
					textAlign: "center",
					minWidth: "300px",
				}}
			>
				{gameOver ? (
					<>
						<div
							style={{
								color: "#ff5555",
								fontWeight: "bold",
								fontSize: 32,
								marginBottom: 12,
							}}
						>
							Game Over!
						</div>
						<div
							style={{
								color: "#fff",
								fontWeight: "normal",
								fontSize: 20,
								marginBottom: 24,
							}}
						>
							Pontuação final: {score}
						</div>
					</>
				) : (
					<>
						<div
							style={{
								color: "#fff",
								fontWeight: "bold",
								fontSize: 28,
								marginBottom: 24,
							}}
						>
							Snake 3D
						</div>
						{/* Seletor de Dificuldade */}
						<div style={{ marginBottom: 24 }}>
							<div
								style={{
									color: "#fff",
									fontSize: 16,
									fontWeight: "bold",
									marginBottom: 12,
								}}
							>
								Dificuldade:
							</div>
							<div>
								<DifficultyButton level="easy" />
								<DifficultyButton level="medium" />
								<DifficultyButton level="hard" />
							</div>
						</div>
					</>
				)}

				{/* Botão de Start/Restart */}
				<button
					type="button"
					onClick={isFirstTime ? startGame : restart}
					style={{
						padding: "12px 32px",
						fontSize: 18,
						borderRadius: 8,
						border: "none",
						background: "#4caf50",
						color: "#fff",
						fontWeight: "bold",
						cursor: "pointer",
						boxShadow: "0 2px 8px #0006",
					}}
				>
					{isFirstTime ? "Iniciar Jogo" : "Reiniciar (Enter / Space)"}
				</button>
			</div>
		</div>
	);
}

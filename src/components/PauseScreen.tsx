import { useSnakeStore } from "../store";

export function PauseScreen() {
	const isPaused = useSnakeStore((s) => s.isPaused);
	const togglePause = useSnakeStore((s) => s.togglePause);

	if (!isPaused) {
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
				background: "rgba(0,0,0,0.5)",
				zIndex: 15,
			}}
		>
			<div
				style={{
					background: "#222",
					borderRadius: 16,
					padding: 32,
					boxShadow: "0 4px 32px #000a",
					textAlign: "center",
				}}
			>
				<div
					style={{
						color: "#ff9800",
						fontWeight: "bold",
						fontSize: 32,
						marginBottom: 12,
					}}
				>
					⏸️ Jogo Pausado
				</div>
				<div
					style={{
						color: "#fff",
						fontWeight: "normal",
						fontSize: 16,
						marginBottom: 24,
					}}
				>
					Pressione o botão para continuar
				</div>
				<button
					type="button"
					onClick={togglePause}
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
					▶️ Continuar
				</button>
			</div>
		</div>
	);
}

import { useSnakeStore } from "../store";

export function GameOver() {
	const restart = useSnakeStore((s) => s.restart);
	const score = useSnakeStore((s) => s.score);

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
				background: "rgba(0,0,0,0.6)",
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
				}}
			>
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
				<button
					type="button"
					onClick={restart}
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
					Reiniciar (Enter / Space)
				</button>
			</div>
		</div>
	);
}

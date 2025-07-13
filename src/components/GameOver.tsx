import { useSnakeStore } from "../store";

export function GameOver() {
	const restart = useSnakeStore((s) => s.restart);

	return (
		<div style={{ color: "red", fontWeight: "bold", margin: 16 }}>
			Game Over!
			<button type="button" onClick={restart} style={{ marginLeft: 8 }}>
				Reiniciar
			</button>
		</div>
	);
}

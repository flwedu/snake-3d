import { useEffect } from "react";
import { useSnakeStore } from "../store";

export function getDirection(e: KeyboardEvent) {
	if (e.key === "ArrowUp") return "up";
	if (e.key === "ArrowDown") return "down";
	if (e.key === "ArrowLeft") return "left";
	if (e.key === "ArrowRight") return "right";
	return null;
}

export function useController() {
	const setDirection = useSnakeStore((s) => s.setDirection);

	// Controles de teclado
	useEffect(() => {
		function handleKey(e: KeyboardEvent) {
			const direction = getDirection(e);
			if (direction) setDirection(direction);
		}
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [setDirection]);
}

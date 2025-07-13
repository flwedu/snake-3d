import { useEffect } from "react";
import { type SnakeState, useSnakeStore } from "../store";

const directionMap: Record<KeyboardEvent["key"], SnakeState["direction"]> = {
	ArrowUp: "up",
	ArrowDown: "down",
	ArrowLeft: "left",
	ArrowRight: "right",
	KeyW: "up",
	KeyS: "down",
	KeyA: "left",
	KeyD: "right",
};

/**
 * Função para obter a direção a partir de um evento de teclado
 * @param e - Evento de teclado
 * @returns Direção correspondente ao evento, ou null se não houver correspondência
 */
export function getDirection(e: KeyboardEvent) {
	return directionMap[e.key] ?? null;
}

/**
 * Hook para controlar o movimento da cobra e detectar colisões
 * @param gameOver - Indica se o jogo está em estado de game over
 */
export function useControllerAndMovement(gameOver: boolean) {
	const setDirection = useSnakeStore((s) => s.setDirection);
	const moveSnake = useSnakeStore((s) => s.moveSnake);

	// Controles de teclado
	useEffect(() => {
		function handleKey(e: KeyboardEvent) {
			const direction = getDirection(e);
			if (direction) setDirection(direction as SnakeState["direction"]);
		}
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [setDirection]);

	// Movimento automático
	useEffect(() => {
		if (gameOver) return;
		const interval = setInterval(() => {
			moveSnake();
		}, 200);
		return () => clearInterval(interval);
	}, [moveSnake, gameOver]);
}

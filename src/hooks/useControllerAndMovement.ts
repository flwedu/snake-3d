import { useEffect } from "react";
import { type SnakeState, useSnakeStore } from "../store";

const directionMapKey: Record<string, SnakeState["direction"]> = {
	ArrowUp: "up",
	ArrowDown: "down",
	ArrowLeft: "left",
	ArrowRight: "right",
	w: "up",
	s: "down",
	a: "left",
	d: "right",
	W: "up",
	S: "down",
	A: "left",
	D: "right",
};
const directionMapCode: Record<string, SnakeState["direction"]> = {
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
	return directionMapKey[e.key] ?? directionMapCode[e.code] ?? null;
}

/**
 * Hook para controlar o movimento da cobra e detectar colisões
 * @param gameOver - Indica se o jogo está em estado de game over
 */
export function useControllerAndMovement(gameOver: boolean) {
	const setDirection = useSnakeStore((s) => s.setDirection);
	const moveSnake = useSnakeStore((s) => s.moveSnake);
	const restart = useSnakeStore((s) => s.restart);

	// Controles de teclado
	useEffect(() => {
		function handleKey(e: KeyboardEvent) {
			const direction = getDirection(e);
			if ((e.key === "Enter" || e.key === " ") && gameOver) {
				restart();
			}
			if (direction) {
				e.preventDefault();
				setDirection(direction as SnakeState["direction"]);
			}
		}
		window.addEventListener("keydown", handleKey, { passive: false });
		return () => window.removeEventListener("keydown", handleKey);
	}, [setDirection, gameOver, restart]);

	// Movimento automático
	useEffect(() => {
		if (gameOver) return;
		const interval = setInterval(() => {
			moveSnake();
		}, 200);
		return () => clearInterval(interval);
	}, [moveSnake, gameOver]);
}

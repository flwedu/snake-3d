import { create } from "zustand";

export type Position = [number, number];

interface SnakeState {
	gridSize: number;
	snake: Position[];
	direction: "up" | "down" | "left" | "right";
	food: Position;
	setDirection: (dir: SnakeState["direction"]) => void;
	moveSnake: () => void;
	placeFood: () => void;
}

export const useSnakeStore = create<SnakeState>((set, get) => ({
	gridSize: 15,
	snake: [
		[7, 7],
		[7, 6],
		[7, 5],
	],
	direction: "right",
	food: [10, 10],
	setDirection: (dir) => set({ direction: dir }),
	moveSnake: () => {
		// Lógica de movimentação será implementada depois
	},
	placeFood: () => {
		// Lógica de posicionar comida será implementada depois
	},
}));

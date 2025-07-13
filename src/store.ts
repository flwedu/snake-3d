import { create } from "zustand";

export type Position = {
	x: number;
	y: number;
};

export interface SnakeState {
	gridSize: number;
	snake: Position[];
	direction: "up" | "down" | "left" | "right";
	food: Position;
	gameOver: boolean;
	setDirection: (dir: SnakeState["direction"]) => void;
	moveSnake: () => void;
	placeFood: () => void;
	restart: () => void;
}

function getNextHead({ x, y }: Position, dir: SnakeState["direction"]): Position {
	switch (dir) {
		case "up":
			return { x, y: y + 1 };
		case "down":
			return { x, y: y - 1 };
		case "left":
			return { x: x - 1, y };
		case "right":
			return { x: x + 1, y };
	}
}

function positionsEqual(a: Position, b: Position) {
	return a.x === b.x && a.y === b.y;
}

function randomFood(gridSize: number, snake: Position[]): Position {
	let pos: Position;
	do {
		pos = {
			x: Math.floor(Math.random() * gridSize),
			y: Math.floor(Math.random() * gridSize),
		};
	} while (snake.some((s) => positionsEqual(s, pos)));
	return pos;
}

export const useSnakeStore = create<SnakeState>((set, get) => ({
	gridSize: 15,
	snake: [
		{ x: 7, y: 7 },
		{ x: 7, y: 6 },
		{ x: 7, y: 5 },
	],
	direction: "right",
	food: { x: 10, y: 10 },
	gameOver: false,
	setDirection: (dir) => {
		// Impede reversão direta
		const { direction } = get();
		if (
			(dir === "up" && direction === "down") ||
			(dir === "down" && direction === "up") ||
			(dir === "left" && direction === "right") ||
			(dir === "right" && direction === "left")
		) {
			return;
		}
		set({ direction: dir });
	},
	moveSnake: () => {
		const { snake, direction, gridSize, food, gameOver } = get();
		if (gameOver) return;
		const nextHead = getNextHead(snake[0], direction);
		// Colisão com borda (paredes)
		if (
			nextHead.x < 0 ||
			nextHead.x >= gridSize ||
			nextHead.y < 0 ||
			nextHead.y >= gridSize
		) {
			set({ gameOver: true });
			return;
		}
		// Colisão com o próprio corpo
		if (snake.some((s) => positionsEqual(s, nextHead))) {
			set({ gameOver: true });
			return;
		}
		let newSnake: Position[];
		let newFood = food;
		// Comer comida
		if (positionsEqual(nextHead, food)) {
			newSnake = [nextHead, ...snake];
			newFood = randomFood(gridSize, newSnake);
		} else {
			newSnake = [nextHead, ...snake.slice(0, -1)];
		}
		set({ snake: newSnake, food: newFood });
	},
	placeFood: () => {
		const { gridSize, snake } = get();
		set({ food: randomFood(gridSize, snake) });
	},
	restart: () => {
		set({
			snake: [
				{ x: 7, y: 7 },
				{ x: 7, y: 6 },
				{ x: 7, y: 5 },
			],
			direction: "right",
			food: { x: 10, y: 10 },
			gameOver: false,
		});
	},
}));

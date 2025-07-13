import { create } from "zustand";

export type Position = [number, number];

interface SnakeState {
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

function getNextHead([x, z]: Position, dir: SnakeState["direction"]): Position {
	switch (dir) {
		case "up":
			return [x, z - 1];
		case "down":
			return [x, z + 1];
		case "left":
			return [x - 1, z];
		case "right":
			return [x + 1, z];
	}
}

function positionsEqual(a: Position, b: Position) {
	return a[0] === b[0] && a[1] === b[1];
}

function randomFood(gridSize: number, snake: Position[]): Position {
	let pos: Position;
	do {
		pos = [
			Math.floor(Math.random() * gridSize),
			Math.floor(Math.random() * gridSize),
		];
	} while (snake.some((s) => positionsEqual(s, pos)));
	return pos;
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
		// Colisão com borda
		if (
			nextHead[0] < 0 ||
			nextHead[0] >= gridSize ||
			nextHead[1] < 0 ||
			nextHead[1] >= gridSize
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
				[7, 7],
				[7, 6],
				[7, 5],
			],
			direction: "right",
			food: [10, 10],
			gameOver: false,
		});
	},
}));

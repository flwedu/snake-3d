import { create } from "zustand";

export type Position = {
	x: number;
	y: number;
};

export type Difficulty = "easy" | "medium" | "hard";

// Velocidades base para cada nível de dificuldade (em ms)
export const DIFFICULTY_SPEEDS: Record<Difficulty, number> = {
	easy: 300,    // Mais lento
	medium: 200,  // Velocidade padrão
	hard: 100,    // Mais rápido
};

export interface SnakeState {
	gridSize: number;
	snake: Position[];
	direction: "up" | "down" | "left" | "right";
	food: Position;
	gameOver: boolean;
	score: number;
	difficulty: Difficulty;
	currentSpeed: number; // Velocidade atual (pode mudar com a pontuação)
	setDirection: (dir: SnakeState["direction"]) => void;
	moveSnake: () => void;
	placeFood: () => void;
	restart: () => void;
	setDifficulty: (difficulty: Difficulty) => void;
	calculateSpeed: () => number; // Calcula a velocidade com base na dificuldade e pontuação
}

function getNextHead(
	{ x, y }: Position,
	dir: SnakeState["direction"],
): Position {
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
	score: 0,
	difficulty: "medium", // Dificuldade padrão
	currentSpeed: DIFFICULTY_SPEEDS.medium, // Velocidade inicial baseada na dificuldade padrão
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
		const { snake, direction, gridSize, food, gameOver, score } = get();
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
		let newScore = score;
		let scoreChanged = false;

		// Comer comida
		if (positionsEqual(nextHead, food)) {
			newSnake = [nextHead, ...snake];
			newFood = randomFood(gridSize, newSnake);
			newScore = score + 1; // Incrementa pontuação
			scoreChanged = true;
		} else {
			newSnake = [nextHead, ...snake.slice(0, -1)];
		}

		set({ snake: newSnake, food: newFood, score: newScore });

		// Se a pontuação mudou, recalcula a velocidade
		if (scoreChanged) {
			const newSpeed = get().calculateSpeed();
			set({ currentSpeed: newSpeed });
		}
	},
	placeFood: () => {
		const { gridSize, snake } = get();
		set({ food: randomFood(gridSize, snake) });
	},
	setDifficulty: (difficulty) => {
		const baseSpeed = DIFFICULTY_SPEEDS[difficulty];
		set({
			difficulty,
			currentSpeed: baseSpeed
		});
	},

	calculateSpeed: () => {
		const { difficulty, score } = get();
		const baseSpeed = DIFFICULTY_SPEEDS[difficulty];

		// Aumenta a velocidade (diminui o intervalo) conforme a pontuação aumenta
		// A cada 5 pontos, aumenta a velocidade em 5%
		const speedMultiplier = Math.max(0.5, 1 - (Math.floor(score / 5) * 0.05));
		return Math.round(baseSpeed * speedMultiplier);
	},

	restart: () => {
		const { difficulty } = get();
		set({
			snake: [
				{ x: 7, y: 7 },
				{ x: 7, y: 6 },
				{ x: 7, y: 5 },
			],
			direction: "right",
			food: { x: 10, y: 10 },
			gameOver: false,
			score: 0,
			currentSpeed: DIFFICULTY_SPEEDS[difficulty] // Mantém a dificuldade atual, mas reinicia a velocidade
		});
	},
}));

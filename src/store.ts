import { create } from "zustand";

export type Position = {
	x: number;
	y: number;
};

export type Difficulty = "easy" | "medium" | "hard";

// Tipos de comida/power-ups
export type FoodType = "normal" | "golden" | "speed" | "invincible";

export interface FoodItem {
	position: Position;
	type: FoodType;
	expiresAt?: number; // Para power-ups temporários
}

// Efeitos temporários ativos
export interface ActiveEffects {
	speedBoost: {
		active: boolean;
		expiresAt: number;
		multiplier: number;
	};
	invincible: {
		active: boolean;
		expiresAt: number;
	};
}

// Velocidades base para cada nível de dificuldade (em ms)
export const DIFFICULTY_SPEEDS: Record<Difficulty, number> = {
	easy: 300,    // Mais lento
	medium: 200,  // Velocidade padrão
	hard: 100,    // Mais rápido
};

// Configurações dos power-ups
export const POWERUP_CONFIG = {
	golden: {
		points: 3, // Pontos extras
		spawnChance: 0.1, // 10% de chance
		duration: null, // Não expira
	},
	speed: {
		points: 1,
		spawnChance: 0.08, // 8% de chance
		duration: 5000, // 5 segundos
		speedMultiplier: 0.5, // 2x mais rápido
	},
	invincible: {
		points: 1,
		spawnChance: 0.05, // 5% de chance
		duration: 3000, // 3 segundos
	},
};

export interface SnakeState {
	gridSize: number;
	snake: Position[];
	direction: "up" | "down" | "left" | "right";
	food: FoodItem;
	gameOver: boolean;
	score: number;
	difficulty: Difficulty;
	currentSpeed: number; // Velocidade atual (pode mudar com a pontuação)
	activeEffects: ActiveEffects;
	setDirection: (dir: SnakeState["direction"]) => void;
	moveSnake: () => void;
	placeFood: () => void;
	restart: () => void;
	setDifficulty: (difficulty: Difficulty) => void;
	calculateSpeed: () => number; // Calcula a velocidade com base na dificuldade e pontuação
	updateEffects: () => void; // Atualiza efeitos temporários
	consumeFood: (foodType: FoodType) => void; // Consome power-up
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

function randomFoodType(): FoodType {
	const rand = Math.random();
	if (rand < POWERUP_CONFIG.golden.spawnChance) return "golden";
	if (rand < POWERUP_CONFIG.golden.spawnChance + POWERUP_CONFIG.speed.spawnChance) return "speed";
	if (rand < POWERUP_CONFIG.golden.spawnChance + POWERUP_CONFIG.speed.spawnChance + POWERUP_CONFIG.invincible.spawnChance) return "invincible";
	return "normal";
}

function createFoodItem(gridSize: number, snake: Position[]): FoodItem {
	const position = randomFood(gridSize, snake);
	const type = randomFoodType();

	let expiresAt: number | undefined;
	if (type === "speed") {
		expiresAt = Date.now() + POWERUP_CONFIG.speed.duration!;
	} else if (type === "invincible") {
		expiresAt = Date.now() + POWERUP_CONFIG.invincible.duration!;
	}

	return {
		position,
		type,
		expiresAt,
	};
}

export const useSnakeStore = create<SnakeState>((set, get) => ({
	gridSize: 15,
	snake: [
		{ x: 7, y: 7 },
		{ x: 7, y: 6 },
		{ x: 7, y: 5 },
	],
	direction: "right",
	food: { position: { x: 10, y: 10 }, type: "normal" },
	gameOver: false,
	score: 0,
	difficulty: "medium", // Dificuldade padrão
	currentSpeed: DIFFICULTY_SPEEDS.medium, // Velocidade inicial baseada na dificuldade padrão
	activeEffects: {
		speedBoost: {
			active: false,
			expiresAt: 0,
			multiplier: 1,
		},
		invincible: {
			active: false,
			expiresAt: 0,
		},
	},
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
		const { snake, direction, gridSize, food, gameOver, score, activeEffects } = get();
		if (gameOver) return;
		const nextHead = getNextHead(snake[0], direction);

		// Verificar colisões apenas se não estiver invencível
		if (!activeEffects.invincible.active) {
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
		} else {
			// Se invencível, atravessa as paredes (wrap around)
			if (nextHead.x < 0) nextHead.x = gridSize - 1;
			if (nextHead.x >= gridSize) nextHead.x = 0;
			if (nextHead.y < 0) nextHead.y = gridSize - 1;
			if (nextHead.y >= gridSize) nextHead.y = 0;
		}
		let newSnake: Position[];
		let newFood = food;
		let newScore = score;
		let scoreChanged = false;

		// Comer comida
		if (positionsEqual(nextHead, food.position)) {
			newSnake = [nextHead, ...snake];
			newFood = createFoodItem(gridSize, newSnake);
			newScore = score + 1; // Incrementa pontuação base
			scoreChanged = true;

			// Aplicar efeitos do power-up
			get().consumeFood(food.type);
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
		set({ food: createFoodItem(gridSize, snake) });
	},
	setDifficulty: (difficulty) => {
		const baseSpeed = DIFFICULTY_SPEEDS[difficulty];
		set({
			difficulty,
			currentSpeed: baseSpeed
		});
	},

	calculateSpeed: () => {
		const { difficulty, score, activeEffects } = get();
		const baseSpeed = DIFFICULTY_SPEEDS[difficulty];

		// Aumenta a velocidade (diminui o intervalo) conforme a pontuação aumenta
		// A cada 5 pontos, aumenta a velocidade em 5%
		let speedMultiplier = Math.max(0.5, 1 - (Math.floor(score / 5) * 0.05));

		// Aplicar boost de velocidade se ativo
		if (activeEffects.speedBoost.active) {
			speedMultiplier *= activeEffects.speedBoost.multiplier;
		}

		return Math.round(baseSpeed * speedMultiplier);
	},

	updateEffects: () => {
		const { activeEffects } = get();
		const now = Date.now();
		let updated = false;

		// Verificar se o boost de velocidade expirou
		if (activeEffects.speedBoost.active && now > activeEffects.speedBoost.expiresAt) {
			activeEffects.speedBoost.active = false;
			updated = true;
		}

		// Verificar se a invencibilidade expirou
		if (activeEffects.invincible.active && now > activeEffects.invincible.expiresAt) {
			activeEffects.invincible.active = false;
			updated = true;
		}

		if (updated) {
			set({ activeEffects: { ...activeEffects } });
			// Recalcular velocidade se necessário
			const newSpeed = get().calculateSpeed();
			set({ currentSpeed: newSpeed });
		}
	},

	consumeFood: (foodType) => {
		const { activeEffects, score } = get();
		const now = Date.now();
		let newScore = score;
		const newEffects = { ...activeEffects };

		switch (foodType) {
			case "golden":
				newScore += POWERUP_CONFIG.golden.points - 1; // -1 porque já ganhou 1 ponto base
				break;
			case "speed":
				newEffects.speedBoost = {
					active: true,
					expiresAt: now + POWERUP_CONFIG.speed.duration!,
					multiplier: POWERUP_CONFIG.speed.speedMultiplier,
				};
				break;
			case "invincible":
				newEffects.invincible = {
					active: true,
					expiresAt: now + POWERUP_CONFIG.invincible.duration!,
				};
				break;
		}

		set({
			score: newScore,
			activeEffects: newEffects
		});

		// Recalcular velocidade se necessário
		const newSpeed = get().calculateSpeed();
		set({ currentSpeed: newSpeed });
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
			food: { position: { x: 10, y: 10 }, type: "normal" },
			gameOver: false,
			score: 0,
			currentSpeed: DIFFICULTY_SPEEDS[difficulty], // Mantém a dificuldade atual, mas reinicia a velocidade
			activeEffects: {
				speedBoost: {
					active: false,
					expiresAt: 0,
					multiplier: 1,
				},
				invincible: {
					active: false,
					expiresAt: 0,
				},
			},
		});
	},
}));

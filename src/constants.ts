import type { Difficulty } from "./store";

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

// Configurações do jogo
export const GAME_CONFIG = {
	gridSize: 15,
	initialSnake: [
		{ x: 7, y: 7 },
		{ x: 7, y: 6 },
		{ x: 7, y: 5 },
	],
	initialFood: { x: 10, y: 10 },
	defaultDifficulty: "medium" as Difficulty,
};

// Configurações visuais
export const VISUAL_CONFIG = {
	food: {
		normal: {
			color: "#ff6b6b",
			emissive: "#ff4757",
			scale: 1.0,
			rotationSpeed: 2,
			pulseSpeed: 3,
		},
		golden: {
			color: "#ffd700",
			emissive: "#ffed4e",
			scale: 1.2,
			rotationSpeed: 3,
			pulseSpeed: 4,
		},
		speed: {
			color: "#00ff00",
			emissive: "#4eff4e",
			scale: 1.1,
			rotationSpeed: 4,
			pulseSpeed: 5,
		},
		invincible: {
			color: "#ff00ff",
			emissive: "#ff4eff",
			scale: 1.1,
			rotationSpeed: 5,
			pulseSpeed: 6,
		},
	},
	snake: {
		normal: {
			headColor: "#1abc9c",
			bodyColor: "#27ae60",
			headEmissive: 0.3,
			bodyEmissive: 0.1,
		},
		invincible: {
			color: "#ff00ff",
			emissive: 0.8,
		},
	},
};

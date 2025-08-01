import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { CanvasTexture, Color } from "three";
import { VISUAL_CONFIG } from "../constants";
import { useSnakeStore } from "../store";

export function Snake() {
	const snake = useSnakeStore((s) => s.snake);
	const gameOver = useSnakeStore((s) => s.gameOver);
	const activeEffects = useSnakeStore((s) => s.activeEffects);
	const prevSnakeLength = useRef(snake.length);
	const [growAnim, setGrowAnim] = useState(false);
	const [blink, setBlink] = useState(false);
	const [_, setBlinkTime] = useState(0);
	const headRef = useRef<any>(null);

	// Detecta crescimento
	useEffect(() => {
		if (snake.length > prevSnakeLength.current) {
			setGrowAnim(true);
			setTimeout(() => setGrowAnim(false), 250); // Duração da animação
		}
		prevSnakeLength.current = snake.length;
	}, [snake.length]);

	// Efeito de piscar ao morrer
	useEffect(() => {
		if (gameOver) {
			setBlinkTime(0);
			setBlink(false);
		}
	}, [gameOver]);

	useFrame((state, delta) => {
		if (gameOver) {
			setBlinkTime((t) => {
				const next = t + delta;
				if (next < 1.5) {
					setBlink(Math.floor(next * 8) % 2 === 0);
				} else {
					setBlink(false);
				}
				return next;
			});
		}

		// Efeito de invencibilidade - rotação e brilho
		if (activeEffects.invincible.active && headRef.current) {
			headRef.current.rotation.y += delta * 3;
			const t = state.clock.getElapsedTime();
			const pulse = 0.5 + 0.3 * Math.sin(t * 8);
			headRef.current.material.emissiveIntensity = pulse;
		}
	});

	// Criar textura procedural para a cobra
	const snakeTexture = useMemo(() => {
		const canvas = document.createElement("canvas");
		canvas.width = 256;
		canvas.height = 256;
		const ctx = canvas.getContext("2d")!;

		// Gradiente base verde
		const gradient = ctx.createLinearGradient(0, 0, 256, 256);
		gradient.addColorStop(0, "#2ecc71");
		gradient.addColorStop(0.5, "#27ae60");
		gradient.addColorStop(1, "#16a085");

		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, 256, 256);

		// Padrão de escamas
		for (let row = 0; row < 8; row++) {
			for (let col = 0; col < 8; col++) {
				const x = col * 32;
				const y = row * 32;
				const size = 28;

				// Escama individual
				ctx.beginPath();
				ctx.ellipse(x + 16, y + 16, size / 2, size / 3, 0, 0, Math.PI * 2);
				ctx.fillStyle = "rgba(46, 204, 113, 0.8)";
				ctx.fill();

				// Borda da escama
				ctx.beginPath();
				ctx.ellipse(x + 16, y + 16, size / 2, size / 3, 0, 0, Math.PI * 2);
				ctx.strokeStyle = "rgba(22, 160, 133, 0.6)";
				ctx.lineWidth = 2;
				ctx.stroke();

				// Brilho na escama
				ctx.beginPath();
				ctx.ellipse(x + 12, y + 12, size / 4, size / 6, 0, 0, Math.PI * 2);
				ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
				ctx.fill();
			}
		}

		// Adicionar ruído sutil
		for (let i = 0; i < 500; i++) {
			const x = Math.random() * 256;
			const y = Math.random() * 256;
			const radius = Math.random() * 2 + 1;
			const alpha = Math.random() * 0.2 + 0.1;

			ctx.beginPath();
			ctx.arc(x, y, radius, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
			ctx.fill();
		}

		return new CanvasTexture(canvas);
	}, []);

	// Textura especial para a cabeça
	const headTexture = useMemo(() => {
		const canvas = document.createElement("canvas");
		canvas.width = 256;
		canvas.height = 256;
		const ctx = canvas.getContext("2d")!;

		// Gradiente mais escuro para a cabeça
		const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
		gradient.addColorStop(0, "#1abc9c");
		gradient.addColorStop(0.7, "#16a085");
		gradient.addColorStop(1, "#0e6655");

		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, 256, 256);

		// Olhos
		ctx.fillStyle = "#2c3e50";
		ctx.beginPath();
		ctx.arc(80, 80, 8, 0, Math.PI * 2);
		ctx.fill();
		ctx.beginPath();
		ctx.arc(176, 80, 8, 0, Math.PI * 2);
		ctx.fill();

		// Brilho nos olhos
		ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
		ctx.beginPath();
		ctx.arc(76, 76, 3, 0, Math.PI * 2);
		ctx.fill();
		ctx.beginPath();
		ctx.arc(172, 76, 3, 0, Math.PI * 2);
		ctx.fill();

		// Brilho geral
		const highlight = ctx.createRadialGradient(60, 60, 0, 60, 60, 80);
		highlight.addColorStop(0, "rgba(255, 255, 255, 0.4)");
		highlight.addColorStop(1, "rgba(255, 255, 255, 0)");
		ctx.fillStyle = highlight;
		ctx.fillRect(0, 0, 256, 256);

		return new CanvasTexture(canvas);
	}, []);

	return (
		<group>
			{snake.map(({ x, y }, index) => {
				const isHead = index === 0;
				const texture = isHead ? headTexture : snakeTexture;
				const ref = isHead ? headRef : undefined;

				// Animação de crescimento na cabeça
				let scale = 1;
				if (isHead && growAnim) {
					scale = 1.4;
				}

				// Efeito de piscar
				const visible = !gameOver || blink;

				// Efeito de invencibilidade
				const isInvincible = activeEffects.invincible.active;
				const invincibleColor = isInvincible
					? new Color(VISUAL_CONFIG.snake.invincible.color)
					: (isHead ? new Color(VISUAL_CONFIG.snake.normal.headColor) : new Color(VISUAL_CONFIG.snake.normal.bodyColor));
				const invincibleIntensity = isInvincible
					? VISUAL_CONFIG.snake.invincible.emissive
					: (isHead ? VISUAL_CONFIG.snake.normal.headEmissive : VISUAL_CONFIG.snake.normal.bodyEmissive);

				return (
					<mesh
						key={`${x},${y}`}
						position={[x + 0.5, y + 0.5, 0.5]}
						castShadow
						receiveShadow
						ref={ref}
						scale={isHead ? [scale, scale, scale] : [1, 1, 1]}
						visible={visible}
					>
						<boxGeometry args={[1, 1, 1]} />
						<meshStandardMaterial
							map={texture}
							roughness={0.4}
							metalness={0.2}
							emissive={invincibleColor}
							emissiveIntensity={invincibleIntensity}
						/>
					</mesh>
				);
			})}
		</group>
	);
}

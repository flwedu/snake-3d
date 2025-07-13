import { useMemo } from "react";
import { CanvasTexture, Color } from "three";
import { useSnakeStore } from "../store";

export function Snake() {
	const snake = useSnakeStore((s) => s.snake);

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

				return (
					<mesh key={`${x},${y}`} position={[x + 0.5, y + 0.5, 0.5]}>
						<boxGeometry args={[1, 1, 1]} />
						<meshStandardMaterial
							map={texture}
							roughness={0.4}
							metalness={0.2}
							emissive={isHead ? new Color("#1abc9c") : new Color("#27ae60")}
							emissiveIntensity={isHead ? 0.3 : 0.1}
						/>
					</mesh>
				);
			})}
		</group>
	);
}

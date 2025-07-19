import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { CanvasTexture, Color, type Mesh } from "three";
import { VISUAL_CONFIG } from "../constants";
import { useSnakeStore } from "../store";

export function Food() {
	const food = useSnakeStore((s) => s.food);
	const { position: { x, y }, type } = food;
	const meshRef = useRef<Mesh>(null);

	// Configurações visuais para cada tipo de comida
	const foodConfig = useMemo(() => {
		switch (type) {
			case "golden":
				return VISUAL_CONFIG.food.golden;
			case "speed":
				return VISUAL_CONFIG.food.speed;
			case "invincible":
				return VISUAL_CONFIG.food.invincible;
			default: // normal
				return VISUAL_CONFIG.food.normal;
		}
	}, [type]);

	// Criar textura procedural baseada no tipo
	const texture = useMemo(() => {
		const canvas = document.createElement("canvas");
		canvas.width = 256;
		canvas.height = 256;
		const ctx = canvas.getContext("2d")!;

		// Gradiente base
		const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
		gradient.addColorStop(0, foodConfig.color);
		gradient.addColorStop(0.5, foodConfig.color);
		gradient.addColorStop(1, new Color(foodConfig.color).multiplyScalar(0.7).getHexString());

		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, 256, 256);

		// Adicionar detalhes com ruído
		for (let i = 0; i < 1000; i++) {
			const x = Math.random() * 256;
			const y = Math.random() * 256;
			const radius = Math.random() * 3 + 1;
			const alpha = Math.random() * 0.3 + 0.1;

			ctx.beginPath();
			ctx.arc(x, y, radius, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
			ctx.fill();
		}

		// Adicionar brilho
		const highlight = ctx.createRadialGradient(80, 80, 0, 80, 80, 60);
		highlight.addColorStop(0, "rgba(255, 255, 255, 0.8)");
		highlight.addColorStop(1, "rgba(255, 255, 255, 0)");
		ctx.fillStyle = highlight;
		ctx.fillRect(0, 0, 256, 256);

		// Adicionar símbolos especiais para power-ups
		if (type !== "normal") {
			ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
			ctx.font = "bold 120px Arial";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";

			let symbol = "";
			switch (type) {
				case "golden":
					symbol = "★";
					break;
				case "speed":
					symbol = "⚡";
					break;
				case "invincible":
					symbol = "🛡️";
					break;
			}

			ctx.fillText(symbol, 128, 128);
		}

		return new CanvasTexture(canvas);
	}, [type, foodConfig.color]);

	useFrame((state, delta) => {
		if (meshRef.current) {
			meshRef.current.rotation.y += delta * foodConfig.rotationSpeed;
			// Animação de pulso
			const t = state.clock.getElapsedTime();
			const scale = foodConfig.scale + 0.15 * Math.sin(t * foodConfig.pulseSpeed);
			meshRef.current.scale.set(scale, scale, scale);
		}
	});

	return (
		<mesh
			ref={meshRef}
			position={[x + 0.5, y + 0.5, 0.5]}
			castShadow
			receiveShadow
		>
			<sphereGeometry args={[0.5, 32, 32]} />
			<meshStandardMaterial
				map={texture}
				roughness={0.15}
				metalness={0.3}
				emissive={new Color(foodConfig.emissive)}
				emissiveIntensity={0.5}
			/>
		</mesh>
	);
}

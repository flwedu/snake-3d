import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { CanvasTexture, Color, type Mesh } from "three";
import { useSnakeStore } from "../store";

export function Food() {
	const food = useSnakeStore((s) => s.food);
	const { x, y } = food;
	const meshRef = useRef<Mesh>(null);

	// Criar textura procedural
	const texture = useMemo(() => {
		const canvas = document.createElement("canvas");
		canvas.width = 256;
		canvas.height = 256;
		const ctx = canvas.getContext("2d")!;

		// Gradiente base
		const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
		gradient.addColorStop(0, "#ff6b6b");
		gradient.addColorStop(0.5, "#e74c3c");
		gradient.addColorStop(1, "#c0392b");

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

		return new CanvasTexture(canvas);
	}, []);

	useFrame((state, delta) => {
		if (meshRef.current) {
			meshRef.current.rotation.y += delta * 2; // Rotação de 2 radianos por segundo
			// Animação de pulso
			const t = state.clock.getElapsedTime();
			const scale = 1 + 0.15 * Math.sin(t * 3);
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
				emissive={new Color("#ff4757")}
				emissiveIntensity={0.5}
			/>
		</mesh>
	);
}

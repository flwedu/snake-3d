import * as THREE from "three";
import { useSnakeStore } from "../store";

export function Walls() {
	const gridSize = useSnakeStore((s) => s.gridSize);

	// Criar textura de tijolos
	const createBrickTexture = () => {
		const canvas = document.createElement('canvas');
		canvas.width = 256;
		canvas.height = 128;
		const ctx = canvas.getContext('2d')!;

		// Cor base dos tijolos
		ctx.fillStyle = '#8B4513'; // Marrom tijolo
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Desenhar tijolos
		const brickWidth = 32;
		const brickHeight = 16;
		const mortarGap = 2;

		ctx.fillStyle = '#A0522D'; // Cor mais escura para variação
		ctx.strokeStyle = '#654321'; // Cor da argamassa
		ctx.lineWidth = mortarGap;

		for (let row = 0; row < canvas.height / brickHeight; row++) {
			for (let col = 0; col < canvas.width / brickWidth; col++) {
				const x = col * brickWidth;
				const y = row * brickHeight;

				// Alternar posição dos tijolos em linhas alternadas
				const offset = row % 2 === 0 ? 0 : brickWidth / 2;
				const adjustedX = x + offset;

				if (adjustedX < canvas.width) {
					ctx.fillRect(adjustedX + mortarGap/2, y + mortarGap/2, brickWidth - mortarGap, brickHeight - mortarGap);
					ctx.strokeRect(adjustedX + mortarGap/2, y + mortarGap/2, brickWidth - mortarGap, brickHeight - mortarGap);
				}
			}
		}

		const texture = new THREE.CanvasTexture(canvas);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(4, 2);

		return texture;
	};

	const brickTexture = createBrickTexture();
	const brickMaterial = new THREE.MeshStandardMaterial({
		map: brickTexture,
		roughness: 0.8,
		metalness: 0.1
	});

	// Altura das paredes
	const wallHeight = 0.5; // Espessura no eixo Z
	const wallThickness = 0.5;
	const wallLength = gridSize + wallThickness + 1;
	const wallDepth = 1; // Altura visual da parede

	// Posições das paredes (agora no plano X-Y, Z fixo)
	const walls = [
		// Parede inferior (y = -0.5)
		{
			position: [gridSize / 2, -0.5, wallHeight / 2],
			scale: [wallLength, wallDepth, wallHeight],
		},
		// Parede superior (y = gridSize + 0.5)
		{
			position: [gridSize / 2, gridSize + 0.5, wallHeight / 2],
			scale: [wallLength, wallDepth, wallHeight],
		},
		// Parede esquerda (x = -0.5)
		{
			position: [-0.5, gridSize / 2, wallHeight / 2],
			scale: [wallDepth, wallLength, wallHeight],
		},
		// Parede direita (x = gridSize + 0.5)
		{
			position: [gridSize + 0.5, gridSize / 2, wallHeight / 2],
			scale: [wallDepth, wallLength, wallHeight],
		},
	];

	return (
		<group>
			{walls.map((wall, index) => (
				<mesh key={`wall-${index}-${wall.position.join('-')}`} position={wall.position as [number, number, number]}>
					<boxGeometry args={wall.scale as [number, number, number]} />
					<primitive object={brickMaterial} attach="material" />
				</mesh>
			))}
		</group>
	);
}

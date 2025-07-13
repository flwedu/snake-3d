import * as THREE from "three";
import { useSnakeStore } from "../store";

export function Grid() {
	const gridSize = useSnakeStore((s) => s.gridSize);

	// Renderiza linhas do grid
	const lines = [];
	for (let i = 0; i <= gridSize; i++) {
		lines.push(
			<line key={`h-${i}`}>
				<bufferGeometry>
					<primitive
						object={
							new THREE.BufferAttribute(
								new Float32Array([0, i, 0, gridSize, i, 0]),
								3,
							)
						}
						attach="attributes-position"
					/>
				</bufferGeometry>
				<lineBasicMaterial color="#444" />
			</line>,
		);
		lines.push(
			<line key={`v-${i}`}>
				<bufferGeometry>
					<primitive
						object={
							new THREE.BufferAttribute(
								new Float32Array([i, 0, 0, i, gridSize, 0]),
								3,
							)
						}
						attach="attributes-position"
					/>
				</bufferGeometry>
				<lineBasicMaterial color="#444" />
			</line>,
		);
	}

	return <group receiveShadow>{lines}</group>;
}

import React from "react";
import { VISUAL_CONFIG } from "../constants";

export function PowerUpInfo() {
	return (
		<div style={{
			position: "absolute",
			bottom: "10px",
			left: "10px",
			background: "rgba(0, 0, 0, 0.7)",
			color: "white",
			padding: "10px",
			borderRadius: "5px",
			fontSize: "12px",
			maxWidth: "200px",
			zIndex: 1000
		}}>
			<div style={{ fontWeight: "bold", marginBottom: "5px" }}>Power-ups:</div>
			<div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "3px" }}>
				<span style={{ color: VISUAL_CONFIG.food.golden.color }}>★</span> Dourado: +3 pontos
			</div>
			<div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "3px" }}>
				<span style={{ color: VISUAL_CONFIG.food.speed.color }}>⚡</span> Velocidade: 2x por 5s
			</div>
			<div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
				<span style={{ color: VISUAL_CONFIG.food.invincible.color }}>🛡️</span> Invencível: 3s
			</div>
		</div>
	);
}

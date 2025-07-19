import React from "react";
import { VISUAL_CONFIG } from "../constants";
import { useSnakeStore } from "../store";

export function ActiveEffects() {
	const activeEffects = useSnakeStore((s) => s.activeEffects);

	const getTimeRemaining = (expiresAt: number) => {
		const remaining = Math.max(0, expiresAt - Date.now());
		return Math.ceil(remaining / 1000);
	};

	return (
		<div style={{
			position: "absolute",
			top: "10px",
			right: "10px",
			display: "flex",
			flexDirection: "column",
			gap: "5px",
			zIndex: 1000
		}}>
			{activeEffects.speedBoost.active && (
				<div style={{
					background: `${VISUAL_CONFIG.food.speed.color}cc`,
					color: "white",
					padding: "5px 10px",
					borderRadius: "5px",
					fontSize: "12px",
					fontWeight: "bold",
					display: "flex",
					alignItems: "center",
					gap: "5px"
				}}>
					⚡ Velocidade: {getTimeRemaining(activeEffects.speedBoost.expiresAt)}s
				</div>
			)}
			{activeEffects.invincible.active && (
				<div style={{
					background: `${VISUAL_CONFIG.food.invincible.color}cc`,
					color: "white",
					padding: "5px 10px",
					borderRadius: "5px",
					fontSize: "12px",
					fontWeight: "bold",
					display: "flex",
					alignItems: "center",
					gap: "5px"
				}}>
					🛡️ Invencível: {getTimeRemaining(activeEffects.invincible.expiresAt)}s
				</div>
			)}
		</div>
	);
}

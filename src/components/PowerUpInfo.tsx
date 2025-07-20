import { VISUAL_CONFIG } from "../constants";
import { useSnakeStore } from "../store";

export function PowerUpInfo() {
	const activeEffects = useSnakeStore((s) => s.activeEffects);

	const getTimeRemaining = (expiresAt: number) => {
		const remaining = Math.max(0, expiresAt - Date.now());
		return Math.ceil(remaining / 1000);
	};

	const isSpeedActive = activeEffects.speedBoost.active;
	const isInvincibleActive = activeEffects.invincible.active;

	return (
		<div
			style={{
				position: "absolute",
				top: "10px",
				left: "10px",
				background: "rgba(0, 0, 0, 0.7)",
				color: "white",
				padding: "10px",
				borderRadius: "5px",
				fontSize: "12px",
				maxWidth: "200px",
				zIndex: 1000,
				opacity: 0.8,
			}}
		>
			<div style={{ fontWeight: "bold", marginBottom: "5px" }}>Power-ups:</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "5px",
					marginBottom: "3px",
					opacity: isSpeedActive ? 1 : 0.6,
					fontWeight: isSpeedActive ? "bold" : "normal",
					background: isSpeedActive ? `${VISUAL_CONFIG.food.speed.color}33` : "transparent",
					padding: isSpeedActive ? "2px 4px" : "0",
					borderRadius: isSpeedActive ? "3px" : "0",
				}}
			>
				<span style={{ color: VISUAL_CONFIG.food.speed.color }}>⚡</span>{" "}
				Velocidade: 2x por 5s
				{isSpeedActive && (
					<span style={{ marginLeft: "auto", fontSize: "10px" }}>
						({getTimeRemaining(activeEffects.speedBoost.expiresAt)}s)
					</span>
				)}
			</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "5px",
					marginBottom: "3px",
					opacity: isInvincibleActive ? 1 : 0.6,
					fontWeight: isInvincibleActive ? "bold" : "normal",
					background: isInvincibleActive ? `${VISUAL_CONFIG.food.invincible.color}33` : "transparent",
					padding: isInvincibleActive ? "2px 4px" : "0",
					borderRadius: isInvincibleActive ? "3px" : "0",
				}}
			>
				<span style={{ color: VISUAL_CONFIG.food.invincible.color }}>🛡️</span>{" "}
				Invencível: 3s
				{isInvincibleActive && (
					<span style={{ marginLeft: "auto", fontSize: "10px" }}>
						({getTimeRemaining(activeEffects.invincible.expiresAt)}s)
					</span>
				)}
			</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "5px",
					opacity: 0.6,
				}}
			>
				<span style={{ color: VISUAL_CONFIG.food.golden.color }}>★</span>{" "}
				Dourado: +3 pontos
			</div>
		</div>
	);
}

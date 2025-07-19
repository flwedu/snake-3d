import { type Difficulty, useSnakeStore } from "../store";

export function DifficultySelector() {
  const difficulty = useSnakeStore((s) => s.difficulty);
  const setDifficulty = useSnakeStore((s) => s.setDifficulty);
  const gameOver = useSnakeStore((s) => s.gameOver);

  // Tradução das dificuldades para português
  const difficultyLabels: Record<Difficulty, string> = {
    easy: "Fácil",
    medium: "Médio",
    hard: "Difícil",
  };

  // Cores para os botões de dificuldade
  const difficultyColors: Record<Difficulty, string> = {
    easy: "#4caf50", // Verde
    medium: "#ff9800", // Laranja
    hard: "#f44336", // Vermelho
  };

  // Função para criar um botão de dificuldade
  const DifficultyButton = ({ level }: { level: Difficulty }) => (
    <button
      type="button"
      onClick={() => setDifficulty(level)}
      disabled={!gameOver && difficulty === level}
      style={{
        padding: "8px 16px",
        fontSize: 14,
        borderRadius: 4,
        border: "none",
        background: difficulty === level ? difficultyColors[level] : "#555",
        color: "#fff",
        fontWeight: "bold",
        cursor: difficulty === level ? "default" : "pointer",
        opacity: difficulty === level ? 1 : 0.8,
        margin: "0 4px",
      }}
    >
      {difficultyLabels[level]}
    </button>
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "8px 0",
      }}
    >
      <div
        style={{
          marginRight: 12,
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        Dificuldade:
      </div>
      <div>
        <DifficultyButton level="easy" />
        <DifficultyButton level="medium" />
        <DifficultyButton level="hard" />
      </div>
    </div>
  );
}

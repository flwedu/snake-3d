# Snake 3D 🐍

Um jogo Snake 3D feito com `React`, `zustand` e `@react-three/fiber`.

Controle a cobra com as setas do teclado e tente alcançar a pontuação máxima!

## Tecnologias Utilizadas 🧑‍💻

- [React](https://react.dev/) - Biblioteca JavaScript para construção de interfaces de usuário
- [Vite](https://vitejs.dev/) - Ferramenta de build para projetos web
- [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) - Biblioteca para criar experiências 3D em React
- [Three.js](https://threejs.org/) - Biblioteca JavaScript para criação de gráficos 3D
- [Zustand](https://zustand-demo.pmnd.rs/) - Biblioteca para gerenciamento de estado

## Instalação e Execução 🚀

1. Instale as dependências:

   ```sh
   pnpm install
   # ou
   npm install
   ```

2. Rode o projeto em modo desenvolvimento:

   ```sh
   pnpm dev
   # ou
   npm run dev
   ```

3. Acesse [http://localhost:5173](http://localhost:5173) no navegador.

## Como Jogar 🕹️

- Use as **setas do teclado** para controlar a direção da cobra (Ou W, A, S, D)
- Coma a comida para crescer e ganhar pontos
- O jogo termina ao colidir com as paredes ou com o próprio corpo
- Clique em **Reiniciar** para jogar novamente após o game over

## Personalização 🎨

- Para alterar o tamanho do grid, edite o valor de `gridSize` em `src/store.ts`.
- Os efeitos visuais podem ser ajustados em `src/components/Food.tsx` e `src/components/Snake.tsx`.

## Créditos 💖

Desenvolvido por [@flwed](https://github.com/flwed).

---

Sinta-se à vontade para contribuir, sugerir melhorias ou usar este projeto como base para outros jogos 3D!

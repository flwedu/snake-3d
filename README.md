# Snake 3D

Um jogo Snake 3D feito com React, Vite e react-three-fiber.

## Demonstração

Jogue em 3D, controle a cobra com as setas do teclado, tente bater seu recorde e aproveite os efeitos visuais!

## Tecnologias Utilizadas
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [Three.js](https://threejs.org/)
- [Zustand](https://zustand-demo.pmnd.rs/) para gerenciamento de estado

## Instalação e Execução

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

## Como Jogar
- Use as **setas do teclado** para controlar a direção da cobra.
- Coma a comida para crescer e ganhar pontos.
- O jogo termina ao colidir com as paredes ou com o próprio corpo.
- Clique em **Reiniciar** para jogar novamente após o game over.

## Efeitos Visuais
- Comida com animação de pulso e brilho
- Sombras suaves e iluminação aprimorada
- Efeito de crescimento ao comer
- Cobra pisca ao morrer

## Personalização
- Para alterar o tamanho do grid, edite o valor de `gridSize` em `src/store.ts`.
- Os efeitos visuais podem ser ajustados em `src/components/Food.tsx` e `src/components/Snake.tsx`.

## Créditos
Desenvolvido por [@flwed](https://github.com/flwed).

---
Sinta-se à vontade para contribuir, sugerir melhorias ou usar este projeto como base para outros jogos 3D!

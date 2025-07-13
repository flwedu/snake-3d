# Etapas para Construção do Snake 3D com React

1. **Inicializar projeto React com Vite e TypeScript** ✅
   - Criar o projeto base usando Vite com template React + TypeScript.

2. **Adicionar e configurar biblioteca de renderização 3D** ✅
   - Instalar e configurar Three.js ou react-three-fiber para renderização 3D.

3. **Criar estrutura básica do jogo Snake** ✅
   - Implementar grid, cobra e comida como componentes React.

4. **Implementar renderização 3D da cobra, comida e grid** ✅
   - Utilizar a biblioteca 3D para exibir os elementos do jogo em 3D.

5. **Adicionar lógica de movimentação da cobra e detecção de colisão** ✅
   - Programar o movimento da cobra, crescimento ao comer e colisões.

6. **Adicionar controles de teclado para movimentação da cobra** ✅
   - Permitir que o jogador controle a cobra usando o teclado.

7. **Implementar sistema de pontuação e reinício do jogo** ✅
   - Exibir pontuação e permitir reiniciar após o game over.

8. **Aprimorar visual e adicionar efeitos visuais 3D** ✅
   - Comida com animação de pulso e brilho
   - Sombras suaves e iluminação aprimorada
   - Efeito de crescimento ao comer
   - Cobra pisca ao morrer

9. **Documentar etapas e instruções** 🚩
   - Todas as etapas acima foram implementadas.
   - Para rodar o projeto:
     1. Instale as dependências: `pnpm install` (ou `npm install`)
     2. Rode o projeto: `pnpm dev` (ou `npm run dev`)
   - Use as setas do teclado para controlar a cobra.
   - Ao morrer, clique em "Reiniciar" para jogar novamente.
   - Experimente comer a comida e observe os efeitos visuais!

---

**Observações:**
- O código está modularizado em componentes React para fácil manutenção.
- Os efeitos visuais podem ser ajustados em `src/components/Food.tsx` e `src/components/Snake.tsx`.
- Para personalizar o grid, altere o valor de `gridSize` em `src/store.ts`.

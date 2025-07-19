# Power-ups do Snake 3D

## Visão Geral

O jogo Snake 3D agora inclui um sistema de power-ups que adiciona elementos estratégicos e visuais ao gameplay. Os power-ups aparecem aleatoriamente no grid e oferecem diferentes benefícios temporários ou permanentes.

## Tipos de Power-ups

### 1. Comida Dourada (★)
- **Cor**: Dourado (#ffd700)
- **Símbolo**: ★
- **Efeito**: +3 pontos extras (total de 4 pontos)
- **Duração**: Permanente
- **Chance de spawn**: 10%

### 2. Comida de Velocidade (⚡)
- **Cor**: Verde (#00ff00)
- **Símbolo**: ⚡
- **Efeito**: Dobra a velocidade do jogo
- **Duração**: 5 segundos
- **Chance de spawn**: 8%
- **Indicador visual**: Contador no canto superior direito

### 3. Comida de Invencibilidade (🛡️)
- **Cor**: Magenta (#ff00ff)
- **Símbolo**: 🛡️
- **Efeito**: Permite atravessar paredes e o próprio corpo
- **Duração**: 3 segundos
- **Chance de spawn**: 5%
- **Indicador visual**:
  - Contador no canto superior direito
  - Cobra fica rosa e brilha
  - Cabeça gira continuamente

## Interface do Usuário

### Indicadores de Efeitos Ativos
- **Localização**: Canto superior direito da tela
- **Formato**: Caixas coloridas com ícone e contador regressivo
- **Cores**:
  - Verde para velocidade
  - Magenta para invencibilidade

### Guia de Power-ups
- **Localização**: Canto inferior esquerdo da tela
- **Conteúdo**: Lista de todos os power-ups disponíveis com descrições

## Mecânicas Técnicas

### Sistema de Spawn
- Power-ups aparecem aleatoriamente após comer qualquer comida
- Cada tipo tem uma chance específica de spawn
- Power-ups normais (vermelhos) sempre aparecem se nenhum power-up especial for selecionado

### Efeitos Visuais
- **Comida Dourada**: Maior escala, rotação mais rápida
- **Comida de Velocidade**: Escala aumentada, rotação muito rápida
- **Comida de Invencibilidade**: Escala aumentada, rotação mais rápida

### Sistema de Duração
- Efeitos temporários são verificados a cada 100ms
- Quando expiram, a velocidade é recalculada automaticamente
- Efeitos visuais são removidos imediatamente

## Estratégias de Jogo

### Comida Dourada
- Priorize quando estiver próximo de recordes
- Útil para aumentar pontuação rapidamente

### Comida de Velocidade
- Use com cuidado - pode tornar o jogo muito difícil
- Ideal quando você tem espaço livre para manobrar
- Combine com invencibilidade para máxima eficiência

### Comida de Invencibilidade
- Use para escapar de situações difíceis
- Permite atravessar o próprio corpo para estratégias avançadas
- Útil para alcançar comida em locais de difícil acesso

## Configurações

As configurações dos power-ups podem ser ajustadas no arquivo `src/constants.ts`:

```typescript
export const POWERUP_CONFIG = {
	golden: {
		points: 3,
		spawnChance: 0.1,
		duration: null,
	},
	speed: {
		points: 1,
		spawnChance: 0.08,
		duration: 5000,
		speedMultiplier: 0.5,
	},
	invincible: {
		points: 1,
		spawnChance: 0.05,
		duration: 3000,
	},
};
```

## Futuras Melhorias

- [ ] Efeitos sonoros para cada power-up
- [ ] Animações de partículas ao coletar power-ups
- [ ] Power-ups combinados (ex: velocidade + invencibilidade)
- [ ] Sistema de power-ups negativos (ex: velocidade reduzida)
- [ ] Power-ups que afetam o tamanho da cobra

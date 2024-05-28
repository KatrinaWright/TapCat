import type { PlayerId, RuneClient } from "rune-games-sdk/multiplayer";

export interface GameState {
  scores: { [key: string]: number },
  scratched: boolean,
  lastMovePlayerId: PlayerId | null,
  playerIds: PlayerId[],
  scratches: { [key: string]: number },
  catHappiness: number,
  lastScratcher: PlayerId | null,
  lastScratchTime: number | null,
}

type GameActions = {
  updateScore: (params: { playerId: PlayerId, amount: number }) => void;
  updateScratch: (params: { playerId: PlayerId, amount: number }) => void;
  // resetLastScratcher: () => void;
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

const isGameOver = (game: GameState): boolean => {
  // Game over if catHappiness reaches 2000 or drops to 0
  return game.catHappiness >= 2000 || game.catHappiness <= 0;
}

const finalizeScores = (game: GameState) => {
  game.playerIds.forEach(playerId => {
    if (game.scores[playerId] < 0) {
      game.scores[playerId] = 0;
    }
  });
};

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 6,
  setup: (allPlayerIds) => ({
    scores: Object.fromEntries(allPlayerIds.map(id => [id, 0])),
    scratched: false,
    lastMovePlayerId: null,
    playerIds: allPlayerIds,
    scratches: Object.fromEntries(allPlayerIds.map(id => [id, 0])),
    catHappiness: 205,
    lastScratcher: null,
    lastScratchTime: null,
  }),

  actions: {
    updateScore: ({ playerId, amount }, { game }) => {
      if (!game.playerIds.includes(playerId)) {
        throw Rune.invalidAction();
      }

      if (game.scores[playerId] === undefined) {
        game.scores[playerId] = 0;
      }

      game.scores[playerId] += amount;
      game.catHappiness += amount; 

      if (isGameOver(game)) {
        finalizeScores(game);
        Rune.gameOver({
          players: Object.fromEntries(game.playerIds.map(id => [id, game.scores[id]]))
        });
      }
    },
    updateScratch: ({ playerId, amount }, { game }) => {
      if (!game.playerIds.includes(playerId)) {
        throw Rune.invalidAction();
      }

      if (game.scratches[playerId] === undefined) {
        game.scratches[playerId] = 0;
      }

      game.scratches[playerId] += amount;
      game.catHappiness -= amount * 50; 
      game.lastScratcher = playerId; 
      game.lastScratchTime = Rune.gameTime();

      if (isGameOver(game)) {
        finalizeScores(game);
        Rune.gameOver({
          players: Object.fromEntries(game.playerIds.map(id => [id, game.scores[id]]))
        });
      }
    },
  },
  update: ({ game }) => {
    game.catHappiness -= 1; // Decrease cat happiness every second
    if (game.lastScratchTime !== null && Rune.gameTime() - game.lastScratchTime > 500) {
      game.lastScratcher = null;
      game.lastScratchTime = null;
    }

    if (isGameOver(game)) {
      finalizeScores(game);
      Rune.gameOver({
        players: Object.fromEntries(game.playerIds.map(id => [id, game.scores[id]]))
      });
    }
  },
  updatesPerSecond: 1,
  events: {
    playerJoined: (playerId, { game }) => {
      game.scores[playerId] = 0;
      game.scratches[playerId] = 0;
      if (!game.playerIds.includes(playerId)) {
        game.playerIds.push(playerId);
      }
    },
    playerLeft: (playerId, { game }) => {
      game.scores[playerId] = 0;
      game.scratches[playerId] = 0;
      game.playerIds = game.playerIds.filter(id => id !== playerId);
    }
  }
});

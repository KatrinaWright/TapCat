import type { PlayerId, RuneClient } from "rune-games-sdk/multiplayer";

export interface GameState {
  scores: { [key: string]: number },
  scratched: boolean,
  lastMovePlayerId: PlayerId | null,
  playerIds: PlayerId[],
  count: number
  scratches: { [key: string]: number};
}

type GameActions = {
  updateScore: (params: { playerId: PlayerId, amount: number }) => void;
  updateScratch: (params: { playerId: PlayerId, amount: number }) => void;
  increment: (params: { amount: number }) => void;
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 2,
  setup: (allPlayerIds) => ({
    scores: Object.fromEntries(allPlayerIds.map(id => [id, 0])),
    scratched: false,
    lastMovePlayerId: null,
    playerIds: allPlayerIds,
    count: 0,
    scratches:  Object.fromEntries(allPlayerIds.map(id => [id, 0])),
  }),
  actions: {
    increment: ({ amount }, { game }) => {
      game.count += amount;
    },
    updateScore: ({ playerId, amount }, { game }) => {
      if (!game.playerIds.includes(playerId)) {
        throw Rune.invalidAction();
      }

      if (game.scores[playerId] === undefined) {
        game.scores[playerId] = 0;
      }

      game.scores[playerId] += amount;
    },
  updateScratch: ({ playerId, amount }, { game }) => {
    if (!game.playerIds.includes(playerId)) {
      throw Rune.invalidAction();
    }

    if (game.scratches[playerId] === undefined) {
      game.scratches[playerId] = 0;
    }

    game.scratches[playerId] += amount;
  }
},
  update: ({ game, allPlayerIds }) => {
    // This function will be called 10 times per second (based on updatesPerSecond setting)
    // You can use this to perform regular updates, like decrementing a timer or checking game conditions
  },
  updatesPerSecond: 10
});

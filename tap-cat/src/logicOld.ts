import type { PlayerId, RuneClient } from "rune-games-sdk/multiplayer"


export interface GameState {
  score: number,
  scratched: boolean,
  lastMovePlayerId: PlayerId | null,
  playerIds: PlayerId[],
  //activePlayers: object
  // increment: number,
  count: number
}

type GameActions = {
//   earnPoint: (rollResult: number) => void;
//   getScratched: (rollResult: number) => void;
  updateScore: (params: {
    PlayerId: string | undefined,
    amount: number
  }) => void;
  increment: (params: {amount: number}) => void;
}

// declare global {
//   const Rune: RuneClient<GameState, GameActions>
// }


Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 2,
  setup: (allPlayerIds) => ({
    score: 0,
    scratched: false,
    lastMovePlayerId: null,
    playerIds: allPlayerIds,
    //activePlayers: 
    // increment: 0,
    count: 0
  }),
  actions: {
    increment: ({ amount }, { game }) => {
        game.count += amount
      },


    updateScore: ({PlayerId, amount}, {game}) => {

    if (PlayerId === undefined) {
        PlayerId = "spectator"
    }

    else
    if (game.score[PlayerId] === undefined) {
        throw Rune.invalidAction();
    }

    game.score[PlayerId] += amount;
    }
    
    // earnPoint: (rollDice, { game, playerId, allPlayerIds }) => {
    //   if (
    //     game.scratched !== false 
    //   ) {
    //     throw Rune.invalidAction()
    //   }

      
    //   game.winCombo = findWinningCombo(game.cells)

    //   if (game.winCombo) {
    //     const [player1, player2] = allPlayerIds

    //     Rune.gameOver({
    //       players: {
    //         [player1]: game.lastMovePlayerId === player1 ? "WON" : "LOST",
    //         [player2]: game.lastMovePlayerId === player2 ? "WON" : "LOST",
    //       },
    //     })
    //   }

    //   game.freeCells = game.cells.findIndex((cell) => cell === null) !== -1

    //   if (!game.freeCells) {
    //     Rune.gameOver({
    //       players: {
    //         [game.playerIds[0]]: "LOST",
    //         [game.playerIds[1]]: "LOST",
    //       },
    //     })
    //   }
    // },
  },
})

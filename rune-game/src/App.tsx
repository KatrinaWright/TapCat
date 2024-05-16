import { useEffect, useState } from "react"
import { PlayerId } from "rune-games-sdk/multiplayer"

import selectSoundAudio from "./assets/select.wav"
import { GameState } from "./logic.ts"

const selectSound = new Audio(selectSoundAudio)                            // update: add purring sound and scratchng sound

function App() {
  const [game, setGame] = useState<GameState>()                            // keep: general game state
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId | undefined>() // keep: general avatar access

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, action, yourPlayerId }) => {
        setGame(game)
        setYourPlayerId(yourPlayerId)

        if (action && action.name === "claimCell") selectSound.play()      // update: play sound with correct action - change to purring/scratching
        // if (action && action.name === "goodPet") petSuccessSound.play() // Pseudo: play sound success
        // elif (action && action.name === "badPet") petFailSound.play()   // Pseudo: play sound fail
      },
    }) 
  }, [])

  if (!game) {
    // Rune only shows your game after an onChange() so no need for loading screen
    return
  }

  const { winCombo, cells, lastMovePlayerId, playerIds, freeCells } = game

  return (
    <>
      <div id="board" className={!lastMovePlayerId ? "initial" : ""}>
        {cells.map((cell, cellIndex) => {
          const cellValue = cells[cellIndex]

          return (
            <button
              key={cellIndex}
              onClick={() => Rune.actions.claimCell(cellIndex)}
              data-player={(cellValue !== null
                ? playerIds.indexOf(cellValue)
                : -1
              ).toString()}
              data-dim={String(
                (winCombo && !winCombo.includes(cellIndex)) ||
                  (!freeCells && !winCombo)
              )}
              {...(cells[cellIndex] ||
              lastMovePlayerId === yourPlayerId ||
              winCombo
                ? { "data-disabled": "" }
                : {})}
            />
          )
        })}
      </div>
      <ul id="playersSection">                                                      {/* keep player picture */}
        {playerIds.map((playerId, index) => {                                      // {/* keep player picture */}
          const player = Rune.getPlayerInfo(playerId)                              //{/* keep player picture */}

          return (
            <li
              key={playerId}                                                        // Keep: player index discovery
              data-player={index.toString()}                                        //  
              data-your-turn={String(                                               // REMOVE : dont need player turns
                playerIds[index] !== lastMovePlayerId && !winCombo && freeCells     // REMOVE: dont need player turns
              )}
            >
              <img src={player.avatarUrl} />                                        {/* keep player picture */}
              <span>
                {player.displayName}                                                {/* keep player name */}
                {player.playerId === yourPlayerId && (                              
                  <span>                                                            {/* REMOVE you player indicator */}
                    <br />
                    (You)
                  </span>
                )}
              </span>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default App

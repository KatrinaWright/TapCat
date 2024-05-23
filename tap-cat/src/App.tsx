import { useEffect, useState } from "react"
import { PlayerId } from "rune-games-sdk/multiplayer"

import selectSoundAudio from "./assets/select.wav"
import { GameState } from "./logic.ts"
import PettingZones from "./Components/PettingZones.tsx"
//import PettingZones from "./Components/HiCatPetMap.tsx"
//// import PettingZones from "./Components/Zone2.tsx"
//// import picture from "../src/assets/Cat using laptop.gif"
import picture from "../src/assets/Cat Saying Hello.gif"
import mapData from './mapData.json';

const selectSound = new Audio(selectSoundAudio)

function App() {
  const [game, setGame] = useState<GameState>()
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId | undefined>()

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, action, yourPlayerId }) => {
        setGame(game)
        setYourPlayerId(yourPlayerId)

        if (action && action.name === "increment") selectSound.play()
      },
    })
  }, [])

  if (!game) {
    // Rune only shows your game after an onChange() so no need for loading screen
    return
  }

  //const { winCombo, cells, lastMovePlayerId, playerIds, freeCells } = game
  const { playerIds } = game

  return (
    <>
{/* <!-- Image Map Generated by http://www.image-map.net/ --> */}
{/* <img src="your-image-path.jpg" useMap="#image-map" alt="Petting Zones Map" />
      <PettingZones imageName="image-map" mapData={mapData} /> */}
        <button onClick={() => Rune.actions.increment({ amount: 1 })}>
          count is {game.count}
        </button>      
<img src={picture} useMap="#image-map"></img>
{/* <PettingZones/> */}
<PettingZones imageName="image-map" mapData={mapData} />


      {/* <div id="board" className={!lastMovePlayerId ? "initial" : ""}>
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
      </div> */}
      <ul id="playersSection">
        {playerIds.map((playerId, index) => {
          const player = Rune.getPlayerInfo(playerId)

          return (
            <li
              key={playerId}
              data-player={index.toString()}
              // data-your-turn={String(
              //   playerIds[index] !== lastMovePlayerId && !winCombo && freeCells
              // )}
            >
              <img src={player.avatarUrl} />
              <span>
                {player.displayName}
                {player.playerId === yourPlayerId && (
                  <span>
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

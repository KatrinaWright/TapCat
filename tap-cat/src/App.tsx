import { useEffect, useState } from "react"
import { PlayerId } from "rune-games-sdk/multiplayer"

import selectSoundAudio from "./assets/select.wav"
import { GameState } from "./logic.ts"
import PettingZones from "./Components/PettingZones3.tsx"
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
    return null
  }

  const { playerIds, scores } = game

  return (
    <>
      <img src={picture} useMap="#image-map" alt="Petting Zones Map" />
      {yourPlayerId && (
        <PettingZones
          imageName="image-map"
          mapData={mapData}
          playerId={yourPlayerId}
          scores={scores}
        />
      )}

      <ul id="playersSection">
        {playerIds.map((playerId, index) => {
          const player = Rune.getPlayerInfo(playerId)

          return (
            <li key={playerId} data-player={index.toString()}>
              <img src={player.avatarUrl} alt={`${player.displayName}'s avatar`} />
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

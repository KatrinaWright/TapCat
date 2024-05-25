import { useEffect, useState } from "react"
import { PlayerId } from "rune-games-sdk/multiplayer"

import selectSoundAudio from "./assets/select.wav"
import { GameState } from "./logic.ts"
import PettingZones from "./Components/PettingZones.tsx"
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

        if (action && action.name === "updateScratch") selectSound.play()
      },
    })
  }, [])

  if (!game) {
    // Rune only shows your game after an onChange() so no need for loading screen
    return null
  }

  const { playerIds, scratches} = game

  return (
    <>
      <img src={picture} useMap="#image-map" alt="Petting Zones Map" />
      {yourPlayerId && (
        <PettingZones
          imageName="image-map"
          mapData={mapData}
          playerId={yourPlayerId}
        />
      )}

      <ul id="playersSection">
        {playerIds.map((playerId, index) => {
          const player = Rune.getPlayerInfo(playerId)

          return (
            <li key={playerId} data-player={index.toString()}>
              <img src={player.avatarUrl} alt={`${player.displayName}'s avatar`} />
              <span>
                {game.scores[playerId]}
                <br />
                {player.displayName}
                <br />
                {scratches[playerId]}
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

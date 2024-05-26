import { useEffect, useState } from "react";
import { PlayerId } from "rune-games-sdk/multiplayer";
import selectSoundAudio from "./assets/select.wav";
import { GameState } from "./logic";
import PettingZones from "./Components/PettingZones";
import PlayerList from "./Components/PlayerList";
import CatHappinessBar from "./Components/CatHappinessBar";
import picture from "../src/assets/Cat Saying Hello.gif";
import mapData from './mapData.json';

const selectSound = new Audio(selectSoundAudio);

function App() {
  const [game, setGame] = useState<GameState>();
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId | undefined>();

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, action, yourPlayerId }) => {
        setGame(game);
        setYourPlayerId(yourPlayerId);

        if (action && action.name === "updateScratch") selectSound.play();
      },
    });
  }, []);

  if (!game) {
    // Rune only shows your game after an onChange() so no need for loading screen
    return null;
  }

  const { playerIds, scratches, catHappiness } = game;

  return (
    <>
      <CatHappinessBar catHappiness={catHappiness} />
      <img src={picture} useMap="#image-map" alt="Petting Zones Map" />
      {yourPlayerId && (
        <PettingZones
          imageName="image-map"
          mapData={mapData}
          playerId={yourPlayerId}
        />
      )}
      <PlayerList playerIds={playerIds} game={game} yourPlayerId={yourPlayerId} scratches={scratches} />
    </>
  );
}

export default App;

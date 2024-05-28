import { useEffect, useState } from "react";
import { PlayerId } from "rune-games-sdk/multiplayer";
import catHappyPurr from "./assets/purring-cat-156459.mp3"
import catMadSound from "./assets/sat-on-the-cat-95941.mp3"
import { GameState } from "./logic";
import PettingZones from "./Components/PettingZones";
import PlayerList from "./Components/PlayerList";
import CatHappinessBar from "./Components/CatHappinessBar";
import IdleAnimationOverlay from "./Components/IdleAnimationOverlay";
import picture from "../src/assets/Cat Saying Hello.gif";
import mapData from './mapData.json';

//const selectSound = new Audio(selectSoundAudio);
const MadSound = new Audio(catMadSound);
const purrSound = new Audio(catHappyPurr);

function App() {
  const [game, setGame] = useState<GameState>();
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId | undefined>();
  const [resetTimer, setResetTimer] = useState(false);

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, action, yourPlayerId }) => {
        setGame(game);
        setYourPlayerId(yourPlayerId);

        if (action && action.name === "updateScratch") MadSound.play();
        if (action && action.name === "updateScore" && game.catHappiness > 75 ) purrSound.play();
        
        
      },
    });
  }, []);

  if (!game) {
    // Rune only shows your game after an onChange() so no need for loading screen
    return null;
  }

  const { playerIds, scratches, catHappiness } = game;

  const handleUserInteraction = () => {
    setResetTimer(true);
    setTimeout(() => setResetTimer(false), 100);
  };

  return (
    
    <div onMouseMove={handleUserInteraction} onTouchMove={handleUserInteraction}>
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
      <IdleAnimationOverlay resetTimer={resetTimer} />
    </div>
  );
}

export default App;

import { useEffect, useState, useRef } from "react";
import { PlayerId } from "rune-games-sdk/multiplayer";
import catHappyPurr from "./assets/purring-cat-156459.mp3";
import catMadSound from "./assets/sat-on-the-cat-95941.mp3";
import { GameState } from "./logic";
import PettingZones from "./Components/PettingZones";
import PlayerList from "./Components/PlayerList";
import CatHappinessBar from "./Components/CatHappinessBar";
import IdleAnimationOverlay from "./Components/IdleAnimationOverlay";
import picture from "../src/assets/Cat Saying Hello.gif";
import mapData from "./mapData.json";
// Would need to import this as well
// Sends mapData into pettingZones & imageMap (imageMap is fine)
// Trick is keeping track of which JSON file attached to which cat gif

//const selectSound = new Audio(selectSoundAudio);
const MadSound = new Audio(catMadSound);
const purrSound = new Audio(catHappyPurr);

function App() {
  const [game, setGame] = useState<GameState>();
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId | undefined>();
  const [idle, setIdle] = useState(false);
  const lastInteractionTimeRef = useRef<number>(Date.now());

  const handleInteraction = () => {
    lastInteractionTimeRef.current = Date.now();
    setIdle(false);
  };

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, action, yourPlayerId }) => {
        setGame(game);
        setYourPlayerId(yourPlayerId);

        if (action && action.name === "updateScratch") MadSound.play();
        if (action && action.name === "updateScore" && game.catHappiness > 75)
          purrSound.play();
      },
    });

    const interval = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - lastInteractionTimeRef.current > 15000) {
        setIdle(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!game) {
    // Rune only shows your game after an onChange() so no need for loading screen
    return null;
  }

  const { playerIds, scratches, catHappiness } = game;

  return (
    <div onMouseMove={handleInteraction} onTouchMove={handleInteraction}>
      <CatHappinessBar catHappiness={catHappiness} />
      <img src={picture} useMap="#image-map" alt="Petting Zones Map" />
      {/* {picture will need updating/re-mapping} */}
      {yourPlayerId && (
        <PettingZones
          imageName="image-map"
          mapData={mapData}
          // {mapData} would also need to change
          playerId={yourPlayerId}
        />
      )}
      <PlayerList
        playerIds={playerIds}
        game={game}
        yourPlayerId={yourPlayerId}
        scratches={scratches}
      />
      {yourPlayerId && <IdleAnimationOverlay idle={idle} />}
    </div>
  );
}

export default App;

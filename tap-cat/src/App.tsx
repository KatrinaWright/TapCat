import { useEffect, useState, useRef } from "react";
import { PlayerId } from "rune-games-sdk/multiplayer";
import catHappyPurr from "./assets/purring-cat-156459.mp3";
import catMadSound from "./assets/sat-on-the-cat-95941.mp3";
import { GameState } from "./logic";
import PettingZones from "./Components/PettingZones";
import PlayerList from "./Components/PlayerList";
import CatHappinessBar from "./Components/CatHappinessBar";
import IdleAnimationOverlay from "./Components/IdleAnimationOverlay";
import pictureHello from "../src/CatMaps__dkf-recreated/CatSayingHello.gif";
import mapDataHello from "../src/CatMaps__dkf-recreated/CatSayingHellomapData.json";
import pictureYarn from "../src/CatMaps__dkf-recreated/YarnCat.gif";
import mapDataYarn from "../src/CatMaps__dkf-recreated/YarnCatMapData.json";

//const selectSound = new Audio(selectSoundAudio);
const MadSound = new Audio(catMadSound);
const purrSound = new Audio(catHappyPurr);

function App() {
  const [game, setGame] = useState<GameState>();
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId | undefined>();
  const [idle, setIdle] = useState(false);
  const lastInteractionTimeRef = useRef<number>(Date.now());
  const [catId, setCatId] = useState(false);

  const handleInteraction = () => {
    lastInteractionTimeRef.current = Date.now();
    setIdle(false);
  };

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, action, yourPlayerId }) => {
        setGame(game);
        setCatId(!catId);
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
  }, [catId]); // Had to add this as a dependency to trigger the game to finish after updating the useEffect to include "setCatId(!catId);" {DKF}

  if (!game) {
    // Rune only shows your game after an onChange() so no need for loading screen
    return null;
  }

  const { playerIds, scratches, catHappiness } = game;

  // It looks like the useEffect is only triggered by the initial load and not subsequent games, beacuse this always defaults to the yarn version (when setting the initial useState to "True", and vice versa) {DKF}
  const picture = catId ? pictureHello : pictureYarn;
  const mapData = catId ? mapDataHello : mapDataYarn;

  return (
    <div onMouseMove={handleInteraction} onTouchMove={handleInteraction}>
      <CatHappinessBar catHappiness={catHappiness} />
      <img src={picture} useMap="#image-map" alt="Petting Zones Map" />
      {yourPlayerId && (
        <PettingZones
          imageName="image-map"
          mapData={mapData}
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

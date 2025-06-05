import { useEffect, useState, useRef  } from "react";
import { PlayerId } from "rune-games-sdk/multiplayer";
import catHappyPurr from "./assets/purring-cat-156459.mp3";
import catMadSound from "./assets/sat-on-the-cat-95941.mp3";
import { GameState } from "./logic";
import PettingZones from "./Components/PettingZones";
import PlayerList from "./Components/PlayerList";
import CatHappinessBar from "./Components/CatHappinessBar";
import IdleAnimationOverlay from "./Components/IdleAnimationOverlayBot";
import picture from "../src/Cat Maps/CatSayingHello.gif";
import mapData from '../src/Cat Maps/CatSayingHellomapData.json';
import { createLoveParticles, createDramaticScratchEffect, createVariantScratchEffect } from './animationHelpers';
import './animations.css';

const MadSound = new Audio(catMadSound);
const purrSound = new Audio(catHappyPurr);

function App() {
  const [game, setGame] = useState<GameState>();
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId | undefined>();
  const [idle, setIdle] = useState(false);
  const lastInteractionTimeRef = useRef<number>(Date.now());

  const handleInteraction = (event: React.MouseEvent | React.TouchEvent) => {
    lastInteractionTimeRef.current = Date.now();
    setIdle(false);
    
    // Create subtle love particles for mouse movement
    if ('clientX' in event && Math.random() < 0.1) { // Only 10% of movements
      createLoveParticles(event.clientX, event.clientY, 2);
    } else if ('touches' in event && event.touches.length && Math.random() < 0.1) {
      createLoveParticles(event.touches[0].clientX, event.touches[0].clientY, 2);
    }
  };

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, action, yourPlayerId }) => {
        setGame(game);
        setYourPlayerId(yourPlayerId);

        // Handle sound effects and dramatic scratch effect
        if (action && action.name === "updateScratch") {
          MadSound.play();
          // Trigger dramatic scratch effect
          if (Math.random() < 0.5) {
            createDramaticScratchEffect(); // 50% chance for main effect
          } else {
            createVariantScratchEffect(); // 50% chance for variant effect
          }
        }
        if (action && action.name === "updateScore" && game.catHappiness > 750) purrSound.play();
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
    <div 
      className="game-container" 
      onMouseMove={handleInteraction} 
      onTouchMove={handleInteraction}
    >
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
      
      {/* Hearts container will be created dynamically */}
    </div>
  );
}

export default App;
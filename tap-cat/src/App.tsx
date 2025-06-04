import { useEffect, useState, useRef  } from "react";
import { PlayerId } from "rune-games-sdk/multiplayer";
import catHappyPurr from "./assets/purring-cat-156459.mp3";
import catMadSound from "./assets/sat-on-the-cat-95941.mp3";
import { GameState } from "./logic";
import PettingZones from "./Components/PettingZones";
import PlayerList from "./Components/PlayerList";
import CatHappinessBar from "./Components/CatHappinessBar";
import IdleAnimationOverlay from "./Components/IdleAnimationOverlay";
import picture from "../src/Cat Maps/CatSayingHello.gif";
import mapData from '../src/Cat Maps/CatSayingHellomapData.json';
import { createLoveParticles } from './animationHelpers';
import { createDramaticScratchEffect } from './scratchEffectHelpers';
import './animations.css';
import './scratchEffect.css'; // Add this new CSS file

const MadSound = new Audio(catMadSound);
const purrSound = new Audio(catHappyPurr);

function App() {
  const [game, setGame] = useState<GameState>();
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId | undefined>();
  const [idle, setIdle] = useState(false);
  const [lastScratcher, setLastScratcher] = useState<PlayerId | null>(null);
  const lastInteractionTimeRef = useRef<number>(Date.now());
  const catImageRef = useRef<HTMLImageElement>(null);

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
        const previousGame = game !== undefined ? game : null;
        setGame(game);
        setYourPlayerId(yourPlayerId);

        // Handle sound effects
        if (action && action.name === "updateScratch") {
          MadSound.play();
          
          // If scratch action happened and we're not already showing a scratch effect
          if (game.lastScratcher !== lastScratcher) {
            setLastScratcher(game.lastScratcher);
            
            // Get cat image position for dramatic effect
            const catImage = catImageRef.current;
            if (catImage) {
              const rect = catImage.getBoundingClientRect();
              const centerX = rect.left + rect.width / 2;
              const centerY = rect.top + rect.height / 2;
              
              // Create dramatic scratch effect
              createDramaticScratchEffect(centerX, centerY);
            } else {
              // Fallback to center of screen
              createDramaticScratchEffect();
            }
          }
        }
        
        if (action && action.name === "updateScore" && game.catHappiness > 750) {
          purrSound.play();
        }
      },
    });

    const interval = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - lastInteractionTimeRef.current > 15000) {
        setIdle(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastScratcher]);

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
      <img 
        ref={catImageRef}
        src={picture} 
        useMap="#image-map" 
        alt="Petting Zones Map" 
        className={game.lastScratcher ? 'shake-effect' : ''}
      />
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
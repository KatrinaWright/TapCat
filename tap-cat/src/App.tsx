import { useEffect, useState, useRef  } from "react";
import { PlayerId } from "rune-games-sdk/multiplayer";
import catHappyPurr from "./assets/purring-cat-156459.mp3"
import catMadSound from "./assets/sat-on-the-cat-95941.mp3"
import { GameState } from "./logic";
import PettingZones from "./Components/PettingZones";
import PlayerList from "./Components/PlayerList";
import CatHappinessBar from "./Components/CatHappinessBar";
import IdleAnimationOverlay from "./Components/IdleAnimationOverlay";
import picture from "../src/Cat Maps/CatSayingHello.gif";
import mapData from '../src/Cat Maps/CatSayingHellomapData.json';
import { 
  createFloatingHeart, 
  createHappinessCelebration, 
  createLoveParticles,
  triggerPointsAnimation 
} from './animationHelpers';
import './animations.css';

const MadSound = new Audio(catMadSound);
const purrSound = new Audio(catHappyPurr);

function App() {
  const [game, setGame] = useState<GameState>();
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId | undefined>();
  const [idle, setIdle] = useState(false);
  const [previousHappiness, setPreviousHappiness] = useState(0);
  const lastInteractionTimeRef = useRef<number>(Date.now());

  const handleInteraction = (event) => {
    lastInteractionTimeRef.current = Date.now();
    setIdle(false);
    
    // Create love particles at interaction point
    if (event.clientX && event.clientY) {
      createLoveParticles(event.clientX, event.clientY, 3);
    }
  };

  const handlePettingZoneClick = (event) => {
    handleInteraction(event);
    
    // Create floating heart at click location
    if (event.clientX && event.clientY) {
      createFloatingHeart(event.clientX, event.clientY, 'medium');
    }
  };

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, action, yourPlayerId, playerId }) => {
        const previousGame = game;
        setGame(game);
        setYourPlayerId(yourPlayerId);

        // Handle sound effects
        if (action && action.name === "updateScratch") MadSound.play();
        if (action && action.name === "updateScore" && game.catHappiness > 75) purrSound.play();
        
        // Handle happiness milestone celebrations
        if (previousHappiness < 90 && game.catHappiness >= 90) {
          createHappinessCelebration('🌟💖 MAXIMUM LOVE! 💖🌟');
          // Create multiple large hearts
          setTimeout(() => createFloatingHeart(Math.random() * window.innerWidth, window.innerHeight, 'large'), 100);
          setTimeout(() => createFloatingHeart(Math.random() * window.innerWidth, window.innerHeight, 'large'), 300);
          setTimeout(() => createFloatingHeart(Math.random() * window.innerWidth, window.innerHeight, 'large'), 500);
        } else if (previousHappiness < 75 && game.catHappiness >= 75) {
          createHappinessCelebration('😻 VERY HAPPY! 😻');
          createFloatingHeart(window.innerWidth / 2, window.innerHeight, 'large');
        } else if (previousHappiness < 50 && game.catHappiness >= 50) {
          createHappinessCelebration('😸 CONTENT! 😸');
          createFloatingHeart(window.innerWidth / 2, window.innerHeight, 'medium');
        }
        
        // Trigger points animation when a player scores
        if (action && action.name === "updateScore" && playerId) {
          triggerPointsAnimation(playerId);
          
          // Create floating heart from player card
          const playerCard = document.querySelector(`[data-player-id="${playerId}"]`);
          if (playerCard) {
            const rect = playerCard.getBoundingClientRect();
            createFloatingHeart(
              rect.left + rect.width / 2, 
              rect.top + rect.height / 2, 
              'small'
            );
          }
        }
        
        setPreviousHappiness(game.catHappiness);
      },
    });

    const interval = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - lastInteractionTimeRef.current > 15000) {
        setIdle(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [previousHappiness]);

  if (!game) {
    return null;
  }

  const { playerIds, scratches, catHappiness } = game;

  return (   
    <div 
      className="game-container" 
      onMouseMove={handleInteraction} 
      onTouchMove={handleInteraction}
      onClick={handlePettingZoneClick}
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
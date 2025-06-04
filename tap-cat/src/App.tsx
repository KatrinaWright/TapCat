import { useEffect, useState, useRef } from "react";
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
import './Components/animations.css'; // Import our new CSS

const MadSound = new Audio(catMadSound);
const purrSound = new Audio(catHappyPurr);

function App() {
  const [game, setGame] = useState<GameState>();
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId | undefined>();
  const [idle, setIdle] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [scoreChange, setScoreChange] = useState(null);
  const [previousScores, setPreviousScores] = useState({});
  const lastInteractionTimeRef = useRef<number>(Date.now());
  const heartContainerRef = useRef(null);

  const handleInteraction = () => {
    lastInteractionTimeRef.current = Date.now();
    setIdle(false);
  };

  // Create floating heart
  const createHeart = (x, y) => {
    const id = Date.now() + Math.random().toString();
    const heart = { id, x, y, style: {} };
    // Add random variations
    heart.style.left = `${x - 10 + Math.random() * 20}px`;
    heart.style.animationDelay = `${Math.random() * 0.5}s`;
    return heart;
  };

  // Add heart at cat's location when happiness increases
  const createCatHearts = () => {
    if (!heartContainerRef.current) return;
    
    const catImg = document.querySelector('img');
    if (!catImg) return;

    const rect = catImg.getBoundingClientRect();
    const containerRect = heartContainerRef.current.getBoundingClientRect();
    
    const x = rect.left + rect.width / 2 - containerRect.left;
    const y = rect.top + rect.height / 2 - containerRect.top;
    
    // Create multiple hearts
    const newHearts = Array(3).fill(0).map(() => createHeart(x, y));
    
    setHearts(prevHearts => [...prevHearts, ...newHearts]);
    
    // Remove hearts after animation finishes
    setTimeout(() => {
      setHearts(prevHearts => prevHearts.filter(heart => !newHearts.find(h => h.id === heart.id)));
    }, 3500);
  };

  // Track score changes to trigger animations
  useEffect(() => {
    if (!game || !game.playerIds) return;
    
    const currentScores = {};
    game.playerIds.forEach(playerId => {
      currentScores[playerId] = game.playerScores?.[playerId] || 0;
    });

    // Check which player earned points
    if (Object.keys(previousScores).length > 0) {
      for (const playerId in currentScores) {
        if (previousScores[playerId] !== undefined && 
            currentScores[playerId] > previousScores[playerId]) {
          setScoreChange({
            playerId,
            amount: currentScores[playerId] - previousScores[playerId],
            timestamp: Date.now()
          });

          // If cat happiness is high and points were earned, create hearts
          if (game.catHappiness > 75) {
            createCatHearts();
          }
        }
      }
    }

    setPreviousScores(currentScores);
  }, [game?.playerScores]);

  // Init Rune client
  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, action, yourPlayerId }) => {
        setGame(game);
        setYourPlayerId(yourPlayerId);

        if (action && action.name === "updateScratch") MadSound.play();
        if (action && action.name === "updateScore" && game.catHappiness > 75) purrSound.play();
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

  // Clean up old hearts
  useEffect(() => {
    if (hearts.length > 15) {
      setHearts(prevHearts => prevHearts.slice(-15));
    }
  }, [hearts]);

  if (!game) {
    return null;
  }

  const { playerIds, scratches, catHappiness } = game;

  return (   
    <div onMouseMove={handleInteraction} onTouchMove={handleInteraction} className="game-container">
      {/* Cat happiness bar with animation when happy */}
      <CatHappinessBar 
        catHappiness={catHappiness} 
        className={catHappiness > 80 ? 'cat-happiness-high' : ''} 
      />
      
      <div className="cat-image-container" style={{ position: 'relative' }}>
        <img src={picture} useMap="#image-map" alt="Petting Zones Map" />
        
        {/* Hearts container for floating hearts */}
        <div className="hearts-container" ref={heartContainerRef}>
          {hearts.map(heart => (
            <div 
              key={heart.id} 
              className="heart" 
              style={heart.style}
            >
              ❤️
            </div>
          ))}
        </div>
      </div>
      
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
        scoreChange={scoreChange}  
      />
      
      {yourPlayerId && <IdleAnimationOverlay idle={idle} />}
    </div>
  );
}

export default App;
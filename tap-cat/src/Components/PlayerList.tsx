import React, { useState, useEffect, useRef } from "react";
import { PlayerId } from "rune-games-sdk/multiplayer";
import { GameState } from "../logic";

interface PlayerListProps {
  playerIds: PlayerId[];
  game: GameState;
  yourPlayerId?: PlayerId;
  scratches: Record<PlayerId, number>;
  scoreChange: {
    playerId: PlayerId;
    amount: number;
    timestamp: number;
  } | null;
}

const PlayerList: React.FC<PlayerListProps> = ({ 
  playerIds, 
  game, 
  yourPlayerId, 
  scratches,
  scoreChange 
}) => {
  const [hearts, setHearts] = useState([]);
  const [animatingScores, setAnimatingScores] = useState<Record<string, boolean>>({});
  const playerCardsRef = useRef<Record<string, HTMLDivElement | null>>({});
  
  // Get player rankings
  const getPlayerRankings = () => {
    if (!game || !game.playerScores) return {};
    
    // Create array of player scores
    const scoreEntries = Object.entries(game.playerScores);
    
    // Sort by score descending
    const sortedPlayers = scoreEntries.sort((a, b) => b[1] - a[1]);
    
    // Create ranking map
    const rankings = {};
    sortedPlayers.forEach((entry, index) => {
      const [playerId, score] = entry;
      rankings[playerId] = index;
    });
    
    return rankings;
  };
  
  // Get CSS class for player card based on ranking
  const getPlayerCardClass = (playerId: PlayerId) => {
    const rankings = getPlayerRankings();
    const rank = rankings[playerId];
    const baseClass = 'player-card';
    
    let rankClass = '';
    if (rank === 0) rankClass = ' top-player';
    else if (rank === 1) rankClass = ' second-player';
    else if (rank === 2) rankClass = ' third-player';
    else rankClass = ' other-player';
    
    const yourClass = playerId === yourPlayerId ? ' your-player' : '';
    
    return `${baseClass}${rankClass}${yourClass}`;
  };
  
  // Create floating heart from player card
  const createPlayerHeart = (playerId: PlayerId) => {
    const playerCard = playerCardsRef.current[playerId];
    if (!playerCard) return;
    
    const rect = playerCard.getBoundingClientRect();
    
    const id = Date.now() + Math.random().toString();
    const heart = { 
      id, 
      playerId,
      style: {
        position: 'absolute',
        left: `${Math.random() * 80 + 10}%`,
        top: `${-30}px`,
        fontSize: '20px',
        color: 'red',
        pointerEvents: 'none',
        animation: `float-up 2s ease-out forwards`,
        animationDelay: `${Math.random() * 0.3}s`,
      }
    };
    
    setHearts(prevHearts => [...prevHearts, heart]);
    
    // Remove heart after animation
    setTimeout(() => {
      setHearts(prevHearts => prevHearts.filter(h => h.id !== id));
    }, 2500);
  };
  
  // Trigger score animation when a player earns points
  useEffect(() => {
    if (scoreChange) {
      const { playerId, timestamp } = scoreChange;
      
      // Set this player's score to animate
      setAnimatingScores(prev => ({ ...prev, [playerId]: true }));
      
      // Create hearts when points are earned
      createPlayerHeart(playerId);
      
      // Reset animation after it's done
      setTimeout(() => {
        setAnimatingScores(prev => ({ ...prev, [playerId]: false }));
      }, 600);
    }
  }, [scoreChange]);
  
  return (
    <div className="players-list">
      <h2>Players</h2>
      <div className="players-container">
        {playerIds.map((playerId) => (
          <div 
            key={playerId} 
            ref={el => playerCardsRef.current[playerId] = el}
            className={getPlayerCardClass(playerId)}
            style={{ position: 'relative' }}
          >
            <div className="player-info">
              <span className="player-name">
                {yourPlayerId === playerId ? "You" : `Player ${playerIds.indexOf(playerId) + 1}`}
              </span>
              
              <span 
                className={`score-container ${animatingScores[playerId] ? 'score-bump' : ''}`}
              >
                Score: {game.playerScores?.[playerId] || 0}
              </span>
              
              {scratches[playerId] > 0 && (
                <span className="scratches">
                  Scratches: {scratches[playerId]}
                </span>
              )}
            </div>
            
            {/* Hearts container for this player */}
            <div className="player-hearts-container" style={{ position: 'absolute', width: '100%', height: '50px', top: 0, left: 0, overflow: 'visible' }}>
              {hearts.filter(heart => heart.playerId === playerId).map(heart => (
                <div key={heart.id} style={heart.style}>❤️</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
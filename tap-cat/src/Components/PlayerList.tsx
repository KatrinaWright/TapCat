import React, { useEffect, useState, useRef } from 'react';
import { PlayerId } from "rune-games-sdk/multiplayer";
import scratchIcon from '../assets/lion.svg'; 
import pointsIcon from '../assets/heart-eyes-cat.svg'; 
import { GameState } from '../logic';
import './PlayerList.css'; 
import { getPlayerPerformanceLevel, createFloatingHeart } from '../animationHelpers';

interface PlayerListProps {
  playerIds: PlayerId[];
  game: GameState;
  yourPlayerId: PlayerId | undefined;
  scratches: { [key: string]: number };
}

const PlayerList: React.FC<PlayerListProps> = ({ playerIds, game, yourPlayerId, scratches }) => {
  const [lastScores, setLastScores] = useState<{ [key: string]: number }>({});
  const cardsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  const sortedPlayerIds = yourPlayerId 
    ? [yourPlayerId, ...playerIds.filter(id => id !== yourPlayerId)] 
    : playerIds;
  
  // Collect all player scores for performance level calculation
  const allScores = sortedPlayerIds.map(id => game.scores[id] || 0);

  // Check for score changes and add animations
  useEffect(() => {
    sortedPlayerIds.forEach(playerId => {
      const currentScore = game.scores[playerId] || 0;
      const previousScore = lastScores[playerId] || 0;
      
      if (currentScore > previousScore) {
        // Player earned points - show animation
        const cardElement = cardsRef.current[playerId];
        if (cardElement) {
          cardElement.classList.add('earning-points');
          
          // Create floating heart from player card
          const rect = cardElement.getBoundingClientRect();
          // Create multiple hearts at different positions
          for (let i = 0; i < 3; i++) {
            const randomX = rect.left + Math.random() * rect.width;
            const randomY = rect.top + Math.random() * rect.height;
            
            setTimeout(() => {
              createFloatingHeart(randomX, randomY, 'small');
            }, i * 150);
          }
          
          setTimeout(() => {
            cardElement.classList.remove('earning-points');
          }, 600);
        }
      }
    });
    
    setLastScores({ ...game.scores });
  }, [game.scores, sortedPlayerIds]);

  return (
    <div className="player-list">
      {sortedPlayerIds.map((playerId, index) => {
        const player = Rune.getPlayerInfo(playerId);
        const score = game.scores[playerId] || 0;
        const performanceLevel = getPlayerPerformanceLevel(score, allScores);
        const isCurrentPlayer = playerId === yourPlayerId;

        return (
          <div
            key={playerId}
            ref={el => cardsRef.current[playerId] = el}
            className={`player-card ${playerId === yourPlayerId ? 'current-player' : ''} 
                      ${playerId === game.lastScratcher ? 'flash-red' : ''} 
                      ${performanceLevel}`}
            data-player={index.toString()}
            data-player-id={playerId}
          >
            <div className="player-info">
              <span className="player-name">
                {player.displayName}
                {performanceLevel === 'top-performer' && ' 👑'}
              </span>
            </div>
            <div className="player-stats">
              <div className="stat">
                {game.scores[playerId] || 0}
                <img src={pointsIcon} alt="points icon" className="icon" />
              </div>
              <div className="stat">
                {scratches[playerId] || 0}
                <img src={scratchIcon} alt="scratch icon" className="icon" />
              </div>
            </div>
            <div className="performance-indicator">
              {performanceLevel === 'top-performer' && '🥇'}
              {performanceLevel === 'high-performer' && '🥈'}
              {performanceLevel === 'medium-performer' && '🥉'}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlayerList;
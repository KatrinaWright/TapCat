import React from 'react';
import { getPlayerPerformanceLevel } from '../animationHelpers';

const PlayerList = ({ playerIds, game, yourPlayerId, scratches }) => {
  // Calculate all player scores for ranking
  const playerScores = playerIds.map(playerId => {
    // You'll need to adjust this based on how you calculate player scores
    // This assumes you have a way to get each player's score
    return game.playerScores?.[playerId] || 0;
  });

  return (
    <div className="player-list">
      {playerIds.map((playerId, index) => {
        const playerScore = playerScores[index];
        const performanceLevel = getPlayerPerformanceLevel(playerScore, playerScores);
        const isCurrentPlayer = playerId === yourPlayerId;
        
        return (
          <div
            key={playerId}
            data-player-id={playerId}
            className={`player-card ${performanceLevel} ${isCurrentPlayer ? 'current-player' : ''}`}
          >
            <div className="player-info">
              <h3 className="player-name">
                {isCurrentPlayer ? 'You' : `Player ${playerId.slice(-4)}`}
                {performanceLevel === 'top-performer' && ' 👑'}
                {performanceLevel === 'high-performer' && ' ⭐'}
              </h3>
              
              <div className="player-stats">
                <span className="score">Score: {playerScore}</span>
                <span className="scratches">
                  Scratches: {scratches[playerId] || 0} 
                  {(scratches[playerId] || 0) > 0 && ' 😾'}
                </span>
              </div>
              
              <div className="performance-indicator">
                {performanceLevel === 'top-performer' && '🥇 Leading with Love!'}
                {performanceLevel === 'high-performer' && '🥈 Spreading Joy!'}
                {performanceLevel === 'medium-performer' && '🥉 Good Petting!'}
                {performanceLevel === 'low-performer' && '💝 Keep Trying!'}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlayerList;

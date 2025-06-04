import React from 'react';
import { PlayerId } from "rune-games-sdk/multiplayer";
import scratchIcon from '../assets/lion.svg'; 
import pointsIcon from '../assets/heart-eyes-cat.svg'; 
import { GameState } from '../logic';
import './PlayerList.css'; 
import { getPlayerPerformanceLevel } from '../animationHelpers.js';

interface PlayerListProps {
  playerIds: PlayerId[];
  game: GameState;
  yourPlayerId: PlayerId | undefined;
  scratches: { [key: string]: number };
}

const PlayerList: React.FC<PlayerListProps> = ({ playerIds, game, yourPlayerId, scratches }) => {
  const sortedPlayerIds = yourPlayerId ? [yourPlayerId, ...playerIds.filter(id => id !== yourPlayerId)] : playerIds;

  // Calculate all player scores for performance ranking
  const playerScores = sortedPlayerIds.map(playerId => game.scores[playerId] || 0);

  return (
    <div className="player-list">
      {sortedPlayerIds.map((playerId, index) => {
        const player = Rune.getPlayerInfo(playerId);
        const playerScore = game.scores[playerId] || 0;
        const performanceLevel = getPlayerPerformanceLevel(playerScore, playerScores);

        return (
          <div
            key={playerId}
            className={`player-card ${playerId === yourPlayerId ? 'current-player' : ''} ${playerId === game.lastScratcher ? 'flash-red' : ''} ${performanceLevel}`}
            data-player={index.toString()}
            data-player-id={playerId}
          >
            <div className="player-info">
              <span className="player-name">
                {player.displayName}
                {performanceLevel === 'top-performer' && ' 👑'}
                {performanceLevel === 'high-performer' && ' ⭐'}
              </span>
            </div>
            <div className="player-stats">
              <div className="stat">
                {game.scores[playerId]}
                <img src={pointsIcon} alt="points icon" className="icon" />
              </div>
              <div className="stat">
                {scratches[playerId]}
                <img src={scratchIcon} alt="scratch icon" className="icon" />
              </div>
            </div>
            
            {/* Performance indicator text */}
            <div className="performance-indicator">
              {performanceLevel === 'top-performer' && '🥇 Leading with Love!'}
              {performanceLevel === 'high-performer' && '🥈 Spreading Joy!'}
              {performanceLevel === 'medium-performer' && '🥉 Good Petting!'}
              {performanceLevel === 'low-performer' && '💝 Keep Trying!'}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlayerList;
import React from 'react';
import { PlayerId } from "rune-games-sdk/multiplayer";
import scratchIcon from '../assets/lion.svg'; 
import pointsIcon from '../assets/heart-eyes-cat.svg'; 
import { GameState } from '../logic';
import './PlayerList.css'; 

interface PlayerListProps {
  playerIds: PlayerId[];
  game: GameState;
  yourPlayerId: PlayerId | undefined;
  scratches: { [key: string]: number };
}

const PlayerList: React.FC<PlayerListProps> = ({ playerIds, game, yourPlayerId, scratches }) => {
  const sortedPlayerIds = yourPlayerId ? [yourPlayerId, ...playerIds.filter(id => id !== yourPlayerId)] : playerIds;

  return (
    <div className="player-list">
      {sortedPlayerIds.map((playerId, index) => {
        const player = Rune.getPlayerInfo(playerId);

        return (
          <div
            key={playerId}
            className={`player-card ${playerId === yourPlayerId ? 'current-player' : ''} ${playerId === game.lastScratcher ? 'flash-red' : ''}`}
            data-player={index.toString()}
          >
            <div className="player-info">
              <span className="player-name">
                {player.displayName}
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
            </div>
        );
      })}
    </div>
  );
};

export default PlayerList;

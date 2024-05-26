import React from 'react';
import { PlayerId } from "rune-games-sdk/multiplayer";
import scratchIcon from '../assets/scratch-icon.png'; // Adjust the path as needed
import pointsIcon from '../assets/heart-eyes-cat.svg'; // Adjust the path as needed
import { GameState } from '../logic';
import './PlayerList.css'; // Make sure to create and adjust the path as needed

interface PlayerListProps {
  playerIds: PlayerId[];
  game: GameState;
  yourPlayerId: PlayerId | undefined;
  scratches: { [key: string]: number };
}

const PlayerList: React.FC<PlayerListProps> = ({ playerIds, game, yourPlayerId, scratches }) => {
  return (
    <div className="player-list">
      {playerIds.map((playerId, index) => {
        const player = Rune.getPlayerInfo(playerId);

        return (
          <div key={playerId} className="player-card" data-player={index.toString()}>
            <div className="player-info">
              <img className="avatar" src={player.avatarUrl} alt={`${player.displayName}'s avatar`} />
              <span className="player-name">
                {player.displayName}
                {player.playerId === yourPlayerId && <span> (You)</span>}
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

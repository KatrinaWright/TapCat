import React from 'react';
import { PlayerId } from "rune-games-sdk/multiplayer";
import scratchIcon from '../assets/scratch-icon.png'; // Adjust the path as needed
import { GameState } from '../logic';

interface PlayerListProps {
  playerIds: PlayerId[];
  game: GameState;
  yourPlayerId: PlayerId | undefined;
  scratches: { [key: string]: number };
}

const PlayerList: React.FC<PlayerListProps> = ({ playerIds, game, yourPlayerId, scratches }) => {
  return (
    <ul id="playersSection">
      {playerIds.map((playerId, index) => {
        const player = Rune.getPlayerInfo(playerId);

        return (
          <li key={playerId} data-player={index.toString()}>
            <img src={player.avatarUrl} alt={`${player.displayName}'s avatar`} />
            <span>
              <div>{game.scores[playerId]}</div>
              <div>{player.displayName}</div>
              <div>
                {scratches[playerId]} <img src={scratchIcon} alt="scratch icon" style={{ width: '24px', height: '24px' }} />
              </div>
              {player.playerId === yourPlayerId && (
                <span>
                  <br />
                  (You)
                </span>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default PlayerList;

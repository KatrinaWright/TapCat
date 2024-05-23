import React, { useState, useEffect, useCallback } from 'react';

// Define the structure of the JSON data
interface AreaData {
  title: string;
  rating: number;
  coords: string;
  shape: string;
}

interface PettingZonesProps {
  imageName: string;
  mapData: AreaData[];
  playerId: string;
}

const PettingZones: React.FC<PettingZonesProps> = ({ imageName, mapData, playerId }) => {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [zoneText, setZoneText] = useState<string>('');
  const [diceText, setDiceText] = useState<string>('');
  const [playerScores, setPlayerScores] = useState<{ [key: string]: number }>({});

  const handlePointerDown = (zone: string) => {
    console.log(`Pointer down in ${zone}`);
    setActiveZone(zone);
    setZoneText(`Zone: ${zone}`);
  };

  const handlePointerMove = useCallback((event: MouseEvent | TouchEvent) => {
    event.preventDefault(); // Prevent default touch behavior
    const clientX = (event instanceof TouchEvent) ? event.touches[0].clientX : event.clientX;
    const clientY = (event instanceof TouchEvent) ? event.touches[0].clientY : event.clientY;

    const element = document.elementFromPoint(clientX, clientY);
    if (element && element.tagName === 'AREA') {
      const zone = (element as HTMLAreaElement).alt;
      const zoneObject = mapData.find(area => area.title === zone);
      if (zoneObject && activeZone !== zone) {
        console.log(`Pointer moved to ${zone}`);
        rollDiceForZone(zoneObject);
        setActiveZone(zone);
      }
    }
  }, [activeZone, mapData]);

  const handlePointerUp = useCallback(() => {
    console.log('Pointer up');
    setActiveZone(null);
  }, []);

  const rollDiceForZone = (zoneObject: AreaData) => {
    const diceRoll = Math.floor(Math.random() * 100) + 1;
    console.log(`Rolled a ${diceRoll} for ${zoneObject.title}`);

    if (diceRoll === 1) {
      Rune.actions.updateScore({ playerId, amount: -1000 });
    } else {
      Rune.actions.updateScore({ playerId, amount: 100 / zoneObject.rating });
    }

    setDiceText(`diceRoll: ${diceRoll} for ${zoneObject.title}`);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => handlePointerMove(event);
    const handleTouchMove = (event: TouchEvent) => handlePointerMove(event);

    const handleMouseUp = () => handlePointerUp();
    const handleTouchEnd = () => handlePointerUp();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handlePointerMove, handlePointerUp]);

  // Debugging player scores

    // const handleStateChange = ({ game }: { game: GameState }) => {
    //   setPlayerScores(game.scores);
    // };

//     Rune.onChange(handleStateChange);

//     return () => {
//       Rune.offChange(handleStateChange);
//     };
//   }, []);

  return (
    <div>
      <div id="zoneText">{zoneText}</div>
      <div id="diceText">{diceText}</div>
      <map
        name={imageName}
        onPointerDown={(e: React.PointerEvent<HTMLElement>) => handlePointerDown((e.target as HTMLAreaElement).alt)}
      >
        {mapData.map((area, index) => (
          <area
            key={index}
            alt={area.title}
            title={area.title}
            onPointerDown={() => handlePointerDown(area.title)}
            onTouchStart={() => handlePointerDown(area.title)}
            onClick={() => rollDiceForZone(area)}
            coords={area.coords}
            shape={area.shape}
          />
        ))}
      </map>

      {/* Debugging player scores */}
      <div id="debugging-player-scores">
        <h3>Debugging Player Scores</h3>
        {Object.keys(playerScores).map(playerId => (
          <div key={playerId}>
            {playerId}: {playerScores[playerId]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PettingZones;

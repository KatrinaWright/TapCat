import React, { useState, useEffect, useCallback, useRef } from 'react';

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
  const actionQueue = useRef<{ playerId: string; amount: number }[]>([]);
  const lastActionTime = useRef<number>(0);

  const rollDiceForZone = useCallback((zoneObject: AreaData) => {
    const diceRoll = Math.floor(Math.random() * zoneObject.rating) + 1;
    console.log(`Rolled a ${diceRoll} out of ${zoneObject.rating} for ${zoneObject.title}`);

    let amount;
    if (diceRoll === 1) {
      amount = -100;
      Rune.actions.updateScratch({ playerId, amount: 1 });
      console.log(`Player got scratched! ${playerId}`);

    } else {
      amount = Math.ceil(100 / zoneObject.rating);
    }

    // Add the action to the queue
    actionQueue.current.push({ playerId, amount });
  }, [playerId]);

  const handlePointerDown = useCallback((zone: string) => {
    console.log(`Pointer down in ${zone}`);
    setActiveZone(zone);
  }, []);

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
  }, [activeZone, mapData, rollDiceForZone]);

  const handlePointerUp = useCallback(() => {
    console.log('Pointer up');
    setActiveZone(null);
  }, []);

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

  useEffect(() => {
    const processQueue = () => {
      const now = Date.now();
      if (now - lastActionTime.current > 200) {
        const aggregatedActions = actionQueue.current.reduce<{ [key: string]: number }>((acc, action) => {
          acc[action.playerId] = (acc[action.playerId] || 0) + action.amount;
          return acc;
        }, {});

        Object.keys(aggregatedActions).forEach(playerId => {
          Rune.actions.updateScore({ playerId, amount: aggregatedActions[playerId] });
        });

        actionQueue.current = [];
        lastActionTime.current = now;
      }
      requestAnimationFrame(processQueue);
    };

    processQueue();
  }, []);

  return (
    <div>
      <map
        name={imageName}
        onPointerDown={(e: React.PointerEvent<HTMLElement>) => handlePointerDown((e.target as HTMLAreaElement).alt)}
        style={{ cursor: playerId ? 'grabbing' : 'default' }}
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
            style={{ cursor: 'grab' }}
          />
        ))}
      </map>
    </div>
  );
};

export default PettingZones;

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
  scores: { [key: string]: number };
  scratches: { [key: string]: number};
}

const PettingZones: React.FC<PettingZonesProps> = ({ imageName, mapData, playerId, scores, scratches}) => {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [zoneText, setZoneText] = useState<string>('');
  //const [diceText, setDiceText] = useState<string>('');
  const actionQueue = useRef<{ playerId: string; amount: number }[]>([]);
  const lastActionTime = useRef<number>(0);

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
    const diceRoll = Math.floor(Math.random() * zoneObject.rating) + 1;
    console.log(`Rolled a ${diceRoll} out of ${zoneObject.rating} for ${zoneObject.title}`);

    let amount;
    if (diceRoll === 1) {
      amount = -1000;
      Rune.actions.increment({ amount: 1 });
      Rune.actions.updateScratch({playerId: playerId, amount: 1});
      console.log( 'Player got scratched! ${playerId} ');
    } else {
      amount =  Math.ceil(100 / zoneObject.rating);
    }

    // Add the action to the queue
    actionQueue.current.push({ playerId, amount });
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

  useEffect(() => {
    const processQueue = () => {
      const now = Date.now();
      if (actionQueue.current.length > 0 && now - lastActionTime.current > 100) {
        const action = actionQueue.current.shift();
        if (action) {
          Rune.actions.updateScore(action);
          lastActionTime.current = now;
        }
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
    </div>
  );
};

export default PettingZones;

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
}

const PettingZones: React.FC<PettingZonesProps> = ({ imageName, mapData }) => {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [zoneText, setZoneText] = useState<string>('');
  const [diceText, setDiceText] = useState<string>('');

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
      if (activeZone !== zone) {
        console.log(`Pointer moved to ${zone}`);
        rollDiceForZone(zone);
        setActiveZone(zone);
      }
    }
  }, [activeZone]);

  const handlePointerUp = useCallback(() => {
    console.log('Pointer up');
    setActiveZone(null);
  }, []);

  const rollDiceForZone = (zone: string) => {
    const diceRoll = Math.floor(Math.random() * 100) + 1;
    console.log(`Rolled a ${diceRoll} for ${zone}`);
    setDiceText(`diceRoll: ${diceRoll} for ${zone}`);
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
            onClick={() => console.log(area.rating)}
            coords={area.coords}
            shape={area.shape}
          />
        ))}
      </map>
    </div>
  );
};

export default PettingZones;
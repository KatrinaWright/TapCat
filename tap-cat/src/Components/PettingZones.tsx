import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createFloatingHeart, createLoveParticles, triggerPettingEffect, createRiskBasedEffect } from '../animationHelpers';

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
  const areaRefs = useRef<{ [key: string]: HTMLAreaElement | null }>({});
  const zoneCrossingCounter = useRef<number>(0);

  const rollDiceForZone = useCallback((zoneObject: AreaData, x: number, y: number) => {
    const diceRoll = Math.floor(Math.random() * zoneObject.rating) + 1;
    console.log(`Rolled a ${diceRoll} out of ${zoneObject.rating} for ${zoneObject.title}`);

    let amount;
    if (diceRoll === 1) {
      amount = -100;
      Rune.actions.updateScratch({ playerId, amount: 1 });
      console.log(`Player got scratched! ${playerId}`);
      // Scratch effect handled in App.tsx
    } else {
      amount = Math.ceil(100 / zoneObject.rating);
      
      // Use risk-based visual effects instead of just hearts
      createRiskBasedEffect(diceRoll, zoneObject.rating, x, y);
    }

    // Add the action to the queue
    actionQueue.current.push({ playerId, amount });
  }, [playerId]);

  const handlePointerDown = useCallback((zone: string, event: React.PointerEvent<HTMLAreaElement> | React.TouchEvent<HTMLAreaElement>) => {
    console.log(`Pointer down in ${zone}`);
    setActiveZone(zone);
    
    // Get coordinates from event
    let x, y;
    if ('touches' in event && event.touches.length) {
      x = event.touches[0].clientX;
      y = event.touches[0].clientY;
    } else if ('clientX' in event) {
      x = event.clientX;
      y = event.clientY;
    }
    
    // Create petting effect
    if (x && y) {
      createLoveParticles(x, y, 3);
    }
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
        // Increment counter and only show visual effects every 10th zone crossing
        zoneCrossingCounter.current += 1;
        
        rollDiceForZone(zoneObject, clientX, clientY);
        setActiveZone(zone);
        
        // Only show visual effects every 10th zone crossing to reduce clutter
        if (zoneCrossingCounter.current % 10 === 0) {
          console.log(`Showing visual effects for zone crossing #${zoneCrossingCounter.current}`);
          // Visual feedback for petting zone only every 10th crossing
          const areaElement = areaRefs.current[zone];
          if (areaElement) {
            triggerPettingEffect(areaElement);
          }
        }
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

  const handleAreaClick = useCallback((area: AreaData, event: React.MouseEvent<HTMLAreaElement>) => {
    rollDiceForZone(area, event.clientX, event.clientY);
  }, [rollDiceForZone]);

  return (
    <div>
      <map
        name={imageName}
        style={{ cursor: playerId ? 'grabbing' : 'default' }}
      >
        {mapData.map((area, index) => (
          <area
            key={index}
            ref={el => areaRefs.current[area.title] = el}
            alt={area.title}
            title={area.title}
            onPointerDown={(e) => handlePointerDown(area.title, e)}
            onTouchStart={(e) => handlePointerDown(area.title, e)}
            onClick={(e) => handleAreaClick(area, e)}
            coords={area.coords}
            shape={area.shape}
            className="petting-zone"
            style={{ cursor: 'grab' }}
          />
        ))}
      </map>
    </div>
  );
};

export default PettingZones;
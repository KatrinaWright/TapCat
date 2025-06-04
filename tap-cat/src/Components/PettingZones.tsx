import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createFloatingHeart, createLoveParticles, triggerPettingEffect } from '../animationHelpers.js';

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
      
      // Create floating heart for successful pets
      const event = new MouseEvent('click', { 
        clientX: Math.random() * window.innerWidth, 
        clientY: Math.random() * window.innerHeight 
      });
      createFloatingHeart(
        event.clientX || Math.random() * window.innerWidth, 
        event.clientY || Math.random() * window.innerHeight, 
        'small'
      );
      
      // Create love particles
      createLoveParticles(
        event.clientX || Math.random() * window.innerWidth, 
        event.clientY || Math.random() * window.innerHeight, 
        2
      );
    }

    // Add the action to the queue
    actionQueue.current.push({ playerId, amount });
  }, [playerId]);

  const handlePointerDown = useCallback((zone: string, event?: MouseEvent | TouchEvent) => {
    console.log(`Pointer down in ${zone}`);
    setActiveZone(zone);
    
    // Create interaction effects
    if (event) {
      const clientX = (event instanceof TouchEvent) ? event.touches[0].clientX : event.clientX;
      const clientY = (event instanceof TouchEvent) ? event.touches[0].clientY : event.clientY;
      
      createLoveParticles(clientX, clientY, 3);
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
        rollDiceForZone(zoneObject);
        setActiveZone(zone);
        
        // Add petting effect to the area element
        triggerPettingEffect(element as HTMLAreaElement);
      }
    }
  }, [activeZone, mapData, rollDiceForZone]);

  const handlePointerUp = useCallback(() => {
    console.log('Pointer up');
    setActiveZone(null);
  }, []);

  const handleAreaClick = useCallback((area: AreaData, event: React.MouseEvent | React.TouchEvent) => {
    // Create floating heart at click location
    const clientX = 'clientX' in event ? event.clientX : event.touches[0].clientX;
    const clientY = 'clientY' in event ? event.clientY : event.touches[0].clientY;
    
    createFloatingHeart(clientX, clientY, 'medium');
    createLoveParticles(clientX, clientY, 5);
    
    // Roll dice for the zone
    rollDiceForZone(area);
  }, [rollDiceForZone]);

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
        onPointerDown={(e: React.PointerEvent<HTMLElement>) => handlePointerDown((e.target as HTMLAreaElement).alt, e.nativeEvent)}
        style={{ cursor: playerId ? 'grabbing' : 'default' }}
      >
        {mapData.map((area, index) => (
          <area
            key={index}
            alt={area.title}
            title={area.title}
            onPointerDown={(e) => handlePointerDown(area.title, e.nativeEvent)}
            onTouchStart={(e) => handlePointerDown(area.title, e.nativeEvent)}
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
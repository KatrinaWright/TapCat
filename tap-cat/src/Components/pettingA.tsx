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
  const pointerDownRef = useRef<boolean>(false);

  // Dice rolling logic for a zone
  const rollDiceForZone = useCallback((zoneObject: AreaData) => { 
    const diceRoll = Math.floor(Math.random() * zoneObject.rating) + 1; 
    let amount = diceRoll === 1 ? -100 : Math.ceil(100 / zoneObject.rating); 

   // Update scratch action for player if dice roll is 1
    if (diceRoll === 1) { 
      Rune.actions.updateScratch({ playerId, amount: 1 });         
    } else {        
      // Add the action to the queue     
      actionQueue.current.push({ playerId, amount });   
    }  
  }, [playerId]); 

  const handlePointerEvent = useCallback(
    (event: MouseEvent | TouchEvent, isDown: boolean) => {  
      event.preventDefault(); // Prevent default touch behavior 
      const clientX = (event instanceof TouchEvent) ? event.touches[0].clientX : event.clientX; 
      const clientY = (event instanceof TouchEvent) ? event.touches[0].clientY : event.clientY; 

      const element = document.elementFromPoint(clientX, clientY); 
      if (element && element.tagName === 'AREA') { 
        const zone = (element as HTMLAreaElement).alt; 
        const zoneObject = mapData.find(area => area.title === zone);
  
if (zoneObject && isDown && !pointerDownRef.current) {     
          pointerDownRef.current = true;
          setActiveZone(zone);     
          rollDiceForZone(zoneObject); 
        } else if (activeZone && !isDown) {      
          pointerDownRef.current = false;
          setActiveZone(null);    
        }   
      } 
    }, [activeZone, mapData, rollDiceForZone]
  ); 

  useEffect(() => {     
    const handleMouseEvent = (event: MouseEvent) => handlePointerEvent(event, event.type === 'mousedown');    
    const handleTouchEvent = (event: TouchEvent) => handlePointerEvent(event, event.type === 'touchstart');

    document.addEventListener('mousemove', handleMouseEvent); 
    document.addEventListener('touchmove', handleTouchEvent);    
    document.addEventListener('mouseup', handleMouseEvent); 
    document.addEventListener('touchend', handleMouseEvent);  

    return () => {     
      document.removeEventListener('mousemove', handleMouseEvent); 
      document.removeEventListener('touchmove', handleTouchEvent);    
      document.removeEventListener('mouseup', handleMouseEvent); 
      document.removeEventListener('touchend', handleMouseEvent);   
    }; 
  }, [handlePointerEvent]);   

  useEffect(() => {    
    const processQueue = () => {  
      const now = Date.now();     
      if (now - lastActionTime.current > 200 && actionQueue.current.length > 0) { 
        const aggregatedActions = actionQueue.current.reduce<{ [key: string]: number }>((acc, action) => {         acc[action.playerId] = (acc[action.playerId] || 0) + action.amount;           return acc;     }, {});     

        Object.keys(aggregatedActions).forEach(playerId =>           Rune.actions.updateScore({ playerId, amount: aggregatedActions[playerId] }));    
  
        actionQueue.current = [];     
        lastActionTime.current = now;   
      }    
      requestAnimationFrame(processQueue); 
    };  

    processQueue();   
  }, []); 

  return (   
    <div>    
      <map name={imageName} style={{ cursor: playerId ? 'grabbing' : 'default' }}>  
        {mapData.map((area, index) => (        
          <area         
            key={index}          
            alt={area.title}          
            title={area.title}         
            coords={area.coords}          
            shape={area.shape}         
            style={{ cursor: 'grab' }}          
            onPointerDown={(e) => handlePointerEvent(e, true)}          
            onPointerUp={() => handlePointerEvent(new MouseEvent('mouseup'), false)}
            onTouchStart={(e) => handlePointerEvent(e, true)}          
            onTouchEnd={() => handlePointerEvent(new TouchEvent('touchend'), false)}        
          />     
        ))}   
      </map>   
    </div> 
  ); 
};  

export default PettingZones;
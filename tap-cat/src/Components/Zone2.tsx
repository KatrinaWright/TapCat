import React, { useState } from 'react';

const zoneText = document.getElementById("highScore");
const diceText = document.getElementById("score");
// paragraph.textContent = "New text here";

const PettingZones: React.FC = () => {
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const handlePointerDown = (zone: string) => {
    console.log(`Pointer down in ${zone}`);
    setActiveZone(zone);
    if (zoneText) {
        zoneText.textContent="Zone: " + zone;
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const zone = (event.target as HTMLAreaElement).alt;
    if (activeZone !== zone) {
      console.log(`Pointer moved to ${zone}`);
      rollDiceForZone(zone);
      setActiveZone(zone);
    }
  };

  const handlePointerUp = () => {
    console.log('Pointer up');
    setActiveZone(null);
  };

  const rollDiceForZone = (zone: string) => {
    const diceRoll = Math.floor(Math.random() * 100) + 1;
    console.log(`Rolled a ${diceRoll} for ${zone}`);
    // $('#score').text("diceRoll: " + diceRoll + " for " + zone);
    if (diceText) {
        diceText.textContent="diceRoll: " + diceRoll + " for " + zone;
    }
  };

  return (
    <map name="image-map" onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}>
      <area
        target="_blank"
        alt="Head"
        title="Head"
        onPointerDown={() => handlePointerDown('Head')}
        coords="120,238,111,186,128,144,127,63,183,90,233,80,277,91,329,63,340,84,335,146,348,187,344,223,330,252,297,273,255,283,211,287,178,279,158,240"
        shape="poly"
      />
      <area
        target="_blank"
        alt="DriverPaw"
        title="DriverPaw"
        onPointerDown={() => handlePointerDown('DriverPaw')}
        coords="212,297,253,339"
        shape="rect"
      />
      <area
        target="_blank"
        alt="PassengerPaw"
        title="PassengerPaw"
        onPointerDown={() => handlePointerDown('PassengerPaw')}
        coords="188,374,180,386,179,403,191,420,218,436,237,412,213,382"
        shape="poly"
      />
      <area
        target="_blank"
        alt="toeBeans"
        title="toeBeans"
        onPointerDown={() => handlePointerDown('toeBeans')}
        coords="278,410,15"
        shape="circle"
      />
      <area
        target="_blank"
        alt="NonoZone"
        title="NonoZone"
        onPointerDown={() => handlePointerDown('NonoZone')}
        coords="248,374,16"
        shape="circle"
      />
      <area
        target="_blank"
        alt="CompRUS"
        title="CompRUS"
        onPointerDown={() => handlePointerDown('CompRUS')}
        coords="156,240,30,242,24,251,70,356,210,356,269,355,274,344,204,341"
        shape="poly"
      />
      <area
        target="_blank"
        alt="Body"
        title="Body"
        onPointerDown={() => handlePointerDown('Body')}
        coords="204,288,184,289,206,335,211,295,254,295,256,338,276,343,270,359,196,359,194,372,235,402,240,390,228,373,239,359,259,360,267,376,286,394,312,415,337,402,358,366,320,337,280,279"
        shape="poly"
      />
      <area
        target="_blank"
        alt="Back"
        title="Back"
        onPointerDown={() => handlePointerDown('Back')}
        coords="310,270,286,279,323,335,359,360,347,309"
        shape="poly"
      />
      <area
        target="_blank"
        alt="TailUp"
        title="TailUp"
        onPointerDown={() => handlePointerDown('TailUp')}
        coords="339,289,323,274,331,256,354,242,385,232,418,265,420,307,404,323,389,337,372,349,357,355,358,327,370,287,371,275,364,260,355,265"
        shape="poly"
      />
      <area
        target="_blank"
        alt="tailDown"
        title="tailDown"
        onPointerDown={() => handlePointerDown('tailDown')}
        coords="361,358,361,370,394,368,411,364,436,348,472,337,459,306,441,292,426,287,409,296,362,332"
        shape="poly"
      />
      <area
        target="_blank"
        alt="DriverFoot"
        title="DriverFoot"
        onPointerDown={() => handlePointerDown('DriverFoot')}
        coords="318,418,315,436,296,444,276,439,263,426,253,406,250,393,268,379,283,391,273,393,265,400,263,413,273,425,292,417,295,409,293,401"
        shape="poly"
      />
    </map>
  );
};

export default PettingZones;
import React, { useState, useEffect, useCallback } from 'react';

const PettingZones: React.FC = () => {
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
            name="image-map"
            onPointerDown={(e: React.PointerEvent<HTMLElement>) => handlePointerDown((e.target as HTMLAreaElement).alt)}>

            <area
            alt="Mouth"
            title="Mouth"
            onPointerDown={() => handlePointerDown('Mouth')}
            onTouchStart={() => handlePointerDown('Mouth')}
            onClick={() => console.log('25')}
            coords="216,155,14"
            shape="circle"
            />
            <area
            alt="PassPaw"
            title="PassPaw"
            onPointerDown={() => handlePointerDown('PassPaw')}
            onTouchStart={() => handlePointerDown('PassPaw')}
            onClick={() => console.log('40')}
            coords="225,313,11"
            shape="circle"
            />
            <area
            alt="DriveFoot1"
            title="DriveFoot1"
            onPointerDown={() => handlePointerDown('DriveFoot1')}
            onTouchStart={() => handlePointerDown('DriveFoot1')}
            onClick={() => console.log('40')}
            coords="241,301,10"
            shape="circle"
            />
            <area
            alt="PassFoot2"
            title="PassFoot2"
            onPointerDown={() => handlePointerDown('PassFoot2')}
            onTouchStart={() => handlePointerDown('PassFoot2')}
            onClick={() => console.log('40')}
            coords="137,303,179,320"
            shape="rect"
            />
            <area
            alt="PassFoot1"
            title="PassFoot1"
            onPointerDown={() => handlePointerDown('PassFoot1')}
            onTouchStart={() => handlePointerDown('PassFoot1')}
            onClick={() => console.log('40')}
            coords="187,312,11"
            shape="circle"
            />
            <area
            alt="DriveFoot2"
            title="DriveFoot2"
            onPointerDown={() => handlePointerDown('DriveFoot2')}
            onTouchStart={() => handlePointerDown('DriveFoot2')}
            onClick={() => console.log('40')}
            coords="197,288,189,298,197,305,197,312,207,311"
            shape="poly"
            />
            <area
            alt="DriveFoot3"
            title="DriveFoot3"
            onPointerDown={() => handlePointerDown('DriveFoot3')}
            onTouchStart={() => handlePointerDown('DriveFoot3')}
            onClick={() => console.log('40')}
            coords="249,277,228,284,229,296,237,290,244,290"
            shape="poly"
            />
            <area
            alt="Back1"
            title="Back1"
            onPointerDown={() => handlePointerDown('Back1')}
            onTouchStart={() => handlePointerDown('Back1')}
            onClick={() => console.log('500')}
            coords="162,209,171,224"
            shape="rect"
            />
            <area
            alt="Back2"
            title="Back2"
            onPointerDown={() => handlePointerDown('Back2')}
            onTouchStart={() => handlePointerDown('Back2')}
            onClick={() => console.log('500')}
            coords="153,214,161,230"
            shape="rect"
            />
            <area
            alt="Back3"
            title="Back3"
            onPointerDown={() => handlePointerDown('Back3')}
            onTouchStart={() => handlePointerDown('Back3')}
            onClick={() => console.log('500')}
            coords="145,222,153,238"
            shape="rect"
            />
            <area
            alt="Back4"
            title="Back4"
            onPointerDown={() => handlePointerDown('Back4')}
            onTouchStart={() => handlePointerDown('Back4')}
            onClick={() => console.log('500')}
            coords="137,231,144,248"
            shape="rect"
            />
            <area
            alt="Back5"
            title="Back5"
            onPointerDown={() => handlePointerDown('Back5')}
            onTouchStart={() => handlePointerDown('Back5')}
            onClick={() => console.log('500')}
            coords="162,225,173,240"
            shape="rect"
            />
            <area
            alt="Back6"
            title="Back6"
            onPointerDown={() => handlePointerDown('Back6')}
            onTouchStart={() => handlePointerDown('Back6')}
            onClick={() => console.log('500')}
            coords="153,231,161,248"
            shape="rect"
            />
            <area
            alt="Back7"
            title="Back7"
            onPointerDown={() => handlePointerDown('Back7')}
            onTouchStart={() => handlePointerDown('Back7')}
            onClick={() => console.log('500')}
            coords="145,238,153,254"
            shape="rect"
            />
            <area
            alt="PassArm1"
            title="PassArm1"
            onPointerDown={() => handlePointerDown('PassArm1')}
            onTouchStart={() => handlePointerDown('PassArm1')}
            onClick={() => console.log('40')}
            coords="213,318,205,301,227,292,232,302,217,303,213,312"
            shape="poly"
            />
            <area
            alt="PassArm2"
            title="PassArm2"
            onPointerDown={() => handlePointerDown('PassArm2')}
            onTouchStart={() => handlePointerDown('PassArm2')}
            onClick={() => console.log('40')}
            coords="205,300,197,287,195,277,225,271,229,291,217,296"
            shape="poly"
            />
            <area
            alt="Belly1"
            title="Belly1"
            onPointerDown={() => handlePointerDown('Belly1')}
            onTouchStart={() => handlePointerDown('Belly1')}
            onClick={() => console.log('25')}
            coords="225,268,259,268,248,278,229,283"
            shape="poly"
            />
            <area
            alt="Belly2"
            title="Belly2"
            onPointerDown={() => handlePointerDown('Belly2')}
            onTouchStart={() => handlePointerDown('Belly2')}
            onClick={() => console.log('25')}
            coords="224,253,244,251,243,268,223,268"
            shape="poly"
            />
            <area
            alt="Belly3"
            title="Belly3"
            onPointerDown={() => handlePointerDown('Belly3')}
            onTouchStart={() => handlePointerDown('Belly3')}
            onClick={() => console.log('25')}
            coords="245,250,270,251,262,266"
            shape="poly"
            />
            <area
            alt="Belly4"
            title="Belly4"
            onPointerDown={() => handlePointerDown('Belly4')}
            onTouchStart={() => handlePointerDown('Belly4')}
            onClick={() => console.log('25')}
            coords="263,267,243,268,245,250,260,264"
            shape="poly"
            />
            <area
            alt="Belly5"
            title="Belly5"
            onPointerDown={() => handlePointerDown('Belly5')}
            onTouchStart={() => handlePointerDown('Belly5')}
            onClick={() => console.log('25')}
            coords="276,234,271,251,246,251"
            shape="poly"
            />
            <area
            alt="Belly6"
            title="Belly6"
            onPointerDown={() => handlePointerDown('Belly6')}
            onTouchStart={() => handlePointerDown('Belly6')}
            onClick={() => console.log('25')}
            coords="248,251,224,251,227,233"
            shape="poly"
            />
            <area
            alt="Face1"
            title="Face1"
            onPointerDown={() => handlePointerDown('Face1')}
            onTouchStart={() => handlePointerDown('Face1')}
            onClick={() => console.log('150')}
            coords="228,144,251,161,241,194"
            shape="poly"
            />
            <area
            alt="Face2"
            title="Face2"
            onPointerDown={() => handlePointerDown('Face2')}
            onTouchStart={() => handlePointerDown('Face2')}
            onClick={() => console.log('150')}
            coords="201,149,189,173,209,201"
            shape="poly"
            />
            <area
            alt="Face3"
            title="Face3"
            onPointerDown={() => handlePointerDown('Face3')}
            onTouchStart={() => handlePointerDown('Face3')}
            onClick={() => console.log('150')}
            coords="203,164,229,200,210,203"
            shape="poly"
            />
            <area
            alt="Face4"
            title="Face4"
            onPointerDown={() => handlePointerDown('Face4')}
            onTouchStart={() => handlePointerDown('Face4')}
            onClick={() => console.log('150')}
            coords="231,160,241,196,227,200"
            shape="poly"
            />
            <area
            alt="Face5"
            title="Face5"
            onPointerDown={() => handlePointerDown('Face5')}
            onTouchStart={() => handlePointerDown('Face5')}
            onClick={() => console.log('150')}
            coords="228,177,214,180,227,195"
            shape="poly"
            />
            <area
            alt="Face6"
            title="Face6"
            onPointerDown={() => handlePointerDown('Face6')}
            onTouchStart={() => handlePointerDown('Face6')}
            onClick={() => console.log('150')}
            coords="230,161,224,168,215,170,204,164,215,180,229,178"
            shape="poly"
            />
            <area
            alt="EyePass"
            title="EyePass"
            onPointerDown={() => handlePointerDown('EyePass')}
            onTouchStart={() => handlePointerDown('EyePass')}
            onClick={() => console.log('10')}
            coords="182,141,12"
            shape="circle"
            />
            <area
            alt="EyeDrive"
            title="EyeDrive"
            onPointerDown={() => handlePointerDown('EyeDrive')}
            onTouchStart={() => handlePointerDown('EyeDrive')}
            onClick={() => console.log('10')}
            coords="247,128,13"
            shape="circle"
            />
            <area
            alt="Face7"
            title="Face7"
            onPointerDown={() => handlePointerDown('Face7')}
            onTouchStart={() => handlePointerDown('Face7')}
            onClick={() => console.log('75')}
            coords="194,139,201,148,189,172,179,157"
            shape="poly"
            />
            <area
            alt="Face8"
            title="Face8"
            onPointerDown={() => handlePointerDown('Face8')}
            onTouchStart={() => handlePointerDown('Face8')}
            onClick={() => console.log('75')}
            coords="232,131,227,144,251,159,256,138"
            shape="poly"
            />
            <area
            alt="Nose1"
            title="Nose1"
            onPointerDown={() => handlePointerDown('Nose1')}
            onTouchStart={() => handlePointerDown('Nose1')}
            onClick={() => console.log('400')}
            coords="202,148,199,141,226,137"
            shape="poly"
            />
            <area
            alt="Nose2"
            title="Nose2"
            onPointerDown={() => handlePointerDown('Nose2')}
            onTouchStart={() => handlePointerDown('Nose2')}
            onClick={() => console.log('400')}
            coords="227,144,231,128,196,138"
            shape="poly"
            />
            <area
            alt="Nose3"
            title="Nose3"
            onPointerDown={() => handlePointerDown('Nose3')}
            onTouchStart={() => handlePointerDown('Nose3')}
            onClick={() => console.log('400')}
            coords="195,137,188,127,233,128"
            shape="poly"
            />
            <area
            alt="Nose4"
            title="Nose4"
            onPointerDown={() => handlePointerDown('Nose4')}
            onTouchStart={() => handlePointerDown('Nose4')}
            onClick={() => console.log('400')}
            coords="239,114,233,127,188,126,221,118"
            shape="poly"
            />
            <area
            alt="Forehead1"
            title="Forehead1"
            onPointerDown={() => handlePointerDown('Forehead1')}
            onTouchStart={() => handlePointerDown('Forehead1')}
            onClick={() => console.log('600')}
            coords="170,131,137,113,170,121,149,96,179,111,161,82,190,101,174,74,202,95,195,66,221,91,216,60,246,89,238,62,253,89,256,73,260,92,271,88,267,99,283,98,271,108,255,116,253,101,240,113,233,94,225,114,211,97,205,117,197,103,194,122,183,125"
            shape="poly"
            />
            <area
            alt="Forehead2"
            title="Forehead2"
            onPointerDown={() => handlePointerDown('Forehead2')}
            onTouchStart={() => handlePointerDown('Forehead2')}
            onClick={() => console.log('600')}
            coords="124,72,137,114,172,121"
            shape="poly"
            />
            <area
            alt="Forehead3"
            title="Forehead3"
            onPointerDown={() => handlePointerDown('Forehead3')}
            onTouchStart={() => handlePointerDown('Forehead3')}
            onClick={() => console.log('600')}
            coords="124,71,160,81,176,109,147,95"
            shape="poly"
            />
            <area
            alt="Forehead4"
            title="Forehead4"
            onPointerDown={() => handlePointerDown('Forehead4')}
            onTouchStart={() => handlePointerDown('Forehead4')}
            onClick={() => console.log('600')}
            coords="126,70,126,60,137,60,160,80,173,76,188,98"
            shape="poly"
            />
            <area
            alt="Forehead5"
            title="Forehead5"
            onPointerDown={() => handlePointerDown('Forehead5')}
            onTouchStart={() => handlePointerDown('Forehead5')}
            onClick={() => console.log('600')}
            coords="140,60,160,79,173,75"
            shape="poly"
            />
            <area
            alt="Forehead6"
            title="Forehead6"
            onPointerDown={() => handlePointerDown('Forehead6')}
            onTouchStart={() => handlePointerDown('Forehead6')}
            onClick={() => console.log('600')}
            coords="172,73,200,92,194,62,181,65"
            shape="poly"
            />
            <area
            alt="Forehead7"
            title="Forehead7"
            onPointerDown={() => handlePointerDown('Forehead7')}
            onTouchStart={() => handlePointerDown('Forehead7')}
            onClick={() => console.log('600')}
            coords="193,63,220,88,214,59"
            shape="poly"
            />
            <area
            alt="Forehead8"
            title="Forehead8"
            onPointerDown={() => handlePointerDown('Forehead8')}
            onTouchStart={() => handlePointerDown('Forehead8')}
            onClick={() => console.log('600')}
            coords="216,59,244,85,237,62,252,87,266,34,240,54,230,60"
            shape="poly"
            />
            <area
            alt="Forehead9"
            title="Forehead9"
            onPointerDown={() => handlePointerDown('Forehead9')}
            onTouchStart={() => handlePointerDown('Forehead9')}
            onClick={() => console.log('600')}
            coords="195,122,197,106,205,117,211,99,223,114,233,97,238,112,252,103,254,115"
            shape="poly"
            />
            <area
            alt="TailBase"
            title="TailBase"
            onPointerDown={() => handlePointerDown('TailBase')}
            onTouchStart={() => handlePointerDown('TailBase')}
            onClick={() => console.log('300')}
            coords="121,260,105,282"
            shape="rect"
            />
            <area
            alt="Cheek1"
            title="Cheek1"
            onPointerDown={() => handlePointerDown('Cheek1')}
            onTouchStart={() => handlePointerDown('Cheek1')}
            onClick={() => console.log('300')}
            coords="169,132,136,114,161,140,137,143,161,152,141,165,164,169,117,187,166,181,166,193,195,189,191,199,208,202"
            shape="poly"
            />
            <area
            alt="Cheek2"
            title="Cheek2"
            onPointerDown={() => handlePointerDown('Cheek2')}
            onTouchStart={() => handlePointerDown('Cheek2')}
            onClick={() => console.log('300')}
            coords="207,203,178,201,163,197,146,186,164,182,168,192,193,189,190,199"
            shape="poly"
            />
            <area
            alt="Cheek3"
            title="Cheek3"
            onPointerDown={() => handlePointerDown('Cheek3')}
            onTouchStart={() => handlePointerDown('Cheek3')}
            onClick={() => console.log('300')}
            coords="138,116,133,128,131,142,131,149,132,156,105,165,134,162,139,178,160,170,141,166,157,152,138,145,158,139"
            shape="poly"
            />
            <area
            alt="Cheek4"
            title="Cheek4"
            onPointerDown={() => handlePointerDown('Cheek4')}
            onTouchStart={() => handlePointerDown('Cheek4')}
            onClick={() => console.log('300')}
            coords="242,196,261,182,253,176,278,166,263,157,283,146,270,142,327,125,271,133,292,118,270,119,288,105,285,97,271,109,256,117,261,130"
            shape="poly"
            />
            <area
            alt="Cheek5"
            title="Cheek5"
            onPointerDown={() => handlePointerDown('Cheek5')}
            onTouchStart={() => handlePointerDown('Cheek5')}
            onClick={() => console.log('300')}
            coords="243,197,271,184,286,172,294,158,297,152,326,152,295,147,297,139,300,134,273,142,284,144,265,157,278,165,255,176,262,182"
            shape="poly"
            />
            <area
            alt="Cheek6"
            title="Cheek6"
            onPointerDown={() => handlePointerDown('Cheek6')}
            onTouchStart={() => handlePointerDown('Cheek6')}
            onClick={() => console.log('300')}
            coords="296,128,273,132,295,117,273,117,288,106,284,97,268,97,271,87,261,90,257,73,278,87,292,110"
            shape="poly"
            />
            <area
            alt="Ear1"
            title="Ear1"
            onPointerDown={() => handlePointerDown('Ear1')}
            onTouchStart={() => handlePointerDown('Ear1')}
            onClick={() => console.log('300')}
            coords="256,72,256,71,279,73,260,58,277,57,263,46,275,44,266,35,256,72"
            shape="poly"
            />
            <area
            alt="Ear2"
            title="Ear2"
            onPointerDown={() => handlePointerDown('Ear2')}
            onTouchStart={() => handlePointerDown('Ear2')}
            onClick={() => console.log('300')}
            coords="268,32,278,46,278,60,280,85,280,91,255,72,277,75,263,60,276,54,266,47"
            shape="poly"
            />
            <area
            alt="Tail1"
            title="Tail1"
            onPointerDown={() => handlePointerDown('Tail1')}
            onTouchStart={() => handlePointerDown('Tail1')}
            onClick={() => console.log('100')}
            coords="106,281,85,271,75,261,72,251,90,244,101,243,109,239,116,260,106,261"
            shape="poly"
            />
            <area
            alt="Tail2"
            title="Tail2"
            onPointerDown={() => handlePointerDown('Tail2')}
            onTouchStart={() => handlePointerDown('Tail2')}
            onClick={() => console.log('100')}
            coords="71,250,64,214,113,196,110,240"
            shape="poly"
            />
            <area
            alt="Tail3"
            title="Tail3"
            onPointerDown={() => handlePointerDown('Tail3')}
            onTouchStart={() => handlePointerDown('Tail3')}
            onClick={() => console.log('100')}
            coords="64,213,33,211,36,176,48,139,76,151,100,163,110,180,111,196"
            shape="poly"
            />
            <area
            alt="BackLeg1"
            title="BackLeg1"
            onPointerDown={() => handlePointerDown('BackLeg1')}
            onTouchStart={() => handlePointerDown('BackLeg1')}
            onClick={() => console.log('100')}
            coords="141,302,196,287,182,302"
            shape="poly"
            />
            <area
            alt="Butt1"
            title="Butt1"
            onPointerDown={() => handlePointerDown('Butt1')}
            onTouchStart={() => handlePointerDown('Butt1')}
            onClick={() => console.log('1000')}
            coords="135,238,128,251,148,271"
            shape="poly"
            />
            <area
            alt="Butt2"
            title="Butt2"
            onPointerDown={() => handlePointerDown('Butt2')}
            onTouchStart={() => handlePointerDown('Butt2')}
            onClick={() => console.log('1000')}
            coords="147,270,140,279,126,251"
            shape="poly"
            />
            <area
            alt="Butt3"
            title="Butt3"
            onPointerDown={() => handlePointerDown('Butt3')}
            onTouchStart={() => handlePointerDown('Butt3')}
            onClick={() => console.log('1000')}
            coords="126,252,123,264,138,279"
            shape="poly"
            />
            <area
            alt="Butt4"
            title="Butt4"
            onPointerDown={() => handlePointerDown('Butt4')}
            onTouchStart={() => handlePointerDown('Butt4')}
            onClick={() => console.log('1000')}
            coords="137,278,124,267,123,277"
            shape="poly"
            />
            <area
            alt="Butt5"
            title="Butt5"
            onPointerDown={() => handlePointerDown('Butt5')}
            onTouchStart={() => handlePointerDown('Butt5')}
            onClick={() => console.log('300')}
            coords="138,279,124,279,130,290,137,295,140,301,195,286,145,289"
            shape="poly"
            />
            <area
            alt="BackLeg2"
            title="BackLeg2"
            onPointerDown={() => handlePointerDown('BackLeg2')}
            onTouchStart={() => handlePointerDown('BackLeg2')}
            onClick={() => console.log('100')}
            coords="195,287,194,274,181,264,146,289"
            shape="poly"
            />
            <area
            alt="midBod"
            title="midBod"
            onPointerDown={() => handlePointerDown('midBod')}
            onTouchStart={() => handlePointerDown('midBod')}
            onClick={() => console.log('500')}
            coords="145,288,141,280,149,270,141,250,151,255,154,249,161,251,162,241,173,241"
            shape="poly"
            />
            <area
            alt="WavingArm"
            title="WavingArm"
            onPointerDown={() => handlePointerDown('WavingArm')}
            onTouchStart={() => handlePointerDown('WavingArm')}
            onClick={() => console.log('100')}
            coords="272,225,297,185"
            shape="rect"
            />
            <area
            alt="midBod"
            title="midBod"
            onPointerDown={() => handlePointerDown('midBod')}
            onTouchStart={() => handlePointerDown('midBod')}
            onClick={() => console.log('500')}
            coords="146,287,173,240,225,232"
            shape="poly"
            />
            <area
            alt="midBod"
            title="midBod"
            onPointerDown={() => handlePointerDown('midBod')}
            onTouchStart={() => handlePointerDown('midBod')}
            onClick={() => console.log('500')}
            coords="170,203,226,232,174,240"
            shape="poly"
            />
            <area
            alt="WavingPaw"
            title="WavingPaw"
            onPointerDown={() => handlePointerDown('WavingPaw')}
            onTouchStart={() => handlePointerDown('WavingPaw')}
            onClick={() => console.log('100')}
            coords="274,184,296,162,313,181,314,212,298,225,298,184"
            shape="poly"
            />
            <area
            alt="Leg"
            title="Leg"
            onPointerDown={() => handlePointerDown('Leg')}
            onTouchStart={() => handlePointerDown('Leg')}
            onClick={() => console.log('300')}
            coords="225,235,182,263,194,275,223,270"
            shape="poly"
            />
            <area
            alt="Chest1"
            title="Chest1"
            onPointerDown={() => handlePointerDown('Chest1')}
            onTouchStart={() => handlePointerDown('Chest1')}
            onClick={() => console.log('750')}
            coords="270,185,223,203,173,201,191,214,235,205,266,191,269,199,219,219,269,206,270,215,230,229,270,223,271,231,239,237,263,239,247,249,275,233"
            shape="poly"
            />
            <area
            alt="Chest2"
            title="Chest2"
            onPointerDown={() => handlePointerDown('Chest2')}
            onTouchStart={() => handlePointerDown('Chest2')}
            onClick={() => console.log('750')}
            coords="195,215,265,192,267,198,219,218,267,208,269,214,230,229,269,225,266,231,239,236,257,241,246,249"
            shape="poly"
            />
        </map>

    </div>
    );
};

export default PettingZones;

// Suggestion for moving data out of the component to make a reusable component for each cat picture
// mapFile.json
// [
// {
// title: “Leg”,
// rating: 300,
// coords: "225,235,182,263,194,275,223,270”,
// shape: “poly”
// },{
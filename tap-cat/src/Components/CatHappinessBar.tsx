import React, { useEffect, useState, useRef } from 'react';
import './CatHappinessBar.css';
import LeftImage from '../assets/cat.svg'; 
import RightImage from '../assets/happy-cat.svg'; 
import { createHappinessCelebration, createFloatingHeart } from '../animationHelpers';

interface CatHappinessBarProps {
  catHappiness: number;
}

const CatHappinessBar: React.FC<CatHappinessBarProps> = ({ catHappiness }) => {
  const [previousHappiness, setPreviousHappiness] = useState<number>(0);
  const barRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const happinessPercentage = Math.round((catHappiness / 1000) * 100);

  const getColorClass = (percentage: number) => {
    if (percentage < 10) return 'red low-percentage';
    if (percentage < 30) return 'orange';
    if (percentage < 50) return 'yellow';
    if (percentage < 70) return 'green';
    if (percentage < 90) return 'blue';
    return 'purple';
  };

  // Check for happiness milestones
  useEffect(() => {
    const prevPercent = Math.round((previousHappiness / 1000) * 100);
    const currentPercent = happinessPercentage;

    // Crossing milestone thresholds
    if (prevPercent < 90 && currentPercent >= 90) {
      createHappinessCelebration('🌟💖 MAXIMUM LOVE! 💖🌟');
      spawnHeartsFromBar(5, 'large');
    } else if (prevPercent < 75 && currentPercent >= 75) {
      createHappinessCelebration('😻 VERY HAPPY! 😻');
      spawnHeartsFromBar(3, 'medium');
    } else if (prevPercent < 50 && currentPercent >= 50) {
      createHappinessCelebration('😸 CONTENT! 😸');
      spawnHeartsFromBar(1, 'small');
    } else if (currentPercent > prevPercent + 5) {
      // Happiness increased by more than 5%
      spawnHeartsFromBar(1, 'small');
    }

    setPreviousHappiness(catHappiness);
  }, [catHappiness, happinessPercentage]);

  const spawnHeartsFromBar = (count: number, size: 'small' | 'medium' | 'large') => {
    if (!barRef.current) return;
    
    const rect = barRef.current.getBoundingClientRect();
    
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const randomX = rect.left + Math.random() * rect.width;
        const randomY = rect.top + Math.random() * rect.height;
        createFloatingHeart(randomX, randomY, size);
      }, i * 200);
    }
  };

  return (
    <div ref={containerRef} className="cat-happiness-container cat-happiness-bar">
      <img src={LeftImage} alt="Left" className="side-image" />
      <div className="cat-happiness-bar">
        <div
          ref={barRef}
          className={`cat-happiness-fill ${getColorClass(happinessPercentage)} ${happinessPercentage >= 90 ? 'milestone-reached' : ''}`}
          style={{ width: `${happinessPercentage}%` }}
        >
          <span className="happiness-text">{happinessPercentage}%</span>
        </div>
      </div>
      <img src={RightImage} alt="Right" className="side-image" />
    </div>
  );
};

export default CatHappinessBar;
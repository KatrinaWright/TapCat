import React from 'react';
import './CatHappinessBar.css';
import LeftImage from '../assets/cat.svg'; 
import RightImage from '../assets/happy-cat.svg'; 

interface CatHappinessBarProps {
  catHappiness: number;
}

const CatHappinessBar: React.FC<CatHappinessBarProps> = ({ catHappiness }) => {
  const happinessPercentage = Math.round((catHappiness / 1000) * 100);

  const getColorClass = (percentage: number) => {
    if (percentage < 10) return 'red low-percentage';
    if (percentage < 30) return 'orange';
    if (percentage < 50) return 'yellow';
    if (percentage < 70) return 'green';
    if (percentage < 90) return 'blue';
    return 'purple';
  };

  return (
    <div className="cat-happiness-container">
      <img src={LeftImage} alt="Left" className="side-image" />
      <div className="cat-happiness-bar">
        <div
          className={`cat-happiness-fill ${getColorClass(happinessPercentage)}`}
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

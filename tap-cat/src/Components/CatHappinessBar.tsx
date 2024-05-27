import React from 'react';
import './CatHappinessBar.css';
import PettingIcon from '../assets/petting.svg';

interface CatHappinessBarProps {
  catHappiness: number;
}

const CatHappinessBar: React.FC<CatHappinessBarProps> = ({ catHappiness }) => {
  const happinessPercentage = Math.round((catHappiness / 2000) * 100);

  const getColorClass = (percentage: number) => {
    if (percentage < 10) return 'red';
    if (percentage < 30) return 'orange';
    if (percentage < 50) return 'yellow';
    if (percentage < 70) return 'green';
    if (percentage < 90) return 'blue';
    return 'purple';
  };

  return (
    <div className="cat-happiness-container">
      <div className="cat-happiness-text">
        <img src={PettingIcon} alt="Petting icon" className="icon" />
        Cat Happiness: {happinessPercentage}%
      </div>
      <div className="cat-happiness-bar">
        <div
          className={`cat-happiness-fill ${getColorClass(happinessPercentage)}`}
          style={{ width: `${happinessPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default CatHappinessBar;

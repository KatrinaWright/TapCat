import React from 'react';
import './CatHappinessBar.css';

interface CatHappinessBarProps {
  catHappiness: number;
}

const CatHappinessBar: React.FC<CatHappinessBarProps> = ({ catHappiness }) => {
  const happinessPercentage = Math.round((catHappiness / 2000) * 100);

  return (
    <div className="cat-happiness-container">
      <div className="cat-happiness-bar">
        <div
          className="cat-happiness-fill"
          style={{ width: `${happinessPercentage}%` }}
        />
      </div>
      <div className="cat-happiness-text">
        Cat Happiness: {happinessPercentage}%
      </div>
    </div>
  );
};

export default CatHappinessBar;

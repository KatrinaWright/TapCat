import React from 'react';

interface CatHappinessBarProps {
  catHappiness: number;
}

const CatHappinessBar: React.FC<CatHappinessBarProps> = ({ catHappiness }) => {
  return (
    <div id="catHappiness">
      Cat Happiness: {Math.round((catHappiness / 2000) * 100)}%
      <div
        style={{
          width: '100%',
          height: '20px',
          backgroundColor: '#ddd',
          marginTop: '10px',
          position: 'relative'
        }}
      >
        <div
          style={{
            width: `${(catHappiness / 2000) * 100}%`,
            height: '100%',
            backgroundColor: catHappiness >= 1000 ? 'green' : 'red',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        ></div>
      </div>
    </div>
  );
};

export default CatHappinessBar;

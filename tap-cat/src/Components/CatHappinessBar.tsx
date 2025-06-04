import React from "react";

interface CatHappinessBarProps {
  catHappiness: number;
  className?: string;
}

const CatHappinessBar: React.FC<CatHappinessBarProps> = ({ catHappiness, className = '' }) => {
  // Determine color based on happiness
  const getBarColor = () => {
    if (catHappiness < 30) return '#ff5252';  // Red for unhappy
    if (catHappiness < 60) return '#ffc107';  // Yellow for neutral
    return '#4caf50';  // Green for happy
  };

  const barColor = getBarColor();
  
  // Get emojis based on happiness level
  const getEmoji = () => {
    if (catHappiness < 30) return '😾';
    if (catHappiness < 60) return '😺';
    if (catHappiness < 80) return '😸';
    return '😻';
  };
  
  const emoji = getEmoji();
  
  return (
    <div 
      className={`cat-happiness-container ${className}`} 
      style={{ 
        margin: '10px 0',
        padding: '5px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f0f0f0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        <span style={{ marginRight: '10px', fontSize: '24px' }}>{emoji}</span>
        <span style={{ fontWeight: 'bold' }}>Cat Happiness: {catHappiness}%</span>
      </div>
      <div 
        style={{ 
          width: '100%', 
          height: '20px', 
          backgroundColor: '#e0e0e0',
          borderRadius: '3px',
          overflow: 'hidden',
        }}
      >
        <div 
          style={{ 
            width: `${catHappiness}%`,
            height: '100%',
            backgroundColor: barColor,
            transition: 'width 0.5s ease, background-color 0.5s ease',
          }}
        />
      </div>
      {catHappiness > 85 && (
        <div style={{ 
          marginTop: '5px', 
          textAlign: 'center', 
          color: '#4caf50', 
          fontWeight: 'bold',
          animation: 'happiness-pulse 1s infinite'
        }}>
          Cat is purring with joy! ❤️
        </div>
      )}
    </div>
  );
};

export default CatHappinessBar;
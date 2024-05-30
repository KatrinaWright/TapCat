import React from 'react';
import './CatHappinessBar.css';
import LeftImage from '../assets/cat.svg'; 
import RightImage from '../assets/happy-cat.svg'; 

interface CatHappinessBarProps {
  catHappiness: number;
}

const CatHappinessBar: React.FC<CatHappinessBarProps> = ({ catHappiness }) => {
  const happinessPercentage = Math.round((catHappiness / 1000) * 100);

  
const [currentColorClass, setCurrentColorClass] = React.useState(['red', 'red-to-orange']);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      const colorClasses = getColorClass(happinessPercentage);
      setCurrentColorClass(colorClasses);
    }, 1000); // Adjust the timeout duration as needed
    
    return () => clearTimeout(timeoutId);
  }, [happinessPercentage]);


  // const getColorClass = (percentage: number) => {
  //   if (percentage < 10) return 'red low-percentage';
  //   if (percentage < 30) return 'orange';
  //   if (percentage < 50) return 'yellow';
  //   if (percentage < 70) return 'green';
  //   if (percentage < 90) return 'blue';
  //   return 'purple';
  // };
  const getColorClass = (percentage: number) => {
    if (percentage < 10) return ['red', 'red-to-orange'];
    if (percentage < 30) return ['orange', 'orange-to-yellow'];
    if (percentage < 50) return ['yellow', 'yellow-to-green'];
    if (percentage < 70) return ['green', 'green-to-blue'];
    if (percentage < 90) return ['blue', 'blue-to-purple'];
    return ['purple', 'purple-to-red'];
  };

  return (
    <div className="cat-happiness-container">
      <img src={LeftImage} alt="Left" className="side-image" />
      <div className="cat-happiness-bar">
        {/* <div
          className={`cat-happiness-fill ${getColorClass(happinessPercentage)}`}
          style={{ width: `${happinessPercentage}%` }}
        > */}
        <div
      className={`cat-happiness-fill ${currentColorClass.join(' ')}`}
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

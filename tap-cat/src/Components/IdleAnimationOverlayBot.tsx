import React from 'react';

interface IdleAnimationOverlayProps {
  idle: boolean;
}

const IdleAnimationOverlay: React.FC<IdleAnimationOverlayProps> = ({ idle }) => {
  if (!idle) return null;

  return (
    <>
      {/* Main idle overlay */}
      <div className="idle-overlay">
        <div className="idle-message">
          <h2>😴 Cat is getting lonely...</h2>
          <p>Start petting to make the cat happy!</p>
        </div>
      </div>
      
      {/* Swipe animation positioned over cat's back */}
      <div className="idle-swipe-animation">
        👆✨
      </div>
    </>
  );
};

export default IdleAnimationOverlay;
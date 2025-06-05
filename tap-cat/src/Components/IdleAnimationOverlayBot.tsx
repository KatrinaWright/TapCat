import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/swipe-left.json'; 
import './IdleAnimationOverlay.css'; 

interface IdleAnimationOverlayProps {
  idle: boolean;
}

const IdleAnimationOverlay: React.FC<IdleAnimationOverlayProps> = ({ idle }) => {
  return (
    <div className={`idle-animation-overlay ${idle ? 'show' : ''}`}>
      {idle && (
        <div className="lottie-container">
          <Lottie options={{ animationData, loop: true, autoplay: true }} height={400} width={400} />
        </div>
      )}
    </div>
  );
};

export default IdleAnimationOverlay;
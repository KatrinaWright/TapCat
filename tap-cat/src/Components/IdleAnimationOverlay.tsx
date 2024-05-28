import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/swipe-left.json'; // Adjust the path as needed
import './IdleAnimationOverlay.css'; // Ensure the path is correct

interface IdleAnimationOverlayProps {
  idle: boolean;
}

const IdleAnimationOverlay: React.FC<IdleAnimationOverlayProps> = ({ idle }) => {
  return (
    <div className={`idle-animation-overlay ${idle ? 'show' : ''}`}>
      {idle && (
        <Lottie options={{ animationData, loop: true, autoplay: true }} height={400} width={400} />
      )}
    </div>
  );
};

export default IdleAnimationOverlay;

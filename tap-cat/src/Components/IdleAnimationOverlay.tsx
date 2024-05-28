import React, { useState, useEffect, useCallback } from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/swipe-left.json'; // Adjust the path as needed
import './IdleAnimationOverlay.css'; // Make sure to create and adjust the path as needed

interface IdleAnimationOverlayProps {
  resetTimer: boolean;
}

const IdleAnimationOverlay: React.FC<IdleAnimationOverlayProps> = ({ resetTimer }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);

  const startTimer = useCallback(() => {
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      window.setTimeout(() => {
        setShowAnimation(true);
      }, 15000)
    );
  }, [timer]);

  useEffect(() => {
    if (resetTimer) {
      setShowAnimation(false);
      startTimer();
    }
  }, [resetTimer, startTimer]);

  useEffect(() => {
    startTimer();

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [startTimer, timer]);

  return (
    <div className={`idle-animation-overlay ${showAnimation ? 'show' : ''}`}>
      {showAnimation && (
        <Lottie options={{ animationData, loop: true, autoplay: true }} height={400} width={400} />
      )}
    </div>
  );
};

export default IdleAnimationOverlay;

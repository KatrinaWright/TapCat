// Helper functions for animations

// Create floating hearts
export const createFloatingHeart = (x, y, size = 'medium') => {
  const heartsContainer = document.querySelector('.hearts-container') || createHeartsContainer();
  
  const heart = document.createElement('div');
  heart.className = `floating-heart ${size}`;
  heart.innerHTML = '❤️';
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  
  // Add some randomness to the animation
  const randomOffset = Math.random() * 60 - 30;
  heart.style.setProperty('--random-x', `${randomOffset}px`);
  
  heartsContainer.appendChild(heart);
  
  // Remove the heart after animation completes
  setTimeout(() => {
    if (heart.parentNode) {
      heart.parentNode.removeChild(heart);
    }
  }, 3000);
};

// Create hearts container if it doesn't exist
const createHeartsContainer = () => {
  const container = document.createElement('div');
  container.className = 'hearts-container';
  document.body.appendChild(container);
  return container;
};

// Determine player performance level based on score
export const getPlayerPerformanceLevel = (playerScore, allScores) => {
  const sortedScores = [...allScores].sort((a, b) => b - a);
  const playerRank = sortedScores.indexOf(playerScore);
  
  if (playerRank === 0 && playerScore > 0) return 'top-performer';
  if (playerRank <= Math.ceil(allScores.length * 0.3)) return 'high-performer';
  if (playerRank <= Math.ceil(allScores.length * 0.6)) return 'medium-performer';
  return 'low-performer';
};

// Add earning points animation to player card
export const triggerPointsAnimation = (playerId) => {
  const playerCard = document.querySelector(`[data-player-id="${playerId}"]`);
  if (playerCard) {
    playerCard.classList.add('earning-points');
    setTimeout(() => {
      playerCard.classList.remove('earning-points');
    }, 600);
  }
};

// Create happiness celebration
export const createHappinessCelebration = (message = '🎉') => {
  const celebration = document.createElement('div');
  celebration.className = 'happiness-celebration';
  celebration.innerHTML = message;
  
  document.body.appendChild(celebration);
  
  setTimeout(() => {
    if (celebration.parentNode) {
      celebration.parentNode.removeChild(celebration);
    }
  }, 2000);
};

// Add petting effect to a zone
export const triggerPettingEffect = (element) => {
  element.classList.add('just-petted');
  setTimeout(() => {
    element.classList.remove('just-petted');
  }, 500);
};

// Create love particles
export const createLoveParticles = (x, y, count = 5) => {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'love-particle';
    
    const randomX = Math.random() * 100 - 50;
    const randomY = Math.random() * 100 + 50;
    
    particle.style.left = `${x + Math.random() * 20 - 10}px`;
    particle.style.top = `${y + Math.random() * 20 - 10}px`;
    particle.style.setProperty('--random-x', `${randomX}px`);
    particle.style.setProperty('--random-y', `-${randomY}px`);
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 2000);
  }
};

// Trigger milestone celebration
export const triggerMilestone = (element, message) => {
  element.classList.add('milestone-reached');
  createHappinessCelebration(message);
  
  setTimeout(() => {
    element.classList.remove('milestone-reached');
  }, 1000);
};
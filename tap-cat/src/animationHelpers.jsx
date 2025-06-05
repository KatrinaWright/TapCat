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

// Add earning points animation to player card with dispersed hearts
export const triggerPointsAnimation = (playerId) => {
  const playerCard = document.querySelector(`[data-player-id="${playerId}"]`);
  if (playerCard) {
    playerCard.classList.add('earning-points');
    
    // Create multiple hearts from random positions on the card
    const rect = playerCard.getBoundingClientRect();
    for (let i = 0; i < 3; i++) {
      const randomX = rect.left + Math.random() * rect.width;
      const randomY = rect.top + Math.random() * rect.height;
      createFloatingHeart(randomX, randomY, 'small');
    }
    
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

// Create angry particles for risky moves (1-25 rolls)
export const createAngryParticles = (x, y, count = 3) => {
  const angrySymbols = ['💢', '⚡', '💥', '😾', '❌'];
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'angry-particle';
    particle.innerHTML = angrySymbols[Math.floor(Math.random() * angrySymbols.length)];
    
    const randomX = Math.random() * 80 - 40;
    const randomY = Math.random() * 80 - 20;
    const randomRotate = Math.random() * 360;
    
    particle.style.left = `${x + Math.random() * 20 - 10}px`;
    particle.style.top = `${y + Math.random() * 20 - 10}px`;
    particle.style.setProperty('--random-x', `${randomX}px`);
    particle.style.setProperty('--random-y', `${randomY}px`);
    particle.style.setProperty('--random-rotate', `${randomRotate}deg`);
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 2000);
  }
};

// Create caution particles for medium-risk moves (26-50 rolls)
export const createCautionParticles = (x, y, count = 4) => {
  const cautionSymbols = ['⚠️', '❓', '❗', '😼', '👀'];
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'caution-particle';
    particle.innerHTML = cautionSymbols[Math.floor(Math.random() * cautionSymbols.length)];
    
    const randomX = Math.random() * 60 - 30;
    const randomY = Math.random() * 60 - 10;
    const randomRotate = Math.random() * 180;
    
    particle.style.left = `${x + Math.random() * 20 - 10}px`;
    particle.style.top = `${y + Math.random() * 20 - 10}px`;
    particle.style.setProperty('--random-x', `${randomX}px`);
    particle.style.setProperty('--random-y', `${randomY}px`);
    particle.style.setProperty('--random-rotate', `${randomRotate}deg`);
    
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

// Create dramatic scratch effect
export const createDramaticScratchEffect = () => {
  // Add screen shake to the whole game container
  const gameContainer = document.querySelector('.game-container');
  if (gameContainer) {
    gameContainer.classList.add('screen-shake');
    setTimeout(() => {
      gameContainer.classList.remove('screen-shake');
    }, 500);
  }

  // Create the scratch overlay
  const scratchOverlay = document.createElement('div');
  scratchOverlay.className = 'scratch-overlay';
  
  const scratchEffect = document.createElement('div');
  scratchEffect.className = 'scratch-effect';
  
  // Red flash background
  const redFlash = document.createElement('div');
  redFlash.className = 'red-flash';
  
  // Scratch marks slashing across
  const scratchMarks = document.createElement('div');
  scratchMarks.className = 'scratch-marks';
  
  // Giant angry cat face
  const angryCat = document.createElement('div');
  angryCat.className = 'angry-cat';
  angryCat.innerHTML = '😾'; // or '🙀' for scared cat
  
  // Warning text
  const warningText = document.createElement('div');
  warningText.className = 'scratch-warning';
  warningText.innerHTML = '⚡ SCRATCHED! ⚡';
  
  // Assemble the effect
  scratchEffect.appendChild(redFlash);
  scratchEffect.appendChild(scratchMarks);
  scratchEffect.appendChild(angryCat);
  scratchEffect.appendChild(warningText);
  scratchOverlay.appendChild(scratchEffect);
  
  document.body.appendChild(scratchOverlay);
  
  // Remove after animation completes
  setTimeout(() => {
    if (scratchOverlay.parentNode) {
      scratchOverlay.parentNode.removeChild(scratchOverlay);
    }
  }, 1500);
};

// Alternative scratch effects for variety
export const createVariantScratchEffect = () => {
  const gameContainer = document.querySelector('.game-container');
  if (gameContainer) {
    gameContainer.classList.add('screen-shake');
    setTimeout(() => {
      gameContainer.classList.remove('screen-shake');
    }, 500);
  }

  const scratchOverlay = document.createElement('div');
  scratchOverlay.className = 'scratch-overlay';
  
  const scratchEffect = document.createElement('div');
  scratchEffect.className = 'scratch-effect';
  
  const redFlash = document.createElement('div');
  redFlash.className = 'red-flash';
  
  const scratchMarks = document.createElement('div');
  scratchMarks.className = 'scratch-marks';
  
  // Randomly choose different angry expressions
  const angryCat = document.createElement('div');
  angryCat.className = 'angry-cat';
  const expressions = ['😾', '🙀', '😿', '💢', '⚡'];
  angryCat.innerHTML = expressions[Math.floor(Math.random() * expressions.length)];
  
  // Different warning messages
  const warningText = document.createElement('div');
  warningText.className = 'scratch-warning';
  const messages = ['⚡ SCRATCHED! ⚡', '💢 OUCH! 💢', '🙀 MEOWCH! 🙀', '😾 ANGRY CAT! 😾'];
  warningText.innerHTML = messages[Math.floor(Math.random() * messages.length)];
  
  scratchEffect.appendChild(redFlash);
  scratchEffect.appendChild(scratchMarks);
  scratchEffect.appendChild(angryCat);
  scratchEffect.appendChild(warningText);
  scratchOverlay.appendChild(scratchEffect);
  
  document.body.appendChild(scratchOverlay);
  
  setTimeout(() => {
    if (scratchOverlay.parentNode) {
      scratchOverlay.parentNode.removeChild(scratchOverlay);
    }
  }, 1500);
};
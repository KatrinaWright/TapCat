// Dramatic scratch effect functions

/**
 * Creates a dramatic scratch effect overlay with sound, animation, and particles
 * @param {number} x - X position where scratch originated
 * @param {number} y - Y position where scratch originated
 */
export const createDramaticScratchEffect = (x = window.innerWidth / 2, y = window.innerHeight / 2) => {
  // 1. Create or get overlay elements
  const scratchOverlay = getScratchOverlay();
  const redFlash = getRedFlash();
  const angryEyes = getAngryEyes();
  const catImage = document.querySelector('img[useMap="#image-map"]');
  
  // 2. Position the scratch mark near where the scratch occurred
  const scratchMark = scratchOverlay.querySelector('.scratch-mark');
  if (scratchMark) {
    scratchMark.style.left = `${x}px`;
    scratchMark.style.top = `${y}px`;
  }
  
  // 3. Activate all effects
  scratchOverlay.classList.add('active');
  redFlash.classList.add('active');
  angryEyes.classList.add('active');
  
  // 4. Add shake effect to cat image
  if (catImage) {
    catImage.classList.add('shake-effect');
    
    // Remove shake class after animation completes
    setTimeout(() => {
      catImage.classList.remove('shake-effect');
    }, 500);
  }
  
  // 5. Create blood spatter particles
  createBloodSpatter(x, y, 15);
  
  // 6. Remove active classes after animation completes
  setTimeout(() => {
    scratchOverlay.classList.remove('active');
    redFlash.classList.remove('active');
    angryEyes.classList.remove('active');
  }, 1000);
};

/**
 * Get or create scratch overlay element
 */
const getScratchOverlay = () => {
  let scratchOverlay = document.querySelector('.scratch-overlay');
  
  if (!scratchOverlay) {
    scratchOverlay = document.createElement('div');
    scratchOverlay.className = 'scratch-overlay';
    
    const scratchMark = document.createElement('div');
    scratchMark.className = 'scratch-mark';
    scratchOverlay.appendChild(scratchMark);
    
    document.body.appendChild(scratchOverlay);
  }
  
  return scratchOverlay;
};

/**
 * Get or create red flash element
 */
const getRedFlash = () => {
  let redFlash = document.querySelector('.red-flash');
  
  if (!redFlash) {
    redFlash = document.createElement('div');
    redFlash.className = 'red-flash';
    document.body.appendChild(redFlash);
  }
  
  return redFlash;
};

/**
 * Get or create angry eyes element
 */
const getAngryEyes = () => {
  let angryEyes = document.querySelector('.angry-eyes');
  
  if (!angryEyes) {
    angryEyes = document.createElement('div');
    angryEyes.className = 'angry-eyes';
    
    const leftEye = document.createElement('div');
    leftEye.className = 'angry-eye angry-eye-left';
    
    const rightEye = document.createElement('div');
    rightEye.className = 'angry-eye angry-eye-right';
    
    angryEyes.appendChild(leftEye);
    angryEyes.appendChild(rightEye);
    
    document.body.appendChild(angryEyes);
  }
  
  return angryEyes;
};

/**
 * Create blood spatter particles
 * @param {number} x - X position center
 * @param {number} y - Y position center
 * @param {number} count - Number of particles to create
 */
const createBloodSpatter = (x, y, count = 10) => {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    
    // Random particle size
    const sizeClass = Math.random() < 0.3 ? 'large' : (Math.random() < 0.6 ? 'medium' : 'small');
    particle.className = `blood-particle ${sizeClass}`;
    
    // Position near the scratch point
    const offsetX = Math.random() * 40 - 20;
    const offsetY = Math.random() * 40 - 20;
    particle.style.left = `${x + offsetX}px`;
    particle.style.top = `${y + offsetY}px`;
    
    // Random direction
    const randomX = (Math.random() - 0.5) * 150;
    const randomY = (Math.random() - 0.5) * 150;
    particle.style.setProperty('--random-x', `${randomX}px`);
    particle.style.setProperty('--random-y', `${randomY}px`);
    
    // Random animation duration
    const duration = 0.5 + Math.random() * 1.5;
    particle.style.animation = `bloodSpatter ${duration}s ease-out forwards`;
    
    document.body.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, duration * 1000);
  }
};
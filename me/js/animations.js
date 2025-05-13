
function initAnimations() {
  setupRevealAnimations();
  setupParallaxEffect();
  setupCustomCursor();
  setupTiltEffect();
  setupSkillBarsAnimation();
}

function setupRevealAnimations() {
  const { revealElements } = globalVariables.elements;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        const aosElements = entry.target.querySelectorAll('[data-aos]');
        let delay = 0;
        
        aosElements.forEach(el => {
          setTimeout(() => {
            el.classList.add('aos-animate');
          }, delay);
          
          delay += parseInt(el.getAttribute('data-aos-delay') || 100);
        });
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  });
  
  revealElements.forEach(element => {
    observer.observe(element);
  });
}

function setupParallaxEffect() {
  const { parallaxItems } = globalVariables.elements;
  
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    parallaxItems.forEach(item => {
      const depth = parseFloat(item.getAttribute('data-depth')) || 0.1;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      const moveX = (mouseX - windowWidth / 2) * depth;
      const moveY = (mouseY - windowHeight / 2) * depth;
      
      item.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
}

function setupCustomCursor() {
  const { cursorDot, cursorDotOutline, body } = globalVariables.elements;
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    return;
  }
  
  setTimeout(() => {
    cursorDot.style.opacity = '1';
    cursorDotOutline.style.opacity = '1';
  }, 1000);
  
  document.addEventListener('mousemove', (e) => {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
    
    setTimeout(() => {
      cursorDotOutline.style.left = `${e.clientX}px`;
      cursorDotOutline.style.top = `${e.clientY}px`;
    }, 80);
  });
  
  const interactiveElements = document.querySelectorAll('a, button, .game-card, .social-card, .toggle-audio, .theme-btn');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorDotOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorDotOutline.style.border = '1px solid var(--primary-color)';
      cursorDotOutline.style.background = 'rgba(129, 140, 248, 0.1)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorDotOutline.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorDotOutline.style.border = '2px solid var(--primary-color)';
      cursorDotOutline.style.background = 'transparent';
    });
  });
  
  document.addEventListener('mousedown', () => {
    cursorDot.style.transform = 'translate(-50%, -50%) scale(0.9)';
    cursorDotOutline.style.transform = 'translate(-50%, -50%) scale(0.9)';
  });
  
  document.addEventListener('mouseup', () => {
    cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorDotOutline.style.transform = 'translate(-50%, -50%) scale(1)';
  });
}

function setupTiltEffect() {
  const { tiltCards } = globalVariables.elements;
  
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(tiltCards, {
      max: 10,
      speed: 400,
      glare: true,
      'max-glare': 0.1,
      gyroscope: true
    });
  }
}

function setupSkillBarsAnimation() {
  const { skillProgressBars, skillPercentages } = globalVariables.elements;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const progressValue = progressBar.getAttribute('data-progress');
        const percentageEl = progressBar.parentElement.previousElementSibling.querySelector('.skill-percentage');
        
        progressBar.style.width = `${progressValue}%`;
        
        if (percentageEl) {
          const value = parseInt(percentageEl.getAttribute('data-value'));
          let current = 0;
          
          const interval = setInterval(() => {
            current += 1;
            percentageEl.textContent = `${current}%`;
            
            if (current >= value) {
              clearInterval(interval);
            }
          }, 15);
        }
        
        observer.unobserve(progressBar);
      }
    });
  }, {
    threshold: 0.7
  });
  
  skillProgressBars.forEach(bar => {
    observer.observe(bar);
  });
}

function simulateLoading() {
  const { loadingBar, loadingScreen } = globalVariables.elements;
  let progress = 0;
  
  const interval = setInterval(() => {
    progress += Math.random() * 10;
    
    if (progress > 100) {
      progress = 100;
      clearInterval(interval);
      
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        globalVariables.animations.isLoading = false;
      }, 500);
    }
    
    loadingBar.style.width = `${progress}%`;
  }, 200);
}

function updateScrollIndicator() {
  const { scrollIndicator } = globalVariables.elements;
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
      scrollIndicator.classList.add('hidden');
    } else {
      scrollIndicator.classList.remove('hidden');
    }
  });
}
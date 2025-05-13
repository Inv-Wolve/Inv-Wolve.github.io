document.addEventListener('DOMContentLoaded', () => {
  initializeElements();
  
  simulateLoading();
  
  initEventListeners();
  
  initParticles();
});

function initEventListeners() {
  const {
    enterButton,
    openingScreen,
    mainContent,
    backToTopButton,
    themeSwitchToggle,
    themeButtons,
    viewMoreGamesButton,
    gamesPopup,
    closePopupButton,
    moreSocialButton,
    socialPopup,
    closeSocialPopupButton
  } = globalVariables.elements;
  
  enterButton.addEventListener('click', () => {
    openingScreen.classList.add('hidden');
    
    setTimeout(() => {
      mainContent.classList.add('visible');
      
      initAnimations();
      
      setupAudio();
      
      updateScrollIndicator();
    }, 300);
  });
  
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  themeSwitchToggle.addEventListener('click', () => {
    const themeSwitch = document.querySelector('.theme-switch');
    themeSwitch.classList.toggle('active');
    globalVariables.animations.isThemeSwitcherOpen = themeSwitch.classList.contains('active');
  });
  
  themeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const theme = button.getAttribute('data-theme');
      
      globalVariables.elements.body.classList.remove(
        ...globalVariables.theme.options.map(t => `${t}-theme`)
      );
      
      if (theme !== 'default') {
        globalVariables.elements.body.classList.add(`${theme}-theme`);
      }
      
      globalVariables.theme.current = theme;
      
      themeButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      document.querySelector('.theme-switch').classList.remove('active');
      
      updateParticlesColor();
    });
  });
  
  // Fix for More Games popup
  viewMoreGamesButton?.addEventListener('click', () => {
    if (gamesPopup) {
      gamesPopup.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  });
  
  closePopupButton?.addEventListener('click', () => {
    if (gamesPopup) {
      gamesPopup.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  });
  
  // Fix for More Social Links popup
  moreSocialButton?.addEventListener('click', () => {
    if (socialPopup) {
      socialPopup.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  });
  
  closeSocialPopupButton?.addEventListener('click', () => {
    if (socialPopup) {
      socialPopup.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  });
  
  // Close popups when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === gamesPopup) {
      gamesPopup.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    if (e.target === socialPopup) {
      socialPopup.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    if (globalVariables.animations.isThemeSwitcherOpen && 
        !e.target.closest('.theme-switch')) {
      document.querySelector('.theme-switch').classList.remove('active');
      globalVariables.animations.isThemeSwitcherOpen = false;
    }
  });
  
  // Close popups with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (gamesPopup?.classList.contains('active')) {
        gamesPopup.classList.remove('active');
        document.body.style.overflow = '';
      }
      if (socialPopup?.classList.contains('active')) {
        socialPopup.classList.remove('active');
        document.body.style.overflow = '';
      }
      document.querySelector('.theme-switch')?.classList.remove('active');
      globalVariables.animations.isThemeSwitcherOpen = false;
    }
  });
  
  // Back to top button visibility
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 500) {
      backToTopButton.style.opacity = '1';
      backToTopButton.style.transform = 'translateY(0)';
    } else {
      backToTopButton.style.opacity = '0';
      backToTopButton.style.transform = 'translateY(20px)';
    }
  });
  
  // Handle touch events for card flipping
  const gameCards = document.querySelectorAll('.game-card');
  gameCards.forEach(card => {
    let touchStartX = 0;
    let touchEndX = 0;
    
    card.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    });
    
    card.addEventListener('touchmove', (e) => {
      touchEndX = e.touches[0].clientX;
    });
    
    card.addEventListener('touchend', () => {
      const swipeDistance = touchStartX - touchEndX;
      if (Math.abs(swipeDistance) > 50) { // Minimum swipe distance
        const inner = card.querySelector('.game-card-inner');
        inner.style.transform = swipeDistance > 0 ? 'rotateY(180deg)' : 'rotateY(0deg)';
      }
    });
  });
}
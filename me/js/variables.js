const globalVariables = {
  elements: {},
  
  animations: {
    isLoading: true,
    isOpeningScreen: true,
    isAudioPlaying: false,
    isThemeSwitcherOpen: false
  },
  
  audio: {
    context: null,
    analyser: null,
    bufferLength: 0,
    dataArray: [],
    volume: 0.5
  },
  
  theme: {
    current: 'default',
    options: ['default', 'purple', 'blue', 'green', 'dark']
  }
};

function initializeElements() {
  globalVariables.elements.body = document.body;
  globalVariables.elements.loadingScreen = document.querySelector('.loading-screen');
  globalVariables.elements.loadingBar = document.querySelector('.loading-bar');
  globalVariables.elements.openingScreen = document.querySelector('.opening-screen');
  globalVariables.elements.mainContent = document.querySelector('.main-content');
  globalVariables.elements.enterButton = document.querySelector('.enter-button');
  
  globalVariables.elements.audioPlayer = document.querySelector('.audio-player');
  globalVariables.elements.audioElement = document.getElementById('background-audio');
  globalVariables.elements.toggleAudioButton = document.querySelector('.toggle-audio');
  globalVariables.elements.volumeSlider = document.querySelector('.volume-slider');
  globalVariables.elements.volumeIcon = document.querySelector('.volume-control i');
  
  globalVariables.elements.heroTitle = document.querySelector('.hero-title');
  globalVariables.elements.revealElements = document.querySelectorAll('.reveal-element');
  globalVariables.elements.skillProgressBars = document.querySelectorAll('.skill-progress');
  globalVariables.elements.skillPercentages = document.querySelectorAll('.skill-percentage');
  
  globalVariables.elements.scrollIndicator = document.querySelector('.scroll-indicator');
  globalVariables.elements.backToTopButton = document.querySelector('.back-to-top');
  globalVariables.elements.themeSwitchToggle = document.querySelector('.theme-switch-toggle');
  globalVariables.elements.themeOptions = document.querySelector('.theme-options');
  globalVariables.elements.themeButtons = document.querySelectorAll('.theme-btn');
  
  globalVariables.elements.cursorDot = document.querySelector('.cursor-dot');
  globalVariables.elements.cursorDotOutline = document.querySelector('.cursor-dot-outline');
  
  globalVariables.elements.viewMoreGamesButton = document.querySelector('.view-more-btn');
  globalVariables.elements.gamesPopup = document.querySelector('.games-popup');
  globalVariables.elements.closePopupButton = document.querySelector('.close-popup');
  globalVariables.elements.moreSocialButton = document.querySelector('.more-social-btn');
  globalVariables.elements.socialPopup = document.querySelector('.social-popup');
  globalVariables.elements.closeSocialPopupButton = document.querySelector('.close-social-popup');
  
  globalVariables.elements.tiltCards = document.querySelectorAll('.tilt-card');
  globalVariables.elements.parallaxItems = document.querySelectorAll('.parallax-item');
}
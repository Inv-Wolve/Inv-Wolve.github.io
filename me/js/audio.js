function setupAudio() {
  const { audioElement, toggleAudioButton, volumeSlider, volumeIcon, audioPlayer } = globalVariables.elements;
  audioElement.volume = globalVariables.audio.volume;
  volumeSlider.value = globalVariables.audio.volume * 100;
  
  toggleAudioButton.addEventListener('click', () => {
    if (audioElement.paused) {
      audioElement.play()
        .then(() => {
          audioPlayer.classList.add('playing');
          globalVariables.animations.isAudioPlaying = true;
          initAudioVisualizer();
        })
        .catch(err => {
          console.error('Error playing audio:', err);
        });
    } else {
      audioElement.pause();
      audioPlayer.classList.remove('playing');
      globalVariables.animations.isAudioPlaying = false;
    }
  });
  
  volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    audioElement.volume = volume;
    globalVariables.audio.volume = volume;
    
    updateVolumeIcon(volume);
  });
  
  volumeIcon.addEventListener('click', () => {
    if (audioElement.volume > 0) {
      globalVariables.audio.previousVolume = audioElement.volume;
      audioElement.volume = 0;
      volumeSlider.value = 0;
      volumeIcon.className = 'fas fa-volume-mute';
    } else {
      const previousVolume = globalVariables.audio.previousVolume || 0.5;
      audioElement.volume = previousVolume;
      globalVariables.audio.volume = previousVolume;
      volumeSlider.value = previousVolume * 100;
      updateVolumeIcon(previousVolume);
    }
  });
  
  setTimeout(() => {
    audioPlayer.classList.add('visible');
  }, 2000);
}

function updateVolumeIcon(volume) {
  const { volumeIcon } = globalVariables.elements;
  
  if (volume === 0) {
    volumeIcon.className = 'fas fa-volume-mute';
  } else if (volume < 0.5) {
    volumeIcon.className = 'fas fa-volume-down';
  } else {
    volumeIcon.className = 'fas fa-volume-up';
  }
}

function initAudioVisualizer() {
  const { audioElement } = globalVariables.elements;
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioContext.createAnalyser();
  const source = audioContext.createMediaElementSource(audioElement);
  source.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 128;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  globalVariables.audio.context = audioContext;
  globalVariables.audio.analyser = analyser;
  globalVariables.audio.bufferLength = bufferLength;
  globalVariables.audio.dataArray = dataArray;
  
  drawVisualizer();
}

function drawVisualizer() {
  if (!globalVariables.animations.isAudioPlaying) return;
  const { analyser, bufferLength, dataArray } = globalVariables.audio;
  const canvas = document.getElementById('audio-visualizer');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth * 2;
  canvas.height = canvas.offsetHeight * 2;
  
  const draw = () => {
    if (!globalVariables.animations.isAudioPlaying) return;
    
    requestAnimationFrame(draw);
    
    analyser.getByteFrequencyData(dataArray);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const barWidth = Math.ceil(canvas.width / bufferLength) * 2;
    const heightScale = canvas.height / 255;
    let x = 0;
    
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim());
    gradient.addColorStop(1, getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim());
    
    for (let i = 0; i < bufferLength; i++) {
      const barHeight = dataArray[i] * heightScale;
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);
      
      x += barWidth;
    }
  };
  
  draw();
}
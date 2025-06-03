// Animation functions
document.addEventListener('DOMContentLoaded', function() {
  initTextAnimation();
  initParallaxEffect();
});

// Text animation for section headings
function initTextAnimation() {
  const headings = document.querySelectorAll('h1, h2, h3');
  
  headings.forEach(heading => {
    // Skip if it's already a glitch effect
    if (heading.classList.contains('glitch')) return;
    
    // Add hover animation
    heading.addEventListener('mouseenter', () => {
      heading.style.animation = 'glowText 2s infinite';
    });
    
    heading.addEventListener('mouseleave', () => {
      heading.style.animation = '';
    });
  });
  
  // Special animation for the hero heading
  const heroHeading = document.querySelector('.hero-text h1');
  if (heroHeading) {
    // Set data-text attribute for glitch effect
    heroHeading.setAttribute('data-text', heroHeading.textContent);
    
    // Trigger glitch effect occasionally
    setInterval(() => {
      heroHeading.classList.add('glitching');
      
      setTimeout(() => {
        heroHeading.classList.remove('glitching');
      }, 500);
    }, 5000);
  }
}

// Parallax effect for various elements
function initParallaxEffect() {
  // Only enable on desktop
  if (window.innerWidth < 992) return;
  
  const heroSection = document.querySelector('.hero-section');
  const profileImage = document.querySelector('.profile-image-wrapper');
  const heroText = document.querySelector('.hero-text');
  
  if (heroSection && profileImage && heroText) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = heroSection.offsetHeight;
      
      // Only apply effect within the hero section
      if (scrollY <= heroHeight) {
        const scrollPercentage = scrollY / heroHeight;
        
        // Profile image moves up slightly
        profileImage.style.transform = `translateY(${scrollPercentage * -30}px)`;
        
        // Hero text moves down slightly
        heroText.style.transform = `translateY(${scrollPercentage * 30}px)`;
      }
    });
  }
  
  // Create floating effect for project cards
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach((card, index) => {
    card.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      
      const xPercent = x / width - 0.5;
      const yPercent = y / height - 0.5;
      
      card.style.transform = `perspective(1000px) rotateX(${yPercent * -5}deg) rotateY(${xPercent * 5}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(-10px)';
    });
  });
  
  // Add subtle particle effect to background of sections
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    // Create canvas for particles
    const canvas = document.createElement('canvas');
    canvas.classList.add('particles-canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.5';
    
    // Only add to specific sections
    if (section.id === 'home' || section.id === 'skills' || section.id === 'contact') {
      section.style.position = 'relative';
      section.style.overflow = 'hidden';
      section.prepend(canvas);
      
      // Initialize particles
      initParticles(canvas);
    }
  });
}

// Particle background effect
function initParticles(canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.color = `rgba(108, 92, 231, ${Math.random() * 0.3 + 0.1})`;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x > canvas.width) this.x = 0;
      else if (this.x < 0) this.x = canvas.width;
      
      if (this.y > canvas.height) this.y = 0;
      else if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  function createParticles() {
    // Adjust number of particles based on screen size
    const particleCount = Math.min(Math.floor(canvas.width * canvas.height / 10000), 100);
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      
      // Draw lines between nearby particles
      for (let j = i; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(108, 92, 231, ${0.1 * (1 - distance / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animateParticles);
  }
  
  createParticles();
  animateParticles();
  
  // Redraw if window resizes
  window.addEventListener('resize', () => {
    particles = [];
    createParticles();
  });
}

// Type writer effect for specific text elements
function typeWriterEffect(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}
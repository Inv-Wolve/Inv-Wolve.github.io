document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        observer.observe(card);
    });

    const gameTags = document.querySelectorAll('.game-tag');
    gameTags.forEach(tag => {
        tag.addEventListener('mouseover', () => {
            tag.style.transform = 'scale(1.05)';
        });
        tag.addEventListener('mouseout', () => {
            tag.style.transform = 'scale(1)';
        });
    });

    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    });

    let audioStarted = false;
    window.addEventListener('scroll', () => {
        if (!audioStarted) {
          const audio = document.getElementById('background-audio');
          audio.volume = 0.5;
          audio.play().then(() => {
            console.log("Audio started on scroll!");
            audioStarted = true;
          }).catch(err => {
            console.error("Audio play failed:", err);
          });
        }
      });

});
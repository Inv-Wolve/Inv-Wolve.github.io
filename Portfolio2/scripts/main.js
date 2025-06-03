// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initCursorEffect();
  initObserveElements();
});

// Navigation functionality
function initNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-link');
  const overlay = document.querySelector('.overlay');
  
  // Toggle mobile menu
  menuToggle?.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    
    if (overlay.classList.contains('active')) {
      overlay.style.opacity = '1';
      overlay.style.visibility = 'visible';
      document.body.style.overflow = 'hidden';
    } else {
      overlay.style.opacity = '0';
      overlay.style.visibility = 'hidden';
      document.body.style.overflow = '';
    }
  });
  
  // Close menu when clicking overlay
  overlay?.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    document.body.style.overflow = '';
  });
  
  // Handle navigation item clicks
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active class from all links
      navItems.forEach(link => link.classList.remove('active'));
      
      // Add active class to clicked link
      item.classList.add('active');
      
      // Close mobile menu if open
      if (window.innerWidth < 768) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
        document.body.style.overflow = '';
      }
    });
  });

  // Handle scroll and set active navigation
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Get all sections
    const sections = document.querySelectorAll('section');
    
    // Check which section is currently in view
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all links
        navItems.forEach(link => link.classList.remove('active'));
        
        // Add active class to corresponding link
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (correspondingLink) {
          correspondingLink.classList.add('active');
        }
      }
    });

    // Handle navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (scrollPosition > 50) {
      navbar.style.background = 'rgba(15, 15, 15, 0.9)';
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
      navbar.style.background = 'rgba(15, 15, 15, 0.8)';
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }
  });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

// Custom cursor effect
function initCursorEffect() {
  const cursor = document.querySelector('.cursor');
  
  if (!cursor) return;
  
  // Only enable custom cursor on desktops
  if (window.innerWidth > 991) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.opacity = '1';
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mouseout', () => {
      cursor.style.opacity = '0';
    });
    
    // Add effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .skill-card, .project-card, .social-link, .profile-image-wrapper');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.border = '1px solid var(--primary-light)';
        cursor.style.background = 'rgba(108, 92, 231, 0.1)';
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.border = '2px solid var(--primary-light)';
        cursor.style.background = 'transparent';
      });
    });
  } else {
    // Hide cursor on mobile/tablet
    cursor.style.display = 'none';
  }
}

// Intersection Observer for animations
function initObserveElements() {
  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
        }
      });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(element => {
      observer.observe(element);
    });
    
    // Initialize skill bars
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const percentage = entry.target.getAttribute('data-percentage');
          entry.target.style.setProperty('--percentage', percentage);
          entry.target.style.width = `${percentage}%`;
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.skill-bar').forEach(bar => {
      skillObserver.observe(bar);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    document.querySelectorAll('[data-aos]').forEach(element => {
      element.classList.add('aos-animate');
    });
    
    document.querySelectorAll('.skill-bar').forEach(bar => {
      const percentage = bar.getAttribute('data-percentage');
      bar.style.width = `${percentage}%`;
    });
  }
}
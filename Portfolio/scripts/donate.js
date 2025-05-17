// Donation functionality
document.addEventListener('DOMContentLoaded', function() {
  initDonateModal();
  initImageModal();
});

function initDonateModal() {
  const donateButton = document.getElementById('donateButton');
  const donateModal = document.getElementById('donateModal');
  const closeButtons = document.querySelectorAll('.close-modal');
  const overlay = document.querySelector('.overlay');
  const copyButton = document.getElementById('copyButton');
  
  if (!donateButton || !donateModal || !overlay) return;
  
  // Open donate modal
  donateButton.addEventListener('click', () => {
    openModal(donateModal);
  });
  
  // Close modals on close button click
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      closeAllModals();
    });
  });
  
  // Close modals when clicking overlay
  overlay.addEventListener('click', () => {
    closeAllModals();
  });
  
  // Close modals with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
  
  // Copy crypto address
  if (copyButton) {
    copyButton.addEventListener('click', () => {
      const address = document.querySelector('.address-value');
      if (!address) return;
      
      copyToClipboard(address.textContent);
      
      // Show copied feedback
      const originalButtonContent = copyButton.innerHTML;
      copyButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>Copied!</span>
      `;
      
      setTimeout(() => {
        copyButton.innerHTML = originalButtonContent;
      }, 2000);
    });
  }
}

function initImageModal() {
  const qrCode = document.getElementById('qrCode');
  const imageModal = document.getElementById('imageModal');
  
  if (!qrCode || !imageModal) return;
  
  // Open image modal when clicking QR code
  qrCode.addEventListener('click', () => {
    openModal(imageModal);
  });
}

// Helper functions
function openModal(modal) {
  const overlay = document.querySelector('.overlay');
  
  if (!modal || !overlay) return;
  
  modal.classList.add('active');
  overlay.classList.add('active');
  overlay.style.opacity = '1';
  overlay.style.visibility = 'visible';
  document.body.style.overflow = 'hidden';
}

function closeAllModals() {
  const modals = document.querySelectorAll('.modal');
  const overlay = document.querySelector('.overlay');
  
  if (!overlay) return;
  
  modals.forEach(modal => {
    modal.classList.remove('active');
  });
  
  overlay.classList.remove('active');
  overlay.style.opacity = '0';
  overlay.style.visibility = 'hidden';
  document.body.style.overflow = '';
}

function copyToClipboard(text) {
  // Create a temporary textarea element
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed'; // Prevent scrolling to the bottom
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    // Execute copy command
    document.execCommand('copy');
    console.log('Text copied to clipboard');
  } catch (err) {
    console.error('Could not copy text: ', err);
    
    // Fallback to modern clipboard API
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => console.log('Text copied to clipboard'))
        .catch(err => console.error('Could not copy text: ', err));
    }
  }
  
  // Remove the temporary element
  document.body.removeChild(textarea);
}
// Mouse follower
const mouseFollower = document.querySelector('.mouse-follower');
    
document.addEventListener('mousemove', (e) => {
  gsap.to(mouseFollower, {
    duration: 0.4,
    x: e.clientX - 10,
    y: e.clientY - 10,
    ease: 'power2.out'
  });
});

// Interactive background
function createDots() {
  const bg = document.getElementById('interactive-bg');
  const dotsCount = 80;
  
  for (let i = 0; i < dotsCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    bg.appendChild(dot);
  }
}

createDots();

// Animate background dots on mousemove
document.addEventListener('mousemove', (e) => {
  const dots = document.querySelectorAll('.dot');
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  dots.forEach(dot => {
    const rect = dot.getBoundingClientRect();
    const dotX = rect.left + rect.width / 2;
    const dotY = rect.top + rect.height / 2;

    const distX = mouseX - dotX;
    const distY = mouseY - dotY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    if (distance < 100) {
      const angle = Math.atan2(distY, distX);
      const force = (100 - distance) / 10;
      
      gsap.to(dot, {
        duration: 0.3,
        x: Math.cos(angle) * force * -1,
        y: Math.sin(angle) * force * -1,
        opacity: 0.5,
        ease: 'power2.out'
      });
    } else {
      gsap.to(dot, {
        duration: 0.3,
        x: 0,
        y: 0,
        opacity: 0.2,
        ease: 'power2.out'
      });
    }
  });
});

// Hero section animation
gsap.from('.hero-content', {
  duration: 1.5,
  y: 100,
  opacity: 0,
  ease: 'power3.out'
});

gsap.from('.hero-image img', {
  duration: 1.5,
  x: -100,
  opacity: 0,
  ease: 'power3.out'
});

gsap.from('.about-card', {
  duration: 1.5,
  y: 100,
  opacity: 0,
  delay: 0.5,
  ease: 'power3.out'
});

gsap.from('.social-links a', {
  duration: 1,
  y: 50,
  opacity: 0,
  delay: 1,
  stagger: 0.2,
  ease: 'power3.out'
});

// Typewriter effect
const typewriterTexts = [
  ">_ Software Developer | Backend Systems, Web & Mobile, IA Integration",
  ">_ Blockchain, IoT and AI Enthusiast",
  ">_ Aspiring Software and Systems Engineer"
];
let typewriterIndex = 0;
const typewriterElement = document.getElementById('typewriter');

function typeWriter() {
  let currentText = typewriterTexts[typewriterIndex];
  let isDeleting = false;
  let charIndex = 0;

  function type() {
    if (isDeleting) {
      if (charIndex > 0) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(type, 60);
      } else {
        isDeleting = false;
        typewriterIndex = (typewriterIndex + 1) % typewriterTexts.length;
        currentText = typewriterTexts[typewriterIndex];
        setTimeout(type, 500);
      }
    } else {
      if (charIndex < currentText.length) {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(type, 80);
      } else {
        isDeleting = true;
        setTimeout(type, 2000);
      }
    }
  }

  type();
}

typeWriter();


const sliderTrack = document.querySelector('.slider-track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

const totalSlides = document.querySelectorAll('.slider-card').length;

function isMobile() {
  return window.innerWidth <= 768;
}

function updateSlider() {
  if (!isMobile()) {
    const width = document.querySelector('.slider').clientWidth;
    sliderTrack.style.transform = `translateX(-${currentIndex * width}px)`;
  } else {
    sliderTrack.style.transform = 'none'; // Reset transform for mobile scroll view
  }
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    if (!isMobile()) {
     
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
      updateSlider();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (!isMobile()) {
    
      currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
      updateSlider();
    }
  });
}

// Initialize ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Function to setup card animations for mobile
function setupMobileCardAnimations() {
  if (window.innerWidth <= 768) {
    const cards = document.querySelectorAll('.slider-card');
    const slider = document.querySelector('.slider');
    
    // Kill any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(st => st.kill());
    
    cards.forEach((card, index) => {
      // Set initial state
      gsap.set(card, {
        opacity: 0,
        y: 50
      });

      // Create ScrollTrigger for each card
      ScrollTrigger.create({
        trigger: card,
        scroller: slider,
        start: 'top bottom-=50',
        markers: false,
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.1,
            ease: 'power2.out'
          });
        }
      });
    });
  }
}

// Add smooth scroll behavior and animations for mobile
if (sliderTrack) {
  if (window.innerWidth <= 768) {
    sliderTrack.style.scrollBehavior = 'smooth';
    setupMobileCardAnimations();
  }
}


// Vérifier si les champs sont remplis et activer/désactiver le bouton
function checkFormFields() {
  const senderName = document.getElementById('senderName');
  const messageText = document.getElementById('messageText');
  const sendBtn = document.getElementById('sendEmailBtn');
  
  if (senderName && messageText && sendBtn) {
    const isFormValid = senderName.value.trim() !== '' && messageText.value.trim() !== '';
    sendBtn.disabled = !isFormValid;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const senderName = document.getElementById('senderName');
  const messageText = document.getElementById('messageText');
  
  if (senderName && messageText) {
    senderName.addEventListener('input', checkFormFields);
    messageText.addEventListener('input', checkFormFields);
  }
});

function openEmailClient() {
  const email = "y4nn.dev@gmail.com";
  const subject = "Contact from your webpage";
  const body = "Bonjour Y4NN,\n\nJe vous contacte depuis votre page web...\n\nCordialement,";
  
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailtoLink);
}

function openWhatsApp() {
  const phoneNumber = "22667260883";
  const message = "Hello Y4NN, I'm reaching you out from your webpage !";
  
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappLink, '_blank');
}


function openLocation() {
  const mapsLink = "https://www.google.com/maps/dir/rue+9.08,+Goughin,+Ouagadougou";
  window.open(mapsLink, '_blank');
}


function sendQuickEmail() {
  const senderName = document.getElementById('senderName').value.trim();
  const messageText = document.getElementById('messageText').value.trim();
  
  // Plus besoin d'alert, le bouton est déjà désactivé si les champs sont vides
  if (!senderName || !messageText) {
    return;
  }
  
  const email = "y4nn.dev@gmail.com";
  const subject = `Message de ${senderName} - Portfolio`;
  const body = `Bonjour Y4NN,\n\nNom: ${senderName}\n\nMessage:\n${messageText}\n\nCordialement,\n${senderName}`;
  
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailtoLink);
  
  // Réinitialiser le formulaire
  document.getElementById('senderName').value = '';
  document.getElementById('messageText').value = '';
  checkFormFields(); // Réactiver la vérification après reset
}

// Journey Timeline Functionality - Add this to your logic.js file

// let journeyInterval;
// let currentPhaseIndex = 0;
// let isJourneyPlaying = true;
// let isUserScrolling = false;
// const PHASE_DURATION = 4000; // 4 seconds per phase

// function initializeJourney() {
//   const journeyContainer = document.getElementById('journeyContainer');
//   if (!journeyContainer) return;

//   const phases = document.querySelectorAll('.journey-phase');
//   const pauseBtn = document.getElementById('pauseBtn');
//   const playBtn = document.getElementById('playBtn');
//   const resetBtn = document.getElementById('resetBtn');

//   if (phases.length === 0) return;

//   // Initialize first phase
//   showPhase(0);
  
//   // Start autoscroll
//   startJourneyAutoscroll();

//   // Event listeners for controls
//   if (pauseBtn) {
//     pauseBtn.addEventListener('click', (e) => {
//       e.preventDefault();
//       pauseJourney();
//     });
//   }
  
//   if (playBtn) {
//     playBtn.addEventListener('click', (e) => {
//       e.preventDefault();
//       resumeJourney();
//     });
//   }
  
//   if (resetBtn) {
//     resetBtn.addEventListener('click', (e) => {
//       e.preventDefault();
//       resetJourney();
//     });
//   }

//   // Handle manual scrolling
//   journeyContainer.addEventListener('scroll', handleManualScroll);
  
//   // Pause on hover, resume on leave (only if not manually paused)
//   journeyContainer.addEventListener('mouseenter', () => {
//     if (isJourneyPlaying && !isUserScrolling) {
//       pauseJourney(false); // Don't change UI state
//     }
//   });
  
//   journeyContainer.addEventListener('mouseleave', () => {
//     if (isJourneyPlaying && !isUserScrolling) {
//       resumeJourney(false); // Don't change UI state
//     }
//   });
// }

// function handleManualScroll() {
//   const container = document.getElementById('journeyContainer');
//   if (!container) return;
  
//   // User is scrolling manually
//   isUserScrolling = true;
  
//   // Pause autoscroll temporarily
//   if (journeyInterval) {
//     clearInterval(journeyInterval);
//     journeyInterval = null;
//   }
  
//   // Update active phase based on scroll position
//   const phases = document.querySelectorAll('.journey-phase');
//   const containerTop = container.scrollTop;
//   const containerHeight = container.offsetHeight;
//   const containerCenter = containerTop + containerHeight / 2;
  
//   phases.forEach((phase, index) => {
//     const phaseTop = phase.offsetTop;
//     const phaseHeight = phase.offsetHeight;
//     const phaseCenter = phaseTop + phaseHeight / 2;
    
//     if (Math.abs(phaseCenter - containerCenter) < phaseHeight) {
//       if (currentPhaseIndex !== index) {
//         currentPhaseIndex = index;
//         updateActivePhase(index);
//         updateProgress();
//       }
//     }
//   });
  
//   // Clear the scrolling flag after a delay
//   clearTimeout(handleManualScroll.timeout);
//   handleManualScroll.timeout = setTimeout(() => {
//     isUserScrolling = false;
//     // Resume autoscroll if still playing
//     if (isJourneyPlaying) {
//       startJourneyAutoscroll();
//     }
//   }, 2000);
// }

// function showPhase(index) {
//   const phases = document.querySelectorAll('.journey-phase');
//   const container = document.getElementById('journeyContainer');
  
//   if (!phases[index] || !container) return;

//   // Update active phase visually
//   updateActivePhase(index);
  
//   // Scroll to phase
//   const targetPhase = phases[index];
//   const containerHeight = container.offsetHeight;
//   const phaseTop = targetPhase.offsetTop;
//   const phaseHeight = targetPhase.offsetHeight;
  
//   // Center the phase in the container
//   const scrollTop = phaseTop - (containerHeight / 2) + (phaseHeight / 2);
//   container.scrollTo({
//     top: Math.max(0, scrollTop),
//     behavior: 'smooth'
//   });
  
//   updateProgress();
//   currentPhaseIndex = index;
// }

// function updateActivePhase(index) {
//   const phases = document.querySelectorAll('.journey-phase');
//   phases.forEach((phase, i) => {
//     if (i === index) {
//       phase.classList.add('active');
//     } else {
//       phase.classList.remove('active');
//     }
//   });
// }

// function updateProgress() {
//   const progressBar = document.getElementById('progressBar');
//   if (!progressBar) return;
  
//   const phases = document.querySelectorAll('.journey-phase');
//   const progress = ((currentPhaseIndex + 1) / phases.length) * 100;
//   progressBar.style.width = `${progress}%`;
// }

// function startJourneyAutoscroll() {
//   const phases = document.querySelectorAll('.journey-phase');
//   if (phases.length === 0 || isUserScrolling) return;

//   journeyInterval = setInterval(() => {
//     if (!isUserScrolling) {
//       currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
//       showPhase(currentPhaseIndex);
//     }
//   }, PHASE_DURATION);
// }

// function pauseJourney(updateUI = true) {
//   if (journeyInterval) {
//     clearInterval(journeyInterval);
//     journeyInterval = null;
//   }
//   isJourneyPlaying = false;
  
//   if (updateUI) {
//     const pauseBtn = document.getElementById('pauseBtn');
//     const playBtn = document.getElementById('playBtn');
//     if (pauseBtn) pauseBtn.style.display = 'none';
//     if (playBtn) playBtn.style.display = 'flex';
//   }
// }

// function resumeJourney(updateUI = true) {
//   isJourneyPlaying = true;
  
//   if (!isUserScrolling) {
//     startJourneyAutoscroll();
//   }
  
//   if (updateUI) {
//     const pauseBtn = document.getElementById('pauseBtn');
//     const playBtn = document.getElementById('playBtn');
//     if (pauseBtn) pauseBtn.style.display = 'flex';
//     if (playBtn) playBtn.style.display = 'none';
//   }
// }

// function resetJourney() {
//   if (journeyInterval) {
//     clearInterval(journeyInterval);
//   }
//   isUserScrolling = false;
//   currentPhaseIndex = 0;
//   showPhase(0);
  
//   if (isJourneyPlaying) {
//     startJourneyAutoscroll();
//   }
// }

// // Initialize when page loads
// document.addEventListener('DOMContentLoaded', () => {
//   setTimeout(initializeJourney, 1000);
// });

// // Call this when the journey slide becomes visible in your main slider
// function onJourneySlideVisible() {
//   setTimeout(() => {
//     resetJourney();
//   }, 300);
// }

// Update animations on resize
window.addEventListener('resize', () => {
  updateSlider();
  if (window.innerWidth <= 768) {
    setupMobileCardAnimations();
  }
  ScrollTrigger.refresh();
});

updateSlider(); // Initial call to set the correct position

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
  const dotsCount = 50;
  
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
  ">_ Junior Software Developer",
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

// Slider functionality
const sliderTrack = document.querySelector('.slider-track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

function updateSlider() {
  const width = document.querySelector('.slider').clientWidth;
  sliderTrack.style.transform = `translateX(-${currentIndex * width}px)`;
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : 2;
  updateSlider();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex < 2) ? currentIndex + 1 : 0;
  updateSlider();
});

window.addEventListener('resize', updateSlider);
updateSlider(); // Initial call to set the correct position

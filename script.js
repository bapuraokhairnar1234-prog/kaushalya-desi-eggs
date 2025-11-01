// Animation on scroll
window.addEventListener('scroll', () => {
  const reveals = document.querySelectorAll('.reveal');
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('active');
    } else {
      reveals[i].classList.remove('active');
    }
  }
});

// Navbar color change on scroll
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Button hover animation
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'scale(1.1)';
    button.style.transition = '0.3s';
  });
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'scale(1)';
  });
});

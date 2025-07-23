document.addEventListener('DOMContentLoaded', () => {
  const scrollingText = document.getElementById('scrollingText');
  const navLinks = document.querySelectorAll('header ul li a');
  const sections = document.querySelectorAll('section');
  const image = document.querySelector('.center-image');

  // Enable scroll after animation
  /*scrollingText.addEventListener('animationend', () => {
    document.body.style.overflowY = 'scroll';
  });*/

  /*document.body.style.overflowY = 'hidden'; // Disable scroll initially

  setTimeout(() => {
    document.body.style.overflowY = 'scroll'; // Enable after 10 seconds
  }, 8000); // 10000 ms = 10 seconds*/


  // Split name into span elements
  const name = scrollingText.textContent.trim();
  scrollingText.innerHTML = '';
  name.split('').forEach(char => {
    const span = document.createElement('span');
    span.classList.add('name-char');
    span.textContent = char === ' ' ? '\u00A0' : char;
    scrollingText.appendChild(span);
  });

  const chars = document.querySelectorAll('.name-char');

  // Overlap detection
  function checkOverlap() {
    const imageRect = image.getBoundingClientRect();
    chars.forEach(char => {
      const charRect = char.getBoundingClientRect();
      const overlap =
        !(charRect.right < imageRect.left ||
          charRect.left > imageRect.right ||
          charRect.bottom < imageRect.top ||
          charRect.top > imageRect.bottom);

      char.classList.toggle('transparent-with-stroke', overlap);
    });
  }

  setInterval(checkOverlap, 100);

  // Highlight current nav link on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const offset = section.offsetTop;
      if (window.scrollY >= offset - 100) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});

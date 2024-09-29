// Titre principal du fichier: Script de gestion du menu burger et des animations

document.addEventListener('DOMContentLoaded', () => {
  // Gestion du menu burger
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.querySelector('nav');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      nav.classList.toggle('-right-full');
      nav.classList.toggle('right-0');

      // Animation vers la croix
      menuToggle.classList.toggle('open');

      // Animation des barres du burger
      const spans = menuToggle.querySelectorAll('span');
      if (menuToggle.classList.contains('open')) {
        spans[0].classList.remove('translate-y-2');
        spans[2].classList.remove('-translate-y-2');
        spans[0].classList.add('-rotate-45', 'translate-y-0');
        spans[1].classList.add('opacity-0');
        spans[2].classList.add('rotate-45', '-translate-y-0');
      } else {
        spans[0].classList.add('translate-y-2');
        spans[2].classList.add('-translate-y-2');
        spans[0].classList.remove('-rotate-45', 'translate-y-0');
        spans[1].classList.remove('opacity-0');
        spans[2].classList.remove('rotate-45', '-translate-y-0');
      }
    });
  }

  // Animations avec GSAP et ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Animation du soulignement des liens du menu
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    const underline = link.querySelector('.underline-animation');
    underline.style.display = 'block'; // Assurez-vous que le span est affiché comme un bloc
    underline.style.height = '2px';    // Définissez la hauteur du soulignement
    underline.style.backgroundColor = 'black'; // Définissez la couleur du soulignement
    underline.style.width = '0';       // Largeur initiale nulle
    underline.style.transition = 'width 0.3s ease-in-out'; // Transition fluide

    link.addEventListener('mouseover', () => {
      underline.style.width = '100%'; // Largeur à 100% au survol
    });

    link.addEventListener('mouseout', () => {
      underline.style.width = '0'; // Retour à la largeur nulle
    });
  });

  // Animation du carrousel
  const carousel = document.getElementById('carousel');
  const images = carousel.querySelectorAll('img');
  const dots = document.querySelectorAll('[role="tab"]');
  let currentIndex = 0;
  let autoSlideInterval;

  function showImage(index) {
    const offset = -index * 100;
    carousel.style.transform = `translateX(${offset}%)`;
    carousel.style.transition = 'transform 1s ease-in-out'; // Transition plus douce
    dots.forEach(dot => dot.setAttribute('aria-selected', 'false'));
    dots[index].setAttribute('aria-selected', 'true');
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
      showImage(currentIndex);
    }, 5000); // Défilement automatique toutes les 5 secondes
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  document.getElementById('chevron-left').addEventListener('click', () => {
    stopAutoSlide();
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    showImage(currentIndex);
    startAutoSlide();
  });

  document.getElementById('chevron-right').addEventListener('click', () => {
    stopAutoSlide();
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    showImage(currentIndex);
    startAutoSlide();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopAutoSlide();
      currentIndex = index;
      showImage(currentIndex);
      startAutoSlide();
    });
  });

  // Initialiser le carrousel
  showImage(currentIndex);
  startAutoSlide();

  // Assurez-vous que GSAP et ScrollTrigger sont chargés
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Initialiser les animations après un léger délai
    setTimeout(() => {
      // Sélectionner toutes les sections à animer
      const sections = document.querySelectorAll('.animate-section');

      sections.forEach(section => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 95%",
            end: "bottom 5%",
            toggleActions: "play reverse play reverse" // Rejoue l'animation à chaque entrée/sortie
          }
        });
      });

      // Rafraîchir ScrollTrigger après le chargement de la page
      ScrollTrigger.refresh();
    }, 5); // Délai de 100ms
  }
  
});
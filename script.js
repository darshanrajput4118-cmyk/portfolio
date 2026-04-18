// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255,255,255,0.98)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(255,255,255,0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            
            // Stagger animations for grids
            const cards = entry.target.querySelectorAll('.skill-card, .project-card');
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
            });
        }
    });
}, observerOptions);

// Observe sections and cards
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    observer.observe(card);
});

// Contact form handler (demo)
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I\'ll get back to you soon.');
    e.target.reset();
});

// Create animated background bubbles
function createBubbles() {
    const bubblesContainer = document.querySelector('.bubbles');
    if (!bubblesContainer) return;
    for (let i = 0; i < 30; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.width = Math.random() * 60 + 20 + 'px';
        bubble.style.height = bubble.style.width;
        bubble.style.animationDuration = (Math.random() * 15 + 10) + 's';
        bubble.style.animationDelay = Math.random() * 5 + 's';
        bubblesContainer.appendChild(bubble);
    }
}

// Parallax effect for hero image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const imgBox = document.querySelector('.img-box');
    const rate = scrolled * -0.5;
    imgBox.style.transform = `translateY(${rate}px)`;
});

// Project data
const projects = {
  ecommerce: {
    title: 'E-commerce Dashboard',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
    desc: 'Interactive dashboard for sales analytics featuring real-time charts, responsive design, and data visualization using Chart.js.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Chart.js'],
    features: [
      'Responsive sales dashboard',
      'Real-time chart animations',
      'Interactive data filtering',
      'Mobile-first design'
    ],
    demo: '#',
    code: 'https://github.com'
  },
  taskmanager: {
    title: 'Task Manager App',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
    desc: 'Modern task management application with drag & drop functionality, local storage, and beautiful UI.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage'],
    features: [
      'Drag & drop task reordering',
      'Add, edit, delete tasks',
      'Persistent local storage',
      'Responsive design'
    ],
    demo: '#',
    code: 'https://github.com'
  },
  weather: {
    title: 'Weather App',
    img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop',
    desc: 'Real-time weather application consuming OpenWeatherMap API with geolocation and 5-day forecast.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'OpenWeather API'],
    features: [
      'Real-time weather data',
      'Geolocation support',
      '5-day forecast',
      'Smooth animations'
    ],
    demo: '#',
    code: 'https://github.com'
  }
};

// Project modal functionality
function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const overlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('modalClose');
  const projectBtns = document.querySelectorAll('[data-project]');

  projectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectKey = btn.dataset.project;
      const project = projects[projectKey];
      if (project) {
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalImg').src = project.img;
        document.getElementById('modalImg').alt = project.title;
        document.getElementById('modalDesc').textContent = project.desc;
        
        const techContainer = document.getElementById('modalTech');
        techContainer.innerHTML = project.tech.map(t => `<span class="tech-badge">${t}</span>`).join('');
        
        const featuresContainer = document.getElementById('modalFeatures');
        featuresContainer.innerHTML = project.features.map(f => `<li>${f}</li>`).join('');
        
        document.getElementById('modalDemo').href = project.demo;
        document.getElementById('modalCode').href = project.code;
        
        modal.classList.add('active');
      }
    });
  });

  function closeModal() {
    modal.classList.remove('active');
  }

  overlay.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// Initialize bubbles
document.addEventListener('DOMContentLoaded', () => {
  createBubbles();
  initProjectModal();
});

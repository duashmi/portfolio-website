// Sample projects data
const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce solution with payment integration, user authentication, and admin dashboard.",
        tags: ["React", "Node.js", "MongoDB"],
        icon: "🛒",
        link: "#"
    },
    {
        id: 2,
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates and team collaboration features.",
        tags: ["Vue.js", "Firebase", "TypeScript"],
        icon: "✅",
        link: "#"
    },
    {
        id: 3,
        title: "Weather Dashboard",
        description: "An interactive weather dashboard with forecasts, maps, and weather alerts using API integration.",
        tags: ["JavaScript", "API", "CSS"],
        icon: "🌤️",
        link: "#"
    },
    {
        id: 4,
        title: "Social Media Analytics",
        description: "Analytics dashboard for social media metrics with data visualization and reporting tools.",
        tags: ["Python", "Django", "Chart.js"],
        icon: "📊",
        link: "#"
    },
    {
        id: 5,
        title: "Portfolio Website",
        description: "A responsive portfolio website with modern design and smooth animations.",
        tags: ["HTML", "CSS", "JavaScript"],
        icon: "💼",
        link: "#"
    },
    {
        id: 6,
        title: "Recipe Finder App",
        description: "Find recipes based on ingredients with step-by-step instructions and nutritional information.",
        tags: ["React Native", "API", "Redux"],
        icon: "🍳",
        link: "#"
    }
];

// Sample blog posts data
const blogPosts = [
    {
        id: 1,
        title: "Getting Started with React Hooks",
        excerpt: "Learn how to use React Hooks to manage state and side effects in functional components.",
        date: "March 15, 2024",
        icon: "⚛️",
        link: "#"
    },
    {
        id: 2,
        title: "CSS Grid vs Flexbox: When to Use Which",
        excerpt: "A comprehensive guide to choosing between CSS Grid and Flexbox for your layout needs.",
        date: "March 10, 2024",
        icon: "🎨",
        link: "#"
    },
    {
        id: 3,
        title: "Building RESTful APIs with Flask",
        excerpt: "Step-by-step tutorial on creating RESTful APIs using Python and Flask framework.",
        date: "March 5, 2024",
        icon: "🐍",
        link: "#"
    },
    {
        id: 4,
        title: "JavaScript Async/Await Explained",
        excerpt: "Understanding asynchronous JavaScript with async/await for cleaner and more readable code.",
        date: "February 28, 2024",
        icon: "⚡",
        link: "#"
    },
    {
        id: 5,
        title: "Modern Web Design Principles",
        excerpt: "Key principles and best practices for creating modern, user-friendly web interfaces.",
        date: "February 20, 2024",
        icon: "✨",
        link: "#"
    },
    {
        id: 6,
        title: "Git Workflow Best Practices",
        excerpt: "Essential Git workflows and branching strategies for efficient team collaboration.",
        date: "February 15, 2024",
        icon: "🔀",
        link: "#"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    loadProjects();
    loadBlogPosts();
    initializeContactForm();
    initializeSmoothScroll();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.style.color = '';
            });
            if (navLink) {
                navLink.style.color = 'var(--primary-color)';
            }
        }
    });
}

// Load projects into the grid
function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card" onclick="window.open('${project.link}', '_blank')">
            <div class="project-image">${project.icon}</div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="${project.link}" class="project-link" onclick="event.stopPropagation()">
                    View Project →
                </a>
            </div>
        </div>
    `).join('');
}

// Load blog posts into the grid
function loadBlogPosts() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;

    // Try to fetch blog posts from API, fallback to local data
    fetch('/api/blog')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('API not available');
        })
        .then(posts => {
            renderBlogPosts(posts);
        })
        .catch(error => {
            console.log('Using local blog data:', error);
            renderBlogPosts(blogPosts);
        });
}

// Render blog posts
function renderBlogPosts(posts) {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;

    blogGrid.innerHTML = posts.map(post => `
        <div class="blog-card" onclick="window.open('${post.link || '#'}', '_blank')">
            <div class="blog-image">${post.icon || '📝'}</div>
            <div class="blog-content">
                <div class="blog-date">${post.date}</div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <a href="${post.link || '#'}" class="blog-link" onclick="event.stopPropagation()">
                    Read More →
                </a>
            </div>
        </div>
    `).join('');
}

// Initialize contact form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Try to send to backend, otherwise show alert
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to send message');
        })
        .then(data => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
        })
        .catch(error => {
            console.log('Form submission error:', error);
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
        });
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Add scroll animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

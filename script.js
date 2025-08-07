// Scroll Animation Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            
            // If the credentials section is in view, add the class to its content
            if (entry.target.id === 'credentials') {
                credentialsContent.classList.add('in-view');
            } else if (entry.target.id === 'experience') {
                const experienceContent = document.querySelector('.experience-content');
                if (experienceContent) experienceContent.classList.add('in-view');
            } else if (entry.target.id === 'projects') {
                const projectsContainer = document.querySelector('.projects-content');
                if (projectsContainer) projectsContainer.classList.add('in-view');
            }
        }
    });
}, observerOptions);

// Elements to observe
const sections = document.querySelectorAll('.section');
const projectCards = document.querySelectorAll('.project-card');
const fadeElements = document.querySelectorAll('.fade-in');
const credentialsContent = document.querySelector('.credentials-content');

// Observe elements
sections.forEach(section => observer.observe(section));
projectCards.forEach(card => observer.observe(card));
fadeElements.forEach(element => observer.observe(element));

// Smooth scrolling for navigation links
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

// Toggle button functionality for Python libraries
document.querySelectorAll(".toggle-button").forEach((button) => {
    button.addEventListener("click", () => {
        const toggleList = button.nextElementSibling;
        if (toggleList.style.display === "none" || toggleList.style.display === "") {
            toggleList.style.display = "block";
        } else {
            toggleList.style.display = "none";
        }
    });
});


// Add active class to nav items when scrolling
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            currentSection = '#' + section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });
}); 
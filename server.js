// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeToggle.textContent = '☀️ Mode';
    }
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙 Mode';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️ Mode';
    }
});

// Contact Form Validation Logic
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailInput = document.getElementById('email').value;

    if (emailInput.includes('@')) {
        formFeedback.style.color = 'green';
        formFeedback.textContent = 'Thank you! Your message has been sent.';
        contactForm.reset();
    } else {
        formFeedback.style.color = 'red';
        formFeedback.textContent = 'Please enter a valid email address.';
    }
});

const themeSwitch = document.getElementById('theme-switch');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const body = document.body;

function setTheme(isDark) {
    if (isDark) {
        body.classList.remove('light-theme');
        sunIcon.style.display = 'inline-block';
        moonIcon.style.display = 'none';
    } else {
        body.classList.add('light-theme');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline-block';
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function applyTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme === 'dark');
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    setTheme(currentTheme === 'light');
}

themeSwitch.addEventListener('click', toggleTheme);

// Apply theme when the script runs and when the DOM is fully loaded
applyTheme();
document.addEventListener('DOMContentLoaded', applyTheme);
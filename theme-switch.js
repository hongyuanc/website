const darkThemeStylesheet = document.getElementById('dark-theme-style');
const lightThemeStylesheet = document.getElementById('light-theme-style');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

function setTheme(isDark) {
    if (isDark) {
        darkThemeStylesheet.disabled = false;
        lightThemeStylesheet.disabled = true;
        sunIcon.style.display = 'inline-block';
        moonIcon.style.display = 'none';
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    } else {
        darkThemeStylesheet.disabled = true;
        lightThemeStylesheet.disabled = false;
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline-block';
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    document.body.style.display = 'none';
    document.body.offsetHeight; // Trigger a reflow
    document.body.style.display = '';
}

function applyTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme === 'dark');
}

// Apply theme immediately when the script runs
applyTheme();

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    setTheme(currentTheme === 'light');
}

document.getElementById('theme-switch').addEventListener('click', toggleTheme);

// Apply theme again when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', applyTheme);


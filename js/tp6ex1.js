const btn = document.getElementById('themeToggle');

btn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        btn.textContent = "Passer en Mode Clair";
    } else {
        btn.textContent = "Passer en Mode Sombre";
    }
});
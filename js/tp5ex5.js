window.addEventListener('DOMContentLoaded', () => {
    // On cible le menu de l'exercice, pas la navbar globale
    const nav = document.querySelector('.tp5-sticky-nav');

    if (!nav) return;

    const stickyPos = nav.offsetTop;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset >= stickyPos) {
            nav.classList.add('is-sticky');
        } else {
            nav.classList.remove('is-sticky');
        }
    });
});

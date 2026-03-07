// Navbar Fixed & Blur Effect on Scroll
window.onscroll = function () {
    const header = document.querySelector('#navbar');
    const fixedNav = header.offsetTop;

    if (window.pageYOffset > fixedNav) {
        header.classList.add('navbar-fixed');
    } else {
        header.classList.remove('navbar-fixed');
    }
};

// Hamburger Menu Logic
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', function () {
    // Ubah icon hamburger jadi X
    hamburger.classList.toggle('hamburger-active');
    // Munculkan menu mobile
    navMenu.classList.toggle('hidden');
});
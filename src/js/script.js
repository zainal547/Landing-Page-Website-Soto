const hamburger = document.querySelector('#hamburger');
const mobileMenu = document.querySelector('#mobile-menu');

hamburger.addEventListener('click', function () {
    this.classList.toggle('hamburger-active');
    
    if (mobileMenu.classList.contains('hidden')) {
        // Munculkan menu
        mobileMenu.classList.remove('hidden');
        // Beri jeda sedikit agar transisi CSS terbaca
        setTimeout(() => {
            mobileMenu.classList.remove('opacity-0', '-translate-y-4');
            mobileMenu.classList.add('opacity-100', 'translate-y-0');
        }, 10);
    } else {
        // Sembunyikan menu dengan animasi balik
        mobileMenu.classList.add('opacity-0', '-translate-y-4');
        mobileMenu.classList.remove('opacity-100', 'translate-y-0');
        // Tunggu animasi selesai baru beri class hidden
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    }
});
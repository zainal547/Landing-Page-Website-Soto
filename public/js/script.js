document.addEventListener('DOMContentLoaded', () => {
    // === Logic Navigasi Hamburger ===
    const hamburger = document.querySelector('#hamburger');
    const mobileMenu = document.querySelector('#mobile-menu');

    if (hamburger && mobileMenu) { // Validasi agar tidak error jika elemen tidak ada
        hamburger.addEventListener('click', function () {
            this.classList.toggle('hamburger-active');
            
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                setTimeout(() => {
                    mobileMenu.classList.remove('opacity-0', '-translate-y-4');
                    mobileMenu.classList.add('opacity-100', 'translate-y-0');
                }, 10);
            } else {
                mobileMenu.classList.add('opacity-0', '-translate-y-4');
                mobileMenu.classList.remove('opacity-100', 'translate-y-0');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            }
        });
    }

    // === Logic Menu Filtering ===
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('#menu-grid article');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedCategory = button.getAttribute('data-category');

            // 1. Update UI Tombol (Visual Select)
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-orange-600', 'text-white', 'font-semibold');
                btn.classList.add('border', 'border-slate-300', 'text-slate-600');
            });
            button.classList.add('bg-orange-600', 'text-white', 'font-semibold');
            button.classList.remove('border', 'border-slate-300', 'text-slate-600');

            // 2. Filter Produk
            productCards.forEach(card => {
                const productCategory = card.getAttribute('data-product-category');
                
                if (selectedCategory === 'semua' || selectedCategory === productCategory) {
                    card.classList.remove('hidden');
                    card.classList.add('flex'); 
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('flex');
                }
            });
        });
    });
});
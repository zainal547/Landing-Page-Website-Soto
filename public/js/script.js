document.addEventListener('DOMContentLoaded', () => {

    /**
     * 1. GLOBAL: UPDATE ANGKA KERANJANG (BADGE)
     * Berfungsi memperbarui angka pada tombol keranjang di header.
     */
    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem('warung_cart')) || [];
        const countElement = document.getElementById('cart-count');
        if (countElement) {
            const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
            countElement.textContent = totalItems;
        }
    };
    updateCartCount();

    /**
     * 2. LOGIC: HAMBURGER MENU (MOBILE)
     * Mengatur buka-tutup menu navigasi pada tampilan layar kecil.
     */
    const hamburger = document.querySelector('#hamburger');
    const mobileMenu = document.querySelector('#mobile-menu');
    if (hamburger && mobileMenu) {
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
                setTimeout(() => mobileMenu.classList.add('hidden'), 300);
            }
        });
    }

    /**
     * 3. LOGIC: FILTER MENU
     * Menyaring tampilan menu berdasarkan kategori (Soto, Nasi, dsb).
     */
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        const productCards = document.querySelectorAll('#menu-grid article');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');
                
                // Update styling tombol aktif
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-orange-600', 'text-white', 'font-semibold');
                    btn.classList.add('border', 'border-slate-300', 'text-slate-600');
                });
                button.classList.add('bg-orange-600', 'text-white', 'font-semibold');
                button.classList.remove('border', 'border-slate-300', 'text-slate-600');

                // Filter kartu produk
                productCards.forEach(card => {
                    const productCat = card.getAttribute('data-product-category');
                    if (category === 'semua' || category === productCat) {
                        card.classList.replace('hidden', 'flex');
                    } else {
                        card.classList.replace('flex', 'hidden');
                    }
                });
            });
        });
    }

    /**
     * 4. LOGIC: TAMBAH KE KERANJANG
     * Menyimpan menu yang dipilih ke LocalStorage dan memberikan alert.
     */
    const cartButtons = document.querySelectorAll('.js-add-to-cart');
    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            let cart = JSON.parse(localStorage.getItem('warung_cart')) || [];
            const product = {
                id: button.dataset.productId,
                name: button.dataset.name,
                price: parseInt(button.dataset.price),
                quantity: 1
            };

            const existingIndex = cart.findIndex(item => item.id === product.id);
            if (existingIndex > -1) {
                cart[existingIndex].quantity += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem('warung_cart', JSON.stringify(cart));
            alert(`${product.name} Menu Berhasil Ditambahkan ke Keranjang!`);
            updateCartCount();
        });
    });

    /**
     * 5. LOGIC: TAMPILAN CHECKOUT INTERAKTIF
     * Merender daftar pesanan dan menghitung Total Bayar secara otomatis.
     */
    // 5. === LOGIC: Tampilan Checkout Interaktif ===
    const renderCheckout = () => {
    const checkoutContainer = document.querySelector('#checkout-list');
    if (!checkoutContainer) return;

    const cart = JSON.parse(localStorage.getItem('warung_cart')) || [];
    
    if (cart.length === 0) {
        checkoutContainer.innerHTML = '<p class="text-center py-10 text-slate-500">Keranjang kosong.</p>';
        const extTotal = document.querySelector('#external-grand-total');
        if (extTotal) extTotal.textContent = 'Rp 0';
        return;
    }

    let subtotalAwal = 0;
    const itemsHtml = cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotalAwal += itemTotal;
        return `
            <div class="flex justify-between items-center border-b py-4">
                <div>
                    <h4 class="font-bold text-slate-800">${item.name}</h4>
                    <p class="text-xs text-slate-500">Rp${item.price.toLocaleString()}</p>
                </div>
                <div class="flex items-center gap-3">
                    <button onclick="window.changeQty(${index}, -1)" class="w-7 h-7 flex items-center justify-center rounded-full border border-slate-300">-</button>
                    <span class="text-sm font-bold w-4 text-center">${item.quantity}</span>
                    <button onclick="window.changeQty(${index}, 1)" class="w-7 h-7 flex items-center justify-center rounded-full border border-slate-300">+</button>
                </div>
            </div>`;
    }).join('');

    // --- LOGIKA DISKON KELIPATAN 50.000 ---
    // Setiap kelipatan 50rb dapat 10%. Contoh: 100rb = 20%, 150rb = 30%, dst.
    const jumlahKelipatan = Math.floor(subtotalAwal / 50000);
    const persenDiskon = jumlahKelipatan * 10; 
    const potonganHarga = (persenDiskon / 75) * subtotalAwal;
    const totalAkhir = subtotalAwal - potonganHarga;

    // Tampilkan rincian di kontainer checkout
    checkoutContainer.innerHTML = `
        ${itemsHtml}
        <div class="mt-6 p-4 bg-orange-50 rounded-xl space-y-2">
            <div class="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span>Rp${subtotalAwal.toLocaleString()}</span>
            </div>
            ${persenDiskon > 0 ? `
            <div class="flex justify-between text-green-600 font-medium">
                <span>Diskon Promo (${persenDiskon}%):</span>
                <span>- Rp${potonganHarga.toLocaleString()}</span>
            </div>` : ''}
            <div class="flex justify-between items-center font-bold text-xl border-t pt-2">
                <span class="text-slate-700">Total Bayar:</span>
                <span class="text-orange-600">Rp${totalAkhir.toLocaleString()}</span>
            </div>
        </div>
    `;

    // Update total yang ada di dekat tombol Checkout
    const externalTotal = document.querySelector('#external-grand-total');
    if (externalTotal) {
        externalTotal.textContent = `Rp ${totalAkhir.toLocaleString()}`;
        }
    };

    /**
     * 6. FUNGSI GLOBAL UNTUK TOMBOL DINAMIS
     * Dibutuhkan agar onclick="window.xxx" dari renderCheckout bisa terpanggil.
     */
    window.changeQty = (index, delta) => {
        let cart = JSON.parse(localStorage.getItem('warung_cart')) || [];
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) cart.splice(index, 1);
        localStorage.setItem('warung_cart', JSON.stringify(cart));
        renderCheckout();
        updateCartCount();
    };

    window.removeItem = (index) => {
        let cart = JSON.parse(localStorage.getItem('warung_cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('warung_cart', JSON.stringify(cart));
        renderCheckout();
        updateCartCount();
    };

    // Jalankan render awal jika berada di halaman checkout
    renderCheckout();
});
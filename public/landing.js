document.addEventListener("DOMContentLoaded", function () {
  // Function untuk alert login
  function showLoginAlert() {
    const alertBox = document.getElementById('login-alert');
    alertBox.classList.remove('hidden');
    setTimeout(() => {
      alertBox.classList.add('hidden');
    }, 2000); // alert muncul 2 detik
  }

  // Inisialisasi AOS
  AOS.init({
    duration: 1000,
    easing: 'ease-out',
  });

  // Hero slider
  const slides = document.querySelectorAll("#hero-slider img");
  const dots = document.querySelectorAll("[data-dot]");
  let current = 0;
  const interval = 3000;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.opacity = i === index ? "1" : "0";
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("opacity-100", i === index);
      dot.classList.toggle("opacity-50", i !== index);
    });
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  showSlide(current);
  setInterval(nextSlide, interval);

  // Ambil data produk dan render
  async function ambilData() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      const productContainer = document.getElementById('product');

      data.forEach(product => {
        const cardWrapper = document.createElement('div');
        cardWrapper.innerHTML = `
          <a href="detail.html?id=${product.id}" class="product-link">
            <div class="relative bg-white p-4 rounded-2xl shadow text-[#333333] font-serif transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:scale-105 h-[420px] flex flex-col justify-between">
              <img src="${product.image}" alt="${product.title}" class="h-48 w-full object-contain mb-4 pointer-events-none" />
              <div class="flex-1 flex flex-col justify-between">
                <h2 class="text-md mb-2 h-12 overflow-hidden text-ellipsis line-clamp-2">${product.title}</h2>
                <p class="text-base font-semibold text-right">$${product.price}</p>
              </div>
              <button class="absolute bottom-4 right-4 z-10">
                <img src="../public/aset/button wishlist.png" alt="Wishlist" class="w-5 h-5">
              </button>
            </div>
          </a>
        `;

        // Tambahkan listener untuk redirect login
        const link = cardWrapper.querySelector('.product-link');
        link.addEventListener('click', function (e) {
          e.preventDefault();
          showLoginAlert();
          setTimeout(() => {
            window.location.href = 'login.html';
          }, 2000); // setelah alert, redirect
        });

        productContainer.appendChild(cardWrapper);
      });
    } catch (error) {
      console.error('Data Error:', error);
    }
  }

  ambilData();
});

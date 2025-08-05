document.addEventListener("DOMContentLoaded", function () {
  async function ambilData() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();

      const productContainer = document.getElementById('product');

      data.forEach(product => {
        const card = `
          <a href="detail.html?id=${product.id}">
            <div class="relative bg-white p-4 rounded-2xl shadow text-[#333333] font-serif transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:scale-105 h-[420px] flex flex-col justify-between">
              <img src="${product.image}" alt="${product.title}" class="h-48 w-full object-contain mb-4 pointer-events-none" />
              <div class="flex-1 flex flex-col justify-between">
                <h2 class="text-md mb-2 h-12 overflow-hidden text-ellipsis line-clamp-2">${product.title}</h2>
                <p class="text-left">$${product.price}</p>
              </div>
            </div>
          </a>`;
        
        productContainer.insertAdjacentHTML("beforeend", card);
      });

    } catch (error) {
      console.error('Data Error:', error);
    }
  }

  ambilData();


function showLoginAlert() {
  const alertBox = document.getElementById('login-alert');
    alertBox.classList.remove('hidden');

    setTimeout(() => {
      alertBox.classList.add('hidden');
    }, 3000);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1000,
    easing: 'ease-out',
  });
});

document.addEventListener("DOMContentLoaded", function () {
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
});
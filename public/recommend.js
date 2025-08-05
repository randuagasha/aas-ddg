const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

async function productDetail(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await response.json();

    const productContainer = document.getElementById("product");

    if (!product || Object.keys(product).length === 0) {
      productContainer.innerHTML = `
        <div class="col-span-full text-center py-10 text-red-500">
          Produk tidak ditemukan
        </div>`;
      return;
    }

    productContainer.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20">
        <!-- Gambar -->
        <div class="w-full flex justify-center">
          <div class="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
            <img src="${product.image}" alt="${product.title}" class="w-full h-96 object-contain" />
          </div>
        </div>

        <!-- Info Produk -->
        <div class="flex flex-col justify-between">
          <div>
            <h1 class="text-3xl font-bold mb-2">${product.title}</h1>
            <p class="text-gray-500 mb-4">${product.category}</p>
            <p class="text-xl font-semibold text-black mb-6">$${product.price}</p>
            <p class="text-gray-700 mb-6">${product.description}</p>

            <!-- Size -->
            <div class="mb-6">
              <span class="text-lg font-semibold mr-4">Size:</span>
              <button class="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded mx-1">S</button>
              <button class="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded mx-1">M</button>
              <button class="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded mx-1">L</button>
              <button class="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded mx-1">XL</button>
            </div>



            <!-- Add to Cart -->
            <button id="addToCartBtn" class="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
            onclick = "addtocart(${product.id})">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <!-- Recommendation Section -->
      <div class="mt-20">
        <h2 class="text-2xl font-semibold mb-6">Recommend For You</h2>
        <div id="recommendation" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"></div>
      </div>
    `;


    loadRecommendations();

  } catch (error) {
    console.error("Error fetching product details:", error);
    const productContainer = document.getElementById("product");
    productContainer.innerHTML = `
      <div class="col-span-full text-center py-10 text-red-500">
        Terjadi kesalahan saat mengambil data produk
      </div>`;
  }
}

async function loadRecommendations() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    const recommendationContainer = document.getElementById('recommendation');
    const sliced = data.slice(0, 3);

    sliced.forEach(product => {
      recommendationContainer.innerHTML += `
        <a href="detail.html?id=${product.id}">
          <div class="bg-white rounded-md p-4 hover:shadow-md transition-all duration-300">
            <img src="${product.image}" alt="${product.title}" class="h-48 w-full object-contain mb-2">
            <p class="text-sm mb-1 truncate">${product.title}</p>
            <p class="text-sm font-semibold">$${product.price}</p>
          </div>
        </a>
      `;
    });

  } catch (error) {
    console.error('Gagal memuat rekomendasi:', error);
  }
}

productDetail(productId);

async function addtocart(id) {
  try { 
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await response.json();
 
    let cart = JSON.parse(localStorage.getItem('cart')) || [] ;


const existing = cart.find(item => item.id === Number(id)); 
    if (existing) {
      existing.quantity += 1;
    } 
    else {
      product.quantity = 1;
      cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    alert('BERHASIL')

  } catch (error) {
    alert('error')
  }
}
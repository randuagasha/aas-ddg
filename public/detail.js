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
  <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mt-24 px-6">
    <!-- Gambar Produk -->
    <div class="flex justify-center">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden p-4 w-full max-w-md">
        <img src="${product.image}" alt="${product.title}" class="object-contain w-full h-auto" />
      </div>
    </div>

    <!-- Info Produk -->
    <div class="flex flex-col justify-start gap-4">
      <div>
        <h1 class="text-3xl font-semibold">${product.title}</h1>
        <p class="text-sm text-gray-500 mb-2">${product.category}</p>
        <p class="text-gray-600">${product.description}</p>
      </div>

      <div class="mt-4">
        <p class="text-xl font-medium">Price :</p>
        <p class="text-3xl font-bold text-gray-900 mt-1">$ ${product.price.toFixed(2)}</p>
        <div class="flex gap-5">
        <button id="addToCartBtn" class="bg-[#110064] hover:bg-[#0d004b] text-white px-6 py-3 rounded-md mt-4 w-fit flex items-center gap-2 transition duration-300">
          <i class="fa fa-shopping-cart"></i> 🛒Add to Cart 
        </button>
        <button id="buyBtn" class="bg-[#110064] hover:bg-[#0d004b] text-white px-6 py-3 rounded-md mt-4 w-fit flex items-center gap-2 transition duration-300">
          <i class="fa fa-shopping-cart"></i> Buy Now
        </button>
        </div>
      </div>

      <div class="mt-6">
        <h3 class="text-lg font-semibold mb-2">Overview</h3>
        <p class="text-2xl font-bold">${product.rating.rate.toFixed(1)}</p>
        <div class="flex items-center text-yellow-500">
          ${'★'.repeat(Math.floor(product.rating.rate))}${product.rating.rate % 1 >= 0.5 ? '½' : ''}${'☆'.repeat(5 - Math.ceil(product.rating.rate))}
        </div>
      </div>

      <div class="mt-6">
        <h3 class="text-lg font-semibold mb-2">User Reviews</h3>
        <div class="space-y-2 text-sm">
          <div>
            <span class="font-semibold">Username</span>
            <div class="text-yellow-500">★★★★★</div>
            <p>Great!, I like the item</p>
          </div>
          <div>
            <span class="font-semibold">Username</span>
            <div class="text-yellow-500">★★★★☆</div>
            <p>Best!!!!!</p>
          </div>
          <div>
            <span class="font-semibold">Username</span>
            <div class="text-yellow-500">★★★★☆</div>
            <p>Item arrived safely</p>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

    document.getElementById("addToCartBtn").addEventListener("click", () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.href = "cart.html";
    });
    document.getElementById("buyBtn").addEventListener("click", () => {
        const checkoutItem = [{
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1
      }];
  localStorage.setItem("checkoutItems", JSON.stringify(checkoutItem));
  window.location.href = "checkout.html";
});

  } catch (error) {
    alert(`error`);
  }
}

productDetail(productId);
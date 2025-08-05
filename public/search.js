async function searchProducts(keyword) {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();

    return products.filter(product =>
      product.title.toLowerCase().includes(keyword.toLowerCase()) 
    );

  } catch (error) {
    console.error(error);
    return [];
  }
}

function renderProducts(products) {
  const productContainer = document.getElementById('product');
  productContainer.innerHTML = '';
  
  products.forEach(product => {
    const card = `
      <a href="detail.html?id=${product.id}">
        <div class="relative bg-white p-4 rounded-2xl shadow text-[#333333] font-serif transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:scale-105 h-[420px] flex flex-col justify-between">
          <img src="${product.image}" alt="${product.title}" class="h-48 w-full object-contain mb-4 pointer-events-none" />
          <div class="flex-1 flex flex-col justify-between">
            <h2 class="text-md mb-2 h-12 overflow-hidden text-ellipsis line-clamp-2">${product.title}</h2>
            <p class="text-left">$${product.price}</p>
          </div>
          <button class="absolute bottom-4 right-4 z-10">
            <img src="../public/aset/button wishlist.png" alt="Wishlist" class="w-5 h-5">
          </button>
        </div>
      </a>`;
    productContainer.insertAdjacentHTML("beforeend", card);
  });
}

document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("searchInput").addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const searchTerm = e.target.value.trim();

      if (searchTerm.length > 0) {
        const results = await searchProducts(searchTerm);
        renderProducts(results);
      } else {
        ambilData();
      }
    }
  });
});
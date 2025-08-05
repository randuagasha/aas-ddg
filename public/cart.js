function renderCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cartItems");
  const summaryContainer = document.getElementById("shoppingSummary");

  if (cartItems.length === 0) {
    cartContainer.innerHTML = `<p class="text-center text-gray-500 py-10">Your cart is empty.</p>`;
    summaryContainer.innerHTML = "";
    return;
  }

  cartContainer.innerHTML = `
    <div class="flex items-center mb-4">
      <input type="checkbox" id="selectAll" class="form-checkbox w-5 h-5 accent-black mr-2" checked>
      <label for="selectAll" class="font-medium text-sm">Select All</label>
    </div>
    <div id="cartList">
      ${cartItems.map((item, index) => `
        <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow mb-4 cart-item" data-index="${index}">
          <div class="flex items-center gap-4">
            <input type="checkbox" class="item-checkbox form-checkbox w-5 h-5 accent-black" checked />
            <img src="${item.image}" alt="${item.title}" class="w-20 h-20 object-contain rounded" />
            <div>
              <h2 class="font-semibold">${item.title}</h2>
              <p class="text-gray-500 text-sm">#${item.id}</p>
              <p class="text-gray-400 text-sm">Description // Category</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="border rounded flex items-center px-2">
              <button onclick="updateQty(${index}, -1)" class="px-2">−</button>
              <span class="mx-2">${item.quantity}</span>
              <button onclick="updateQty(${index}, 1)" class="px-2">+</button>
            </div>
            <div class="w-24 text-right">$${item.price.toFixed(2)}</div>
            <div class="w-24 text-right font-semibold">$${(item.price * item.quantity).toFixed(2)}</div>
            <button onclick="removeItem(${index})" class="text-gray-400 hover:text-red-500 text-xl">&times;</button>
          </div>
        </div>
      `).join("")}
    </div>
  `;

  document.getElementById("selectAll").addEventListener("change", (e) => {
    const allChecked = e.target.checked;
    document.querySelectorAll(".item-checkbox").forEach((checkbox) => {
      checkbox.checked = allChecked;
    });
    updateSummary();
  });

  document.querySelectorAll(".item-checkbox").forEach((checkbox) =>
    checkbox.addEventListener("change", () => {
      const allCheckboxes = document.querySelectorAll(".item-checkbox");
      const allChecked = Array.from(allCheckboxes).every((cb) => cb.checked);
      document.getElementById("selectAll").checked = allChecked;
      updateSummary();
    })
  );

  updateSummary();
}

function updateSummary() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const summaryContainer = document.getElementById("shoppingSummary");
  const itemCheckboxes = document.querySelectorAll(".item-checkbox");

  let total = 0;
  let summaryHTML = "";
  const selectedItems = [];

  itemCheckboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      const item = cartItems[index];
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      selectedItems.push(item);
      summaryHTML += `
        <li class="flex justify-between">
          <span>#${item.title}</span>
          <span>$${itemTotal.toFixed(2)}</span>
        </li>
      `;
    }
  });

  summaryContainer.innerHTML = `
    <div class="bg-gray-100 p-6 rounded-xl shadow-lg">
      <h2 class="font-semibold text-lg mb-2">Shopping Summary</h2>
      <ul class="text-sm text-gray-600 mb-4">${summaryHTML}</ul>
      <div class="flex justify-between font-semibold text-gray-800 text-base border-t pt-2">
        <span>Total</span>
        <span>$${total.toFixed(2)}</span>
      </div>
      <button id="buyNowBtn" class="mt-4 w-full bg-[#110064] hover:bg-gray-800 text-white py-2 px-4 rounded-md transition">
        Buy Now
      </button>
    </div>
  `;

  document.getElementById("buyNowBtn").addEventListener("click", () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item to proceed.");
      return;
    }
    localStorage.setItem("checkoutItems", JSON.stringify(selectedItems));
    window.location.href = "checkout.html";
  });
}

function updateQty(index, change) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

renderCart();
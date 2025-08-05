document.addEventListener("DOMContentLoaded", () => {
  const items = JSON.parse(localStorage.getItem("checkoutItems")) || [];
  const list = document.getElementById("checkoutItemsContainer");
  const subEl = document.getElementById("subtotal");
  const totEl = document.getElementById("total");

  if (!items.length) {
    list.innerHTML = '<p class="text-gray-500">Checkout list is empty. <a href="cart.html" class="underline">Back to cart</a></p>';
    return;
  }

  let subtotal = 0;
  list.innerHTML = items.map((it) => {
    const eachTotal = it.price * it.quantity;
    subtotal += eachTotal;
    return `
      <div class="flex gap-4">
        <img src="${it.image}" alt="${it.title}" class="w-24 h-24 object-contain rounded" />
        <div>
          <h3 class="font-medium">${it.title}</h3>
          <p class="text-sm">$${it.price.toFixed(2)}</p>
          <p class="text-sm text-gray-500">QTY : ${it.quantity}</p>
        </div>
      </div>`;
  }).join("");

  subEl.textContent = `$${subtotal.toFixed(2)}`;
  totEl.textContent = `$${subtotal.toFixed(2)}`;

  document.getElementById("checkoutBtn").addEventListener("click", () => {
    if (!document.getElementById("shippingForm").reportValidity()) return;
    const pay = document.querySelector('input[name="paymentMethod"]:checked');
    if (!pay) {
      alert("Please select a payment method.");
      return;
    }
    alert("Thank you! Your order has been placed.");
    localStorage.removeItem("cart");
    localStorage.removeItem("checkoutItems");
    window.location.href = "home.html";
  });
});
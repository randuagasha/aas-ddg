document.addEventListener("DOMContentLoaded", () => {
  const name = document.getElementById("name").textContent;
  document.getElementById("welcomeText").textContent = `Welcome, ${name}`;
});

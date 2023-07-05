import { cartArray, checkEmptyCartIcon, cartSubtractButtonHandler, cartAddButtonHandler } from "./functions.js";

// Define variables & read localStorage
export const cartIcon = document.querySelector("#cart-icon");
cartIcon.innerHTML = localStorage.getItem("cartIcon");

// Avoid "cartIcon" dropdown menu to close on click inside
document.querySelector('.dropdown-menu').addEventListener('click', (event) => { event.stopPropagation() });

checkEmptyCartIcon();

// Manipulate "cartIcon" stored elements
cartArray.forEach(product => {
  cartSubtractButtonHandler(product);
  cartAddButtonHandler(product);
});
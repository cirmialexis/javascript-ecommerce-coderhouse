import { cartIcon } from "./cart.js";

// Define variables & read localStorage
let total = parseFloat(localStorage.getItem("total")) || 0;
export let cartArray = JSON.parse(localStorage.getItem("cart")) || [];

// Define "checkEmptyCartIcon" function
export const checkEmptyCartIcon = () => {
  document.querySelector(".emptyCart") && document.querySelector(".emptyCart").remove();

  if (cartIcon.childNodes.length == 0) {
    let li = document.createElement("li");
    li.className = "d-flex justify-content-center py-1 emptyCart";
    li.innerText = "El carrito está vacío";
    cartIcon.appendChild(li);
    document.querySelector(".cart-icon-footer").style.display = "none";
  } else {
    document.querySelector(".cart-icon-footer").style.display = "flex";
    document.querySelector("#cart-icon-total").innerText = `U$S ${total.toFixed(2).toString().replace(".", ",")}`;
  }
};

// Define "add" function. It checks whether an object inside "cartArray" has the same "id". In case it does, it will add 1 to amount. In case it doesn't, it will add 1 to amount and push the new object to "cartArray".
export const add = (product) => {
  let object = cartArray.find(object => object.id === product.id);
  object ? object.amount += 1 : (product.amount += 1, cartArray.push(product));
  total = cartArray.reduce((previousValue, currentValue) => previousValue + currentValue.amount * currentValue.price, 0);
  document.querySelectorAll(`.id${product.id}-amount-display`).forEach(element => {
    element.innerText = `${product.amount}`;
  });
  localStorage.setItem("cart", JSON.stringify(cartArray));
  localStorage.setItem("total", total.toFixed(2));
};

// Define "subtract" function
export const subtract = (product) => {

  if (product.amount > 0) {
    product.amount -= 1;
    cartArray = cartArray.filter((product) => product.amount > 0);
    total = cartArray.reduce((previousValue, currentValue) => previousValue + currentValue.amount * currentValue.price, 0);
    document.querySelectorAll(`.id${product.id}-amount-display`).forEach(element => {
      element.innerText = `${product.amount}`;
    });
  };

  localStorage.setItem("cart", JSON.stringify(cartArray));
  localStorage.setItem("total", total.toFixed(2));
};

// Define cart "Minus" button click handler function
export const cartSubtractButtonHandler = (product) => {

  if (document.querySelector(`.id${product.id}-cart-subtract-button`)) {

    document.querySelector(`.id${product.id}-cart-subtract-button`).addEventListener("click", () => {

      subtract(product);
      document.querySelectorAll(`.id${product.id}-amount-display`).forEach(element => {
        element.innerText = `${product.amount}`;
      });
      document.querySelector(`.id${product.id}-cart-span-money`).innerText = `U$S ${(product.amount * product.price).toFixed(2).toString().replace(".", ",")}`;

      if (product.amount == 0) {
        document.querySelector(`.id${product.id}-agregar-button`) && document.querySelector(`.id${product.id}-agregar-button`).classList.remove("d-none");
        document.querySelector(`.id${product.id}-subtract-button`) && document.querySelector(`.id${product.id}-subtract-button`).classList.add("d-none");

        if (document.querySelectorAll(`.id${product.id}-amount-display`)) {
          document.querySelectorAll(`.id${product.id}-amount-display`).forEach(display => {
            display.classList.add("d-none");
          });
        };

        document.querySelector(`.id${product.id}-add-button`) && document.querySelector(`.id${product.id}-add-button`).classList.add("d-none");
        document.querySelector(`.id${product.id}-li`).remove();
      };

      checkEmptyCartIcon();
      localStorage.setItem("cartIcon", cartIcon.innerHTML);
    });
  };
};

// Define cart "Plus" button click handler function
export const cartAddButtonHandler = (product) => {

  if (document.querySelector(`.id${product.id}-cart-add-button`)) {

    document.querySelector(`.id${product.id}-cart-add-button`).addEventListener("click", () => {

      add(product);
      document.querySelectorAll(`.id${product.id}-amount-display`).forEach(element => {
        element.innerText = `${product.amount}`;
      });
      document.querySelector(`.id${product.id}-cart-span-money`).innerText = `U$S ${(product.amount * product.price).toFixed(2).toString().replace(".", ",")}`;
      checkEmptyCartIcon();
      localStorage.setItem("cartIcon", cartIcon.innerHTML);
    });
  };
};
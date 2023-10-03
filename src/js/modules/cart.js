import { cartItems } from "../../data/data";
import CartItem from "./cartItem";
import MissingCartItem from "./missingCartItem";

let basket = cartItems || [];

/**
 * Formats a number by adding spaces as a thousands separator.
 * @param {number} number - The number to be formatted.
 * @returns {string} The formatted number with spaces as a thousands separator.
 */

const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

/**
 * Generates shopping cart items based on data and adds them to the specified parent element.
 * @param {Array} data - An array of data containing information about the items in the cart.
 * @param {Function} item - The constructor (class) for cart items, used to create each item.
 * @param {string} parentSelector - The CSS selector for the parent element where the cart items will be added.
 */

const RenderCartItems = (data, item, parentSelector) => {
  data.forEach(
    ({
      title,
      image,
      alt,
      color,
      size,
      warehouse,
      seller,
      price,
      oldPrice,
      discount,
      amount,
      remaining,
      id,
    }) => {
      new item(
        title,
        image,
        alt,
        color,
        size,
        warehouse,
        seller,
        price,
        oldPrice,
        discount,
        amount,
        remaining,
        id,
        parentSelector
      ).render();
    }
  );
};

/**
 * Generates missing cart items based on simplified data and adds them to the specified parent element.
 * @param {Array} data - An array of simplified data containing information about the missing cart items.
 * @param {Function} item - The constructor (class) for cart items, used to create each missing item.
 * @param {string} parentSelector - The CSS selector for the parent element where the missing cart items will be added.
 */

const RenderMissingCartItems = (data, item, parentSelector) => {
  data.forEach(({ title, image, alt, color, size, id }) => {
    new item(title, image, alt, color, size, id, parentSelector).render();
  });
};

/**
 * Calculates the count of selected products in the shopping cart based on the state of checkboxes.
 * @returns {number} - The count of selected products.
 */

const calculateProductCount = (data) => {
  const cartItems = document.querySelectorAll(".cart-item");
  let result = 0;

  cartItems.forEach((cartItem, i) => {
    const checkbox = cartItem.querySelector(".checkbox__input");
    if (checkbox.checked) {
      result += data[i].amount;
    }
  });

  return result;
};

/**
 * Calculates the total price sum for selected items in the cart.
 * @param {object[]} data - An array of product data objects.
 * @returns {object} An object containing the new price sum and old price sum of selected items.
 */

const calculateCartSum = (data) => {
  const cartItems = document.querySelectorAll(".cart-item");
  let newPriceSum = 0;
  let oldPriceSum = 0;

  cartItems.forEach((cartItem, i) => {
    const checkbox = cartItem.querySelector(".checkbox__input");
    if (checkbox.checked) {
      newPriceSum += data[i].price * data[i].amount;
      oldPriceSum += data[i].oldPrice * data[i].amount;
    }
  });

  return { newPriceSum, oldPriceSum };
};

const calculateItemSum = (data, i) => {
  const dataItem = data.filter((item) => item.id === i)[0];
  const newPrice = dataItem.price * dataItem.amount;
  const oldPrice = dataItem.oldPrice * dataItem.amount;

  return { newPrice, oldPrice };
};

/**
 * Manages the quantity counter for a specific product.
 * @param {object} productData - The product data object.
 * @param {HTMLElement} incrementButton - The increment button element.
 * @param {HTMLElement} decrementButton - The decrement button element.
 * @param {HTMLElement} countElement - The element displaying the quantity count.
 */

const manageCounter = (
  productData,
  incrementButton,
  decrementButton,
  countElement
) => {
  let count = productData.amount;

  /**
   * Decrements the count and updates the UI if the count is greater than 1.
   */
  const decrement = () => {
    if (count > 1) {
      count--;
      updateState();
    }
  };

  /**
   * Increments the quantity count and updates the UI if quantity limits are not exceeded.
   */
  const increment = () => {
    if (!productData.remaining || count <= productData.remaining) {
      count++;
      updateState();
    }
  };

  /**
   * Updates the UI to reflect the current count and button states.
   */
  const updateState = () => {
    countElement.textContent = count;
    decrementButton.disabled = count <= 1;
    incrementButton.disabled =
      count >= productData.remaining && productData.remaining !== null;
    productData.amount = count;
  };

  decrementButton.addEventListener("click", decrement);
  incrementButton.addEventListener("click", increment);
  updateState();
};

/**
 * Resize text to fit within a container only if it wraps to the next line.
 * @param {string} containerSelector - CSS selector for the container element.
 * @param {string} textSelector - CSS selector for the text element.
 */

const reduceFontSizeOnOverflow = (item) => {
  const container = item.querySelector(".cart-item__price");
  const text = item.querySelector(".cart-item__new-price-value");

  let currentFontSize = parseInt(window.getComputedStyle(text).fontSize, 10);
  const margin = 35;
  const containerWidth = container.offsetWidth - margin;

  while (text.offsetWidth > containerWidth) {
    currentFontSize -= 1;
    text.style.fontSize = currentFontSize + "px";
  }
};

/**
 * Function to calculate the number of items in the basket.
 * @param {Array} data - The array of data to count items in.
 * @returns {number} The count of items in the array.
 */

const calculateItemsCount = (data) => {
  return data.length;
};

/**
 * Function to calculate regular and customer discounts for a specific item in the data.
 * @param {Array} data - The array of data containing items.
 * @param {number} i - The unique identifier of the item to calculate discounts for.
 * @returns {Object} An object containing the calculated regular and customer discounts.
 */

const calculateItemDiscount = (data, i) => {
  let regularDiscountSum = 0;
  let customerDiscountSum = 0;

  const dataItem = data.filter((item) => item.id === i)[0];

  regularDiscountSum = Math.round(
    dataItem.price * dataItem.discount.discount * dataItem.amount
  );
  customerDiscountSum = Math.round(
    dataItem.price * dataItem.discount.customerDiscount * dataItem.amount
  );

  return { regularDiscountSum, customerDiscountSum };
};

/**
 * Function to calculate the total discount sum for selected items in a cart.
 * @param {Array} data - An array of data containing information about items in the cart.
 * @returns {number} The total discount sum for the selected items in the cart.
 */

const calculateDiscountSum = (data) => {
  const cartItems = document.querySelectorAll(".cart-item");

  let result = 0;

  cartItems.forEach((item, i) => {
    const checkbox = item.querySelector(".checkbox__input");

    if (checkbox.checked) {
      result += result += Math.round(
        data[i].oldPrice *
          (data[i].discount.discount + data[i].discount.customerDiscount) *
          data[i].amount
      );
    }
  });
  return result;
};

/**
 * Function to delete a cart item from the basket and remove it from the DOM.
 * @param {HTMLElement} item - The DOM element representing the cart item to be removed.
 * @param {number} id - The unique identifier of the cart item to be deleted.
 */

const deleteCartItem = (item, id) => {
  basket = basket.filter((cartItem) => cartItem.id !== id);
  item.remove();
};

/**
 * Function to delete a missing cart item from the DOM based on its data-id attribute.
 * @param {number} i - The unique identifier (data-id) of the missing cart item to be deleted.
 */

const deleteMissingCartItem = (i) => {
  const cartItem = document.querySelector(`.missing-cart-item[data-id="${i}"]`);
  cartItem.remove();
};

/**
 * Function to toggle the visibility of a specific cart item list.
 * @param {Event} e - The event object triggered by the toggle action.
 * @param {number} i - The index of the cart item list to toggle.
 */

const toggleCartListVisibility = (e, i) => {
  const cartList = document.querySelectorAll(".cart__item-list");

  if (cartList[i].classList.contains("open")) {
    e.currentTarget.style = "transform: rotate(180deg);";
    cartList[i].style = "height: 0; overflow: hidden;";
    cartList[i].classList.remove("open");
  } else {
    e.currentTarget.style = "transform: rotate(0deg);";
    cartList[i].style = "height: auto; overflow: auto;";
    cartList[i].classList.add("open");
  }
};

/**
 * Function to change the header of a cart item list and update its content based on the list's state.
 */

const changeCartListHeader = () => {
  const cartList = document.querySelector(".cart__in-stock .cart__item-list");

  const header = document.querySelector(
    ".cart__in-stock .cart__section-header"
  );

  const totalPrice = calculateCartSum(basket).newPriceSum;
  const totalAmount = calculateProductCount(basket);

  const resultString = `${totalAmount} товаров · ${formatNumber(
    totalPrice
  )} сом`;

  if (cartList.classList.contains("open")) {
    const deleteElement = header.querySelector(".cart__checkbox");
    deleteElement.remove();
    header.insertAdjacentHTML(
      "afterbegin",
      `<p class="cart__in-stock-accordion-header">${resultString}</p>`
    );
  } else {
    const deleteElement = header.querySelector(
      ".cart__in-stock-accordion-header"
    );
    deleteElement.remove();
    header.insertAdjacentHTML(
      "afterbegin",
      `
    <label class="checkbox cart__checkbox"
      >Выбрать все
      <input class="checkbox__input" type="checkbox" checked />
      <span class="checkbox__checkmark"></span>
    </label>
  `
    );
  }
};

/**
 * Function to toggle the text of a submit button based on the state of a debiting checkbox.
 * @param {number} price - The price to be displayed in the button text.
 */

const toggleButtonText = (price) => {
  const submitButton = document.querySelector(".order-sum__button");
  const debitingCheckbox = document.querySelector(".order-sum__checkbox input");
  if (debitingCheckbox.checked) {
    submitButton.innerText = `Оплатить ${price} сом`;
  } else {
    submitButton.innerText = "Заказать";
  }
};

/**
 * Function to update the count badges with the number of items in the basket.
 */

const updateCountBages = () => {
  countBages.forEach((bage) => {
    bage.innerText = calculateItemsCount(basket);
    if (bage.innerText == 0) {
      bage.style.display = "none";
    } else {
      bage.style.display = "block";
    }
  });
};

/**
 * Function to update order summary data based on the current state of the basket.
 * @param {number} i - The index of the item being updated (optional).
 */

const updateOrderSumData = (i) => {
  const totalNewPrice = document.querySelector(".order-sum__sum-value");
  const totalOldPrice = document.querySelector("#old-sum");
  const discountSum = document.querySelector("#discount-sum");
  const submitButton = document.querySelector(".order-sum__button");
  const totalProductCountElm = document.querySelector(".order-sum__item-label");

  totalProductCountElm.innerHTML = calculateProductCount(basket) + " товаров";

  totalNewPrice.innerText = formatNumber(calculateCartSum(basket).newPriceSum);
  totalOldPrice.innerText =
    formatNumber(calculateCartSum(basket).oldPriceSum) + " сом";
  discountSum.innerHTML = "− " + calculateDiscountSum(basket, i) + " сом";

  submitButton.innerText =
    submitButton.innerText != "Заказать"
      ? `Оплатить ${formatNumber(calculateCartSum(basket).newPriceSum)} сом`
      : submitButton.innerText;
};

/**
 * Function to update the data of a specific cart item in the DOM.
 * @param {HTMLElement} item - The DOM element representing the cart item to be updated.
 * @param {number} i - The index of the cart item in the basket.
 */

const updateItemData = (item, i) => {
  const price = item.querySelector(`.cart-item__new-price-value`);
  const oldPrice = item.querySelector(`.cart-item__old-price-value`);

  const discount = item.querySelector(".cart-item__discount-value");
  const costumerDiscount = item.querySelector(
    ".cart-item__customer-discount-value"
  );

  // update cartItem prices
  price.innerText = formatNumber(calculateItemSum(basket, i).newPrice);
  oldPrice.innerText = formatNumber(calculateItemSum(basket, i).oldPrice);

  // update cartItem discount
  discount.innerHTML =
    "- " + calculateItemDiscount(basket, i).regularDiscountSum + " сом";
  costumerDiscount.innerHTML =
    "- " + calculateItemDiscount(basket, i).customerDiscountSum + " сом";
};

const updateDeliveryCards = (data, parent) => {
  const template = `
  <div class="delivery__item">
    <p class="delivery__date delivery__label">5—6 февраля</p>
    <div class="delivery__imgs">
      
    </div>
  </div>`;

  const deliveryItems = document.querySelectorAll(".delivery__item");
  deliveryItems.forEach((item) => {
    item.remove();
  });

  const ImgsContainer = document.createElement("div");
  ImgsContainer.classList.add("delivery__imgs");

  parent.insertAdjacentHTML("beforeend", template);
  const imgContainer = parent.querySelector(
    ".delivery__item:last-child .delivery__imgs"
  );

  data.forEach((item) => {
    const checkbox = document.querySelector(
      `.cart-item[data-id="${item.id}"] .checkbox__input`
    );

    if (checkbox.checked) {
      if (!item.available || item.available <= item.amount) {
        imgContainer.insertAdjacentHTML(
          "beforeend",
          `
          <div class="delivery__img-wrapper">
            <img
              src=${item.image}
              alt=${item.alt}
              class="delivery__img"
            />
          <span class="delivery__item-count count-bage">${
            item.available === null ? item.amount : item.available
          }</span>
          </div>
        `
        );
      }

      if (item.available && item.available < item.amount) {
        const label = document.querySelector(
          ".delivery__item:last-child .delivery__date"
        );
        label.innerHTML = "7—8 февраля";
        const ImgsContainer = document.createElement("div");
        ImgsContainer.classList.add("delivery__imgs");

        parent.insertAdjacentHTML("beforeend", template);
        const imgContainer = parent.querySelector(
          ".delivery__item:last-child .delivery__imgs"
        );
        imgContainer.insertAdjacentHTML(
          "beforeend",
          `
              <div class="delivery__img-wrapper">
                <img
                  src=${item.image}
                  alt=${item.alt}
                  class="delivery__img"
                />
                <span class="delivery__item-count count-bage">${
                  item.amount - item.available
                }</span>
              </div>
              
            `
        );
      }
    }
  });
};

const deliveryInfoContainer = document.querySelector(".delivery__info");

const handleAccordionBtn = (e, i) => {
  if (i === 0) {
    changeCartListHeader(i);
  }
  toggleCartListVisibility(e, i);
};

const cartList = document.querySelector(".cart__item-list");
RenderCartItems(basket, CartItem, cartList);

const missingCartList = document.querySelector(".missing-cart__item-list");
RenderMissingCartItems(basket, MissingCartItem, missingCartList);

updateDeliveryCards(basket, deliveryInfoContainer);

const accordionBtns = document.querySelectorAll(".cart__accordion-btn");
accordionBtns.forEach((btn, i) =>
  btn.addEventListener("click", (e) => handleAccordionBtn(e, i))
);

const debitingCheckbox = document.querySelector(".order-sum__checkbox input");
debitingCheckbox.addEventListener("change", (e) =>
  toggleButtonText(formatNumber(calculateCartSum(basket).newPriceSum))
);

const deleteMissingBtns = document.querySelectorAll(
  ".missing-cart__item-list .cart-item__btn--delete"
);
deleteMissingBtns.forEach((btn) =>
  btn.addEventListener("click", (event) => {
    deleteMissingCartItem(event.currentTarget.dataset.id);
    const items = document.querySelectorAll(".missing-cart-item");
    const missingCount = document.querySelector(
      ".cart__out-of-stock-count-value"
    );
    missingCount.innerHTML = items.length;
  })
);

const countBages = document.querySelectorAll(".count-bage--total");

const addItemIventListeners = (item, i) => {
  const decrementButton = item.querySelector(".cart-item__counter-btn--dec");
  const incrementButton = item.querySelector(".cart-item__counter-btn--inc");
  const deleteButton = item.querySelector(".cart-item__btn--delete");
  const countElm = item.querySelector(".cart-item__count");

  manageCounter(basket[i], incrementButton, decrementButton, countElm);
  reduceFontSizeOnOverflow(item);

  deleteButton.addEventListener("click", () => {
    deleteCartItem(item, i);
    updateCountBages();
    updateOrderSumData(i);
    updateDeliveryCards(basket, deliveryInfoContainer);
  });
  const eventButtons = item.querySelectorAll(".cart-item__counter-btn");

  const itemCheckbox = item.querySelector(".checkbox__input");

  itemCheckbox.addEventListener("change", () => {
    updateOrderSumData(basket);
    updateDeliveryCards(basket, deliveryInfoContainer);
  });

  eventButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
      updateItemData(item, i);
      updateOrderSumData(basket);
      reduceFontSizeOnOverflow(item);
      updateDeliveryCards(basket, deliveryInfoContainer);
    })
  );
};

const cartItemElements = document.querySelectorAll(
  ".cart__item-list .cart-item"
);
cartItemElements.forEach((item, i) => {
  addItemIventListeners(item, i);
});

const selectAllCheckbox = document.querySelector(".cart__checkbox input");
const cartItemCkeckboxes = document.querySelectorAll(
  ".cart-item__checkbox input"
);

const selectAllCartItems = (e) => {
  e.target.checked = true;

  const cartItemCkeckboxes = document.querySelectorAll(
    ".cart-item__checkbox input"
  );
  if (e.target.checked) {
    cartItemCkeckboxes.forEach((checkbox) => {
      checkbox.checked = true;
    });
  }
};

const toggleSelectAllCheckbox = (e) => {
  if (!e.target.checked) {
    selectAllCheckbox.checked = false;
  }
};

selectAllCheckbox.addEventListener("change", (e) => selectAllCartItems(e));
cartItemCkeckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", (e) => toggleSelectAllCheckbox(e));
});

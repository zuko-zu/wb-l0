export default class CartItem {
  constructor(title, image, alt, color, size, id, parentSelector) {
    this.title = title;
    this.image = image;
    this.alt = alt;
    this.color = color;
    this.size = size;
    this.id = id;
    this.parentSelector = parentSelector;
  }

  render() {
    this.parentSelector.innerHTML += `
      <li class="cart__missing-item missing-cart-item" data-id=${this.id}>
        <div class="missing-cart-item__photo-wrapper">
          <img
            class="missing-cart-item__photo"
            src=${this.image}
            alt=${this.alt}
            width="80"
            height="106"
          > 
        </div>
        <div class="missing-cart-item__info">
          <h3 class="missing-cart-item__title" title="${this.title}">
            <a class="missing-cart-item__link" href="#">${this.title}</a>
          </h3>
          ${
            this.color
              ? `<p class="missing-cart-item__color">Цвет:  ${this.color}</p>`
              : ""
          }
          ${
            this.size
              ? `<p class="missing-cart-item__size">Размер:  ${this.size}</p>`
              : ""
          }  
        </div>
        
        <div class="missing-cart-item__btns">
          <button type="button" class="cart-item__btn cart-item__btn--favorites">
            <span class="visually-hidden"
              >Добавить в список избранных товаров</span
            >
            <svg
              focusable="false"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.03386 4.05857C2.2658 4.75224 1.76675 5.83284 1.99484 7.42928C2.22323 9.02783 3.26485 10.6852 4.80427 12.3478C6.25856 13.9184 8.10953 15.4437 9.99986 16.874C11.8902 15.4437 13.7412 13.9184 15.1955 12.3478C16.7349 10.6852 17.7765 9.02783 18.0049 7.4293C18.2329 5.83285 17.7339 4.75224 16.9658 4.05856C16.1765 3.34572 15.0549 3 13.9999 3C12.1318 3 11.0922 4.08479 10.5176 4.68443C10.458 4.7466 10.4034 4.80356 10.3534 4.85355C10.1582 5.04882 9.84157 5.04882 9.64631 4.85355C9.59632 4.80356 9.54173 4.7466 9.48215 4.68443C8.90748 4.08479 7.86788 3 5.99986 3C4.94486 3 3.82316 3.34573 3.03386 4.05857ZM2.36361 3.31643C3.3736 2.40427 4.75192 2 5.99986 2C8.07114 2 9.3453 3.11257 9.99986 3.77862C10.6544 3.11257 11.9286 2 13.9999 2C15.2478 2 16.6261 2.40428 17.6361 3.31644C18.6673 4.24776 19.2668 5.66715 18.9948 7.5707C18.7232 9.47217 17.5148 11.3148 15.9293 13.0272C14.3354 14.7486 12.3063 16.3952 10.2999 17.9C10.1221 18.0333 9.87764 18.0333 9.69986 17.9C7.69344 16.3952 5.66434 14.7485 4.0705 13.0272C2.48494 11.3148 1.27656 9.47217 1.00489 7.57072C0.732921 5.66716 1.3324 4.24776 2.36361 3.31643Z"
                fill="black"
              />
            </svg>
          </button>
          <button type="button" class="cart-item__btn cart-item__btn--delete" data-id=${
            this.id
          }>
            <span class="visually-hidden"
              >Удалить из корзины</span
            >
            <svg
              focusable="false"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.5 5.66663C2.5 5.39048 2.72386 5.16663 3 5.16663H17C17.2761 5.16663 17.5 5.39048 17.5 5.66663C17.5 5.94277 17.2761 6.16663 17 6.16663H3C2.72386 6.16663 2.5 5.94277 2.5 5.66663Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.4584 5.16663H16.5059L15.6411 16.3592C15.5405 17.6613 14.4546 18.6666 13.1486 18.6666H6.84639C5.54299 18.6666 4.45829 17.6652 4.35435 16.366L3.4584 5.16663ZM4.5416 6.16663L5.35117 16.2862C5.41353 17.0658 6.06435 17.6666 6.84639 17.6666H13.1486C13.9322 17.6666 14.5837 17.0635 14.6441 16.2822L15.4256 6.16663H4.5416Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13 6.16663H7V4.13538C7 3.32421 7.65758 2.66663 8.46875 2.66663H11.5312C12.3424 2.66663 13 3.32421 13 4.13538V6.16663ZM8.46875 3.66663C8.20987 3.66663 8 3.87649 8 4.13538V5.16663H12V4.13538C12 3.87649 11.7901 3.66663 11.5312 3.66663H8.46875Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
      </li>
    `;
  }
}

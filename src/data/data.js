// import tShirt from "../imgs/tShirt.jpg";
// import phoneCase from "../imgs/phoneCase.jpg";
// import pencils from "../imgs/pencils.jpg";

export const cartItems = [
  {
    id: 0,
    title: "Футболка UZcotton мужская",
    image: "../imgs/tShirt.jpg",
    alt: "классическая белая футболка",
    color: "белый",
    size: 56,
    warehouse: "Коледино WB",
    seller: {
      name: "OOO Вайлдберриз",
      number: "ОГРН: 555555555555",
      address:
        "129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34",
    },
    price: 522,
    oldPrice: 1051,
    amount: 1,
    remaining: 2,
    available: null,
    discount: {
      discount: 0.25,
      customerDiscount: 0.25,
    },
  },
  {
    id: 1,
    title:
      "Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe",
    image: "../imgs/phoneCase.jpg",
    alt: "iPhone XR в прозрачном чехле с картхолдером",
    color: "прозрачный",
    size: null,
    warehouse: "Коледино WB",
    seller: {
      name: "OOO Мегапрофстиль",
      number: "ОГРН: 555555555555",
      address:
        "129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34",
    },
    price: 10500,
    oldPrice: 11500,
    amount: 200,
    remaining: null,
    available: 184,
    discount: {
      discount: 0.55,
      customerDiscount: 0.1,
    },
  },
  {
    id: 2,
    title:
      'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell',
    image: "../imgs/pencils.jpg",
    alt: "Упаковка с цветными карандашами, на которой изображен замок",
    color: null,
    size: null,
    warehouse: "Коледино WB",
    seller: {
      name: "OOO Вайлдберриз",
      number: "ОГРН: 555555555555",
      address:
        "129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34",
    },
    price: 247,
    oldPrice: 475,
    amount: 2,
    remaining: 2,
    available: null,
    discount: {
      discount: 0.55,
      customerDiscount: 0.1,
    },
  },
];

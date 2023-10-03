const closeModal = (modalSelector) => {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove("open");
  modalWrapper.classList.remove("open");
  document.body.style.overflow = "";
};

const openModal = (modalSelector) => {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("open");
  modalWrapper.classList.add("open");
  document.body.style.overflow = "hidden";
};

const modalWrapper = document.querySelector(".modal-wrapper");
const addressModal = document.querySelector(".address-modal");

const addressModalOpenBtn = document.querySelector("#addressOpenBtn");
const deliveryModalOpenBtn = document.querySelector(".order-form__edit-btn");

addressModalOpenBtn.addEventListener("click", () => {
  openModal(".address-modal");
});

deliveryModalOpenBtn.addEventListener("click", () => {
  openModal(".address-modal");
});

const closeModalBtns = document.querySelectorAll(".modal__close");

closeModalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    closeModal(".address-modal");
  });
});

const selectDeliveryTypeBtns = document.querySelectorAll(
  ".address-modal__option-button"
);

const pickUAddressesList = document.querySelector(
  ".address-modal__list-pick-up"
);
const addressesList = document.querySelector(".address-modal__list-courier");

selectDeliveryTypeBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    selectDeliveryTypeBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");

    if (
      e.target.classList.contains("active") &&
      e.target.classList.contains("address-type-pick-up")
    ) {
      addressesList.style.display = "none";
      pickUAddressesList.style.display = "block";
    }

    if (
      e.target.classList.contains("active") &&
      e.target.classList.contains("address-type-courier")
    ) {
      addressesList.style.display = "block";
      pickUAddressesList.style.display = "none";
    }
  });
});

const addresses = addressModal.querySelectorAll("li");

const selectBtn = document.querySelector(".address-modal__select-btn");

addresses.forEach((address) => {
  const deleteBtn = address.querySelector(".modal__delete-btn");
  deleteBtn.addEventListener("click", () => {
    address.remove();
  });
  const radioBtn = address.querySelector("input[type='radio']");
  const labelText = address.querySelector("label").innerText;
  selectBtn.addEventListener("click", () => {
    if (radioBtn.checked) {
      updateAddressData(labelText);
      closeModal(".address-modal");
    }
  });
});

const updateAddressData = (address) => {
  const selectDeliveryTypeBtns = document.querySelectorAll(
    ".address-modal__option-button"
  );

  const orderTitle = document.querySelector(".address-subtitle");
  const orderAddress = document.querySelector(".order-sum__delivery-address");
  const deliveryTitle = document.querySelector(".delivery__address-label");
  const deliveryAddress = document.querySelector(".delivery__address-value");
  const deliveryRating = document.querySelector(".delivery__address-rating");
  const deliverySchedule = document.querySelector(
    ".delivery__address-schedule"
  );
  const deliveryRatingIcon = document.querySelector(
    ".delivery__address-rating-icon"
  );

  selectDeliveryTypeBtns.forEach((btn) => {
    if (
      btn.classList.contains("address-type-courier") &&
      btn.classList.contains("active")
    ) {
      orderTitle.innerHTML = "Доставка курьером";
      deliveryTitle.innerHTML = "Доставка курьером";
      orderAddress.innerHTML = address;
      deliveryAddress.innerHTML = address;
      deliveryRating.style.display = "none";
      deliverySchedule.style.display = "none";
      deliveryRatingIcon.style.display = "none";
    }

    if (
      btn.classList.contains("address-type-pick-up") &&
      btn.classList.contains("active")
    ) {
      orderTitle.innerHTML = "Доставка в пункт выдачи";
      deliveryTitle.innerHTML = "Доставка в пункт выдачи";
      orderAddress.innerHTML = address;
      deliveryAddress.innerHTML = address;
      deliveryRating.style.display = "block";
      deliverySchedule.style.display = "block";
      deliveryRatingIcon.style.display = "block";
    }
  });
};

// payment modal

const paymentModal = document.querySelector(".payment-modal");
const paymentModalOpenBtn = document.querySelector(
  ".payment .order-form__edit-btn"
);
const paymentModalOrderOpenBtn = document.querySelector("#paymentOpenBtn");

paymentModalOpenBtn.addEventListener("click", () => {
  openModal(".payment-modal");
});
paymentModalOrderOpenBtn.addEventListener("click", () => {
  openModal(".payment-modal");
});

const paymentCardImg = document.querySelector(".payment .payment__card-type");
const paymentOrderCardImg = document.querySelector(
  ".order-sum .payment__card-type"
);

const paymentModalList = document.querySelectorAll(".payment-modal__list li");

const paymentSelectBtn = document.querySelector(".payment-modal__select-btn");

paymentSelectBtn.addEventListener("click", (e) => {
  paymentModalList.forEach((item) => {
    const input = item.querySelector("input[type='radio']");
    const img = item.querySelector("img");
    if (input.checked) {
      closeModal(".payment-modal");
      paymentCardImg.src = img.src;
      paymentOrderCardImg.src = img.src;
    }
  });
});

paymentModalList.forEach((item) => {});

const getSelectedPaymentItem = () => {
  [...paymentModalList].forEach((item) => {
    if (item.checked) {
    }
  });
};
getSelectedPaymentItem();

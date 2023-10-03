const submitButton = document.querySelector(".order-sum__button");
const inputs = document.querySelectorAll(".recipient__input");

let hasError = false;

inputs.forEach((input) => {
  // Функция для валидации поля при потере фокуса
  input.addEventListener("blur", () => {
    if (input.value.trim() !== "" && !input.validity.valid) {
      input.classList.add("error");
      hasError = true;
      showErrorMessage(input, "typo");
    } else {
      input.classList.remove("error");
    }
  });
});

inputs.forEach((input) => {
  // Функция для валидации поля при вводе
  input.addEventListener("input", () => {
    if (hasError) {
      if (input.validity.valid || input.value.trim() == "") {
        input.classList.remove("error");
        hasError = false;
      }
    }
  });
});

// Функция для валидации при нажатии на кнопку "Оформить заказ"
submitButton.addEventListener("click", (e) => {
  const inputs = document.querySelectorAll(".recipient__input");
  const labels = document.querySelectorAll(".recipient__label");

  e.preventDefault();
  inputs.forEach((input) => {
    if (input.value.trim() === "" || !input.validity.valid) {
      input.classList.add("error");
      hasError = true;
      // Отобразить сообщение об ошибке
      // Например: errorDiv.innerText = "Поле не может быть пустым";
      if (input.value.trim() === "") {
        labels.forEach((label) => {
          label.style = "display: none";
        });
        showErrorMessage(input, "error");
      }
    } else {
      input.classList.remove("error");
    }
  });
});

const nameErrorMessage = document.querySelector(".recipient__error-caption");

const showErrorMessage = (input, errorType) => {
  const idErrorMessage = document.querySelector(
    `.recipient__error-caption[data-input-id=${input.id}]`
  );
  switch (input.id) {
    case "name":
      errorType === "typo"
        ? (idErrorMessage.innerHTML = "Укажите имя")
        : (idErrorMessage.innerHTML = "Укажите имя");
      break;
    case "surname":
      errorType === "typo"
        ? (idErrorMessage.innerHTML = "Введите фамилию")
        : (idErrorMessage.innerHTML = "Введите фамилию");
      break;
    case "mail":
      errorType === "typo"
        ? (idErrorMessage.innerHTML = "Проверьте адрес электронной почты")
        : (idErrorMessage.innerHTML = "Укажите электронную почту");
      break;
    case "phone":
      errorType === "typo"
        ? (idErrorMessage.innerHTML = "Формат: +9 999 999 99 99")
        : (idErrorMessage.innerHTML = "Укажите номер телефона");
      break;
    case "identification-number":
      errorType === "typo"
        ? (idErrorMessage.innerHTML = "Проверьте ИНН")
        : (idErrorMessage.innerHTML = "Укажите ИНН");

      idErrorMessage.innerHTML = "Укажите ИНН";
      break;
  }
};

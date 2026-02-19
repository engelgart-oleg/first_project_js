"use strict";

const appData = {
  // Свойства объекта с изначальными значениями: (строка, number, boolean)
  title: '',
  screens: '',
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  service1: '',
  service2: '',

  // Проверка на число:
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  // Сбор информации о проекте:
  asking: function () {
    appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
    appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, сложные");

    do {
      appData.screenPrice = prompt("Сколько будет стоить данная работа?");
    } while (!appData.isNumber(appData.screenPrice));

    appData.screenPrice = +appData.screenPrice;
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  // Расчет суммы доп. услуг
  getAllServicePrices: function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
      let price = 0;

      if (i === 0) {
        appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
      } else {
        appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
      }

      do {
        price = prompt("Сколько это будет стоить?");
      } while (!appData.isNumber(price));

      sum += +price;
    }

    return sum;
  },

  // Сумма верстки и доп. услуг
  getFullPrice: function () {
    return appData.screenPrice + appData.allServicePrices;
  },

  // Итоговая стоимость за вычетом отката
  getServicePercentPrice: function () {
    return appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
  },

  // Форматируем заголовок
  getTitle: function () {
    const trimmedTitle = appData.title.trim();
    return trimmedTitle[0].toUpperCase() + trimmedTitle.substr(1).toLowerCase();
  },

  // Сообщение о скидке
  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return "Даем скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
      return "Даем скидку в 5%";
    } else if (price >= 0 && price < 15000) {
      return "Скидка не предусмотрена";
    } else {
      return "Что-то пошло не так";
    }
  },

  // Вывод информации в консоль
  logger: function () {
    // Обязательные выводы по условию
    console.log("fullPrice", appData.fullPrice);
    console.log("Откат", appData.servicePercentPrice);
    console.log("Результат getRollbackMessage:", appData.getRollbackMessage(appData.fullPrice));

    // Вывод всех свойств и методов через цикл for...in
    console.log("--- Весь состав объекта appData ---");
    for (let key in appData) {
      console.log("Ключ: " + key + ", Значение: " + appData[key]);
    }
  },

  // Метод управления программой
  start: function () {
    appData.asking(); // Сбор данных
    
    // Переопределение (расчет) свойств
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePercentPrice();
    appData.title = appData.getTitle();

    // Запуск логирования после всех расчетов
    appData.logger();
  }
};

// Вызов вне объекта
appData.start();
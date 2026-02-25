"use strict";

const appData = {
  // Свойства объекта с изначальными значениями: (строка '', number, boolean, объект {})
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},

  // Метод управления программой
  start: function () {
    appData.asking(); // Сбор данных
    appData.addPrices();
    
    // Переопределение (расчет) свойств
    appData.getFullPrice();
    appData.getServicePercentPrice();
    appData.getTitle();

    // Запуск логирования после всех расчетов
    appData.logger();
  },

  // Проверка на число:
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  // Сбор информации о проекте:
  asking: function () {
    appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");

    for (let i = 0; i < 2; i++) {
      let name = prompt("Какие типы экранов нужно разработать?");
      let price = 0;

      do {
        price = prompt("Сколько будет стоить данная работа?");
      } while (!appData.isNumber(price));

      appData.screens.push({id: i, name: name, price: price})
    }

    for (let i = 0; i < 2; i++) {
      let name = prompt("Какой дополнительный тип услуги нужен?");
      let price = 0;

      do {
        price = prompt("Сколько это будет стоить?");
      } while (!appData.isNumber(price));

      appData.services[name] = +price;
    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  // высчитываем стоимость услуг и экранов
  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price
    }

    // Расчет суммы доп. услуг
    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key]
    }
  },  

  // Сумма верстки и доп. услуг
  getFullPrice: function () {
    appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
  },

  // Итоговая стоимость за вычетом отката
  getServicePercentPrice: function () {
    appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
  },

  // Форматируем заголовок
  getTitle: function () {
    appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase();
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
    console.log(appData.screens);
  }  
};

// Вызов вне объекта
appData.start();
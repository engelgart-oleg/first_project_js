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

  // Проверка на строку (не пропускает только цифры)
  isString: function (str) {
    // Проверяем: не null, не пусто, и при превращении в число выдает NaN (значит, там есть буквы)
    return str !== null && str.trim() !== "" && isNaN(str);
  },

  // Сбор информации о проекте:
  asking: function () {
    // 1. Валидация названия проекта
    do {
      appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
    } while (!appData.isString(appData.title));

    for (let i = 0; i < 2; i++) {
      let name;
      // 2. Валидация названия экрана
      do {
        name = prompt("Какие типы экранов нужно разработать?");
      } while (!appData.isString(name));

      let price = 0;
      // 3. Валидация стоимости экрана
      do {
        price = prompt("Сколько будет стоить данная работа?");
      } while (!appData.isNumber(price));

      appData.screens.push({ id: i, name: name.trim(), price: +price });
    }

    for (let i = 0; i < 2; i++) {
      let name;
      // 4. Валидация названия доп. услуги
      do {
        name = prompt("Какой дополнительный тип услуги нужен?");
      } while (!appData.isString(name));

      let price = 0;
      // 5. Валидация стоимости доп. услуги
      do {
        price = prompt("Сколько это будет стоить?");
      } while (!appData.isNumber(price));

      // 1) ЛОГИКА УНИКАЛЬНОСТИ КЛЮЧЕЙ
      let serviceName = name.trim();
      // Если такая услуга уже есть в объекте services
      if (appData.services[serviceName] !== undefined) {
        // Создаем уникальный ключ, например: "Верстка (1)"
        serviceName = `${serviceName} (${i})`;
      }

      appData.services[serviceName] = +price;
      // appData.services[name.trim()] = +price;
    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  // высчитываем стоимость услуг и экранов
  addPrices: function () {
    // 2) ИСПОЛЬЗОВАНИЕ REDUCE для расчета screenPrice
    appData.screenPrice = appData.screens.reduce(function(sum, screen) {
      return sum + screen.price;
    }, 0);

    // Расчет суммы доп. услуг (сбрасываем в 0 перед расчетом на всякий случай)
    appData.allServicePrices = 0;
    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
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
    console.log("Массив экранов:", appData.screens);
    console.log("Стоимость всех экранов:", appData.screenPrice);
    console.log("Объект услуг:", appData.services);
  }  
};

// Вызов вне объекта
appData.start();
"use strict";

const title = document.getElementsByTagName('h1')[0];
const buttonPlus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

const inputRange = document.querySelector(".rollback [type=range]");
const inputRangeValue = document.querySelector(".rollback .range-value");

const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];

const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];

let screens = document.querySelectorAll(".screen");

const appData = {
  // Свойства объекта с изначальными значениями: (строка '', number, boolean, объект {})
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},

  init: function () {
    appData.addTitle();

    startBtn.addEventListener('click', appData.start);
    buttonPlus.addEventListener('click', appData.addScreenBlock);
  },
  addTitle: function () {
    // <title>Document</title> переименовали в Калькулятор верстки
    document.title = title.textContent;   
  },

  // Метод управления программой
  start: function () {    
    appData.addScreens();
    appData.addServices();

    appData.addPrices();
    // appData.getServicePercentPrice();

    // appData.logger();
    appData.showResult();
  },

  showResult: function () {
    total.value = appData.screenPrice;
    totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
  },

  addScreens: function () {
    let screens = document.querySelectorAll(".screen");

    screens.forEach(function (screen, index) {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName.trim(),
        price: +select.value * +input.value
      });      
    })   
    console.log(appData.screens);
  },

  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }   
    })

    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }   
    })
  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true); 

    console.log(cloneScreen);  
    screens[screens.length - 1].after(cloneScreen);
  },

  // Проверка на строку (не пропускает только цифры)
  isString: function (str) {
    // Проверяем: не null, не пусто, и при превращении в число выдает NaN (значит, там есть буквы)
    return str !== null && str.trim() !== "" && isNaN(str);
  },

  // высчитываем стоимость услуг и экранов
  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;
  },  

  // Итоговая стоимость за вычетом отката
  getServicePercentPrice: function () {
    appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
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
    console.log("fullPrice", appData.fullPrice);
    console.log("Откат", appData.servicePercentPrice);
    console.log("Массив экранов:", appData.screens);
    console.log("Стоимость всех экранов:", appData.screenPrice);
    console.log("Объект услуг:", appData.services);
  }  
};

// Вызов вне объекта
appData.init();
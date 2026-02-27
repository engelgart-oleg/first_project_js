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
  countScreens: 0,
  adaptive: true,
  rollback: 0,     // Изначально 0, как в ползунке
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  isStart: false, // Флаг: был ли запущен расчет

  init: function () {
    appData.addTitle();

    startBtn.addEventListener('click', appData.start);
    buttonPlus.addEventListener('click', appData.addScreenBlock);

    // Обработчик для ползунка отката
    inputRange.addEventListener('input', function(event) {
      const value = event.target.value;
      inputRangeValue.textContent = value + '%'; // Меняем текст в span
      appData.rollback = +value;                 // Записываем в свойство объекта

      // Если расчет уже был запущен, обновляем значение отката в реальном времени
      if (appData.isStart) {
        // Пересчитываем только откат
        appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));
        // Обновляем только поле отката на экране
        totalCountRollback.value = appData.servicePercentPrice;
      }
    });

    //  Поиск первого инпута для метода blockNonNumbers
    const firstScreenInput = screens[0].querySelector('input');
    firstScreenInput.addEventListener('input', appData.blockNonNumbers);
  },

  addTitle: function () {
    // <title>Document</title> переименовали в Калькулятор верстки
    document.title = title.textContent;   
  },

  // Метод запрета ввода букв и пробелов
  // Регулярное выражение /\D/g ищет ВСЁ, кроме цифр, и меняет на пустую строку
  blockNonNumbers: function(event) {
      event.target.value = event.target.value.replace(/\D/g, '');
  },

  // Метод управления программой
  start: function () {  
    // Валидация: проверяем каждый блок .screen
    const screensElements = document.querySelectorAll(".screen");
    let isValid = true;

    screensElements.forEach(screen => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      if (select.value === "" || input.value === "") {
          isValid = false;
      }
    });

    if (!isValid) {
        alert("Пожалуйста, выберите тип экрана и его количество в каждом блоке!");
        return; // Прерываем выполнение метода
    }

    // Очистка данных перед новым расчетом
    appData.screens = [];
    appData.screenPrice = 0;
    appData.countScreens = 0;
    appData.servicePricesNumber = 0;
    appData.servicePricesPercent = 0;

    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    appData.showResult();
    appData.isStart = true; // Теперь знаем, что расчет произведен
    // appData.logger(); 
  },

  showResult: function () {
    total.value = appData.screenPrice;
    totalCount.value = appData.countScreens; // Вывод кол-ва экранов
    totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice; // Вывод с учетом отката
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
        price: +select.value * +input.value,
        count: +input.value // Добавлено свойство count
      });      
    })   
  },

  addServices: function () {
    // Очищаем объекты перед заполнением
    appData.servicesPercent = {};
    appData.servicesNumber = {};

    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addScreenBlock: function () {
    // Обновляем коллекцию перед клонированием
    const screensElements = document.querySelectorAll(".screen");
    const cloneScreen = screens[0].cloneNode(true); 
    const cloneInput = cloneScreen.querySelector('input');

    // Вешаем запрет на ввод букв и пробелов для нового клона
    cloneInput.value = "";
    cloneInput.addEventListener('input', appData.blockNonNumbers);

    screensElements[screensElements.length - 1].after(cloneScreen);
  },

  // Dысчитываем стоимость услуг и экранов
  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
      appData.countScreens += screen.count; // Считаем общее кол-во
    }

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;

    // Kогика расчета дохода с учетом отката
    appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));
  },  

  logger: function () {
    console.log("fullPrice", appData.fullPrice);
    console.log("Количество экранов:", appData.countScreens);
    console.log("Откат", appData.servicePercentPrice);
    console.log("Массив экранов:", appData.screens);
    console.log("Стоимость всех экранов:", appData.screenPrice);
    console.log("Объект услуг:", appData.services);
  }  
};

appData.init();
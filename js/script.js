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
  title: '',
  screens: [],
  screenPrice: 0,
  countScreens: 0,
  adaptive: true,
  rollback: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  isStart: false,

  init: function () {
    this.addTitle(); // Замена appData на this

    // Привязка контекста .bind(this) и использование стрелочной функции для inputRange
    startBtn.addEventListener('click', this.start.bind(this));
    resetBtn.addEventListener('click', this.reset.bind(this)); // Слушатель для кнопки сброса
    buttonPlus.addEventListener('click', this.addScreenBlock.bind(this));

    inputRange.addEventListener('input', (event) => { // Стрелочная функция
      const value = event.target.value;
      inputRangeValue.textContent = value + '%';
      this.rollback = +value; // Замена appData на this

      if (this.isStart) { // Замена appData на this
        this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback / 100)));
        totalCountRollback.value = this.servicePercentPrice;
      }
    });

    const firstScreenInput = screens[0].querySelector('input');
    firstScreenInput.addEventListener('input', this.blockNonNumbers);
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  blockNonNumbers: (event) => { // Стрелочная функция
    event.target.value = event.target.value.replace(/\D/g, '');
  },

  start: function () {
    const screensElements = document.querySelectorAll(".screen");
    let isValid = true;

    screensElements.forEach((screen) => { // Стрелочная функция
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      if (select.value === "" || input.value === "") {
        isValid = false;
      }
    });

    if (!isValid) {
      alert("Пожалуйста, выберите тип экрана и его количество в каждом блоке!");
      return;
    }

    this.screens = []; // Замена appData на this
    this.screenPrice = 0;
    this.countScreens = 0;
    this.servicePricesNumber = 0;
    this.servicePricesPercent = 0;

    this.addScreens();
    this.addServices();
    this.addPrices();
    this.showResult();
    this.isStart = true;

    this.logger();

    // 3) Блокировка инпутов и смена кнопок
    const leftInputs = document.querySelectorAll('.main-controls input[type=text], .main-controls select');
    leftInputs.forEach((item) => {
        item.disabled = true;
    });
    startBtn.style.display = 'none';
    resetBtn.style.display = 'block';
  },

  // 4) Метод reset для возврата в исходное состояние
  reset: function () {
    // Сброс свойств объекта
    this.isStart = false;
    this.screens = [];
    this.screenPrice = 0;
    this.countScreens = 0;
    this.servicePricesNumber = 0;
    this.servicePricesPercent = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.rollback = 0;

    // Сброс кнопок
    startBtn.style.display = 'block';
    resetBtn.style.display = 'none';

    // Удаление клонированных блоков и очистка первого
    const screensElements = document.querySelectorAll(".screen");
    screensElements.forEach((screen, index) => {
        if (index > 0) {
            screen.remove();
        } else {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            select.value = "";
            input.value = "";
            select.disabled = false;
            input.disabled = false;
        }
    });

    // Разблокировка и очистка дополнительных услуг
    const otherInputs = document.querySelectorAll('.main-controls input[type=text]');
    const otherCheckboxes = document.querySelectorAll('.main-controls input[type=checkbox]');
    const allSelects = document.querySelectorAll('.main-controls select');

    otherCheckboxes.forEach((check) => {
        check.checked = false;
    });

    [...otherInputs, ...allSelects].forEach((item) => {
        item.disabled = false;
    });

    // Очистка полей вывода
    const totalInputs = document.querySelectorAll('.total-input');
    totalInputs.forEach((input) => {
        input.value = 0;
    });

    // Сброс ползунка
    inputRange.value = 0;
    inputRangeValue.textContent = '0%';
  },

  showResult: function () {
    total.value = this.screenPrice; // Замена appData на this
    totalCount.value = this.countScreens;
    totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
  },

  addScreens: function () {
    let screensElements = document.querySelectorAll(".screen");

    screensElements.forEach((screen, index) => { // Стрелочная функция
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({ // Замена appData на this
        id: index,
        name: selectName.trim(),
        price: +select.value * +input.value,
        count: +input.value
      });
    });
  },

  addServices: function () {
    this.servicesPercent = {}; // Замена appData на this
    this.servicesNumber = {};

    otherItemsPercent.forEach((item) => { // Стрелочная функция
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => { // Стрелочная функция
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addScreenBlock: function () {
    const screensElements = document.querySelectorAll(".screen");
    const cloneScreen = screensElements[0].cloneNode(true); 
    const cloneInput = cloneScreen.querySelector('input');

    cloneInput.value = "";
    cloneInput.addEventListener('input', this.blockNonNumbers);

    screensElements[screensElements.length - 1].after(cloneScreen);
  },

  addPrices: function () {
    for (let screen of this.screens) { // Замена appData на this
      this.screenPrice += +screen.price;
      this.countScreens += screen.count;
    }

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
    this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback / 100)));
  },

  logger: function () {
    console.log("fullPrice", this.fullPrice);
    console.log("Количество экранов:", this.countScreens);
    console.log("Массив экранов:", this.screens);
  }
};

appData.init();
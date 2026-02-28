"use strict";

const title = document.getElementsByTagName('h1')[0];
const buttonPlus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

const inputRange = document.querySelector(".rollback [type=range]");
const inputRangeValue = document.querySelector(".rollback .range-value");

const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset"); 

const total = document.getElementById("total");
const totalCount = document.getElementById("total-count");
const totalCountOther = document.getElementById("total-count-other");
const fullTotalCount = document.getElementById("total-full-count");
const totalCountRollback = document.getElementById("total-count-rollback");

// Переменные для работы с CMS
const cmsOpen = document.getElementById('cms-open');
const cmsVariants = document.querySelector('.hidden-cms-variants');
const cmsSelect = document.getElementById('cms-select');
const cmsOtherInputBlock = cmsVariants.querySelector('.main-controls__input'); // Блок с инпутом "Другое"
const cmsOtherInput = document.getElementById('cms-other-input'); // Сам инпут "Другое"

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
    this.addTitle(); // Использование this

    // Привязка контекста через bind(this)
    startBtn.addEventListener('click', this.start.bind(this));
    resetBtn.addEventListener('click', this.reset.bind(this));
    buttonPlus.addEventListener('click', this.addScreenBlock.bind(this));

    inputRange.addEventListener('input', (event) => { // Стрелочная функция
        const value = event.target.value;
        inputRangeValue.textContent = value + '%';
        this.rollback = +value;

        if (this.isStart) {
            this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback / 100)));
            totalCountRollback.value = this.servicePercentPrice;
        }
    });

    // 1) Логика открытия блока CMS
    cmsOpen.addEventListener('change', () => { 
        if (cmsOpen.checked) {
            cmsVariants.style.display = 'flex';
        } else {
            cmsVariants.style.display = 'none';
            this.resetCMS(); // Сброс данных CMS при скрытии
        }
    });

    // 2) Логика выбора "Другое" в CMS
    cmsSelect.addEventListener('change', () => { 
        if (cmsSelect.value === 'other') {
            cmsOtherInputBlock.style.display = 'block';
        } else {
            cmsOtherInputBlock.style.display = 'none';
            cmsOtherInput.value = '';
        }
    });
  
    // Блокировка ввода букв и пробелов в поле "Другое" для CMS 
    cmsOtherInput.addEventListener('input', this.blockNonNumbers);

    const firstScreenInput = document.querySelector(".screen input");
    firstScreenInput.addEventListener('input', this.blockNonNumbers);
  },

  // Метод для сброса состояния полей CMS
  resetCMS: function() {
    cmsSelect.value = '';
    cmsOtherInputBlock.style.display = 'none';
    cmsOtherInput.value = '';
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  blockNonNumbers: (event) => { 
    event.target.value = event.target.value.replace(/\D/g, '');
  },

  start: function () {
    const screensElements = document.querySelectorAll(".screen");
    let isValid = true;

    screensElements.forEach((screen) => { 
        const select = screen.querySelector('select');
        const input = screen.querySelector('input');
        if (select.value === "" || input.value === "") {
            isValid = false;
        }
    });

    if (!isValid) {
        alert("Пожалуйста, выберите тип экрана и его количество!");
        return;
    }

    this.isStart = true;
    this.screens = [];
    this.screenPrice = 0;
    this.countScreens = 0;
    this.servicePricesNumber = 0;
    this.servicePricesPercent = 0;

    this.addScreens();
    this.addServices();
    this.addPrices();
    this.showResult();

    // 3) Блокировка интерфейса и смена кнопок
    const leftInputs = document.querySelectorAll('.main-controls input[type=text], .main-controls select');
    leftInputs.forEach((item) => {
        item.disabled = true;
    });
    
    startBtn.style.display = 'none';
    resetBtn.style.display = 'block';
  },

  // 4) Метод Reset
  reset: function () {
    // Сброс флага и данных объекта
    this.isStart = false;
    this.screens = [];
    this.screenPrice = 0;
    this.countScreens = 0;
    this.fullPrice = 0;
    this.servicePricesNumber = 0;
    this.servicePricesPercent = 0;
    this.servicePercentPrice = 0;
    this.rollback = 0;

    // Удаление клонированных экранов
    const screensElements = document.querySelectorAll(".screen");
    screensElements.forEach((screen, index) => {
        if (index > 0) {
            screen.remove();
        } else {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            select.value = '';
            input.value = '';
            select.disabled = false;
            input.disabled = false;
        }
    });

    // Сброс CMS
    cmsOpen.checked = false;
    cmsVariants.style.display = 'none';
    this.resetCMS();
    cmsOpen.disabled = false;
    cmsSelect.disabled = false;
    cmsOtherInput.disabled = false;

    // Сброс чекбоксов и разблокировка доп. услуг
    const allCheckboxes = document.querySelectorAll('.custom-checkbox');
    allCheckboxes.forEach((check) => {
        check.checked = false;
        check.disabled = false;
    });

    // Сброс ползунка
    inputRange.value = 0;
    inputRangeValue.textContent = '0%';

    // Очистка полей вывода
    const totalInputs = document.querySelectorAll('.total-input');
    totalInputs.forEach((input) => {
        input.value = 0;
    });

    // Смена кнопок обратно
    startBtn.style.display = 'block';
    resetBtn.style.display = 'none';
  },

  showResult: function () {
    total.value = this.screenPrice;
    totalCount.value = this.countScreens;
    totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
  },

  addScreens: function () {
    const screensElements = document.querySelectorAll(".screen");
    screensElements.forEach((screen, index) => {
        const select = screen.querySelector('select');
        const input = screen.querySelector('input');
        const selectName = select.options[select.selectedIndex].textContent;

        this.screens.push({
            id: index,
            name: selectName.trim(),
            price: +select.value * +input.value,
            count: +input.value
        });
    });
  },

  addServices: function () {
    this.servicesPercent = {};
    this.servicesNumber = {};

    otherItemsPercent.forEach((item) => {
        const check = item.querySelector('input[type=checkbox]');
        const label = item.querySelector('label');
        const input = item.querySelector('input[type=text]');

        if (check.checked) {
            this.servicesPercent[label.textContent] = +input.value;
        }
    });

    otherItemsNumber.forEach((item) => {
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
    for (let screen of this.screens) {
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

    // 3) Логика CMS: расчет наценки в %
    if (cmsOpen.checked) {
      let cmsPercent = 0;

      if (cmsSelect.value === 'other') {
          // Если "Другое", берем число из текстового поля
          cmsPercent = +cmsOtherInput.value !== '' ? +cmsOtherInput.value : 0;
      } else if (cmsSelect.value !== '') {
          // Если выбран WordPress (или любой другой с числовым value), берем его значение
          cmsPercent = +cmsSelect.value;
      }

      // Если процент найден и он больше 0, начисляем его на ВСЮ текущую сумму
      if (cmsPercent > 0) {
          this.fullPrice += this.fullPrice * (cmsPercent / 100);
      }
    }

    this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback / 100)));
  }
};

appData.init();
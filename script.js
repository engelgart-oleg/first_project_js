"use strict";

let title;
let screens;
let screenPrice;
let adaptive;

let rollback = 10;
let allServicePrices;
let fullPrice;
let servicePercentPrice;

let service1;
let service2;

const isNumber = function(num) {
  return !isNaN(parseFloat(num)) && isFinite(num) && num !== null && num.trim() !== "";
}

const asking = function () {
  title = prompt("Как называется ваш проект?", "Калькулятор верстки");
  screens = prompt("Какие типы экранов нужно разработать?", "Простые, сложные");

  do {
    screenPrice = prompt("Сколько будет стоить данная работа?");
  } while (!isNumber(screenPrice)) 

    // screenPrice = +screenPrice;

  adaptive = confirm("Нужен ли адаптив на сайте?");
}

// возвращаем сумму всех дополнительных услуг
const getAllServicePrices = function () {
  let sum = 0

  for (let i = 0; i < 2; i++) {

    let servicePrice;

    if (i === 0) {
      service1 = prompt("Какой дополнительный тип услуги нужен?");
    } else if (i === i) {
      service2 = prompt("Какой дополнительный тип услуги нужен?");
    }

    do {
      servicePrice = prompt("Сколько это будет стоить?");
    } while (!isNumber(servicePrice));

    sum += +servicePrice;
  }

  return sum
}

const showTypeOf = function(variable) {
  console.log(variable, typeof variable);
}

// возвращаем сумму стоимости верстки и стоимости доп услуг (screenPrice + allServicePrices)
const getFullPrice = function () {
  return (+screenPrice) + allServicePrices;
}

// возвращаем итоговую стоимость за вычетом процента отката
const getServicePercentPrice = function () {
  return Math.ceil(fullPrice - (fullPrice * (rollback / 100)));
}

// возвращаем title меняя его таким образом: первый символ с большой буквы, остальные с маленькой, убираем лишнии пробелы"
const getTitle = function() {
  return title.trim()[0].toUpperCase() + title.trim().substr(1).toLowerCase()
}

const getRollbackMessage = function(price) {
  if (price >= 30000) {
    return "Даем скидку в 10%"
  } else if (price >= 15000 && price <= 30000) {
    return "Даем скидку в 5%"
  } else if (price >= 0 && price < 15000) {
    return "Скидка не предусмотрена"
  } else {
    return "Что то пошло не так"
  }
}

// Вызов функций
asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrice();
title = getTitle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

// Вывод в консоль
console.log("allServicePrices", allServicePrices);

console.log(getRollbackMessage(fullPrice));
console.log("Название проекта:", typeof title);
console.log("Стоимость экранов:", typeof screenPrice);
console.log("Адаптив сайта:", typeof adaptive);

console.log("Типы экранов:", screens.length);
console.log("Стоимость за вычетом отката посреднику", servicePercentPrice);

console.log("Стоимость экранов " + screenPrice + " руб и Стоимость разработки сайта " + fullPrice + " руб");




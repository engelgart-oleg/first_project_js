"use strict";

let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = +prompt("Сколько будет стоить данная работа?");
let adaptive = confirm("Нужен ли адаптив на сайте?");

let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");

let rollback = 10;
let allServicePrices;
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = fullPrice - fullPrice * (rollback / 100);

// возвращаем сумму всех дополнительных услуг
const getAllServicePrices = function() {
  return servicePrice1 + servicePrice2
}

const showTypeOf = function(variable) {
  console.log(variable, typeof variable);
}

// возвращаем сумму стоимости верстки и стоимости доп услуг (screenPrice + allServicePrices)
function getFullPrice() {
  return screenPrice + allServicePrices
}

// возвращаем итоговую стоимость за вычетом процента отката
const getServicePercentPrices = function () {
  return  fullPrice - (fullPrice * (rollback / 100))
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

allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

// console.log(getAllServicePrices(fullPrice));

console.log(getRollbackMessage(fullPrice));
console.log("Название проекта:", typeof title);
console.log("Стоимость экранов:", typeof screenPrice);
console.log("Адаптив сайта:", typeof adaptive);

console.log("Типы экранов:", screens.length);
console.log("Стоимость за вычетом отката посреднику", servicePercentPrice);
// console.log("Стоимость 1-й услуги:", servicePrice1);
// console.log("Стоимость 2-й услуги:", servicePrice2);
// console.log("Общая стоимость (fullPrice):", fullPrice);

console.log("Стоимость экранов " + screenPrice + " руб и Стоимость разработки сайта " + fullPrice + " руб");




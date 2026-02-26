<<<<<<< HEAD
<<<<<<< HEAD
alert("Hello alert!");
console.log("Hello console log!");

let title = "Заголовок";
let screens = 20;
let screenPrice = 33;
let rollback = 47;
let fullPrice = 51;
let adaptive = 620;

console.log(title);
console.log(screens);
console.log(screenPrice);
console.log(rollback);
console.log(fullPrice);
console.log(adaptive);
=======

let title = "First Project JS";
let screens = "Простые,Сложные,Интерактивные";
let screenPrice = 33;
let rollback = 80;
let fullPrice = 50000;
let adaptive = true;


console.log(typeof title);

console.log(screens.length);

console.log(screenPrice);
console.log(rollback);

console.log(typeof fullPrice);
console.log(typeof adaptive);

let screensResult = screens.toLowerCase().split(",");
console.log(screensResult);

console.log("Стоимость верстки экранов " + screenPrice + " рублей/долларов/гривен/юани",);
console.log("Стоимость разработки сайта " + fullPrice + " рублей/долларов/гривен/юани",);

console.log(fullPrice * (rollback / 100));
>>>>>>> lesson-02
=======
"use strict";

let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать? (Наример: Простые, Сложные, Интерактивные)");
let screenPrice = +prompt("Сколько будет стоить данная работа? (Наример: 12000)");
let adaptive = confirm("Нужен ли адаптив на сайте?");

let service1 = prompt("Какой дополнительный тип услуги нужен? (Пример: 1. email-рассылка, 2. Разработка фирменного стиля)");
let servicePrice1 = +prompt("Сколько это будет стоить?");

let service2 = prompt("Какой дополнительный тип услуги нужен? (Пример: 3. SEO-щптимизация, 4. Наполнение контентом)");
let servicePrice2 = +prompt("Сколько это будет стоить?");

let rollback = 15;
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = fullPrice - (fullPrice * (rollback / 100));

if (fullPrice > 30000) {
console.log("Даем скидку в 10%");
} else if (fullPrice >= 15000 && fullPrice <= 30000) {
// Здесь учитываем и 15000 и 30000
console.log("Даем скидку в 5%");
} else if (fullPrice >= 0 && fullPrice < 15000) {
// Здесь учитываем 0
console.log("Скидка не предусмотрена");
} else {
// Если число отрицательное
console.log("Что то пошло не так");
}

console.log("Название проекта:", typeof title);
console.log("Стоимость экранов:", typeof screenPrice);
console.log("Адаптив сайта:", typeof adaptive);
console.log("Типы экранов:", screens.length);
console.log("Стоимость за вычетом отката посреднику", servicePercentPrice);
console.log("Стоимость первой услуги:", servicePrice1);
console.log("Стоимость второй услуги:", servicePrice2);
console.log("Общая стоимость (fullPrice):", fullPrice);
>>>>>>> lesson-03

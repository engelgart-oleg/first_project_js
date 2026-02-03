"use strict";


// 1-4
let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать? (Наример: Простые, Сложные, Интерактивные)");
let screenPrice = +prompt("Сколько будет стоить данная работа? (Наример: 12000)");
let adaptive = confirm("Нужен ли адаптив на сайте?");

console.log("Название проекта:", title);
console.log("Типы экранов:", screens);
console.log("Стоимость экранов:", screenPrice);
console.log("Адаптив сайта:", adaptive);

// 5 Дополнительные услуги (Название - Стоимость - Название - Стоимость)
let service1 = prompt("Какой дополнительный тип услуги нужен? (Пример: 1. email-рассылка, 2. Разработка фирменного стиля)");
let servicePrice1 = +prompt("Сколько это будет стоить?");

let service2 = prompt("Какой дополнительный тип услуги нужен? (Пример: 3. SEO-щптимизация, 4. Наполнение контентом)");
let servicePrice2 = +prompt("Сколько это будет стоить?");

console.log("Стоимость первой услуги:", servicePrice1);
console.log("Стоимость второй услуги:", servicePrice2);

// 6 Вычисляем итоговую стоимость работы учитывая стоимость верстки экранов и дополнительных услуг
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
console.log("Общая стоимость (fullPrice):", fullPrice);

// 7 Стоимость за вычетом отката посреднику
let rollbackPercent = 15; // Пример отката 15%
let rollbackSum = fullPrice * (rollbackPercent / 100);
let servicePercentPrice = Math.ceil(fullPrice - rollbackSum); 
console.log("Стоимость за вычетом отката посреднику", servicePercentPrice);

// 8 Конструкция условий скидки
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

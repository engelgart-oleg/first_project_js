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

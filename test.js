// Получаем элемент canvas и его контекст
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Начальные параметры ракеты

// Начальная позиция по Y (на земле)
// let rocketY = canvas.height; 
let rocketYX = 150;
// Скорость ракеты
let rocketSpeed = 10; 

let rocketIsAscending = false; 

function draw_triangle(x, k_x, y, rocketY) {
    ctx.beginPath();
    ctx.moveTo(canvas.width / k_x, rocketY);
    ctx.lineTo(canvas.width / k_x + x, rocketY + y);
    ctx.lineTo(canvas.width / k_x - x, rocketY + y);
    ctx.closePath();
    ctx.fill();
}

function draw_rectangle(x_0, x_1, x_2, x_3, k_x, y_0, y_1, y_2, y_3, rocketY) {
    ctx.beginPath();
    ctx.lineTo(canvas.width / k_x + x_0, rocketY + y_0);
    ctx.lineTo(canvas.width / k_x + x_1, rocketY + y_1);
    ctx.lineTo(canvas.width / k_x - x_2, rocketY + y_2);
    ctx.lineTo(canvas.width / k_x - x_3, rocketY + y_3);
    ctx.closePath();
    ctx.fill();
}

// Функция анимации
function animateRocket() {
    // Очищаем canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем ракету
    ctx.fillStyle = "red";
    // ctx.fillRect(canvas.width / 2 - 25, rocketY, 50, 100);
    // ctx.beginPath();

    // Создаем путь, представляющий ракету

    // Верхушка (последняя ступень)
    draw_triangle(15, 2, 40, 150);

    // Третья ступень
    draw_rectangle(15, 20, 20, 15, 2, 40, 120, 120, 40, 150);

    // Вторая ступень
    draw_rectangle(20, 20, 20, 20, 2, 40, 150, 150, 40, 230);

    // Первая ступень
    draw_rectangle(30, 40, 40, 30, 2, 40, 150, 150, 40, 340);

    // Если ракета поднимается
    // if (rocketIsAscending) {
    //     rocketY -= rocketSpeed;
    // } else {
    //     rocketY += rocketSpeed;
    // }

    // Проверяем, достигла ли ракета верхней или нижней границы canvas
    if (rocketY <= 0) {
        rocketIsAscending = false;
    } else if (rocketY + 80 >= canvas.height) {
        rocketIsAscending = true;
    }

    // Запускаем следующий кадр анимации
    requestAnimationFrame(animateRocket);
}

// Запускаем анимацию при загрузке страницы
animateRocket();

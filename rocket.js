// Получаем элемент canvas и его контекст
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Начальные параметры ракеты

// Начальная позиция по Y (на земле)
let rocketY = canvas.height; 
// Скорость ракеты
let rocketSpeed = 2; 

let rocketIsAscending = false; 

// Функция анимации
function animateRocket() {
    // Очищаем canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем ракету
    ctx.fillStyle = "red";
    ctx.fillRect(canvas.width / 2 - 25, rocketY, 50, 100);

    // Если ракета поднимается
    if (rocketIsAscending) {
        rocketY -= rocketSpeed;
    } else {
        rocketY += rocketSpeed;
    }

    // Проверяем, достигла ли ракета верхней или нижней границы canvas
    if (rocketY <= 0) {
        rocketIsAscending = false;
    } else if (rocketY >= canvas.height) {
        rocketIsAscending = true;
    }

    // Запускаем следующий кадр анимации
    requestAnimationFrame(animateRocket);
}

// Запускаем анимацию при загрузке страницы
animateRocket();

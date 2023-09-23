const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let rocketYX = 100;
let rocketSpeed = 10;
let rocketIsAscending = false;
// Время начала анимации
let startTime = performance.now(); 

function draw_triangle(x, k_x, y, rocketY, rotate) {
    ctx.save();
    ctx.translate(canvas.width / k_x, rocketY);
    ctx.rotate(rotate);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(x, y);
    ctx.lineTo(-x, y);
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.restore();
}

// Функция анимации
function animateRocket() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Вращаем и рисуем ракету
    ctx.fillStyle = "red";
    
    // Текущее время
    const currentTime = performance.now(); 
    // Разница времени в секундах
    const deltaTime = (currentTime - startTime) / 1000; 
    // Угол поворота в радианах в секунду
    const rotationSpeed = Math.PI / 2; 

    // Угол поворота ракеты
    const rotationAngle = deltaTime * rotationSpeed; 

    // Верхушка (последняя ступень)
    draw_triangle(15, 2, 40, rocketYX, rotationAngle);
    
    // Проверяем, достигла ли ракета верхней или нижней границы canvas
    if (rocketYX <= 0) {
        rocketIsAscending = false;
    } else if (rocketYX + 80 >= canvas.height) {
        rocketIsAscending = true;
    }

    requestAnimationFrame(animateRocket);
}

animateRocket();

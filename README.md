# Procedural-vector-animation
**Цель работы:** Ознакомление со стеком CANVAS к HTML5, позволяющийся делать анимированные и иные объекты

# Космическая Игра Stacky Space Craft
Добро пожаловать в Stacky Space Craft - простую браузерную игру, где вы управляете космическим кораблем, избегая астероидов. Игра создана с использованием HTML5 Canvas и JavaScript.

**Инструкции:**
1. Откройте файл index.html в вашем браузере.
2. Управляйте космическим кораблем, двигая мышью вверх или вниз.
3. Избегайте столкновений с астероидами, чтобы продолжить игру.
4. Попробуйте продержаться как можно дольше.

# Вы может попробовать здесь
[Кликните здесь](url:https://redalexdad.github.io/Procedural-vector-animation/main.html)

или здесь

https://redalexdad.github.io/Procedural-vector-animation/main.html

## Описание Кода

```html
<body>
    <canvas id="canvas" width="800px" height="600px" 
    style="border: 2px solid red;"></canvas>
</body>
```

```javascript
<script>
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    
    ...
    ...
    ...

    function animateStackySpaceCraft() {

        ...
        ...
        ...

        canvas.addEventListener("mousemove", updateSpaceCraft);
        requestAnimationFrame(animate);
    }
</script>
```
Простой HTML-файл с элементом <canvas>, где происходит вся визуализация игры.

JavaScript-код отвечает за логику и визуализацию игры. Он использует HTML5 Canvas для рисования космического корабля, астероидов и заднего фона. Игровая логика обрабатывает движение корабля, появление астероидов, проверку столкновений и обновление игрового экрана.


## Зависимости

Файл `background.png` - задний фон игры.

## Основная часть CANVAS скелет

```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const SPEED = 0.2;

const background = new Image();
background.onload = function () {
    animateStackySpaceCraft();
};
background.onerror = function () {
    console.error('Ошибка загрузки изображения');
};
background.src = 'background.png';
```

- `const canvas` и `const ctx` - Получение элемента <canvas> и его 2D контекста для рисования.

- `const SPEED` - Константа скорости движения астероидов и фона.
Загрузка изображения фона и запуск функции `animateStackySpaceCraft` после загрузки.

## Другие функции отрисовки

```javascript
function drawBackground() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}
```
- `drawBackground()` - Функция рисования заднего фона.


```javascript
function drawSpaceCraft(x, y, tiltAngle) {
    // ... (весь код рисования космического корабля)
}
```
- `drawSpaceCraft()` - Функция рисования космического корабля.


```javascript
function drawAsteroid(x, y, sizeX, sizeY) {
    ctx.beginPath();
    ctx.moveTo(x, y - sizeY);
    ctx.lineTo(x + sizeX, y);
    ctx.lineTo(x, y + sizeY);
    ctx.lineTo(x - sizeX, y);
    ctx.closePath();
    ctx.fillStyle = "gray";
    ctx.fill();
}
```
`drawAsteroid()` - Функция рисования астероида.


```javascript
function animateStackySpaceCraft() {
    // ... (весь код анимации игры)
}
```
- `animateStackySpaceCraft()` - Главная функция анимации игры, объединяющая все остальные функции.

## Функции игровой логики

### Основная функция

```javascript
function animate(timestamp) {
    updateAsteroids(timestamp);
    checkCollision();
    drawBackground();

    const direction = Math.sign(spaceCraft.cursorY - spaceCraft.y);
    spaceCraft.y += direction * spaceCraft.speed;

    const tiltAngle = (spaceCraft.cursorY - spaceCraft.y) / canvas.height * 30;
    drawSpaceCraft(spaceCraft.x, spaceCraft.y, tiltAngle);

    for (let asteroid of asteroids) {
        drawAsteroid(asteroid.x, asteroid.y, asteroid.sizeX, asteroid.sizeY);
    }

    requestAnimationFrame(animate);
}

canvas.addEventListener("mousemove", updateSpaceCraft);
requestAnimationFrame(animate);
```

- `animate()` - Основная функция анимации, вызывает остальные функции для обновления и отрисовки элементов игры. Запускается с использованием requestAnimationFrame.

### Инициализация Пространства

```javascript
const spaceCraft = {
    x: canvas.width / 4,
    y: canvas.height / 2,
    cursorY: canvas.height / 2,
    height: 30,
    speed: 0.5
};
```
- `spaceCraft` - Объект, представляющий космический корабль. Задаются начальные координаты (x, y), координата мыши (cursorY), высота корабля (height), и скорость управления (изменение угла наклона вверх или вниз) (speed).

```javascript
let asteroids = [];
let lastTimestamp = 0;
const kx = 0.5; // коэффициент масштабирования по x
const ky = 0.5; // коэффициент масштабирования по y
```

- `asteroids` - Массив, хранящий астероиды на экране.
- `lastTimestamp` - Время последнего кадра для вычисления времени между - кадрами.
- `kx` и `ky` - Коэффициенты масштабирования по осям x и y.


### Обновление Положения Космического Корабля

```javascript
function updateSpaceCraft(event) {
    spaceCraft.cursorY = event.clientY - canvas.getBoundingClientRect().top;
}
```
- `updateSpaceCraft(event)` - Обновление положения космического корабля в зависимости от положения мыши.

### Обновление Астероидов

```javascript
function updateAsteroids(timestamp) {
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    for (let asteroid of asteroids) {
        asteroid.x -= SPEED * deltaTime;
    }

    if (Math.random() < 0.02) {
        let asteroidSizeX = Math.random() * 20 + 10;
        let asteroidSizeY = Math.random() * 20 + 10;

        asteroids.push({
            x: canvas.width,
            y: Math.random() * (canvas.height - 150),
            sizeX: asteroidSizeX,
            sizeY: asteroidSizeY
        });
    }

    asteroids = asteroids.filter(asteroid => asteroid.x + asteroid.sizeX > 0);
}
```
- `updateAsteroids()` - Обновление положения астероидов, их генерация и фильтрация для удаления астероидов, вышедших за границы.

### Проверка Столкновений

```javascript
function checkCollision() {
    for (let asteroid of asteroids) {
        const spacecraftLeft = spaceCraft.x;
        const spacecraftRight = spaceCraft.x + 30;
        const spacecraftTop = spaceCraft.y - spaceCraft.height / 2;
        const spacecraftBottom = spaceCraft.y + spaceCraft.height / 2;

        const asteroidLeft = asteroid.x - asteroid.sizeX / 2;
        const asteroidRight = asteroid.x + asteroid.sizeX / 2;
        const asteroidTop = asteroid.y - asteroid.sizeY / 2;
        const asteroidBottom = asteroid.y + asteroid.sizeY / 2;

        if (
            spacecraftRight > asteroidLeft &&
            spacecraftLeft < asteroidRight &&
            spacecraftBottom > asteroidTop &&
            spacecraftTop < asteroidBottom
        ) {
            resetGame();
        }
    }
}
```

- `checkCollision()` - Проверка столкновения космического корабля с астероидами. При столкновении вызывается функция resetGame().


### Сброс Игры

```javascript
function resetGame() {
    spaceCraft.y = canvas.height / 2;
    asteroids = [];
}
```
- `resetGame()` - Сброс игры при столкновении. Устанавливает начальное положение космического корабля и очищает массив астероидов.


### Обработка Движения Мыши

```javascript
canvas.addEventListener("mousemove", updateSpaceCraft);
```
- Слушатель события движения мыши, который вызывает функцию `updateSpaceCraft()` при каждом движении мыши.

### Запуск Анимации

```javascript
requestAnimationFrame(animate);
```

- Запуск анимации с использованием `requestAnimationFrame`.
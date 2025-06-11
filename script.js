const gameArena = document.querySelector('.game-arena');
const arenaSize = 600;
const cellSize = 20;
let score = 0;
let gameStarted = false;

//snake(array of segments)
let snake = [{x:160, y: 200}, {x:140, y: 200}, {x: 120, y: 200}];

//initialize movement direction
let dx = cellSize;
let dy = 0;

//food position
let food = {x : 300, y : 200};

//draw snake on the board

function drawSnake() {
    
    snake.forEach((segment, index)=>{
        const segmentElement = document.createElement('div');
        segmentElement.className = 'snake-segment';
        segmentElement.style.width = `${cellSize}px`;
        segmentElement.style.height = `${cellSize}px`;
        segmentElement.style.position = "absolute";
        segmentElement.style.left = `${segment.x}px`;
        segmentElement.style.left = `${segment.y}px`;
        //head color
        segmentElement.style.background = index === 0 ? "#4CAF50" : "#8BC34A";
        gameArena.appendChild(segmentElement);

    })
}

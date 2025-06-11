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

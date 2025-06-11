document.addEventListener("DOMContentLoaded", () => {
  const gameArena = document.querySelector(".game-arena");
  const startButton = document.querySelector(".start-button");
  const arenaSize = 600;
  const cellSize = 20;

  let score = 0;
  let snake = [];
  let dx = cellSize;
  let dy = 0;
  let food = {};
  let gameStarted = false;
  let gameInterval;

  function updateScore() {
    document.getElementById("score-board").textContent = `Score: ${score}`;
  }

  function generateFood() {
    const maxPos = (arenaSize / cellSize) - 1;
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * maxPos) * cellSize,
        y: Math.floor(Math.random() * maxPos) * cellSize
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }

  function drawSnake() {
    document.querySelectorAll(".snake-segment").forEach(seg => seg.remove());

    snake.forEach((segment, index) => {
      const segmentElement = document.createElement("div");
      segmentElement.className = "snake-segment";
      segmentElement.style.width = `${cellSize}px`;
      segmentElement.style.height = `${cellSize}px`;
      segmentElement.style.left = `${segment.x}px`;
      segmentElement.style.top = `${segment.y}px`;
      segmentElement.style.backgroundColor = index === 0 ? "#4CAF50" : "#8BC34A";
      segmentElement.style.borderRadius = index === 0 ? "5px" : "3px";
      gameArena.appendChild(segmentElement);
    });
  }

  function drawFood() {
    document.querySelectorAll(".food").forEach(food => food.remove());

    const foodElement = document.createElement("div");
    foodElement.className = "food";
    foodElement.style.width = `${cellSize}px`;
    foodElement.style.height = `${cellSize}px`;
    foodElement.style.left = `${food.x}px`;
    foodElement.style.top = `${food.y}px`;
    foodElement.style.backgroundColor = "#FF5722";
    foodElement.style.borderRadius = "50%";
    gameArena.appendChild(foodElement);
  }

  function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Collision with wall
    if (head.x < 0 || head.x >= arenaSize || head.y < 0 || head.y >= arenaSize) {
      return gameOver();
    }

    // Collision with itself
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      return gameOver();
    }

    snake.unshift(head);

    // Eat food
    if (head.x === food.x && head.y === food.y) {
      score += 10;
      updateScore();
      food = generateFood();
    } else {
      snake.pop();
    }
  }

  function gameLoop() {
    moveSnake();
    drawSnake();
    drawFood();
  }

  function gameOver() {
    clearInterval(gameInterval);
    gameStarted = false;
    alert(`Game Over! Your score: ${score}`);
    startButton.style.display = "block";
  }

  function runGame() {
    if (gameStarted) return;
    gameStarted = true;
    score = 0;
    snake = [
      { x: 160, y: 200 },
      { x: 140, y: 200 },
      { x: 120, y: 200 }
    ];
    dx = cellSize;
    dy = 0;
    food = generateFood();

    updateScore();
    drawSnake();
    drawFood();
    gameInterval = setInterval(gameLoop, 150);
  }

  startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    runGame();
  });

  document.addEventListener("keydown", (e) => {
    if (!gameStarted) return;

    switch (e.key) {
      case "ArrowUp":
        if (dy === 0) {
          dx = 0;
          dy = -cellSize;
        }
        break;
      case "ArrowDown":
        if (dy === 0) {
          dx = 0;
          dy = cellSize;
        }
        break;
      case "ArrowLeft":
        if (dx === 0) {
          dx = -cellSize;
          dy = 0;
        }
        break;
      case "ArrowRight":
        if (dx === 0) {
          dx = cellSize;
          dy = 0;
        }
        break;
    }
  });

  // Optional: prevent arrow key scrolling
  window.addEventListener("keydown", (e) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
    }
  });
});

let playBoard = document.querySelector(".play-board");
let scoreElement = document.querySelector(".score");
let gameOver = false;
let foodX, foodY;
let snakeBody = [];
let snakeX = 5, snakeY = 10;
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const changeDirection = (e) => {
    console.log(e)
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Press OK");
    location.reload();
}

const initGame = () => {
    let htmlMarkup =
        `<div class="food" style="grid-area:${foodY}/${foodX}"> </div>`;

    if(gameOver) return handleGameOver();

    //Checking if the snake hit the food
    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]); //pushing food position to body array
        score++;
        scoreElement.innerText = `High Score: ${score}`
    }

    for (let i = snakeBody.length -1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        console.log("Game Over")
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        //adding a div for each part 
        htmlMarkup +=
            `<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"> </div>`;
            //checking if the snake head hit the body 
            if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
                gameOver = true;
            }
    }
    playBoard.innerHTML = htmlMarkup;
}

changeFoodPosition()
setIntervalId = setInterval(initGame, 125)
document.addEventListener("keydown", changeDirection);





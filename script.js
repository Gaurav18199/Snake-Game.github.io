// Game Constants & Variables
let inputDir = {x: 0, y: 0}
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameOver.mp3')
const moveSound = new Audio('music/turn.mp3')
const musicSound = new Audio('music/music.mp3')
let speed = 11; // fps control
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
food = {x: 6, y: 7};


//Game Functions
function main(ctime){ //ctime = current time
    window.requestAnimationFrame(main) //using (requestAnimationFrame) for highest fps(frame per sec)
    if((ctime - lastPaintTime)/1000 < 1/speed){  // fps control
        return;
    }
    lastPaintTime = ctime
    gameEngine();
}

function isCollide (snake){
    // if you bump into yourself
    for(let i = 1; i < snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true
        }
    }
        // if you bump into the wall
        if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
            return true
        }
    
}

function gameEngine(){
      // Part 1: Updating the snake array & Food
      if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0};
        alert("Game over. press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
      }

      // if you have eaten the food, increment the score and regenerate the food 
      if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = "Heigh Score: "+ hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
      }

      // Moving the snake 
      for(let i = snakeArr.length - 2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]}
      }

      snakeArr[0].x += inputDir.x
      snakeArr[0].y += inputDir.y

      // Part 2: Display the snake and Food
      // Display the snake
      board.innerHTML = "";
      snakeArr.forEach((e, index)=>{
          snakeElement = document.createElement('div');
          snakeElement.style.gridRowStart = e.y; //y = row
          snakeElement.style.gridColumnStart = e.x; //x = column

          if(index === 0){
            snakeElement.classList.add('head');
          }
          else{
            snakeElement.classList.add('snake');
          }
          board.appendChild(snakeElement);
      })

      // Display the Food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart =food.y; //y = row
        foodElement.style.gridColumnStart =food.x; //x = column
        foodElement.classList.add('food')
        board.appendChild(foodElement);
}


// Main logic starts here
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Heigh Score: "+ hiscore;
}

window.requestAnimationFrame(main)

// Function to handle swipe directions
let startX, startY;
window.addEventListener('touchstart', (e)=>{
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

window.addEventListener('touchmove', (e)=>{
    if(!startX || !startY){
        return
    }

    let endX = e.touches[0].clientX;
    let endY = e.touches[0].clientY;

    let diffX = startX - endX;
    let diffY = startY - endY;

    if (Math.abs(diffX)> Math.abs(diffY)){
        //Horizontal swipe
        if (diffX > 0){
            //Swipe left
            inputDir.x = -1;
            inputDir.y = 0;
        }
        else {
            // Swipe right
            inputDir.x = 1;
            inputDir.y = 0;
        }
    } 
    else {
        // Vertical swipe
        if (diffY > 0) {
            // Swipe up
            inputDir.x = 0;
            inputDir.y = -1;
        } 
        else {
            // Swipe down
            inputDir.x = 0;
            inputDir.y = 1;
        }
    }

    startX = null;
    startY = null;
});

// Keydown event listener
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch (e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})
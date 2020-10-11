const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const Game_Width = innerWidth-100;
const Game_Heigth = innerHeight-100;

canvas.width = Game_Width;
canvas.height = Game_Heigth;

const GAMESTATE = {
    paused:0,
    run:1,
    menu:2,
    gameover:3,
    NewLevel : 4
}

// getting bit responsive
function resize(){
    location.reload();
    canvas.width = Game_Width;
    canvas.height = Game_Heigth;
}
window.addEventListener("resize", resize);


/************************* 
 class of paddle
 *************************/ 
class Paddle{
    constructor(game){
        this.gamewidth = game.gamewidth;

        this.width = 150;
        this.height = 20;
        this.maxSpeed = 6;
        this.speed = 0;

        this.position = {
            x : game.gamewidth/2- this.width/2,
            y : game.gameheight- this.height-10
        };
    }

    // moveLeft
    moveLeft(){
        this.speed = -this.maxSpeed;
    }

    // moveRight
    moveRight(){
        this.speed = this.maxSpeed;
    }

    // stop
    stop(){
        this.speed = 0;
    }

    // paddle
    draw(ctx){
        ctx.fillStyle = "#333"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    // update paddle
    update(deltaTime){
        this.position.x += this.speed;

        // avoiding paddle to  go away from screeen
        if(this.position.x < 0) this.position.x = 0;
        if(this.position.x + this.width > game.gamewidth) this.position.x = game.gamewidth - this.width;
    }
}



/**************************
class of input handling
**************************/
class inputHandler{
    constructor(paddle, game){
        // sliding the paddle and pause game
        document.addEventListener("keydown",event=>{
            switch(event.keyCode){
                case 37:
                    paddle.moveLeft();
                break;

                case 39:
                    paddle.moveRight();
                break;

                case 27:
                    game.togglePause();
                break;

                case 32:
                    game.start();
                break;
            }
        });
        // stopping the paddle
        document.addEventListener("keyup",event=>{
            switch(event.keyCode){
                case 37:
                    if(paddle.speed < 0)
                    paddle.stop();
                break;

                case 39:
                    if(paddle.speed > 0)
                    paddle.stop();
                break;
            }
        });
    }
}


/****************
class of ball
*****************/
class Ball{
    constructor(game){
        this.image = document.getElementById("ball");

        this.gamewidth = game.gamewidth;
        this.gameheight = game.gameheight;

        this.size = 20;

        this.game = game;

        this.reset();
    }
    reset(){
        this.position = {x: 10, y: 400};
        this.speed = {x: 2, y: -2};
    }

    draw(ctx){
        // ballImage
        ctx.drawImage(this.image, this.position.x, this.position.y, 30, 20);
        // 30,20 are ball size
    }

    update(deltaTime){
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // avoiding ball to not to go out of screen
        if(this.position.x + 20 > this.gamewidth || this.position.x < 0){
            this.speed.x = -this.speed.x;
        }
        if(this.position.y < 0){
            this.speed.y = -this.speed.y;
        }

        //check if hit Bottom of game
        if(this.position.y + 30 > this.gameheight){
            this.game.lives--;
            this.reset();
        }

        // check paddle collision
        if(BrickCollision(this ,this.game.paddle)){
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - 20;
        }
    }
}


/****************
class of bricks
*****************/
class Bricks{
    constructor(game, position){
        this.image = document.getElementById("bricks");


        this.position = position;
        this.width = 80;
        this.height = 24;

        this.game = game;

        this.markForDeletion = false;
    }

    update(){
        if(BrickCollision(this.game.ball, this))
        {
            this.game.ball.speed.y = -this.game.ball.speed.y;

            this.markForDeletion = true;
        }
}

    draw(ctx){
        // brick Image
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}

/**************
Brick Levels
***************/
// level array represent bricks 0 means blank position
let level1 = [
    [1 ,1, 1, 1, 1, 0, 1, 1, 1, 1],
    [0, 1, 0, 1, 0, 1, 1, 1, 1, ,0],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, ,1],
    [1, 1, 1, 1, 1, 1, 0, 1, ,1],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, ,0]
];

let level2 = [
    [1 ,1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, ,1, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, ,1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, ,1, 1]
];

function BuildLevel(game, level){
    let bricks = [];

    level.forEach((row, rowIndex)=>{
        row.forEach((brick, brickIndex)=>{
            if(brick == 1){
                let position = {x: 85*brickIndex, y: 60 + 30 * rowIndex}//try do -5 im 85 and 30
                bricks.push(new Bricks(game, position));
            }
        });
    });
    return bricks;
}


/***********************
Brick & BallCollision
************************/
function BrickCollision(ball, gameObject){
    let BottomBall = ball.position.y + 20;
    let topBall = ball.position.y;

    let topOfObject = gameObject.position.y;
    let leftSideOfObject = gameObject.position.x;
    let RightSideOfObject = gameObject.position.x + gameObject.width;
    let bottomOfObject = gameObject.position.y + gameObject.height;

    if(BottomBall >= topOfObject
        && topBall <= bottomOfObject
        && ball.position.x >= leftSideOfObject
        && ball.position.x + 20 <= RightSideOfObject)
    {
        return true;
    }else{
        return false;
    }
}





// Refractoring i.e managing all the objects of classes
class Game{
    constructor(GameWidth, GameHeigth){
        this.gamewidth = GameWidth;
        this.gameheight = GameHeigth;

        this.gameState = GAMESTATE.menu;

        // objects of classes
        this.ball = new Ball(this);
        this.paddle = new Paddle(this)
      
        new inputHandler(this.paddle, this);
        
        this.gameObjects = [];

        this.bricks = [];
        this.lives = 2;

        this.levels = [level1, level2];
        this.currentLevel = 0;
    }
    start(){
        if(this.gameState !== GAMESTATE.menu && this.gameState !== GAMESTATE.NewLevel) return;

        // creating multiple bricks
        this.bricks = BuildLevel(this, this.levels[this.currentLevel]);
        this.ball.reset();

        this.gameObjects = [this.ball, this.paddle];

        this.gameState = GAMESTATE.run;
    }

    update(deltaTime){

        if(this.lives === 0)this.gameState = GAMESTATE.gameover;

        if(this.gameState === GAMESTATE.paused
            || this.gameState === GAMESTATE.menu
            || this.gameState === GAMESTATE.gameover)
        {
            return;
        }

        if(this.bricks.length === 0){
            // new level
            this.currentLevel++;
            this.gameState = GAMESTATE.NewLevel;
            this.start();
        }

        [...this.gameObjects, ...this.bricks].forEach(obj => obj.update(deltaTime));

        this.bricks = this.bricks.filter(brick=> !brick.markForDeletion);
    }

    draw(ctx){
        [...this.gameObjects, ...this.bricks].forEach(obj => obj.draw(ctx));

        // paused
        if(this.gameState === GAMESTATE.paused){
            ctx.rect(0,0,this.gamewidth,this.gameheight);
            ctx.fillStyle = "rgba(0,0,0,.5)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("PAUSED", this.gamewidth/2, this.gameheight/2);
        }

        // Menu
        if(this.gameState === GAMESTATE.menu){
            ctx.rect(0,0,this.gamewidth,this.gameheight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("PRESS SPACEBAR TO START", this.gamewidth/2, this.gameheight/2);
        }

        // gameOver
        if(this.gameState === GAMESTATE.gameover){
            ctx.rect(0,0,this.gamewidth,this.gameheight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Game Is Over", this.gamewidth/2, this.gameheight/2);
        }
    }

    togglePause(){
        if(this.gameState == GAMESTATE.paused){
            this.gameState = GAMESTATE.run;
        }
        else{
            this.gameState = GAMESTATE.paused;
        }
    }

}
let game = new Game(Game_Width, Game_Heigth);




//calling funcions of game and functionalities
let lastime = 0;

function gameLoop(timestamp){
    let deltaTime = timestamp - lastime;
    lastime = timestamp;
    
    ctx.clearRect(0 ,0, Game_Width, Game_Heigth);
    
    game.update(deltaTime);
    game.draw(ctx);

    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
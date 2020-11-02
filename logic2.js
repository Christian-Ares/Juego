const canvas = document.getElementById('example');
const ctx = canvas.getContext('2d');
canvas.width = 700;
canvas.height = 500
const keys = [];

//Jugador 

const player = {
    x: 200,
    y: 300,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false
};


//Imagenes

const enemy = new Image()
enemy.src = './Sprites/ALttP_Blue_Sword_Soldier_Sprite.png';
const playerSprite = new Image();
playerSprite.src = "./Sprites/images.png";
const background = new Image();
background.src = "/Sprites/Fondo.png";

const attack = new Image()
attack.src = '/Sprites/attackLeft.png'

//Enemigos
let enemyX = Math.floor(Math.random() * 450)
let enemyY = Math.floor(Math.random() * 390)
let selectedEnemy = enemy


//Constantes para dibujar
const drawAttack = () => {
    ctx.drawImage(attack, player.x, player.y, player.width, player.height)
}

const drawEnemy = () => {
    ctx.drawImage(selectedEnemy, enemyX, enemyY, 32, 48)
}

const drawSprite = (img, sX, sY, sW, sH, dX, dY, dW, dH) => {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}


// Bindeo de teclas
window.addEventListener("keydown", (e) => {
    keys[e.keyCode] = true;
    //player.moving = true;
});
window.addEventListener("keyup", (e) => {
    delete keys[e.keyCode];
    player.moving = false;
});

let movePlayer = () => {
    if (keys[38] && player.y > 0) {
        player.y -= player.speed;
        player.frameY = 3;
        player.moving = true;
    }
    if (keys[37] && player.x > 0) {
        player.x -= player.speed;
        player.frameY = 1;
        player.moving = true;
    }
    if (keys[40] && player.y < canvas.height - player.height) {
        player.y += player.speed;
        player.frameY = 0;
        player.moving = true;
    }
    if (keys[39] && player.x < canvas.width - player.width) {
        player.x += player.speed;
        player.frameY = 2;
        player.moving = true;
    }
    if(keys[80]){
    }
}

//Animación del Sprite
let handlePlayerFrame = () => {
    if (player.frameX < 3 && player.moving) player.frameX++;
    else player.frameX = 0;
}

let fps, fpsInterval, startTime, now, then, elapsed;

let startAnimation = (fps) => {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

let animate = () => {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
        movePlayer();
        handlePlayerFrame();
        drawEnemy();
        //drawAttack();
    }
}

//Movimiento del enemigo
let enemyMove;

// enemyMove = setTimeOut(() => {
//     enemyX += Math.floor(Math.random() * enemyX)
//     enemyY += Math.floor(Math.random() * enemyY)
// }, 30)


startAnimation(15);
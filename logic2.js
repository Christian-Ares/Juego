const canvas = document.getElementById("example");
const ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 500;
const keys = [];
let score = 0;
const enemies = [];
let dateRightNow = Date.now();
let clickable = true;
//Personajes
const player = {
    x: 200,
    y: 300,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false,
    attack: false,
    life: 30,
};
//Enemigos
let randomX = () => {
    return Math.floor(Math.random() * 650);
};
let randomY = () => {
    return Math.floor(Math.random() * 400);
};
class Enemy {
    constructor(_x, _y, _width, _height, _life) {
        this.x = _x;
        this.y = _y;
        this.width = _width; //32
        this.height = _height; //50
        this.life = _life; //40
        this.refresh = 0;
        this.directionChange = 0;
    }
    move() {
        let direction = [1, 0, -1];
        let randomDirectionx = 0;
        let randomDirectiony = 0;
        let speed = 1;
        this.refresh = setInterval(() => {
            if (this.x > 650) {
                this.x = 650;
            }
            if (this.x < 0) {
                this.x = 0;
            }
            if (this.y > 400) {
                this.y = 400;
            }
            if (this.y < 0) {
                this.y = 0;
            }
            this.x = this.x + speed * randomDirectionx;
            this.y = this.y + speed * randomDirectiony;
        }, 50);
        this.directionChange = setInterval(() => {
            randomDirectionx = direction[Math.floor(Math.random() * 3)];
            randomDirectiony = direction[Math.floor(Math.random() * 3)];
        }, 2000);
    }
}
const createEnemies = () => {
    setInterval(() => {
        const newEnemy = new Enemy(randomX(), randomY(), 32, 50, 15);
        enemies.push(newEnemy);
        console.log(enemies);
    }, 3000);
};


//Imagenes
const enemySprite = new Image();
enemySprite.src = "./Sprites/TMC_Octorok_Sprite.png";

const playerSprite = new Image();
playerSprite.src = "./Sprites/images.png";

const background = new Image();
background.src = "./Sprites/Fondo.png";

const attackImage = new Image();
attackImage.src = "./Sprites/TMC_Link_Sprite_7.png";


//Constantes para dibujar
const drawAttack = () => {
    ctx.drawImage(attackImage, player.x, player.y, player.width, player.height);
};
const drawEnemy = () => {
    enemies.forEach((enemy) => {
        ctx.drawImage(enemySprite, enemy.x, enemy.y, enemy.width, enemy.height);
    });
};
const drawSprite = (img, sX, sY, sW, sH, dX, dY, dW, dH) => {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
};

// Bindeo de teclas
window.addEventListener("keydown", (e) => {
    keys[e.keyCode] = true;
    //player.moving = true;
    player.attack = true;
});
window.addEventListener("keyup", (e) => {
    delete keys[e.keyCode];
    player.moving = false;
    player.attack = false;
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
};
//Animación del Sprite
let handlePlayerFrame = () => {
    if (player.frameX < 3 && player.moving) player.frameX++;
    else player.frameX = 0;
};
let fps, fpsInterval, startTime, now, then, elapsed;
let startAnimation = (fps) => {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
};

let animate = () => {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        drawSprite(
            playerSprite,
            player.width * player.frameX,
            player.height * player.frameY,
            player.width,
            player.height,
            player.x,
            player.y,
            player.width,
            player.height
        );
        movePlayer();
        handlePlayerFrame();
        drawEnemy();
        collision();
        renderScore();
        renderPlayerLife();
    }
};
//Movimiento aleatorio funcional!
const animateEnemies = () => {
    enemies.forEach((enemy) => {
        clearInterval(this.refresh);
        clearInterval(this.directionChange);
        enemy.move();
    });
};
setInterval(() => {
    animateEnemies();
}, 2000);

// Colisiones y Ataque

const collision = () => {
    enemies.forEach((enemy, i) => {
        if (Math.abs(player.x - enemy.x) <= 30) {
            if (Math.abs(player.y - enemy.y) <= 35) {
                if (keys[80]) {
                    player.attack = true;
                    if (player.attack == true) {
                        drawAttack();
                        enemy.life--;
                    }
                    if (enemy.life == 0) {
                        score++;
                        enemies.splice(i, 1);
                    }
                } else {
                    player.life--;
                    if (player.life == 0) {}
                }
            }
        }
    });
};

const renderScore = () => {
    ctx.font = "20px sans-serif";
    ctx.textAlign = "left";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${score}`, 300, 20);
    ctx.fillStyle = "brown";
};
const renderPlayerLife = () => {
    ctx.font = "20px sans-serif";
    ctx.textAlign = "right";
    ctx.fillStyle = "white";
    ctx.fillText(`Life: ${player.life}`, 110, 20);
    ctx.fillStyle = "brown";
}

document.getElementById('start-button').onclick = (event) => {
    if (clickable) {
        event.target.classList.add('unclickable-button')
        clickable = false
        endGame = false
        startGame();
    }
};

startGame = () => {
    if (!endGame) {
        animate();
        startAnimation(15);
        animateEnemies();
        createEnemies();
    } else {
        renderGameOverText()
        document.getElementById('start-button').classList.remove('unclickable-button')
        clickable = true
    }
};


// Falta: endGame y restart, audio, challengues si da tiempo!
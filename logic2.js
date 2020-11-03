const canvas = document.getElementById('example');
const ctx = canvas.getContext('2d');
canvas.width = 700;
canvas.height = 500;
const keys = [];
let counter = 0;
const enemies = [];

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
    lifes: 3000
};

const attack = {
    x: player.x,
    y: player.y,
    width: player.width,
    height: player.height,
    frameX: 0,
    frameY: 0,


};

let enemy = {
    x: Math.floor(Math.random() * 450),
    y: Math.floor(Math.random() * 390),
    width: 32,
    height: 50,
    life: 40,
    vx: 5
};
//Imagenes

const enemySprite = new Image();
enemySprite.src = '/Sprites/TMC_Octorok_Sprite.png';

const playerSprite = new Image();
playerSprite.src = "/Sprites/images.png";

const background = new Image();
background.src = "/Sprites/Fondo.png";

const attackImage = new Image();
attackImage.src = '/Sprites/TMC_Vaati_Sprite.png';


//Constantes para dibujar

const drawAttack = () => {
    ctx.drawImage(attackImage, player.x, player.y, player.width, player.height);
};

const drawEnemy = () => {
    ctx.drawImage(enemySprite, enemy.x, enemy.y, enemy.width, enemy.height);
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
//Ataque
let attackPlayer = () => {
    // if (keys[80]) {
    //     player.attack = true;
    //     if (player.attack == true && enemy.x == player.x && enemy.y == player.y) {
    //         drawAttack();
    //         enemy.life--
    //         console.log(enemy.life)
    //     }

    // }
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
        drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
        movePlayer();
        handlePlayerFrame();
        attackPlayer();
        drawEnemy();
        //randomMove();
        collision();
        //drawAttack();
        counter++;
    }

};
//Movimiento aleatorio funcional!
const animateEnemies = () => {
    let direction = [1, 0, -1];
    let randomDirectionx = 1;
    let randomDirectiony = 0;
    let speed = 2;

    setInterval(() => {
        if (enemy.x > 650) {
            enemy.x = 650;
        }
        if (enemy.x < 0) {
            enemy.x = 0;
        }
        if (enemy.y > 400) {
            enemy.y = 400;
        }
        if (enemy.y < 0) {
            enemy.y = 0;
        }
        enemy.x = enemy.x + speed * randomDirectionx;
        enemy.y = enemy.y + speed * randomDirectiony;
    }, 100);
    setInterval(() => {
        randomDirectionx = direction[Math.floor(Math.random() * 3)];
        randomDirectiony = direction[Math.floor(Math.random() * 3)];
    }, 2000);

};
animateEnemies();

// Colisiones
const collision = () => {
    if (Math.abs(player.x - enemy.x) <= 30) {

        if (Math.abs(player.y - enemy.y) <= 35) {
            console.log('se estan tocando');
        }
    }
    if (keys[80]) {
        player.attack = true;
        if (player.attack == true) {
            drawAttack();
        }
        if (enemy.x == player.x && enemy.y == player.y) {
            enemy.life--;
            console.log(enemy.life);
        }

    }








    // document.addEventListener('keydown', (e) => {
    //     if (e.key === 'p') {
    //         player.attack = true
    //     }

    //console.log(player.attack)
    // if (player.attack === true) {
    //     enemy.lifes--
    // } else {
    //     player.lifes--
    // }
    // console.log(enemy.lifes)
    //})
};






startAnimation(15);
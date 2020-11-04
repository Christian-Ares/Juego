const draw = () => {

    const canvas = document.getElementById('example');
    const ctx = canvas.getContext('2d');

    //Imagenes

    //Desplazamiento hacia arriba
    const heroUp0 = new Image();
    heroUp0.src = './Sprites Link/LinkTop1.png';

    // const heroUp1 = new Image();
    // heroUp1.src = './Sprites Link/LinkTop2.png';

    // const heroUp2 = new Image();
    // heroUp2.src = './Sprites Link/LinkTop3.png';

    // const heroUp3 = new Image();
    // heroUp3.src = './Sprites Link/LinkTop4.png';
    




    document.getElementById('start-button').onclick = (event) => {
        if(clickable){
          event.target.classList.add('unclickable-button')
          clickable = false
          endGame = false
          startGame();
        }
      };
    
      startGame = () => {
        if(!endGame){
        animate();
        
        startAnimation(15);
    
        } else {
          renderGameOverText()
          document.getElementById('start-button').classList.remove('unclickable-button')
          clickable = true
        }
      };









    const heroRight = new Image();
    heroRight.src = './Sprites Link/LinkRight1.png';

    const heroDown = new Image();
    heroDown.src = './Sprites Link/LinkDown1.png';

    const heroLeft = new Image();
    heroLeft.src = './Sprites Link/LinkLeft1.png';

    const heroAttack = new Image()
    heroAttack.src = './Sprites/attackLeft.png'

    const back = new Image()
    back.src = './Sprites/Fondo.png'

    const enemy = new Image()
    enemy.src = './Sprites/ALttP_Blue_Sword_Soldier_Sprite.png'
    
    //Variables

    let heroX = 200
    let heroY = 200
    let counter = 0
    // let frames = 0
    let direction = 'up'
    let selectedHero = heroUp0

    let enemyX = Math.floor(Math.random()*450)
    let enemyY = Math.floor(Math.random()*450)
    let selectedEnemy = enemy

    //Desplazamiento

    // const updateContent = (_direction) => {

    //     if(_direction === 'top'){
    //       heroY -= 10;
    //     } else if(_direction === 'right'){
    //       heroX += 10;
    //     } else if(_direction === 'down'){
    //       heroY += 10;
    //     } else if(_direction === 'left'){
    //       heroX -= 10;
    //     }
    //   };
    
    //Bindeo de teclas
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp') {
            direction = 'top'
            selectedHero = heroUp0
            heroY -=5 
        } else if (event.key === 'ArrowRight') {
            direction = 'right'
            selectedHero = heroRight
            heroX +=5
        } else if (event.key === 'ArrowDown') {
            direction = 'down'
            selectedHero = heroDown
            heroY +=5
        } else if (event.key === 'ArrowLeft') {
            direction = 'left'
            selectedHero = heroLeft
            heroX -=5
        } //else if (event.key === 'Shift') {
        //     selectedHero = heroAttack el ataque funciona
        // }
    });

    //Updates y constantes
    const drawEnemy = () => {
        ctx.drawImage(selectedEnemy, enemyX, enemyY, 40, 40)
    }
    
    const drawHero = () => {
        ctx.drawImage(selectedHero, heroX, heroY, 50, 50);
    };

    const drawBackground = () => {
        ctx.drawImage(back, 0,0,500,500)
        
    };

    const clearCanvas = () => {
        ctx.clearRect(0, 0, 500, 500);
    };

    

    const updateCanvas = () => { //Se divide en 4 partes

        //updateContent(direction); // Actualizar contenido
        clearCanvas(); // Limpiar canvas

        drawBackground();//Dibujar fondo

        drawHero(); // Dibujar

        drawEnemy();

        requestAnimationFrame(updateCanvas); // Reiniciar
    };


    heroUp0.onload = () => {
        counter++;
        checkIfAllImagesAreLoaded();
    };

    heroRight.onload = () => {
        counter++;
        checkIfAllImagesAreLoaded();
    };

    heroDown.onload = () => {
        counter++;
        checkIfAllImagesAreLoaded();
    };

    heroLeft.onload = () => {
        counter++;
        checkIfAllImagesAreLoaded();
    };

    // background.onload = () => {
    //     counter++
    //     checkIfAllImagesAreLoaded();
    //};
    const checkIfAllImagesAreLoaded = () => {
        if (counter === 4) {
            updateCanvas();
        }
    };
}

draw()

// if deaths counter arrives 30 summon final boss or elite
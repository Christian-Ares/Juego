//Enemigos

class enemyLow{
    constructor(health, strength, defense){
        this.health = health
        this.strength = strength
        this.defense = defense
    }
    receiveDamage(damage){
        this.health -= damage
        this.defense -= damage / 2
        if(this.health > 0){
            // sacarlo del escenario del canvas
        }
    }
}

class enemyMid{
    constructor(x, y, health, strength, defense){
        this.health = health
        this.strength = strength
        this.defense = defense
        this.x = Math.floor(Math.random()*450);
        this.y = Math.floor(Math.random()*300);
    }
    receiveDamage(damage){
        this.health -= damage
        this.defense -= damage / 3
        if(this.health > 0){
            // sacarlo del escenario del canvas
        }
    }
}


class Enemies {
    constructor(){
        this.enemyLowArmy = []
        this.enemyMidArmy = []
    }

addLowEnemy(enemyLow){
    this.enemyLowArmy.push(enemyLow)
}
addMidEnemy(enemyMid){
    this.enemyMidArmy.push(enemyMid)
}

}

// class enemyHigh{
//     constructor(health, strength, defense){
//         this.health = health
//         this.strength = strength
//         this.defense = defense
//     }
//     receiveDamage(damage){
//         this.health -= damage
//         this.defense -= damage / 4
//         if(this.health > 0){
//             // sacarlo del escenario del canvas
//         }
//     }
// }


//Definicion del Player


    // class Hero {
    //     constructor(health, strength) {
    //         this.health = health
    //         this.strength = strength
    //         this.x = 200;
    //         this.y = 300;
    //     }
    //     attack() {
    //         this.strength
    //         return this.strength
    //     }
    //     receiveDamage(damage) {
    //         this.health -= damage
    //     }
    //     draw() {
    //         ctx.drawImage(this.heroTop, this.x, this.y, 100, 100)
    //     }


    // }
    // const hero = new Hero()



//Opcional
// class eliteLow{
//     constructor(health, strength, defense){
//         this.health = health
//         this.strength = strength
//         this.defense = defense
//     }
//     receiveDamage(damage){
//         this.health -= damage
//         this.defense -= damage / 4
//         if(this.health > 0){
//             // sacarlo del escenario del canvas
//         }
//     }
// }

// class enemyHigh{
//     constructor(health, strength, defense){
//         this.health = health
//         this.strength = strength
//         this.defense = defense
//     }
//     receiveDamage(damage){
//         this.health -= damage
//         this.defense -= damage / 4
//         if(this.health > 0){
//             // sacarlo del escenario del canvas
//         }
//     }
// }

// class finalBoss{
//     constructor(health, strength, defense){
//         this.health = health
//         this.strength = strength
//         this.defense = defense
//     }
//     receiveDamage(damage){
//         this.health -= damage
//         this.defense -= damage / 4
//         if(this.health > 0){
//             // sacarlo del escenario del canvas
//         }
//     }
// }











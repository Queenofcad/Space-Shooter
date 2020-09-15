const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');
const aliensImg = ['img/monster-1.png', 'img/monster-2.png', 'img/monster-3.png']
const instructionsText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button');
let alienInterval;

//movimento e tiro
function flyShip(event) {
    if(event.key === 'ArrowUp') {
        event.preventDefault();
        moveUp();
    } else if(event.key === 'ArrowDown') {
        event.preventDefault();
        moveDown();
    } else if(event.key === " ") {
        event.preventDefault();
        fireLaser();  
    }
}

//função subir
function moveUp() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === "0px") {
        return
    } else {
        let position = parseInt(topPosition);
        position -= 20;
        yourShip.style.top = `${position}px`;
    }
}

//função descer
function moveDown() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === "510px"){
        return
    } else {
        let position = parseInt(topPosition);
        position += 20;
        yourShip.style.top = `${position}px`;
    }
}

//função tiro
function fireLaser(){
    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser();
}

function createLaserElement() {
    let xposition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    newLaser.src = 'img/light-lens.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPosition}px`;
    newLaser.style.top = `${yPosition - 10}px`;
    return newLaser;
}

function moveLaser(laser) {
    let laserInterval = setInterval(() => {
        let xPosition = parsetInt(laser.style.left);
        let alien = document.querySelectorAll('.alien')

        alien.forEach((alien) => {
            if(checkLaserColision(laser, alien)) {
                alien.src = 'img/explosion.png';
                alien.classList.remove('alien');
                alien.classList.add('dead-alien');
            }
        })

        if(xPosition === 340) {
            laser.remove();
        } else {
            laser.style.left = `${xPosition + 8}px`;
        }
    }, 10);
}

//função inimigos
function createAliens() {
    let newAlien = document.createElement('img');
    let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)];
    newAlien.src = alienSprite;
    newAlien.classList.add('alien');
    newAlien.classList.add('alien-transition');
    newAlien.style.left = '370px';
    newAlien.style.top  = `${Math.floor(Math.random() * 330) +30}px`;
    playArea.appendChild(newAlien);
    moveAlien(newAlien);
}

//função movimento ET
function moveAlien(alien) {
    let moveAlienInterval = setInterval(() => {
        let xPosition = parseInt.window.getComputedStyle(alien).getPropertyValue('left');
        if(xPosition <= 50) {
            if(Array.from(aalien.classList).includes('dead-alien')) {
                alien.remove();
            } else {
                gameOver();
            }
        } else {
                alien.style.left = `${xPosition -4}px`;
            }
    }, 30);
}

//função colisão
function checkLaserColision(laser, alien) {
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBotton = laserTop - 20;
    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienBotton = alienTop - 30;
    if(laserLeft != 340 && laserLeft + 40 >= alienLeft) {
        if(laserTop <= alienTop && laserTop >= alienBottom) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

//start
startButton.addEventListener('click', (event) => {
    playGame();
})

function playGame() {
    startButton.style.display = 'none';
    instructionsText.style.display = 'none';
    window.addEventListener('keydown', flyShip);
    alienInterval = setInterval(() => {
        createAlien();
    }, 2000);
}

//game over
function gameOver() {
    window.removeEventListener('keydown', flyShip);
    clearInterval(alienInterval);
    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien) => laser.remove());
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => laser.remove());
    setTimeout(() => {
        alert('game over!');
        yourShip.style.top = "250px";
        startButton.style.display = "block";
        instructionsText.style.display = "block";
    });
}
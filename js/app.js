var ctx = ctx;
var Resources = Resources;
// Enemies our player must avoid
var Enemy = function (x, y) {
    'use strict';
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 1.5;    //new
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
};
// Update the enemy's position, required method for game
var rowArray = [60, 150, 235, 340];
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    'use strict';
    this.x += 101 * this.speed * dt;
    if (this.x > 505) {
        this.x = 0;
        this.y = rowArray[Math.floor(Math.random() * rowArray.length)]; //changed
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    'use strict';
    this.sprite = 'images/char-pink-girl.png';
    this.x = x;
    this.y = y;
};
Player.prototype.update = function () {
    'use strict';
    this.checkPlayerCollisions();
    if (this.y < 0) { //new 
        player.gameOver(); //new
    }
};
Player.prototype.render = function () {
    'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function (girl) {
    'use strict';
    if (girl === 'left' && this.x > 0) {
        this.x -= 101;
    }
    if (girl === 'right' && this.x < 303) {
        this.x += 101;
    }
    if (girl === 'up' && this.y > 0) {
        this.y -= 83;
    }
    if (girl === 'down' && this.y < 404) {
        this.y += 83;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
//Modified  
var allEnemies = [];
for (var i = 0; i < 5; i++) {
    var enemy = new Enemy(60, 150, 235, 340);
   allEnemies.push(enemy);
}
// Place the player object in a variable called player
var player =  new Player(200, 425);

Player.prototype.gameOver = function () {
    this.x = 200;
    this.y = 425;
};
Player.prototype.checkPlayerCollisions = function () {
    allEnemies.forEach(function (enemy) {
        if (enemy.x < player.x + 50 &&
                enemy.x + 50 > player.x &&
                enemy.y < player.y + 50 &&
                enemy.y + 50 > player.y) {
            player.gameOver();
        }
    });
};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
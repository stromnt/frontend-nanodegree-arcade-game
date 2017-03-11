// Enemies our player must avoid
var Enemy = function(tileX, tileY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = tileX * width;
    this.tileY = tileY;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed * gameSpeed;
    if (this.x > cols * width) {
        this.x = 0;
        this.tileY = newTileY();
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.tileY * height - enemyYOffset);
};

Enemy.prototype.hasCollided = function(player) {
    var collision = false;
        if ( this.tileY === player.tileY && Math.abs(this.x - player.tileX * width) < 80) {
            collision = true;
        }
    return collision;

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(tileX, tileY) {
    this.sprite = 'images/char-pink-girl.png';
    this.tileX = tileX;
    this.tileY = tileY;
};

// After each dt check collisions and score
Player.prototype.update = function(dt) {
    if ( this.tileY === 0 ) {
        wins += 1;
        restart(1.2);
    }

    for (let enemy of allEnemies) {
        if (enemy.hasCollided(this)) {
            wins -= 1;
            restart(.9);
            break;
        }
    }

    console.log(wins);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.tileX * width, this.tileY * height - playerYOffset);
};

Player.prototype.handleInput = function(key) {
    switch (key) {
      case 'left':
        if (this.tileX > 0){
           this.tileX -= 1;
        }
        break;
      case 'right':
        if (this.tileX < cols)
         this.tileX += 1;
        break;
      case 'up':
       if (this.tileY > 0) {
            this.tileY -= 1;
       }
        break;
      case 'down':
        if (this.tileY < rows) {
           this.tileY += 1;
        }
        break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var rows = 5,
    cols = 4,
    width = 101,
    height = 83,
    enemyYOffset = 21,
    playerYOffset = 10;
    gameSpeed = 20,
    wins = 0;

var allEnemies = [];
var player = new Player(2, 5);
allEnemies.push(new Enemy(0, 1, 1));
allEnemies.push(new Enemy(0, 2, 3));
allEnemies.push(new Enemy(0, 3, 2));

var restart = function(gameSpeedDiff) {
    player.tileX = newTileX();
    player.tileY = 5;
    allEnemies[0].x = 0;
    allEnemies[0].tileY = newTileY();
    allEnemies[1].x = 0;
    allEnemies[1].tileY = newTileY();
    allEnemies[2].x = 0;
    allEnemies[2].tileY = newTileY();
    gameSpeed *= gameSpeedDiff;
}

var isCollision = function( x, tileY) {
    var collision = false;
    for (enemy of allEnemies) {
        if ( enemy.tileY === player.tileY && Math.abs(enemy.x - player.tileX * width) < 80) {
            collision = true;
            break;
        }
    }
    return collision;

}

// Choose a random new row for the enemy
var newTileY = function() {
    return Math.floor(Math.random() * 3) + 1;
}

// Choose a random new column for the player
var newTileX = function() {
    return Math.floor(Math.random() * 4);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

const Grid = require('$snake/Grid');
const Snake = require('$snake/Snake');
const Point = require('$snake/Point');
const Direction = require('$snake/Direction');

module.exports = class State {
    constructor(grid, snakes, candies) {
        this.grid = grid || new Grid(20, 20);
        this.snakes = snakes || {};
        this.candies = candies || [];
        this.idGenerator = function* () {
            for (let i = 0; ; ++i) {
                yield i;
            }
        };
    }

    spawnSnake() {
        const spawnX = Math.floor(this.grid.cols / 2);
        const spawnY = Math.floor(this.grid.rows / 2);
        const spawnDir = new Direction(Direction.RIGHT);
        const spawnColor = '#ff2233';
        const id = this.idGenerator().next().value;
        this.snakes[id] = new Snake(new Point(spawnX, spawnY), spawnDir, spawnColor);
        return id;
    }

    turnSnakeRight(id) {
        if (this.snakes[id] !== undefined) {
            this.snakes[id].turnRight();
        }
    }

    turnSnakeLeft(id) {
        if (this.snakes[id] !== undefined) {
            this.snakes[id].turnLeft();
        }
    }

    update() {
        _.values(this.snakes).each(snake => snake.move());
        
        for (const snake of Object.values(this.snakes)) {
            snake.move();
        }
        // foreach snake, move()
        // Detect candy collision
        //      if collision emit event & spawn candy
        // Detect death
        //      if death emit event & respawn small snake
    }
};
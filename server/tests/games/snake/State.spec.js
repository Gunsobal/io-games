/* eslint-disable jest/no-test-callback */
const State = require('../../../src/games/snake/State');
const Candy = require('../../../src/games/snake/Candy');
const Point = require('../../../src/games/snake/Point');

describe('State tests', () => {
    let snake;

    beforeEach(() => {
        snake = { id: 0, point: new Point(5, 5) };
    });

    it('should be able to spawn a snake', () => {
        const state = new State;
        state.spawnSnake(snake);
        expect(Object.keys(state.snakes)).toHaveLength(1);
    });

    it('should be able to turn snake by id', () => {
        const state = new State;
        state.spawnSnake(snake);
        const id = snake.id;
        state.snakes[id].direction.value = 'up';
        state.turnSnake({ id, direction: 'right' });
        expect(state.snakes[id].direction.value).toBe('right');
        state.turnSnake({ id, direction: 'left' });
        expect(state.snakes[id].direction.value).toBe('up');
    });

    it('should move all snakes on update', () => {
        const state = new State;
        const id = snake.id;
        state.spawnSnake(snake);
        state.snakes[id].direction.value = 'up';
        const head = state.snakes[id].getHead().clone();
        state.update();
        expect(state.snakes[id].getHead().y).toBe(head.y - 1);
    });

    it('should detect candy collision', async done => {
        const state = new State;
        const id = snake.id;
        state.spawnSnake(snake);
        state.candies = [ new Candy(state.snakes[id].getHead().clone()) ];
        state.on('candy', candy => {
            expect(candy).toBeTruthy();
            done();
        });
        state.checkForCandyCollision();
    });

    it('should detect snake death by wall collision left', async done => {
        const state = new State;
        const snakeId = snake.id;
        state.spawnSnake(snake);
        state.snakes[snakeId].points = [new Point(-1, 5)];
        state.on('death', ({ id }) => {
            expect(id).toEqual(snakeId);
            done();
        });
        state.checkForSnakeDeath();
    });

    it('should detect snake death by wall collision up', async done => {
        const state = new State;
        const snakeId = snake.id;
        state.spawnSnake(snake);
        state.snakes[snakeId].points = [new Point(5, -1)];
        state.on('death', ({ id }) => {
            expect(id).toEqual(snakeId);
            done();
        });
        state.checkForSnakeDeath();
    });

    it('should detect snake death by wall collision right', async done => {
        const state = new State;
        const snakeId = snake.id;
        state.spawnSnake(snake);
        state.snakes[snakeId].points = [new Point(state.grid.cols, 5)];
        state.on('death', ({ id }) => {
            expect(id).toEqual(snakeId);
            done();
        });
        state.checkForSnakeDeath();
    });

    it('should detect snake death by wall collision down', async done => {
        const state = new State;
        const snakeId = snake.id;
        state.spawnSnake(snake);
        state.snakes[snakeId].points = [new Point(5, state.grid.rows)];
        state.on('death', ({ id }) => {
            expect(id).toEqual(snakeId);
            done();
        });
        state.checkForSnakeDeath();
    });

    it('should detect snake death by self collision', async done => {
        const state = new State;
        const snakeId = snake.id;
        state.spawnSnake(snake);
        state.snakes[snakeId].points = [new Point(5, 5), new Point(5, 5)];
        state.on('death', ({ id }) => {
            expect(id).toEqual(snakeId);
            done();
        });
        state.checkForSnakeDeath();
    });

});
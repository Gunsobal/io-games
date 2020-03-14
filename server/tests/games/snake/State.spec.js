const State = require('$snake/State');

describe('State tests', () => {
    it('should be able to spawn a snake', () => {
        const state = new State;
        const id = state.spawnSnake();
        expect(id).toBe(0);
        expect(Object.keys(state.snakes)).toHaveLength(1);
    });

    it('should be able to turn snake by id', () => {
        const state = new State;
        const id = state.spawnSnake();
        state.snakes[id].direction.value = 'up';
        state.turnSnakeRight(id);
        expect(state.snakes[id].direction.value).toBe('right');
        state.turnSnakeLeft(id);
        expect(state.snakes[id].direction.value).toBe('up');
    });

    it('should move all snakes on update', () => {
        const state = new State;
        const id = state.spawnSnake();
        state.update();
    });
});
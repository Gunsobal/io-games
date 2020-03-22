const State = require('./State');
const Grid = require('./Grid');
const Point = require('./Point');
const Direction = require('./Direction');

module.exports = class Game {
    constructor(initialState) {
        this.state = initialState || null;
        this.players = [];
        this.idGenerator = function*() {
            for (let i = 0; ; ++i) {
                yield i;
            }
        }
    }

    join() {
        const id = this.idGenerator().value;
        this.players.push(id);
        this.state.applyEvent({ type: State.SPAWN_SNAKE, payload: {
            id,
            point: new Point(5, 5),
            direction: new Direction(Direction.RIGHT),
            color: 'blue'
        }});
        return id;
    }
    
    leave(id) {
        const found = this.players.indexOf(id);
        if (found !== -1) {
            this.state.applyEvent({ type: State.REMOVE_SNAKE, payload: { id }});
            this.players.splice(found, 1);
        }
    }

    playerTurn(id, direction) {
        this.state.applyEvent({ type: State.TURN_SNAKE, payload: { id, direction }});
    }

    init(grid) {
        const state = new State(grid || new Grid(20, 20));

        state.on('death', ({ id }) => {
            state.applyEvent({ type: State.SPAWN_SNAKE, payload: {
                id,
                point: new Point(5, 5),
                direction: new Direction(Direction.RIGHT),
                color: 'blue'
            }});
        });

        state.on('candy', ({ id, candy }) => {
            state.applyEvent({ type: State.REMOVE_CANDY, payload: { candy }});
            state.applyEvent({ type: State.GROW_SNAKE, payload: { id }});
            state.applyEvent({ type: State.SPAWN_CANDY, payload: {
                point: new Point(1, 2),
                color: 'red'
            }});
        });

        state.applyEvent({ type: State.SPAWN_CANDY, payload: {
            point: new Point(1, 2),
            color: 'red'
        }});

        this.state = state;
    }

    tick() {
        this.state.applyEvent({ type: State.UPDATE });
    }
};

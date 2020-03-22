module.exports = class Grid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
    }

    contains({ x, y }) {
        return x >= 0 && x < this.cols && y >= 0 && y < this.rows;
    }
};

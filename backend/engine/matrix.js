'use strict';

function createMatrix(rows, cols) {
    if (!Number.isInteger(rows) || rows <= 0) {
        throw new Error(`Invalid rows value ${rows}, must be a positive integer`);
    }
    if (!Number.isInteger(cols) || cols <= 0) {
        throw new Error(`Invalid cols value ${cols}, must be a positive integer`);
    }

    var matrix = [];

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(null);
        }
        matrix.push(row);
    }

    return {
        rows: () => {
            return rows;
        },

        cols: () => {
            return cols;
        },

        get: (x, y) => {
            if (!Number.isInteger(x) || x < 0 || x >= cols) {
                throw new Error(`Invalid x value ${x}, must be a positive integer less than ${cols}`);
            }
            if (!Number.isInteger(y) || y < 0 || y >= rows) {
                throw new Error(`Invalid y value ${y}, must be a positive integer less than ${rows}`);
            }

            return matrix[y][x];
        },

        set: (x, y, value) => {
            if (!Number.isInteger(x) || x < 0 || x >= cols) {
                throw new Error(`Invalid x value ${x}, must be a positive integer less than ${cols}`);
            }
            if (!Number.isInteger(y) || y < 0 || y >= rows) {
                throw new Error(`Invalid y value ${y}, must be a positive integer less than ${rows}`);
            }

            matrix[y][x] = value;
        },

        clone: () => {
            return matrix.map(r => r.slice(0));
        },

        print: () => {
            var maxlen = 3;

            for (let y = 0; y < rows; y++) {
                const row = matrix[y];
                for (let x = 0; x < cols; x++) {
                    const val = row[x];
                    if (val && val.length > maxlen) {
                        maxlen = val.length;
                    }
                }
            }

            console.log();
            for (let y = 0; y < rows; y++) {
                let line = "| ";
                const row = matrix[y];

                for (let x = 0; x < cols; x++) {
                    const val = row[x];

                    if (val) {
                        let padding = maxlen - val.length;
                        while (padding-- > 0) {
                            line += " ";
                        }
                        line += (val + " | ");
                    }
                    else {
                        let padding = maxlen + 2;
                        while (padding-- > 0) {
                            line += "-";
                        }

                        line += " | ";
                    }
                }
                console.log(line);
            }
        }
    }
}

module.exports = { 
    create: createMatrix
};
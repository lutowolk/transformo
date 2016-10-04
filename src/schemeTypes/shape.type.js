var SHAPE = require('../model.constants').SHAPE;

function shape(shape) {
    return {
        type: SHAPE,
        shape: shape
    }
}

module.exports = {
    shape: shape
};
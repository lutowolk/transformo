var FIELD = require('../model.constants').FIELD;

function field(options) {
    return {
        type: FIELD,
        options: options
    }
}

module.exports = {
    field: field
};
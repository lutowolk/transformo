var _ = require('lodash');

function bool() {
    var context = {
        type: 'bool',
        isTypeValid: _.isBoolean,
        isRequired: false,

        required: required,
        isValid: isValid
    };

    return context;

    ///////////

    function required() {
        context.isRequired = true;

        return context;
    }

    function isValid(value) {
        var isTypeValid = context.isTypeValid(value);

        if (!context.isRequired && (_.isNull(value) || _.isUndefined(value))) {
            return true;
        }

        return isTypeValid;
    }
}

module.exports = {
    bool: bool
};
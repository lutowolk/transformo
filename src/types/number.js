var _ = require('lodash');

function number() {
    var context = {
        type: 'number',
        isTypeValid: _.isNumber,
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
    number: number
};
var _ = require('lodash');

function string() {
    var context = {
        type: 'string',
        isTypeValid: _.isString,
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

        if (context.isRequired && _.isEmpty(value)) {
            return false;
        }

        return isTypeValid;
    }
}

module.exports = {
    string: string
};
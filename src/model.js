var _ = require('lodash');

var mapper = require('./model.helpers').mapper;
var getFields = require('./model.helpers').getFields;
var getErrors = require('./model.helpers').getErrors;

function model(scheme, source) {
    var privateScheme = scheme;
    var privateSource = source;

    var sourceValid = null;
    var errors = {};
    var modelData = {};

    var context = {
        valid: valid,
        invalid: invalid,
        isInvalid: isInvalid,
        isValid: isValid,
        data: data
    };

    return context;

    //////////

    function valid(callback) {
        if (isValid()) {
            modelData = mapper(privateScheme, privateSource);
        }

        callback(modelData);

        return context;
    }

    function invalid(callback) {
        var fields = getFields(privateScheme);

        errors = getErrors(fields, privateSource);
        sourceValid = _.isEmpty(errors);

        callback(errors);

        return context;
    }

    function isValid() {
        if (!_.isNull(sourceValid)) {
            return sourceValid;
        }

        var fields = getFields(privateScheme);

        errors = getErrors(fields, privateSource);
        sourceValid = _.isEmpty(errors);

        return sourceValid;
    }

    function isInvalid() {
        return !isValid();
    }

    function data() {
        if (isValid()) {
            modelData = mapper(privateScheme, privateSource);
        }

        return modelData;
    }
}

module.exports = {
    model: model,
};
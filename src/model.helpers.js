var _ = require('lodash');

var FIELD = require('./model.constants').FIELD;
var SHAPE = require('./model.constants').SHAPE;

function mapper(scheme, data) {
    var newObj = {};

    _.forIn(scheme, function (value, key) {
        newObj[key] = resolveSchemeType(value, data);
    });

    return newObj;
}

function getFields(object) {
    var fields = [];

    _.forIn(object, function (value) {
        if(value.type === SHAPE) {
            fields.push(getFields(value.shape));
        } else if (value.type === FIELD) {
            fields.push(value.options);
        }
    });

    return _.flatten(fields);
}

function resolveSchemeType(value, data) {
    switch (value.type) {
        case SHAPE:
            return handleShape(value.shape, data);
        case FIELD:
            return handleField(value.options, data);
        default:
            throw new Error('Unknown type')
    }
}

function handleField(field, data) {
    var sourceValue = getSourceValue(field, data);

    if (!sourceValue && field.defaultValue) {
        sourceValue = field.defaultValue;
    }

    if (_.isFunction(field.transform)) {
        return field.transform(sourceValue);
    }

    return sourceValue;
}

function handleShape(shape, data) {
    return mapper(shape, data);
}

function getSourceValue(field, data) {
    if (_.isFunction(field.getSourceValue)) {
        return field.getSourceValue(data);
    }

    return _.get(data, field.path);
}

function getErrors(fields, data) {
    var errors = [];

    _.forEach(fields, function (field) {
        var value = getSourceValue(field, data);

        if (!field.type.isValid(value)) {
            errors.push({
                path: field.path,
                message: 'invalid',
            })
        }
    });

    return errors;
}

module.exports = {
    mapper: mapper,
    resolveSchemeType: resolveSchemeType,
    handleField: handleField,
    handleShape: handleShape,
    getFields: getFields,
    getErrors: getErrors
};
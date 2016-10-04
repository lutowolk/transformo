var number = require('./types/number').number;
var string = require('./types/string').string;
var bool = require('./types/bool').bool;

var shape = require('./schemeTypes/shape.type').shape;
var field = require('./schemeTypes/field.type').field;

var model = require('./model').model;

module.exports = {
    formo: {
        number: number,
        string: string,
        bool: bool,

        shape: shape,
        field: field,

        model: model
    }
};
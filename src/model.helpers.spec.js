var expect = require('chai').expect;
var _ = require('lodash');

var getErrors = require('./model.helpers').getErrors;
var getFields = require('./model.helpers').getFields;
var handleField = require('./model.helpers').handleField;
var shape = require('./schemeTypes/shape.type').shape;
var field = require('./schemeTypes/field.type').field;
var number = require('./types/number').number;
var string = require('./types/string').string;

describe('Method getErrors', function () {
    it('should be return 1 error', function () {
        var fields = [
            {
                path: 'foo.id',
                type: number().required()
            }
        ];

        var data = {
            foo: {
                id: '0'
            }
        };

        expect(getErrors(fields, data).length).to.eql(1);
    });

    it('should be return 0 error for not required number', function () {
        var fields = [
            {
                path: 'foo.id',
                type: number()
            }
        ];

        var data = {
            foo: {}
        };

        expect(getErrors(fields, data).length).to.eql(0);
    });

    it('should be return 0 error valid integer id', function () {
        var fields = [
            {
                path: 'foo.id',
                type: number().required()
            }
        ];

        var data = {
            foo: {
                id: 0
            }
        };

        expect(getErrors(fields, data).length).to.eql(0);
    });

    it('should be return 1 error for 3 fields', function () {
        var fields = [
            {
                path: 'foo.id',
                type: number().required()
            },
            {
                path: 'foo.name',
                type: string().required()
            },
            {
                path: 'foo.status',
                type: number()
            }
        ];

        var data = {
            foo: {
                id: 0
            }
        };

        expect(getErrors(fields, data).length).to.eql(1);
    })
});

describe('Method getFields', function () {
    it('should be return 3 fields', function () {
        var dataScheme = {
            foo: shape({
                id: field({
                    path: 'to.some.field.id',
                    type: number().required()
                }),
                bar: shape({
                    name: field({
                        path: 'to.field.name',
                        type: string()
                    }),
                    description: field({
                        path: 'to.field.description',
                        type: string()
                    })
                })
            })
        };

        var expectedFields = getFields(dataScheme);

        expect(expectedFields.length).to.eql(3);
    });
});

describe('Method handleField', function () {
    it('should be return default value', function () {
        var field = {
            path: 'foo.name',
            type: string(),
            defaultValue: 'You'
        };

        var data = {
            foo: {}
        };

        expect(handleField(field, data)).to.eql('You');
    });

    it('should be return transform value', function () {
        var field = {
            path: 'foo.name',
            type: string(),
            transform: function (value) {
                return 'My name is ' + value;
            }
        };

        var data = {
            foo: {
                name: 'Monti'
            }
        };

        expect(handleField(field, data)).to.eql('My name is Monti');
    });

    it('should be return value from custom get function', function () {
        var field = {
            type: string(),
            getSourceValue: function (data) {
                return _.get(data, 'foo.undefinedField') || 'source';
            }
        };

        var data = {
            foo: {}
        };

        expect(handleField(field, data)).to.eql('source');
    });
});
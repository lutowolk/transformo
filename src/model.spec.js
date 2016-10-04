var _ = require('lodash');
var model = require('./model').model;

var number = require('./types/number').number;
var string = require('./types/string').string;
var bool = require('./types/bool').bool;

var scheme = {
    shape: require('./schemeTypes/shape.type').shape,
    field: require('./schemeTypes/field.type').field
};

describe('model', function () {
    var source = {};
    var shape = {};

    beforeEach(function () {
        source = {
            foo: {
                bar: {
                    id: 0,
                    name: 'Test'
                }
            }
        };

        shape = {
            newFoo: scheme.shape({
                id: scheme.field({
                    path: 'foo.bar.id',
                    type: number().required()
                }),
                name: scheme.field({
                    path: 'foo.bar.name',
                    type: string(),
                    defaults: 'Unknown'
                })
            })
        };
    });

    it('should return chainable object', function () {
        model(shape, source);
    });

    it('isValid should return true', function () {
        var valid = model(shape, source).isValid();

        expect(valid).toBe(true);
    });

    it('isInvalid should return false', function () {
        var invalid = model(shape, source).isInvalid();

        expect(invalid).toBe(false);
    });

    it('data should be return data', function () {
        var data = model(shape, source).data();

        expect(data).toEqual({
            newFoo: {
                id: 0,
                name: 'Test'
            }
        });
    });

    it('invalid method should be get 1 error', function () {
        var source = {
            foo: {}
        };

        model(shape, source)
            .invalid(function(errors) {
                expect(errors.length).toBe(1)
            });
    })
});
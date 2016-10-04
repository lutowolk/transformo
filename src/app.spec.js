var _ = require('lodash');
var formo = require('./app').formo;

describe('app', function () {
    it('should be return main methods', function () {
        expect(_.keys(formo)).toEqual([
            'number',
            'string',
            'bool',

            'shape',
            'field',

            'model'
        ]);
    })
});
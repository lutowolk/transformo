var _ = require('lodash');
var formo = require('./app').formo;
var chai = require('chai');
var expect = chai.expect;

describe('app', function () {
    it('should be return main methods', function () {
        expect(_.keys(formo)).to.eql([
            'number',
            'string',
            'bool',

            'shape',
            'field',

            'model'
        ]);
    })
});
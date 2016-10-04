var expect = require('chai').expect;
var bool = require('./bool').bool;

describe('Type bool', function () {
    it('should has correct type', function () {
        expect(bool().isValid(true)).to.be.true;
        expect(bool().isValid(false)).to.be.true;
    });

    it('should has incorrect type', function () {
        expect(bool().isValid(1)).to.be.false;
        expect(bool().isValid('1')).to.be.false;
    });

    it('should be correct if value is null or undefined and is not required', function () {
        expect(bool().isValid(undefined)).to.be.true;
        expect(bool().isValid(null)).to.be.true;
    });

    it('should be incorrect if value is required and has not bool type', function () {
        expect(bool().required().isValid(undefined)).to.be.false;
        expect(bool().required().isValid(null)).to.be.false;
    });

    it('should be correct if value is required and has bool type', function () {
        expect(bool().required().isValid(true)).to.be.true;
        expect(bool().required().isValid(false)).to.be.true;
    });
});
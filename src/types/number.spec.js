var expect = require('chai').expect;
var number = require('./number').number;

describe('Type number', function () {
    it('should has correct type', function () {
        expect(number().isValid(1)).to.be.true;
        expect(number().isValid(1.5)).to.be.true;
    });

    it('should has incorrect type', function () {
        expect(number().isValid('1')).to.be.false;
    });

    it('should be correct if value is null or undefined and is not required', function () {
        expect(number().isValid(undefined)).to.be.true;
        expect(number().isValid(null)).to.be.true;
    });

    it('should be incorrect if value is required and has not bool type', function () {
        expect(number().required().isValid(undefined)).to.be.false;
        expect(number().required().isValid(null)).to.be.false;
    });

    it('should be correct if required', function () {
        expect(number().required().isValid(1)).to.be.true;
        expect(number().required().isValid(0)).to.be.true;
    });
});
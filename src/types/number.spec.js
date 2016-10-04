var number = require('./number').number;

describe('Type number', function () {
    it('should has correct type', function () {
        expect(number().isValid(1)).toBe(true);
        expect(number().isValid(1.5)).toBe(true);
    });

    it('should has incorrect type', function () {
        expect(number().isValid('1')).toBe(false);
    });

    it('should be correct if value is null or undefined and is not required', function () {
        expect(number().isValid(undefined)).toBe(true);
        expect(number().isValid(null)).toBe(true);
    });

    it('should be incorrect if value is required and has not bool type', function () {
        expect(number().required().isValid(undefined)).toBe(false);
        expect(number().required().isValid(null)).toBe(false);
    });

    it('should be correct if required', function () {
        expect(number().required().isValid(1)).toBe(true);
        expect(number().required().isValid(0)).toBe(true);
    });
});
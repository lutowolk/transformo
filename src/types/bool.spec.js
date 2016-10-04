var bool = require('./bool').bool;

describe('Type bool', function () {
    it('should has correct type', function () {
        expect(bool().isValid(true)).toBe(true);
        expect(bool().isValid(false)).toBe(true);
    });

    it('should has incorrect type', function () {
        expect(bool().isValid(1)).toBe(false);
        expect(bool().isValid('1')).toBe(false);
    });

    it('should be correct if value is null or undefined and is not required', function () {
        expect(bool().isValid(undefined)).toBe(true);
        expect(bool().isValid(null)).toBe(true);
    });

    it('should be incorrect if value is required and has not bool type', function () {
        expect(bool().required().isValid(undefined)).toBe(false);
        expect(bool().required().isValid(null)).toBe(false);
    });

    it('should be correct if value is required and has bool type', function () {
        expect(bool().required().isValid(true)).toBe(true);
        expect(bool().required().isValid(false)).toBe(true);
    });
});
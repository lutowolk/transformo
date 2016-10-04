var string = require('./string').string;

describe('Type string', function () {
    it('should be correct', function () {
        expect(string().isValid('1')).toBe(true);
    });

    it('should be incorrect', function () {
        expect(string().isValid(1)).toBe(false);
    });

    it('should be incorrect if is not required and string is empty', function () {
        expect(string().required().isValid('')).toBe(false);
    });

    it('should be correct if value is null or undefined and is not required', function () {
        expect(string().isValid(undefined)).toBe(true);
        expect(string().isValid(null)).toBe(true);
    });

    it('should be incorrect if value is required and has not bool type', function () {
        expect(string().required().isValid(undefined)).toBe(false);
        expect(string().required().isValid(null)).toBe(false);
    });
    
    it('should be correct if is required', function () {
        expect(string().required().isValid('1')).toBe(true);
    });
});
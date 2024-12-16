const validateSearch = require('../../frontend/public/scripts/frontendValidation/validateSearch');

describe('validateSearch', () => {
    test('should throw an error if no parameters are provided', () => {
        expect(() => validateSearch(null, null, null)).toThrow('At least one search parameter must be provided');
    });

    test('should throw an error if distance is not a number', () => {
        expect(() => validateSearch('100', null, null)).toThrow('distance must be a number');
    });

    test('should throw an error if distance is out of range', () => {
        expect(() => validateSearch(-1, null, null)).toThrow('distance out of range');
        expect(() => validateSearch(501, null, null)).toThrow('distance out of range');
    });

    test('should throw an error if rating is not a number', () => {
        expect(() => validateSearch(null, '5', null)).toThrow('rating must be a number');
    });

    test('should throw an error if rating is out of range', () => {
        expect(() => validateSearch(null, 0, null)).toThrow('rating out of range');
        expect(() => validateSearch(null, 6, null)).toThrow('rating out of range');
    });

    test('should throw an error if tag is an empty string', () => {
        expect(() => validateSearch(null, null, '')).toThrow('tag cannot be empty string');
    });

    test('should throw an error if tag is not a valid format', () => {
        expect(() => validateSearch(null, null, 'invalid tag')).toThrow('tag must be a single alphanumeric term with optional dashes or underscores');
    });

    test('should pass for valid inputs', () => {
        expect(() => validateSearch(100, 5, 'valid_tag')).not.toThrow();
        expect(() => validateSearch(null, 5, 'valid-tag')).not.toThrow();
        expect(() => validateSearch(100, null, 'valid_tag')).not.toThrow();
        expect(() => validateSearch(100, 5, null)).not.toThrow();
    });
});
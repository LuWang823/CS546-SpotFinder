const verifyUpdateSpot = require('../../frontend/public/scripts/frontendValidation/validateUpdateSpot');

describe('verifyUpdateSpot', () => {
    test('should throw an error if name is not a string', () => {
        expect(() => verifyUpdateSpot(123, null, null, null, null, null)).toThrow('name must be string');
    });

    test('should throw an error if name length is invalid', () => {
        expect(() => verifyUpdateSpot('', null, null, null, null, null)).toThrow('invalid name length');
        expect(() => verifyUpdateSpot('a'.repeat(501), null, null, null, null, null)).toThrow('invalid name length');
    });

    test('should throw an error if hobby is not a string', () => {
        expect(() => verifyUpdateSpot(null, 123, null, null, null, null)).toThrow('hobby must be string');
    });

    test('should throw an error if hobby length is invalid', () => {
        expect(() => verifyUpdateSpot(null, '', null, null, null, null)).toThrow('invalid hobby length');
        expect(() => verifyUpdateSpot(null, 'a'.repeat(2001), null, null, null, null)).toThrow('invalid hobby length');
    });

    test('should throw an error if photo is not a string', () => {
        expect(() => verifyUpdateSpot(null, null, 123, null, null, null)).toThrow('photo must be string');
    });

    test('should throw an error if description is not a string', () => {
        expect(() => verifyUpdateSpot(null, null, null, 123, null, null)).toThrow('description must be string');
    });

    test('should throw an error if description length is invalid', () => {
        expect(() => verifyUpdateSpot(null, null, null, '', null, null)).toThrow('invalid description length');
        expect(() => verifyUpdateSpot(null, null, null, 'a'.repeat(2001), null, null)).toThrow('invalid description length');
    });

    test('should throw an error if latitude is not a number', () => {
        expect(() => verifyUpdateSpot(null, null, null, null, '40.7128', null)).toThrow('latitude must be number');
    });

    test('should throw an error if latitude is out of range', () => {
        expect(() => verifyUpdateSpot(null, null, null, null, -91, null)).toThrow('latitude out of range');
        expect(() => verifyUpdateSpot(null, null, null, null, 91, null)).toThrow('latitude out of range');
    });

    test('should throw an error if longitude is not a number', () => {
        expect(() => verifyUpdateSpot(null, null, null, null, null, '74.0060')).toThrow('longitude must be number');
    });

    test('should throw an error if longitude is out of range', () => {
        expect(() => verifyUpdateSpot(null, null, null, null, null, -181)).toThrow('longitude out of range');
        expect(() => verifyUpdateSpot(null, null, null, null, null, 181)).toThrow('longitude out of range');
    });

    test('should pass for valid inputs', () => {
        expect(() => verifyUpdateSpot('Park', 'Walking', 'photo.jpg', 'A nice park', 40.7128, -74.0060)).not.toThrow();
    });
});
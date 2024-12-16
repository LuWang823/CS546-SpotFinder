const verifySpot = require('../../frontend/public/scripts/frontendValidation/validateSpot');

describe('verifySpot', () => {
    test('should throw an error if any required field is missing', () => {
        expect(() => verifySpot()).toThrow('must include all required fields');
        expect(() => verifySpot('Park', 'Walking', 'photo.jpg', 'A nice park', 40.7128)).toThrow('must include all required fields');
    });

    test('should throw an error if name, hobby, or description are not strings', () => {
        expect(() => verifySpot(123, 'Walking', 'photo.jpg', 'A nice park', 40.7128, -74.0060)).toThrow('name, hobbies, and description must be strings');
        expect(() => verifySpot('Park', 123, 'photo.jpg', 'A nice park', 40.7128, -74.0060)).toThrow('name, hobbies, and description must be strings');
        expect(() => verifySpot('Park', 'Walking', 'photo.jpg', 123, 40.7128, -74.0060)).toThrow('name, hobbies, and description must be strings');
    });

    test('should throw an error if name, hobby, or description are empty strings', () => {
        expect(() => verifySpot('', 'Walking', 'photo.jpg', 'A nice park', 40.7128, -74.0060)).toThrow('cannot provide empty strings');
        expect(() => verifySpot('Park', '', 'photo.jpg', 'A nice park', 40.7128, -74.0060)).toThrow('cannot provide empty strings');
        expect(() => verifySpot('Park', 'Walking', 'photo.jpg', '', 40.7128, -74.0060)).toThrow('cannot provide empty strings');
    });

    test('should throw an error if latitude or longitude are not numbers', () => {
        expect(() => verifySpot('Park', 'Walking', 'photo.jpg', 'A nice park', '40.7128', -74.0060)).toThrow('latitude,longitude must be numbers');
        expect(() => verifySpot('Park', 'Walking', 'photo.jpg', 'A nice park', 40.7128, '-74.0060')).toThrow('latitude,longitude must be numbers');
    });

    test('should throw an error if latitude is out of range', () => {
        expect(() => verifySpot('Park', 'Walking', 'photo.jpg', 'A nice park', -91, -74.0060)).toThrow('latitude out of range');
        expect(() => verifySpot('Park', 'Walking', 'photo.jpg', 'A nice park', 91, -74.0060)).toThrow('latitude out of range');
    });

    test('should throw an error if longitude is out of range', () => {
        expect(() => verifySpot('Park', 'Walking', 'photo.jpg', 'A nice park', 40.7128, -181)).toThrow('longitude out of range');
        expect(() => verifySpot('Park', 'Walking', 'photo.jpg', 'A nice park', 40.7128, 181)).toThrow('longitude out of range');
    });

    test('should pass for valid inputs', () => {
        expect(() => verifySpot('Park', 'Walking', 'photo.jpg', 'A nice park', 40.7128, -74.0060)).not.toThrow();
    });
});
const verifyName = require('../../frontend/public/scripts/frontendValidation/name');

describe('verifyName', () => {
    test('should return true for valid names', () => {
        expect(verifyName('JohnDoe')).toBe(true);
        expect(verifyName('john_doe')).toBe(true);
        expect(verifyName('john123')).toBe(true);
        expect(verifyName('123john')).toBe(true);
        expect(verifyName('john')).toBe(true);
        expect(verifyName('j')).toBe(true);
        expect(verifyName('a'.repeat(50))).toBe(true);
    });

    test('should return false for invalid names', () => {
        expect(verifyName('')).toBe(false); // Empty string
        expect(verifyName('john doe')).toBe(false); // Space in name
        expect(verifyName('john@doe')).toBe(false); // Special character
        expect(verifyName('a'.repeat(51))).toBe(false); // More than 50 characters
        expect(verifyName('john-doe')).toBe(false); // Hyphen in name
    });
});
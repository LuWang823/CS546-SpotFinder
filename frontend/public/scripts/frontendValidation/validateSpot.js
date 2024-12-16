function verifySpot(name, hobby, photo, description, latitude, longitude) {
    if (name === undefined || hobby === undefined || photo === undefined || description === undefined || latitude === undefined || longitude === undefined) {
        throw new Error('must include all required fields');
    }

    if (typeof name !== 'string' || typeof hobby !== 'string' || typeof description !== 'string') {
        throw new Error('name, hobbies, and description must be strings');
    }

    if (name.trim() === '' || hobby.trim() === '' || description.trim() === '') {
        throw new Error('cannot provide empty strings');
    }

    name = name.trim();
    hobby = hobby.trim();
    description = description.trim();

    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
        throw new Error('latitude,longitude must be numbers');
    }

    if (latitude < -90 || latitude > 90) {
        throw new Error('latitude out of range');
    }

    if (longitude < -180 || longitude > 180) {
        throw new Error('longitude out of range');
    }

    // Regex to match alphanumeric terms with dashes or underscores, separated by spaces
    const regex = /^\s*[a-zA-Z0-9_-]+(?:\s+[a-zA-Z0-9_-]+)*\s*$/;
    if (!regex.test(hobby)) {
        throw new Error("hobbies needs to be in the format 'hobby1 hobby_2 hobb-3");
    }

    if (description.length > 2000 || description.length < 1) {
        throw new Error('invalid description length');
    }

    return true;
}

module.exports = verifySpot;
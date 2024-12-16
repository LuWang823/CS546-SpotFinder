function verifyUpdateSpot(name, hobby, photo, description, latitude, longitude) {
    let updateSpot = {};
    updateSpot['location'] = { coordinates: [null, null] };

    if (name != null) {
        if (typeof name !== 'string') {
            throw new Error('name must be string');
        }

        name = name.trim();

        if (name.length > 500 || name.length < 1) {
            throw new Error('invalid name length');
        }

        updateSpot['name'] = name;
    }

    if (hobby != null) {
        if (typeof hobby !== 'string') {
            throw new Error('hobby must be string');
        }

        hobby = hobby.trim();

        if (hobby.length > 2000 || hobby.length < 1) {
            throw new Error('invalid hobby length');
        }

        // Regex to match alphanumeric terms with dashes or underscores, separated by spaces
        const regex = /^\s*[a-zA-Z0-9_-]+(?:\s+[a-zA-Z0-9_-]+)*\s*$/;
        if (!regex.test(hobby)) {
            throw new Error("hobbies needs to be in the format 'hobby1 hobby_2 hobb-3");
        }

        hobby = hobby.split(' ');
        updateSpot['hobby'] = hobby;
    }

    if (photo != null) {
        if (typeof photo !== 'string') {
            throw new Error('photo must be string');
        }

        photo = photo.trim();
        updateSpot['photo'] = photo;
    }

    if (description != null) {
        if (typeof description !== 'string') {
            throw new Error('description must be string');
        }

        description = description.trim();

        if (description.length > 2000 || description.length < 1) {
            throw new Error('invalid description length');
        }

        updateSpot['description'] = description;
    }

    if (latitude != null) {
        if (typeof latitude !== 'number') {
            throw new Error('latitude must be number');
        }

        if (latitude < -90 || latitude > 90) {
            throw new Error('latitude out of range');
        }

        updateSpot['location']['coordinates'][1] = latitude;
    }

    if (longitude != null) {
        if (typeof longitude !== 'number') {
            throw new Error('longitude must be number');
        }

        if (longitude < -180 || longitude > 180) {
            throw new Error('longitude out of range');
        }

        updateSpot['location']['coordinates'][0] = longitude;
    }

    let emptyUpdate = {};
    emptyUpdate['location'] = { coordinates: [null, null] };
    if (JSON.stringify(updateSpot) === JSON.stringify(emptyUpdate)) {
        throw new Error('need to pass in at least one field');
    }

    return updateSpot;
}

module.exports = verifyUpdateSpot;
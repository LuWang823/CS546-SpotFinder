const validateStringField = (field, fieldName, maxLength) => {
    if (field != null) {
        if (typeof field !== 'string') {
            throw new Error(`${fieldName} must be string`);
        }

        field = field.trim();

        if (field.length > maxLength || field.length < 1) {
            throw new Error(`invalid ${fieldName} length`);
        }

        return field;
    }
    return null;
};

const validateCoordinates = (coordinate, type) => {
    if (coordinate != null) {
        if (typeof coordinate !== 'number') {
            throw new Error(`${type} must be number`);
        }
        if (type === 'latitude' && (coordinate < -90 || coordinate > 90)) {
            throw new Error('latitude out of range');
        }
        if (type === 'longitude' && (coordinate < -180 || coordinate > 180)) {
            throw new Error('longitude out of range');
        }
        return coordinate;
    }
    return null;
};

const validateAndAssignField = (field, fieldName, maxLength, updateSpot) => {
    const validatedField = validateStringField(field, fieldName, maxLength);
    if (validatedField) {
        updateSpot[fieldName] = validatedField;
    }
};

function verifyUpdateSpot(name, hobby, photo, description, latitude, longitude) {
    let updateSpot = { location: { coordinates: [null, null] } };

    // Validate and assign fields
    validateAndAssignField(name, 'name', 500, updateSpot);
    validateAndAssignField(photo, 'photo', 500, updateSpot);
    validateAndAssignField(description, 'description', 2000, updateSpot);

    if (hobby != null) {
        const validatedHobby = validateStringField(hobby, 'hobby', 2000);
        const regex = /^\s*[a-zA-Z0-9_-]+(?:\s+[a-zA-Z0-9_-]+)*\s*$/;
        if (!regex.test(validatedHobby)) {
            throw new Error("hobbies needs to be in the format 'hobby1 hobby2 hobby3");
        }
        updateSpot['hobby'] = validatedHobby.split(' ');
    }

    const validatedLatitude = validateCoordinates(latitude, 'latitude');
    if (validatedLatitude !== null) updateSpot['location']['coordinates'][1] = validatedLatitude;

    const validatedLongitude = validateCoordinates(longitude, 'longitude');
    if (validatedLongitude !== null) updateSpot['location']['coordinates'][0] = validatedLongitude;

    if (JSON.stringify(updateSpot) === JSON.stringify({ location: { coordinates: [null, null] } })) {
        throw new Error('need to pass in at least one field');
    }

    return updateSpot;
}

module.exports = verifyUpdateSpot;

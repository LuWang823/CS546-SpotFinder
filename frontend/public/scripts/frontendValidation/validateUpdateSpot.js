function verifyUpdateSpot(name, hobby, photo, description, latitude, longitude) {
    let updateSpot = {};
    updateSpot['location'] = {coordinates : [null,null]};
    if (name != null && name.trim() !== '') {
        if (typeof name !== 'string') {
            throw new Error('name must be string');
        }

        name = name.trim();

        if (name.length > 500 && name.length < 1) {
            throw new Error('invalid name length');
        }

        updateSpot['name'] = name;
    }

    if (hobby != null && hobby.trim() !== '') {
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
            throw new Error("hobbies needs to be in the format 'hobby1 hobby_2 hobb-3")
        }

        hobby = hobby.split(' ');
        updateSpot['hobby'] = hobby;
    }

    if (description != null && description.trim() !== '') {
        if (typeof description !== 'string') {
            throw new Error('description must be string');
        }

        description = description.trim();

        if (description.length > 2000 || description.length < 1) {
            throw new Error('invalid description length');
        }
        updateSpot['description'] = description;
    }

    if(longitude != null && longitude !== 0){
        if (typeof longitude !== 'number') {
            throw new Error('latitude,longitude must be numbers');
        }
        if (longitude < -180 || longitude > 180) {
            throw new Error('longitude out of range');
        }

        updateSpot['location']['coordinates'][0] = longitude;
    }

    if(latitude != null && longitude !== 0){
        if (typeof latitude !== 'number') {
            throw new Error('latitude,longitude must be numbers');
        }
    
        if (latitude < -90 || latitude > 90) {
            throw new Error('latitude out of range');
        }

        updateSpot['location']['coordinates'][1] = latitude;
    }
    
    if(photo != null){
        updateSpot['image'] = photo;
    }


    let emptyUpdate = {};
    emptyUpdate['location'] = {coordinates : [null,null]};
    if(JSON.stringify(updateSpot) === JSON.stringify(emptyUpdate)){
        throw new Error('need to pass in at least one field')
    }

    return updateSpot;
}
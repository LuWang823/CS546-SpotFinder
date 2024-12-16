function validateSearch(distance, rating, tag) {
    // if (distance == null && rating == null && tag == null) {
    //     throw new Error('At least one search parameter must be provided');
    // }
    if (distance !== null) {
        if (typeof distance !== 'number') {
            throw new Error('distance must be a number')
        }
        if (distance <= 0 || distance > 500) {
            throw new Error('distance out of range')
        }
    }

    if (rating !== null) {
        if (typeof rating !== 'number') {
            throw new Error('rating must be a number')
        }
        if (rating < 1 || rating > 5) {
            throw new Error('rating out of range')
        }
    }

    if (tag !== null) {
        if(tag.trim() === ''){
            throw new Error('tag cannot be empty string')
        }
        tag = tag.trim()
        const regex = /^\s*[a-zA-Z0-9_-]+\s*$/;
        if (!regex.test(tag)) {
            throw new Error("tag must be a single alphanumeric term with optional dashes or underscores");
        }
    }
}

module.exports = validateSearch;
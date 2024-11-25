function verifyName(name) {
    const usernameRegex = /^[a-zA-Z0-9_]{1,50}$/;
    return usernameRegex.test(name);
}

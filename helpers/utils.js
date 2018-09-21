const checkObject = (object, keysRequired, valueSatisfier) => {
    for (let key of keysRequired) {
        if (typeof object[key] === 'undefined' || !valueSatisfier(object[key])) {
            return false;
        }
    }

    return true;
};
const normalizePort = (value) => {
    let port = parseInt(value, 10);

    if (isNaN(port)) {
        return value;
    } else if (port >= 0) {
        return port;
    }

    return false;
};

module.exports = {
    checkObject,
    normalizePort
};
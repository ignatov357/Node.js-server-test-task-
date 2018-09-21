const checkObject = function(object, keysRequired, valueSatisfier) {
	for(let key of keysRequired) {
		if(typeof object[key] === 'undefined' || !valueSatisfier(object[key])) {
			return false;
		}
	}

	return true;
};

module.exports = {checkObject};
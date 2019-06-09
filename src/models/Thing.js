class Thing {

	constructor (opts) {
		Object.keys(opts).forEach(key => {
			this[key] = opts[key];
		});
	}

}

module.exports = Thing;

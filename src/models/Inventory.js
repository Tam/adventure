const Thing = require('./Thing');

class Inventory extends Thing {

	items = {};

	has (handle) {
		return ~Object.keys(this.items).indexOf(handle);
	}

	add (item) {
		// TODO: this
	}

	remove (item) {
		// TODO: this
	}

}

module.exports = Inventory;

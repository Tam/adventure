const Room = require('../src/models/Room')
	, Item = require('../src/models/Item');

module.exports = ({ player }) => ({
	title: 'Dungeon!',

	player: {
		room: 'house_front',
		inventory: {},
	},

	items: {
		leaflet: new Item({
			name: 'Leaflet',
			description: 'A leaflet',
			takeable: true,
			actions: {
				look: 'A leaflet',
				read: () => player.inventory.has('leaflet') ? `
Welcome to Dungeon!

Dungeon is a game of adventure, danger, and low cunning.  In it
you will explore some of the most amazing territory ever seen by mortal
man.  Hardened adventurers have run screaming from the terrors contained
within.

In Dungeon, the intrepid explorer delves into the forgotten secrets
of a lost labyrinth deep in the bowels of the earth, searching for
vast treasures long hidden from prying eyes, treasures guarded by
fearsome monsters and diabolical traps!
				` : 'You can\'t read what you aren\'t holding!',
			},
		}),
	},

	interactables: {
		//
	},

	map: {
		house_front: new Room({
			name: 'Front of the house',
			description: 'You are in an open field west of a big white house with a boarded front door.\nThere is a small mailbox here.',
			interactables: {
				mailbox: {
					name: 'Mailbox',
					description: self => self.state.open ? self.inventory.has('leaflet') ? 'An open mailbox, there is a leaflet inside.' : 'An empty mailbox.' : 'A box. It holds mail.',
					state: {
						open: false,
					},
					inventory: {
						leaflet: 'leaflet',
					},
				},
			},
			exits: {
				west: 'house_entrance',
			},
		}),
		house_entrance: new Room({
			//...
		}),
	},
});

const path = require('path')
	, fs = require('fs')
	, nlp = require('compromise');

const Thing = require('./models/Thing');

nlp.plugin({
	words: {
		'throw': 'Verb',
		'chuck': 'Verb',
		'cast': 'Verb',
		'lob': 'Verb',
	},
});

const VERB_TO_ACTION = { // TODO: Could this be part of compromise?
	'take': 'take',
	'steal': 'take',
	'snatch': 'take',
	'grab': 'take',
	'swipe': 'take',
	'pick up': 'take',
};

!function () {
	// 1. Load Game
	const args = process.argv;

	if (args.length === 0) {
		console.log('You must pass the path to a game as the first argument!');
		return;
	}

	let gamePath = args[args.length - 1];
	if (!path.isAbsolute(gamePath))
		gamePath = path.join(process.cwd(), gamePath);

	if (!fs.existsSync(gamePath)) {
		console.log('Unable to find game "' + gamePath + '"');
		return;
	}

	const gameData = {
		player: {},
		activeRoom: null,
	};
	const game = require(gamePath)(gameData);
	// TODO: validate game
	// TODO: build game by giving each object a reference to its __parent, and
	//  use a proxy to ensure that any newly created objects are given __parent
	// TODO: Do the same as __parent for __room on Things (or null if no room)
	// TODO: If things are referenced by their name (as in the leaflet item in
	//  the mailbox), clone them into that location.
	gameData.player = {
		...gameData.player,
		...game.player,
	};

	function say (thing) {
		if (typeof thing === typeof 'String') {
			console.log(thing);
			return;
		}

		let self = thing;
		while (!(self instanceof Thing))
			self = self.__parent;

		const room = self.__room;

		console.log(thing(self, room));
	}

	// 2. Start game
	say(game.title);
	gameData.activeRoom = game.map[gameData.player.room];
	say(gameData.activeRoom.description);

	// 3. Handle user input
	const stdin = process.openStdin();
	stdin.addListener('data', d => {
		const input = d.toString().trim();

		const actions = nlp(input).match('#Conjunction #Adverb? #Verb');
		console.log(actions.out('array'));
	});
}();

// quickly take the ogres large cake and fork and then throw it at him

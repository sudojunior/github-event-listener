const fetch = require('node-fetch');
const fs = require('fs/promises');

let lastETag = "";

(async () => {
	const handlerFiles = await fs.readdir("./src/handlers");
	/** @type {import('./structures/EventHandler')[]} */
	const handlers = handlerFiles.map(file => {
		let Handler;
		try {
			Handler = require(`./handlers/${file}`);
		} catch (e) {
			console.error(`[INIT_ERROR] ${file} does not provide an export`);
			return null;
		}
		return Handler.prototype ? new Handler() : null;
	}).filter(Boolean);

	const runSequence = async () => {
		/** @type {object[]} */
		let events = await fetch("https://api.github.com/events", {

		}).then(res => res.json());

		events.forEach(async event => {
			let handlerIndex = handlers.findIndex(handler => handler.type === event.type);
			if (handlerIndex < 0) {
				console.log(`[${event.type}] unhandled event type`);
			} else {
				await handlers[handlerIndex].handle(event);
			}
		});
	};

	await runSequence();

	setInterval(runSequence.bind(this), 60000);
})();
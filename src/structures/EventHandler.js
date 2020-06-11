class EventHandler {
	constructor(eventType) {
		this.type = eventType || this.constructor.name; // default to class name
	}

	async handle() {
		throw new Error("Method not implemented.");
	}

	log(...args) {
		console.log(...args);
	}
}

module.exports = EventHandler;
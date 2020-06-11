const EventHandler = require("../structures/EventHandler");

class ForkEvent extends EventHandler {
	handle(event) {
		const actorLogin = event.actor.login;
		const repoName = event.repo.name;

		this.log(`[${event.id}|fork@${event.created_at}] ${repoName} | ${actorLogin}`);
	}
}

module.exports = ForkEvent;
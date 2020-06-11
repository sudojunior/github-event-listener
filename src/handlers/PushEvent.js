const EventHandler = require("../structures/EventHandler");

class PushEvent extends EventHandler {
	handle(event) {
		const loginName = event.actor.login;
		const repoName = event.repo.name;
		const { ref, head, before, push_id } = event.payload;

		this.log(`[${push_id}|push@${event.created_at}] ${repoName} | @${loginName} | ${ref}@${before.substr(0, 6)}...${head.substr(0, 6)}`);
	}
}

module.exports = PushEvent;
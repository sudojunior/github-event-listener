const EventHandler = require("../structures/EventHandler");

class IssueCommentEvent extends EventHandler {
	handle(event) {
		const actorLogin = event.actor.login;
		const repoName = event.repo.name;
		const { number, title } = event.payload.issue;

		const { id, created_at, author_association } = event.payload.comment

		this.log(`[${id}|issue-comment@${created_at}] ${repoName} | @${actorLogin}:${author_association} / #${number}, ${title}`);
	}
}

module.exports = IssueCommentEvent;
import {Injectable} from "@nestjs/common";
import {BotConfigService} from "../common/config/bot.config";
import {BotRepliesService} from "../common/config/bot.replies";

@Injectable()
export class GreetingService {
    constructor(private readonly botConfigService: BotConfigService,
                private readonly botRepliesService: BotRepliesService) {}
    async startReply() {
        return this.botRepliesService.startReply;
    }

    helpReply(): string {
        return this.botRepliesService.helpReply;
    }

    linksReply(): string {
        const {githubLink, linkedinLink} = this.botConfigService.links;
        return this.botRepliesService.linksReply.replace('{{GITHUB_LINK}}', githubLink).replace('{{LINKEDIN_LINK}}', linkedinLink);
    }

    aboutReply(): string {
        return this.botRepliesService.aboutReply;
    }
}
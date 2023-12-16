import {Command, Update} from "nestjs-telegraf";
import {GreetingService} from "./greeting.service";

@Update()
export class GreetingUpdate {
    constructor(private readonly greetingService: GreetingService) {}

    @Command('start')
    onStartCommand(): string {
        return this.greetingService.startReply();
    }

    @Command('help')
    onHelpCommand(): string {
        return this.greetingService.helpReply();
    }

    @Command('links')
    onLinksCommand(): string {
        return this.greetingService.linksReply();
    }

    @Command('about')
    onAboutCommand(): string {
        return this.greetingService.aboutReply();
    }
}
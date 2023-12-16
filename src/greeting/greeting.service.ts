import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class GreetingService {
    constructor(private readonly configService: ConfigService) {}
    startReply(): string {
        return "Hello, unexpected user, I'm very useful bot. If you want to see what I can do, provide command /help.";
    }

    helpReply(): string {
        return "Very glad of your interest, look then: \n" +
            "/start - Greetings from me, nothing special\n" +
            "/help - Since you read this you, probably, already know what does it do, but i must explain it. Here you can see a list of tasks i can do.\n" +
            "/links - Here you can see links to the profiles of my creator and owner\n" +
            "/about - Here you can see some information about my creator\n" +
            "/holiday - Here you can get information about today's holidays in different countries" +
            "/subscribe - here you can subscribe on daily weather notification by polish time" +
            "/unsubscribe - here you can unsubscribe the daily notifications" +
            "you can also share your location and i will send you current weather information";
    }

    linksReply(): string {
        const githubLink = this.configService.get('GITHUB_LINK');
        const linkedinLink = this.configService.get('LINKEDIN_LINK');
        return `Here GitHub:\n${githubLink}\nand LinkedIn:\n${linkedinLink}`;
    }

    aboutReply(): string {
        return "My name is Andrew. I'm from Odessa. Last 8 years living in Poland and learning programming.";
    }
}
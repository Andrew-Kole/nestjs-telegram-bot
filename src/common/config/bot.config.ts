import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class BotConfigService {
    constructor(private configService: ConfigService) {}

    get links() {
        const githubLink = this.configService.get('GITHUB_LINK');
        const linkedinLink = this.configService.get('LINKEDIN_LINK');
        return {githubLink, linkedinLink};
    }

    get repliesPath() {
        return this.configService.get('REPLIES_PATH');
    }

    get ourChat() {
        return this.configService.get('OUR_CHAT');
    }

    get telegramBotToken() {
        return this.configService.get('TELEGRAM_BOT_TOKEN');
    }

    get memeUrl() {
        return this.configService.get('MEME_API_URL');
    }

    get abstractApiUrlAndToken() {
        const apiUrl = this.configService.get('ABSTRACT_API_URL');
        const apiKey = this.configService.get('ABSTRACT_API_KEY');
        return {apiUrl, apiKey};
    }

    get timeExpired() {
        return 60000;
    }

    get openWeatherUrlAndToken() {
        const apiUrl = this.configService.get('OPEN_WEATHER_API_URL');
        const apiKey = this.configService.get('OPEN_WEATHER_API_KEY');
        return {apiUrl, apiKey};
    }
}
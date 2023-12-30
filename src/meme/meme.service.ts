import {Injectable} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {BotConfigService} from "../common/config/bot.config";

@Injectable()
export class MemeService{
    constructor(
        private readonly httpService: HttpService,
        private readonly botConfigService: BotConfigService,
    ) {}

    getMeme() {
        const apiUrl = this.botConfigService.memeUrl;
        return this.httpService.get(apiUrl).toPromise();
    }
}
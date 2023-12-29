import {Injectable} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {BotConfigService} from "../common/config/bot.config";

@Injectable()
export class HolidayService {
    constructor(
        private readonly botConfigService: BotConfigService,
        private readonly httpService: HttpService,
    ) {}

    getHolidays(countryCode: string) {
        const {apiUrl, apiKey} = this.botConfigService.abstractApiUrlAndToken;
        const currentDate = new Date();
        const options = {
            params: {
                api_key: apiKey,
                country: countryCode,
                year: currentDate.getFullYear(),
                month: currentDate.getMonth() + 1,
                day: currentDate.getDate(),
            },
        };
        return this.httpService.get(apiUrl, options).toPromise();
    }
}
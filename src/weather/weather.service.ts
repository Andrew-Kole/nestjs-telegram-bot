import {Injectable} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {BotConfigService} from "../common/config/bot.config";

@Injectable()
export class WeatherService {
    constructor(
        private readonly httpService: HttpService,
        private readonly botConfigService: BotConfigService,
    ) {}

    getWeather(latitude, longitude) {
        const {apiUrl, apiKey} = this.botConfigService.openWeatherUrlAndToken;
        const options = {
            params: {
                appid: apiKey,
                lat: latitude,
                lon: longitude,
            }
        };
        return this.httpService.get(apiUrl, options).toPromise();
    }
}
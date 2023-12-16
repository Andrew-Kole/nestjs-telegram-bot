import {Injectable} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class WeatherService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    getWeather(latitude, longitude) {
        const apiUrl = this.configService.get('OPEN_WEATHER_API_URL');
        const apiKey = this.configService.get('OPEN_WEATHER_API_KEY');
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
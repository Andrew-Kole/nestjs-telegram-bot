import {Message, On, Update} from "nestjs-telegraf";
import {WeatherService} from "./weather.service";
import {temperatureConvert} from "../common/utils/temperature.convert";
import {BotRepliesService} from "../common/config/bot.replies";


@Update()
export class WeatherUpdate {
    constructor(
        private readonly weatherService: WeatherService,
        private readonly botRepliesService: BotRepliesService,
    ) {}

    @On('location')
    async onLocation(@Message() msg) {
        const latitude = msg.location.latitude;
        const longitude = msg.location.longitude;
        const res = await this.weatherService.getWeather(latitude, longitude);
        const weather = res.data;
        return this.botRepliesService.weatherCommandReply.replace('{{description}}', weather.weather[0].description).replace('{{temperature}}', temperatureConvert(weather.main.temp));
    }
}
import {Injectable} from "@nestjs/common";
import {WeatherService} from "../weather/weather.service";
import {SubscriptionService} from "./subscription.service";
import {Cron, CronExpression} from "@nestjs/schedule";
import {Telegram} from "telegraf";
import {ConfigService} from "@nestjs/config";


@Injectable()
export class WeatherCronService {
    constructor(
        private readonly weatherService: WeatherService,
        private readonly subscriptionService: SubscriptionService,
        private readonly configService: ConfigService,
    ) {}

    @Cron(CronExpression.EVERY_MINUTE)
    async handleCron(){
        const currentTime = new Date().toLocaleTimeString('pl-PL', {hour12: false, hour: '2-digit', minute: '2-digit'});
        const users = await this.subscriptionService.getByTime(currentTime);
        for (const user of users) {
            const telegram = new Telegram(await this.configService.get('TELEGRAM_BOT_TOKEN'));
            const latitude = user.latitude;
            const longitude = user.longitude;
            const res = await this.weatherService.getWeather(latitude, longitude);
            const weatherDescription = res.data.weather[0].description;
            const temperature = Math.round(res.data.main.temp - 273.15)
            const message = `Your weather for today:\nDescription${weatherDescription}\nTemperature:${temperature}°C. Have a nice day!`
            await telegram.sendMessage(user.chatId, message);
        }
    }
}
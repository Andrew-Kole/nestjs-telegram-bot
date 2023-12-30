import {Injectable} from "@nestjs/common";
import {WeatherService} from "../weather/weather.service";
import {SubscriptionService} from "./subscription.service";
import {Cron, CronExpression} from "@nestjs/schedule";
import {Telegram} from "telegraf";
import {temperatureConvert} from "../common/utils/temperature.convert";
import {BotConfigService} from "../common/config/bot.config";
import {BotRepliesService} from "../common/config/bot.replies";


@Injectable()
export class WeatherCronService {
    constructor(
        private readonly weatherService: WeatherService,
        private readonly subscriptionService: SubscriptionService,
        private readonly botConfigService: BotConfigService,
        private readonly botRepliesService: BotRepliesService,
    ) {}

    @Cron(CronExpression.EVERY_MINUTE)
    async handleCron(){
        const currentTime = new Date().toLocaleTimeString('pl-PL', {hour12: false, hour: '2-digit', minute: '2-digit'});
        const users = await this.subscriptionService.getByTime(currentTime);
        for (const user of users) {
            const telegram = new Telegram(await this.botConfigService.telegramBotToken);
            const latitude = user.latitude;
            const longitude = user.longitude;
            const res = await this.weatherService.getWeather(latitude, longitude);
            const weatherDescription = res.data.weather[0].description;
            const temperature = temperatureConvert(res.data.main.temp);
            const message = this.botRepliesService.weatherCronReply.replace('{{weatherDescription}}', weatherDescription).replace('{{temperature}}', temperature);
            await telegram.sendMessage(user.chatId, message);
        }
    }
}
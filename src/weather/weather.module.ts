import { Module } from '@nestjs/common';
import {HttpModule} from "@nestjs/axios";
import {WeatherUpdate} from "./weather.update";
import {WeatherService} from "./weather.service";
import {BotRepliesService} from "../common/config/bot.replies";
import {BotConfigService} from "../common/config/bot.config";

@Module({
    imports: [HttpModule],
    providers: [WeatherUpdate, WeatherService, BotRepliesService, BotConfigService],
    exports: [WeatherService],
})
export class WeatherModule {}

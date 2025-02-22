import { Module } from '@nestjs/common';
import {SubscriptionService} from "./subscription.service";
import {SubscriptionWizard} from "./subscription.wizard";
import {SubscriptionUpdate} from "./subscription.update";
import {WeatherService} from "../weather/weather.service";
import {HttpModule} from "@nestjs/axios";
import {MongooseModule} from "@nestjs/mongoose";
import {Subscription, SubscriptionSchema} from "./subscription.schema";
import {WeatherCronService} from "./weather.cron.service";
import {BotRepliesService} from "../common/config/bot.replies";
import {BotConfigService} from "../common/config/bot.config";

@Module({
    imports: [
        HttpModule,
        MongooseModule.forFeature([
            {
                name: Subscription.name,
                schema: SubscriptionSchema,
            },
        ]),
    ],
    providers: [SubscriptionService, SubscriptionWizard, SubscriptionUpdate, WeatherService, WeatherCronService, BotRepliesService, BotConfigService],
})
export class SubscriptionModule {}

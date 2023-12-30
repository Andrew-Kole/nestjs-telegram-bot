import { Module } from '@nestjs/common';
import {GreetingService} from "./greeting.service";
import {GreetingUpdate} from "./greeting.update";
import {BotConfigService} from "../common/config/bot.config";
import {BotRepliesService} from "../common/config/bot.replies";

@Module({
    providers: [GreetingService, GreetingUpdate, BotConfigService, BotRepliesService],
})
export class GreetingModule {}

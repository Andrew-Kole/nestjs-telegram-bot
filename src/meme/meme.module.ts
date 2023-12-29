import { Module } from '@nestjs/common';
import {HttpModule} from "@nestjs/axios";
import {MemeService} from "./meme.service";
import {MemeUpdate} from "./meme.update";
import {MemeCronService} from "./meme.cron.service";
import {BotConfigService} from "../common/config/bot.config";
import {BotRepliesService} from "../common/config/bot.replies";

@Module({
    imports: [HttpModule],
    providers: [MemeService, MemeUpdate, MemeCronService, BotConfigService, BotRepliesService],
})
export class MemeModule {}

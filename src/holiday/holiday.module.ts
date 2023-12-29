import { Module } from '@nestjs/common';
import {HttpModule} from "@nestjs/axios";
import {HolidayService} from "./holiday.service";
import {HolidayUpdate} from "./holiday.update";
import {HolidayScene} from "./holiday.scene";
import {BotConfigService} from "../common/config/bot.config";
import {BotRepliesService} from "../common/config/bot.replies";

@Module({
    imports: [HttpModule],
    providers: [HolidayService, HolidayUpdate, HolidayScene, BotConfigService, BotRepliesService],
})
export class HolidayModule {}

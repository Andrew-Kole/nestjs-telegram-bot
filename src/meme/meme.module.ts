import { Module } from '@nestjs/common';
import {HttpModule} from "@nestjs/axios";
import {MemeService} from "./meme.service";
import {MemeUpdate} from "./meme.update";
import {MemeCronService} from "./meme.cron.service";

@Module({
    imports: [HttpModule],
    providers: [MemeService, MemeUpdate, MemeCronService],
})
export class MemeModule {}

import { Module } from '@nestjs/common';
import {HttpModule} from "@nestjs/axios";
import {HolidayService} from "./holiday.service";
import {HolidayUpdate} from "./holiday.update";
import {HolidayScene} from "./holiday.scene";

@Module({
    imports: [HttpModule],
    providers: [HolidayService, HolidayUpdate, HolidayScene],
})
export class HolidayModule {}

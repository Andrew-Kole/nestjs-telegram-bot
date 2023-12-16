import { Module } from '@nestjs/common';
import {HttpModule} from "@nestjs/axios";
import {WeatherUpdate} from "./weather.update";
import {WeatherService} from "./weather.service";

@Module({
    imports: [HttpModule],
    providers: [WeatherUpdate, WeatherService],
    exports: [WeatherService],
})
export class WeatherModule {}

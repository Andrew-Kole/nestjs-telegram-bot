import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TelegrafModule} from "nestjs-telegraf";
import {sessionMiddleware} from "./common/middleware/session.middleware";
import { GreetingModule } from './greeting/greeting.module';
import { HolidayModule } from './holiday/holiday.module';
import { WeatherModule } from './weather/weather.module';
import { SubscriptionModule } from './subscription/subscription.module';
import {MongooseModule} from "@nestjs/mongoose";
import {ScheduleModule} from "@nestjs/schedule";
import { MemeModule } from './meme/meme.module';

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
      }),
      TelegrafModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
              token: configService.get('TELEGRAM_BOT_TOKEN'),
              middlewares: [sessionMiddleware],
          }),
          inject: [ConfigService],
      }),
      MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
              uri: configService.get('MONGO_URI'),
          }),
          inject: [ConfigService],
      }),
      ScheduleModule.forRoot(),
      GreetingModule,
      HolidayModule,
      WeatherModule,
      SubscriptionModule,
      MemeModule,
  ],
})
export class AppModule {}

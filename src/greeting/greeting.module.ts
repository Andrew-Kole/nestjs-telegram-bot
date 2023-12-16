import { Module } from '@nestjs/common';
import {GreetingService} from "./greeting.service";
import {GreetingUpdate} from "./greeting.update";

@Module({
    providers: [GreetingService, GreetingUpdate],
})
export class GreetingModule {}

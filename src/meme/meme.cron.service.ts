import {Injectable} from "@nestjs/common";
import {MemeService} from "./meme.service";
import {Cron, CronExpression} from "@nestjs/schedule";
import {Telegram} from "telegraf";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class MemeCronService {
    constructor(
        private readonly memeService: MemeService,
        private readonly configService: ConfigService,
    ) {}

    @Cron(CronExpression.EVERY_30_MINUTES)
    async handleCron() {
        const chatId = this.configService.get('OUR_CHAT');
        const telegram = new Telegram(await this.configService.get('TELEGRAM_BOT_TOKEN'));
        try {
            const memeData = await this.memeService.getMeme();
            await telegram.sendPhoto(chatId, memeData.data.url);
        }
        catch (error) {
            await telegram.sendMessage(chatId, 'Failed to get meme');
        }
    }
}
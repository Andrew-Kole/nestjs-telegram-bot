import {Injectable} from "@nestjs/common";
import {MemeService} from "./meme.service";
import {Cron, CronExpression} from "@nestjs/schedule";
import {Telegram} from "telegraf";
import {BotConfigService} from "../common/config/bot.config";
import {BotRepliesService} from "../common/config/bot.replies";

@Injectable()
export class MemeCronService {
    constructor(
        private readonly memeService: MemeService,
        private readonly botConfigService: BotConfigService,
        private readonly botRepliesService: BotRepliesService,
    ) {}

    @Cron(CronExpression.EVERY_30_MINUTES)
    async handleCron() {
        const chatId = this.botConfigService.ourChat;
        const telegram = new Telegram(this.botConfigService.telegramBotToken);
        try {
            const memeData = await this.memeService.getMeme();
            await telegram.sendPhoto(chatId, memeData.data.url);
        }
        catch (error) {
            await telegram.sendMessage(chatId, this.botRepliesService.memeErrorReply);
        }
    }
}
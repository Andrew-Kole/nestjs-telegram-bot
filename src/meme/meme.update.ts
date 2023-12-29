import {Command, Ctx, Update} from "nestjs-telegraf";
import {MemeService} from "./meme.service";
import {Context} from "telegraf";
import {BotRepliesService} from "../common/config/bot.replies";

@Update()
export class MemeUpdate {
    constructor(
        private readonly memeService: MemeService,
        private readonly botRepliesService: BotRepliesService,
    ) {}

    @Command('meme')
    async onRandomMemeCommand(@Ctx() ctx: Context){
        try{
            const memeData = await this.memeService.getMeme();
            await ctx.replyWithPhoto(memeData.data.url);
        }
        catch (error){
            await ctx.reply(this.botRepliesService.memeErrorReply);
        }
    }
}
import {Command, Ctx, Update} from "nestjs-telegraf";
import {Context} from "telegraf";
import {SubscriptionService} from "./subscription.service";
import {BotRepliesService} from "../common/config/bot.replies";

@Update()
export class SubscriptionUpdate {
    constructor(
        private readonly subscriptionService: SubscriptionService,
        private readonly botRepliesService: BotRepliesService,
    ) {}
    @Command('subscribe')
    async onSubscribeCommand(@Ctx() ctx: Context){
        const userId = ctx.from.id;
        const username = ctx.from.username;
        const chatId = ctx.chat.id;
        const isSubscribed = await this.subscriptionService.isSubscribed(chatId, userId);
        if(isSubscribed){
            return this.botRepliesService.alreadySubscribedReply.reply('{{username}}', username);
        }
        await ctx['scene'].enter('subscription');
    }

    @Command('unsubscribe')
    async onUnsubscribeCommand(@Ctx() ctx: Context) {
        const chatId = ctx.chat.id;
        const userId = ctx.from.id;
        const username = ctx.from.username;
        let chatName = ctx.chat['title'];
        if(!chatName){
            chatName = 'this';
        }

        const isSubscribed = await this.subscriptionService.isSubscribed(chatId, userId);
        if(!isSubscribed) {
            return this.botRepliesService.notSubscribedReply.replace('{{username}}', username).replace('{{chatName}}', chatName);
        }
        await this.subscriptionService.removeSubscription(chatId, userId);
        return this.botRepliesService.unsubscribeReply.replace('{{username}}', username).replace('{{chatName}}', chatName);
    }
}
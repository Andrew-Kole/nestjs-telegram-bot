import {Command, Ctx, Update} from "nestjs-telegraf";
import {Context} from "telegraf";
import {SubscriptionService} from "./subscription.service";

@Update()
export class SubscriptionUpdate {
    constructor(
        private readonly subscriptionService: SubscriptionService,
    ) {}
    @Command('subscribe')
    async onSubscribeCommand(@Ctx() ctx: Context){
        const userId = ctx.from.id;
        const username = ctx.from.username;
        const chatId = ctx.chat.id;
        const isSubscribed = await this.subscriptionService.isSubscribed(chatId, userId);
        if(isSubscribed){
            return `Sorry, ${username}, you are already subscribed.`
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
            return `${username}, you are not subscribed for weather notifications in ${chatName} chat `;
        }
        await this.subscriptionService.removeSubscription(chatId, userId);
        return `${username}, you will not get weather notifications in ${chatName} chat  no more`
    }
}
import {Command, Ctx, Message, On, Wizard, WizardStep} from "nestjs-telegraf";
import {SubscriptionService} from "./subscription.service";
import {WizardContext} from "telegraf/typings/scenes";
import {WeatherService} from "../weather/weather.service";
import {BotConfigService} from "../common/config/bot.config";
import {BotRepliesService} from "../common/config/bot.replies";

@Wizard('subscription')
export class SubscriptionWizard{
    private timeOut: NodeJS.Timeout;
    constructor(
        private readonly subscriptionService: SubscriptionService,
        private readonly weatherService: WeatherService,
        private readonly botConfigService: BotConfigService,
        private readonly botRepliesService: BotRepliesService,
    ) {}

    @WizardStep(1)
    async onEnterSubscription(@Ctx() ctx: WizardContext) {
        const username = ctx.from.username;
        ctx.wizard.next();
        this.setStepTimeout(ctx);
        return this.botRepliesService.subscribeEnterReply.replace('{{username}}', username);
    }

    @On('text')
    @WizardStep(2)
    async onGetTime(@Ctx() ctx: WizardContext, @Message() msg: {text: string}) {
        clearTimeout(this.timeOut);
        const providedTime = msg.text.trim();
        const timeRegex = /^\d{2}:\d{2}$/;
        if(!timeRegex.test(providedTime)) {
            return this.botRepliesService.subscribeTimeFormatRejectReply;
        }
        ctx.wizard.state['time'] = providedTime;
        ctx.wizard.next();
        this.setStepTimeout(ctx);
        return this.botRepliesService.subscribeTimeApproveReply;
    }

    @On('location')
    @WizardStep(3)
    async onGetLocation(@Ctx() ctx: WizardContext, @Message() msg) {
        clearTimeout(this.timeOut);
        const latitude = msg.location.latitude;
        const longitude = msg.location.longitude;
        const chatId = ctx.chat.id;
        const time = ctx.wizard.state["time"];
        const userId = ctx.from.id;
        const username = ctx.from.username;
        await this.subscriptionService.saveSubscription(chatId, userId, username, latitude, longitude, time);
        const res = await this.weatherService.getWeather(latitude, longitude);
        const region = res.data.name;
        let chatName = ctx.chat["title"];
        if(!chatName){
            chatName = 'this chat'
        }
        ctx.scene.reset();
        return this.botRepliesService.finishedSubscriptionReply.replace('{{username}}', username).replace('{{chatName}}', chatName).replace('{{time}}', time).replace('{{region}}', region);
    }

    @Command('cancel')
    async onCancelSubscription(@Ctx() ctx: WizardContext) {
        ctx.scene.reset();
        return this.botRepliesService.cancelSubscriptionReply;
    }

    private setStepTimeout(@Ctx() ctx: WizardContext) {
        this.timeOut = setTimeout(() => {
            ctx.reply(this.botRepliesService.timeUpSubscriptionReply);
            ctx.scene.reset();
        }, this.botConfigService.timeExpired);
    }
}
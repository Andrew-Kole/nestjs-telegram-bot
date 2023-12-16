import {Command, Ctx, Message, On, Wizard, WizardStep} from "nestjs-telegraf";
import {SubscriptionService} from "./subscription.service";
import {WizardContext} from "telegraf/typings/scenes";
import {WeatherService} from "../weather/weather.service";

@Wizard('subscription')
export class SubscriptionWizard{
    private timeOut: NodeJS.Timeout;
    constructor(
        private readonly subscriptionService: SubscriptionService,
        private readonly weatherService: WeatherService,
    ) {}

    @WizardStep(1)
    async onEnterSubscription(@Ctx() ctx: WizardContext) {
        const username = ctx.from.username;
        ctx.wizard.next();
        this.setStepTimeout(ctx);
        return `Glad you decided to subscribe weather notifications, ${username}. Let me get some information. Provide time please in format HH:mm (09:00 e.g.).'`;
    }

    @On('text')
    @WizardStep(2)
    async onGetTime(@Ctx() ctx: WizardContext, @Message() msg: {text: string}) {
        clearTimeout(this.timeOut);
        const providedTime = msg.text.trim();
        const timeRegex = /^\d{2}:\d{2}$/;
        if(!timeRegex.test(providedTime)) {
            return 'Provide time in correct format. It must be HH:mm (09:00 e.g.)'
        }
        ctx.wizard.state['time'] = providedTime;
        ctx.wizard.next();
        this.setStepTimeout(ctx);
        return `Ok, got time for notifications, share, please, your location.`
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
        return `${username}, you will get daily notifications with weather in ${chatName} on ${time} for ${region}. Thanks for using my service`;
    }

    @Command('cancel')
    async onCancelSubscription(@Ctx() ctx: WizardContext) {
        ctx.scene.reset();
        return 'Sorry you decided to cancel subscription';
    }

    private setStepTimeout(@Ctx() ctx: WizardContext) {
        this.timeOut = setTimeout(() => {
            ctx.reply("You haven't provided any data, unfortunately, subscription cancelled");
            ctx.scene.reset();
        }, 60000);
    }
}
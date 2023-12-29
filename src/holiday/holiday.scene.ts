import {Ctx, On, Scene, SceneEnter, SceneLeave} from "nestjs-telegraf";
import {SceneContext} from "telegraf/typings/scenes";
import {HolidayService} from "./holiday.service";
import {Context} from "telegraf";
import {countriesKeyboard} from "../common/visuals/countries.keyboard";
import {countriesMap} from "../common/utils/countries.map";
import {BotRepliesService} from "../common/config/bot.replies";

@Scene('holiday')
export class HolidayScene {
    constructor(
        private readonly holidayService: HolidayService,
        private readonly botRepliesService: BotRepliesService,
    ) {}
    @SceneEnter()
    async onHolidayEnter(@Ctx() ctx: Context) {
        await ctx.reply(this.botRepliesService.chooseCountryReply, {
            reply_markup: {
                inline_keyboard: [countriesKeyboard],
            }
        });
    }

    @On('callback_query')
    @SceneLeave()
    async onHolidayLeave(@Ctx() ctx: SceneContext){
        const countryCode = ctx.callbackQuery["data"];
        try {
            const res = await this.holidayService.getHolidays(countryCode);
            const holidays = res.data;
            if (holidays.length == 0) {
                const countryName = countriesMap[countryCode] || countryCode;
                return this.botRepliesService.noHolidayReply.replace('{{countryName}}', countryName);
            }
            let message = this.botRepliesService.todayHolidayReply.replace('{{location}}', holidays[0].location);
            holidays.forEach((holiday, index) => {
                message = `${message}\n${index + 1}. ${holiday.name}`;
            });
            return message;
        }
        catch (error) {
            return this.botRepliesService.holidayErrorReply;
        }
        finally {
            ctx.scene.reset();
        }
    }
}
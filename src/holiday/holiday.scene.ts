import {Ctx, On, Scene, SceneEnter, SceneLeave} from "nestjs-telegraf";
import {SceneContext} from "telegraf/typings/scenes";
import {HolidayService} from "./holiday.service";
import {Context} from "telegraf";
import {countriesKeyboard} from "../common/visuals/countries.keyboard";
import {countriesMap} from "../common/utils/countries.map";

@Scene('holiday')
export class HolidayScene {
    constructor(
        private readonly holidayService: HolidayService,
    ) {}
    @SceneEnter()
    async onHolidayEnter(@Ctx() ctx: Context) {
        await ctx.reply('Choose country: ', {
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
                return `There is no holidays today in ${countryName}`;
            }
            let message = `Today's holidays in ${holidays[0].location} are:`;
            holidays.forEach((holiday, index) => {
                message = `${message}\n${index + 1}. ${holiday.name}`;
            });
            return message;
        }
        catch (error) {
            return 'Something went wrong way, contact my creator'
        }
        finally {
            ctx.scene.reset();
        }
    }
}
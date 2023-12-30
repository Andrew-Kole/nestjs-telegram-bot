import {Command, Ctx, Update} from "nestjs-telegraf";
import {Context} from "telegraf";

@Update()
export class HolidayUpdate {
    @Command('holiday')
    async onHolidayCommand(@Ctx() ctx: Context) {
        await ctx["scene"].enter('holiday');
    }
}
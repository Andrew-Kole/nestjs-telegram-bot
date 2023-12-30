import {Injectable} from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import {BotConfigService} from "./bot.config";

@Injectable()
export class BotRepliesService {
    private readonly replies;
    constructor(private readonly botConfigService: BotConfigService) {
        const filepath = path.join(__dirname, this.botConfigService.repliesPath);
        const jsonFile = fs.readFileSync(filepath, 'utf8');
        this.replies = JSON.parse(jsonFile);
    }

    get startReply() {
        return this.replies.startReply;
    }

    get helpReply() {
        return this.replies.helpReply;
    }

    get linksReply() {
        return this.replies.linksReply;
    }

    get aboutReply() {
        return this.replies.aboutReply;
    }

    get chooseCountryReply() {
        return this.replies.chooseCountryReply;
    }

    get noHolidayReply() {
        return this.replies.noHolidayReply;
    }

    get todayHolidayReply() {
        return this.replies.todayHolidayReply;
    }

    get holidayErrorReply() {
        return this.replies.holidayErrorReply;
    }

    get memeErrorReply() {
        return this.replies.memeErrorReply;
    }

    get alreadySubscribedReply() {
        return this.replies.alreadySubscribedReply;
    }

    get notSubscribedReply() {
        return this.replies.notSubscribedReply;
    }

    get unsubscribeReply() {
        return this.replies.unsubscribeReply;
    }

    get subscribeEnterReply() {
        return this.replies.subscribeEnterReply;
    }

    get subscribeTimeFormatRejectReply() {
        return this.replies.subscribeTimeFormatRejectReply;
    }

    get subscribeTimeApproveReply() {
        return this.replies.subscribeTimeApproveReply;
    }

    get finishedSubscriptionReply() {
        return this.replies.finishedSubscriptionReply;
    }

    get cancelSubscriptionReply() {
        return this.replies.cancelSubscriptionReply;
    }

    get timeUpSubscriptionReply() {
        return this.replies.timeUpSubscriptionReply;
    }

    get weatherCronReply() {
        return this.replies.weatherCronReply;
    }

    get weatherCommandReply() {
        return this.replies.weatherCommandReply;
    }
}
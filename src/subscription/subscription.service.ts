import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Subscription} from "./subscription.schema";
import {Model} from "mongoose";

@Injectable()
export class SubscriptionService {
    constructor(
        @InjectModel(Subscription.name) private subscriptionModel: Model<Subscription>,
    ){}

    async isSubscribed(chatId: number, userId: number) {
        const existingSubscription = await this.subscriptionModel.findOne({chatId, userId}).exec();
        return !!existingSubscription;
    }

    async saveSubscription(chatId: number, userId: number, username: string, latitude: number, longitude: number, time: string) {
        const subscription = new this.subscriptionModel({
            chatId,
            userId,
            username,
            latitude,
            longitude,
            time,
        });
        await subscription.save();
    }

    async removeSubscription(chatId: number, userId: number) {
        await this.subscriptionModel.findOneAndDelete({chatId, userId}).exec();
    }

    async getByTime(time: string){
        return await this.subscriptionModel.find({time: time}).exec();
    }
}
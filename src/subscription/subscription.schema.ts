import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

@Schema()
export class Subscription extends Document {
    @Prop()
    chatId: number;

    @Prop()
    userId: number;

    @Prop()
    username: string;

    @Prop()
    latitude: number;

    @Prop()
    longitude: number;

    @Prop()
    time: string
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
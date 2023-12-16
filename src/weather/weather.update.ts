import {Message, On, Update} from "nestjs-telegraf";
import {WeatherService} from "./weather.service";


@Update()
export class WeatherUpdate {
    constructor(
        private readonly weatherService: WeatherService,
    ) {}

    @On('location')
    async onLocation(@Message() msg) {
        const latitude = msg.location.latitude;
        const longitude = msg.location.longitude;
        const res = await this.weatherService.getWeather(latitude, longitude);
        const weather = res.data;
        return `The weather in place you shared:\nDescription: ${weather.weather[0].description}\nTemperature: ${Math.round(weather.main.temp - 273.15)}°C`;
    }
}
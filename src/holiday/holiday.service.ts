import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {HttpService} from "@nestjs/axios";

@Injectable()
export class HolidayService {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {}

    getHolidays(countryCode: string) {
        const apiUrl = this.configService.get('ABSTRACT_API_URL');
        const apiKey = this.configService.get('ABSTRACT_API_KEY');
        const currentDate = new Date();
        const options = {
            params: {
                api_key: apiKey,
                country: countryCode,
                year: currentDate.getFullYear(),
                month: currentDate.getMonth() + 1,
                day: currentDate.getDate(),
            },
        };
        return this.httpService.get(apiUrl, options).toPromise();
    }
}
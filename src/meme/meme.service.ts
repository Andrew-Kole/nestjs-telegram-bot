import {Injectable} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class MemeService{
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    getMeme() {
        const apiUrl = this.configService.get('MEME_API_URL');
        return this.httpService.get(apiUrl).toPromise();
    }
}
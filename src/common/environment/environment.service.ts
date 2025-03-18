import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEnvironment } from '@environment/environment';

@Injectable()
export default class EnvironmentService implements IEnvironment {
    private readonly configService: ConfigService;

    constructor(configService: ConfigService) {
        this.configService = configService;
    }

    getApiName(): string | undefined {
        return this.configService.get<string>('API_NAME');
    }
}

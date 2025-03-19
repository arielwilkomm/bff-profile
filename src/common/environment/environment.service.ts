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

    getProfileApiUrl(): string | undefined {
        return this.configService.get<string>('MS_PROFILE_URL');
    }

    getAddressUrl(cpf: string, addressId?: string): string {
        return `${this.getAddressBaseUrl()}/${cpf}/${this.getAddressBaseUrI()}${addressId}`;
    }

    getAddressBaseUrl(): string | undefined {
        return this.configService.get<string>('PROFILE_URL');
    }

    getAddressBaseUrI(): string | undefined {
        return this.configService.get<string>('ADDRESS_URI');
    }
}

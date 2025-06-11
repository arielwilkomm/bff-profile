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
        return this.configService.get<string>('PROFILE_URL');
    }

    getAddressUrl(cpf: string, addressId?: string): string {
        const baseUrl = this.getAddressBaseUrl();
        const addressUri = this.getAddressBaseUrI();
        let url = `${baseUrl}/${cpf}/${addressUri}`;
        if (addressId) {
            url += `/${addressId}`;
        }
        return url;
    }

    getAddressBaseUrl(): string | undefined {
        return this.configService.get<string>('PROFILE_URL');
    }

    getAddressBaseUrI(): string | undefined {
        return this.configService.get<string>('ADDRESS_URI');
    }
}

import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom, map, catchError } from 'rxjs';
import { AxiosResponse } from 'axios';
import { IEnvironment } from '@environment/environment';
import { CONFIG_SERVICE } from '@constants/app.constants';
import { BusinessException } from '@exceptions/business.exception';
import { ProfileRecordDTO } from '../dtos/profile.dto';
import { IProfileClient } from './profile.client';
import { Logger } from '@logger';

@Injectable()
export class ProfileClientImpl implements IProfileClient {
    private readonly environment: IEnvironment;
    private readonly httpService: HttpService;

    constructor(httpService: HttpService, @Inject(CONFIG_SERVICE) environment: IEnvironment) {
        this.httpService = httpService;
        this.environment = environment;
    }

    async createProfile(
        body: ProfileRecordDTO,
    ): Promise<{ status: number; data: ProfileRecordDTO | BusinessException }> {
        Logger.info('Creating profile');
        const url = `${this.environment.getProfileApiUrl()}`;
        return this.handleRequest<ProfileRecordDTO>('createProfile', () =>
            this.httpService.post<ProfileRecordDTO>(url, body),
        );
    }

    async getProfile(cpf: string): Promise<{ status: number; data: ProfileRecordDTO | BusinessException }> {
        Logger.info(`Fetching profile for CPF: ${cpf}`);
        const url = `${this.environment.getProfileApiUrl()}/${cpf}`;
        return this.handleRequest<ProfileRecordDTO>('getProfile', () => this.httpService.get<ProfileRecordDTO>(url));
    }

    async updateProfile(
        cpf: string,
        body: ProfileRecordDTO,
    ): Promise<{ status: number; data: ProfileRecordDTO | BusinessException }> {
        Logger.info(`Updating profile for CPF: ${cpf}`);
        const url = `${this.environment.getProfileApiUrl()}/${cpf}`;
        return this.handleRequest<ProfileRecordDTO>('updateProfile', () =>
            this.httpService.put<ProfileRecordDTO>(url, body),
        );
    }

    async deleteProfile(cpf: string): Promise<{ status: number; data: { message: string } | BusinessException }> {
        Logger.info(`Deleting profile for CPF: ${cpf}`);
        const url = `${this.environment.getProfileApiUrl()}/${cpf}`;
        return this.handleRequest<{ message: string }>('deleteProfile', () =>
            this.httpService.delete<{ message: string }>(url),
        );
    }

    async getProfiles(): Promise<{ status: number; data: ProfileRecordDTO[] | BusinessException }> {
        Logger.info('Fetching all profiles');
        const url = `${this.environment.getProfileApiUrl()}/profiles`;
        return this.handleRequest<ProfileRecordDTO[]>('getProfiles', () =>
            this.httpService.get<ProfileRecordDTO[]>(url),
        );
    }

    private async handleRequest<T>(
        method: string,
        requestFn: () => any,
    ): Promise<{ status: number; data: T | BusinessException }> {
        Logger.info(`Start client ${method} request`);
        try {
            return await firstValueFrom<AxiosResponse<T>>(
                requestFn().pipe(
                    map((response) => {
                        const axiosResponse = response as AxiosResponse<T>;
                        Logger.debug(`Response for ${method} - Data: ${JSON.stringify(axiosResponse.data)}`);
                        Logger.info(`Success fetching ${method} data`);
                        return { status: axiosResponse.status, data: axiosResponse.data };
                    }),
                    catchError((error) => {
                        throw this.httpError(method, error);
                    }),
                ),
            );
        } catch (error) {
            throw this.httpError(method, error);
        }
    }

    private httpError(method: string, error: any): BusinessException {
        Logger.warn(`Error fetching ${method} data - [${error}]`);

        const response = error?.response;
        const status = response?.status ?? 500;
        const data = response?.data;
        const message =
            (typeof data === 'object' ? (data?.details ?? data?.message) : null) ?? error?.message ?? 'Unknown error';

        let resolvedStatus = status;
        if (!resolvedStatus && typeof message === 'string' && message.toLowerCase().includes('not found')) {
            resolvedStatus = 404;
        }

        Logger.error(`ProfileClient.${method} - [${error}] - Message: [${message}]`);
        return new BusinessException(resolvedStatus, message);
    }
}

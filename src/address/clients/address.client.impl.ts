import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom, map, catchError } from 'rxjs';
import { AxiosResponse } from 'axios';
import { IEnvironment } from '@environment/environment';
import { CONFIG_SERVICE } from '@constants/app.constants';
import { BusinessException } from '@exceptions/business.exception';
import { AddressRecordDTO } from '../dtos/address.dto';
import { IAddressClient } from './address.client';
import { Logger } from '@logger';

@Injectable()
export class AddressClientImpl implements IAddressClient {
    private readonly environment: IEnvironment;
    private readonly httpService: HttpService;

    constructor(httpService: HttpService, @Inject(CONFIG_SERVICE) environment: IEnvironment) {
        this.httpService = httpService;
        this.environment = environment;
    }

    async createAddress(
        cpf: string,
        body: AddressRecordDTO,
    ): Promise<{ status: number; data: AddressRecordDTO | BusinessException }> {
        Logger.info(`Creating address for CPF: ${cpf}`);
        const url = `${this.environment.getAddressUrl(cpf)}`;
        return this.handleRequest<AddressRecordDTO>('createAddress', () =>
            this.httpService.post<AddressRecordDTO>(url, body),
        );
    }

    async getAddress(
        cpf: string,
        addressId: string,
    ): Promise<{ status: number; data: AddressRecordDTO | BusinessException }> {
        Logger.info(`Fetching address with ID: ${addressId} for CPF: ${cpf}`);
        const url = `${this.environment.getAddressUrl(cpf, addressId)}`;
        return this.handleRequest<AddressRecordDTO>('getAddress', () => this.httpService.get<AddressRecordDTO>(url));
    }

    async updateAddress(
        cpf: string,
        addressId: string,
        body: AddressRecordDTO,
    ): Promise<{ status: number; data: AddressRecordDTO | BusinessException }> {
        Logger.info(`Updating address with ID: ${addressId} for CPF: ${cpf}`);
        const url = `${this.environment.getAddressUrl(cpf, addressId)}`;
        return this.handleRequest<AddressRecordDTO>('updateAddress', () =>
            this.httpService.patch<AddressRecordDTO>(url, body),
        );
    }

    async deleteAddress(
        cpf: string,
        addressId: string,
    ): Promise<{ status: number; data: { message: string } | BusinessException }> {
        Logger.info(`Deleting address with ID: ${addressId} for CPF: ${cpf}`);
        const url = `${this.environment.getAddressUrl(cpf, addressId)}`;
        return this.handleRequest<{ message: string }>('deleteAddress', () =>
            this.httpService.delete<{ message: string }>(url),
        );
    }

    async getAllAddresses(cpf: string): Promise<{ status: number; data: AddressRecordDTO[] | BusinessException }> {
        Logger.info(`Fetching all addresses for CPF: ${cpf}`);
        const url = `${this.environment.getAddressUrl(cpf)}`;
        return this.handleRequest<AddressRecordDTO[]>('getAllAddresses', () =>
            this.httpService.get<AddressRecordDTO[]>(url),
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

        const message = Array.isArray(data?.details)
            ? data.details.join('; ')
            : (data?.details ?? data?.message ?? error?.message ?? 'Unknown error');

        Logger.error(`AddressClient.${method} - Status: ${status} - Message: [${message}]`);
        return new BusinessException(status, message);
    }
}

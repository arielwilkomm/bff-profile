import { Injectable, Inject } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AddressRecordDTO } from '../dtos/address.dto';
import { IAddressService } from './address.service';
import { ADDRESS_CLIENT } from '../constants/address.constants';
import { IAddressClient } from '../clients/address.client';
import { Logger } from '@logger';
import { BusinessException } from '@exceptions/business.exception';
import { ERROR_CODES } from '@constants/error-codes';

@Injectable()
export class AddressServiceImpl implements IAddressService {
    private readonly addressClient: IAddressClient;

    constructor(@Inject(ADDRESS_CLIENT) addressClient: IAddressClient) {
        this.addressClient = addressClient;
    }

    async createAddress(
        cpf: string,
        body: AddressRecordDTO,
    ): Promise<{ status: number; data: AddressRecordDTO | BusinessException }> {
        try {
            Logger.info(`Creating address for CPF: ${cpf}`);

            const result = await this.addressClient.createAddress(cpf, body);
            result.data = plainToInstance(AddressRecordDTO, result.data, { excludeExtraneousValues: true });

            Logger.info('Successfully created address');

            return result;
        } catch (error) {
            Logger.error('Error creating address', error);
            throw new BusinessException(
                error.status || ERROR_CODES.INTERNAL_ERROR.status,
                ERROR_CODES.INTERNAL_ERROR.message,
            );
        }
    }

    async getAddress(
        cpf: string,
        addressId: string,
    ): Promise<{ status: number; data: AddressRecordDTO | BusinessException }> {
        try {
            Logger.info(`Retrieving address for CPF: ${cpf}, Address ID: ${addressId}`);

            const result = await this.addressClient.getAddress(cpf, addressId);
            result.data = plainToInstance(AddressRecordDTO, result.data, { excludeExtraneousValues: true });

            Logger.info('Successfully retrieved address');

            return result;
        } catch (error) {
            Logger.error('Error retrieving address', error);
            throw new BusinessException(
                error.status || ERROR_CODES.PROFILE_NOT_FOUND.status,
                ERROR_CODES.PROFILE_NOT_FOUND.message,
            );
        }
    }

    async updateAddress(
        cpf: string,
        addressId: string,
        body: AddressRecordDTO,
    ): Promise<{ status: number; data: AddressRecordDTO | BusinessException }> {
        try {
            Logger.info(`Updating address for CPF: ${cpf}, Address ID: ${addressId}`);

            const result = await this.addressClient.updateAddress(cpf, addressId, body);
            result.data = plainToInstance(AddressRecordDTO, result.data, { excludeExtraneousValues: true });

            Logger.info('Successfully updated address');

            return result;
        } catch (error) {
            Logger.error('Error updating address', error);
            throw new BusinessException(
                error.status || ERROR_CODES.INTERNAL_ERROR.status,
                ERROR_CODES.INTERNAL_ERROR.message,
            );
        }
    }

    async deleteAddress(
        cpf: string,
        addressId: string,
    ): Promise<{ status: number; data: { message: string } | BusinessException }> {
        try {
            Logger.info(`Deleting address for CPF: ${cpf}, Address ID: ${addressId}`);

            const result = await this.addressClient.deleteAddress(cpf, addressId);

            Logger.info('Successfully deleted address');

            return result;
        } catch (error) {
            Logger.error('Error deleting address', error);
            throw new BusinessException(
                error.status || ERROR_CODES.INTERNAL_ERROR.status,
                ERROR_CODES.INTERNAL_ERROR.message,
            );
        }
    }
}

import { AddressRecordDTO } from '../dtos/address.dto';
import { BusinessException } from '@exceptions/business.exception';

export interface IAddressClient {
    createAddress(
        cpf: string,
        body: AddressRecordDTO,
    ): Promise<{ status: number; data: AddressRecordDTO | BusinessException }>;

    getAddress(cpf: string, addressId: string): Promise<{ status: number; data: AddressRecordDTO | BusinessException }>;

    updateAddress(
        cpf: string,
        addressId: string,
        body: AddressRecordDTO,
    ): Promise<{ status: number; data: AddressRecordDTO | BusinessException }>;

    deleteAddress(
        cpf: string,
        addressId: string,
    ): Promise<{ status: number; data: { message: string } | BusinessException }>;

    getAllAddresses(cpf: string): Promise<{ status: number; data: AddressRecordDTO[] | BusinessException }>;
}

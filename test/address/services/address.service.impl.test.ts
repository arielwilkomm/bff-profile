import { BusinessException } from '@exceptions/business.exception';
import { AddressServiceImpl } from '@address/services/address.service.impl';
import { IAddressClient } from '@address/clients/address.client';
import { AddressRecordDTO, AddressType } from '@address/dtos/address.dto';

describe('AddressServiceImpl', () => {
    let service: AddressServiceImpl;
    let addressClient: jest.Mocked<IAddressClient>;
    const cpf = '12345678900';
    const addressId = '1';
    const dto: AddressRecordDTO = {
        street: 'Rua A',
        city: 'Cidade B',
        state: 'Estado C',
        country: 'Pais D',
        postalCode: '00000-000',
        addressType: AddressType.RESIDENTIAL,
    };

    beforeEach(() => {
        addressClient = {
            createAddress: jest.fn(),
            getAddress: jest.fn(),
            updateAddress: jest.fn(),
            deleteAddress: jest.fn(),
        } as any;
        service = new AddressServiceImpl(addressClient);
        jest.clearAllMocks();
    });

    it('should create address successfully', async () => {
        addressClient.createAddress.mockResolvedValue({ status: 201, data: { ...dto } });
        const result = await service.createAddress(cpf, dto);
        expect(result.status).toBe(201);
        expect(result.data).toMatchObject(dto);
    });

    it('should throw BusinessException on createAddress error', async () => {
        addressClient.createAddress.mockRejectedValue(new Error('fail'));
        await expect(service.createAddress(cpf, {} as any)).rejects.toBeInstanceOf(BusinessException);
    });

    it('should get address successfully', async () => {
        addressClient.getAddress.mockResolvedValue({ status: 200, data: { ...dto } });
        const result = await service.getAddress(cpf, addressId);
        expect(result.status).toBe(200);
        expect(result.data).toMatchObject(dto);
    });

    it('should throw BusinessException on getAddress error', async () => {
        addressClient.getAddress.mockRejectedValue(new Error('fail'));
        await expect(service.getAddress(cpf, addressId)).rejects.toBeInstanceOf(BusinessException);
    });

    it('should update address successfully', async () => {
        addressClient.updateAddress.mockResolvedValue({ status: 200, data: { ...dto } });
        const result = await service.updateAddress(cpf, addressId, dto);
        expect(result.status).toBe(200);
        expect(result.data).toMatchObject(dto);
    });

    it('should throw BusinessException on updateAddress error', async () => {
        addressClient.updateAddress.mockRejectedValue(new Error('fail'));
        await expect(service.updateAddress(cpf, addressId, {} as any)).rejects.toBeInstanceOf(BusinessException);
    });

    it('should delete address successfully', async () => {
        addressClient.deleteAddress.mockResolvedValue({ status: 204, data: { message: 'deleted' } });
        const result = await service.deleteAddress(cpf, addressId);
        expect(result.status).toBe(204);
        expect(result.data).toEqual({ message: 'deleted' });
    });

    it('should throw BusinessException on deleteAddress error', async () => {
        addressClient.deleteAddress.mockRejectedValue(new Error('fail'));
        await expect(service.deleteAddress(cpf, addressId)).rejects.toBeInstanceOf(BusinessException);
    });

    it('should get all addresses successfully', async () => {
        const addresses = [dto, { ...dto, street: 'Rua B' }];
        addressClient.getAllAddresses = jest.fn().mockResolvedValue({ status: 200, data: addresses });
        const result = await service.getAllAddresses(cpf);
        expect(result.status).toBe(200);
        expect(result.data).toEqual(addresses);
    });

    it('should throw BusinessException on getAllAddresses error', async () => {
        addressClient.getAllAddresses = jest.fn().mockRejectedValue(new Error('fail'));
        await expect(service.getAllAddresses(cpf)).rejects.toBeInstanceOf(BusinessException);
    });
});

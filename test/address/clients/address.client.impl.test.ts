import { HttpService } from '@nestjs/axios';
import { BusinessException } from '@exceptions/business.exception';
import { IEnvironment } from '@environment/environment';
import { of, throwError } from 'rxjs';
import { AddressClientImpl } from '@address/clients/address.client.impl';
import { AddressRecordDTO, AddressType } from '@address/dtos/address.dto';
import { AxiosHeaders, AxiosResponse } from 'axios';

describe('AddressClientImpl', () => {
    let client: AddressClientImpl;
    let httpService: jest.Mocked<HttpService>;
    let environment: jest.Mocked<IEnvironment>;

    const cpf = '123';
    const addressId = 'id';
    const dto: AddressRecordDTO = {
        street: 'A',
        city: 'B',
        state: 'C',
        country: 'D',
        postalCode: 'E',
        addressType: AddressType.RESIDENCIAL,
    };

    beforeEach(() => {
        httpService = { post: jest.fn(), get: jest.fn(), patch: jest.fn(), delete: jest.fn() } as any;
        environment = { getAddressUrl: jest.fn() } as any;
        client = new AddressClientImpl(httpService, environment);
        jest.clearAllMocks();
    });

    it('should create address successfully', async () => {
        environment.getAddressUrl.mockReturnValue('url');
        const axiosResponse = {
            status: 201,
            data: dto,
            statusText: 'Created',
            headers: {},
            config: { headers: new AxiosHeaders() },
        };
        httpService.post.mockReturnValue(of(axiosResponse));
        const result = await client.createAddress(cpf, dto);
        expect(result.status).toBe(201);
        expect(result.data).toEqual(dto);
    });

    it('should throw BusinessException on createAddress error', async () => {
        environment.getAddressUrl.mockReturnValue('url');
        httpService.post.mockReturnValue(throwError(() => ({ response: { status: 400, data: { message: 'fail' } } })));
        await expect(client.createAddress(cpf, {} as any)).rejects.toBeInstanceOf(BusinessException);
    });

    it('should get address successfully', async () => {
        environment.getAddressUrl.mockReturnValue('url');
        const axiosResponse: AxiosResponse<AddressRecordDTO> = {
            status: 200,
            data: dto,
            statusText: 'OK',
            headers: {},
            config: { headers: new AxiosHeaders() },
        };
        httpService.get.mockReturnValue(of(axiosResponse));
        const result = await client.getAddress(cpf, addressId);
        expect(result.status).toBe(200);
        expect(result.data).toEqual(dto);
    });

    it('should throw BusinessException on getAddress error', async () => {
        environment.getAddressUrl.mockReturnValue('url');
        httpService.get.mockReturnValue(
            throwError(() => ({ response: { status: 404, data: { message: 'not found' } } })),
        );
        await expect(client.getAddress(cpf, addressId)).rejects.toBeInstanceOf(BusinessException);
    });

    it('should update address successfully', async () => {
        environment.getAddressUrl.mockReturnValue('url');
        const axiosResponse: AxiosResponse<AddressRecordDTO> = {
            status: 200,
            data: dto,
            statusText: 'OK',
            headers: {},
            config: { headers: new AxiosHeaders() },
        };
        httpService.patch.mockReturnValue(of(axiosResponse));
        const result = await client.updateAddress(cpf, addressId, dto);
        expect(result.status).toBe(200);
        expect(result.data).toEqual(dto);
    });

    it('should throw BusinessException on updateAddress error', async () => {
        environment.getAddressUrl.mockReturnValue('url');
        httpService.patch.mockReturnValue(throwError(() => ({ response: { status: 400, data: { message: 'fail' } } })));
        await expect(client.updateAddress(cpf, addressId, {} as any)).rejects.toBeInstanceOf(BusinessException);
    });

    it('should delete address successfully', async () => {
        environment.getAddressUrl.mockReturnValue('url');
        const axiosResponse = {
            status: 204,
            data: { message: 'deleted' },
            statusText: 'No Content',
            headers: {},
            config: { headers: new AxiosHeaders() },
        };
        httpService.delete.mockReturnValue(of(axiosResponse));
        const result = await client.deleteAddress(cpf, addressId);
        expect(result.status).toBe(204);
        expect(result.data).toEqual({ message: 'deleted' });
    });

    it('should throw BusinessException on deleteAddress error', async () => {
        environment.getAddressUrl.mockReturnValue('url');
        httpService.delete.mockReturnValue(
            throwError(() => ({ response: { status: 500, data: { message: 'fail' } } })),
        );
        await expect(client.deleteAddress(cpf, addressId)).rejects.toBeInstanceOf(BusinessException);
    });

    it('should get all addresses successfully', async () => {
        environment.getAddressUrl.mockReturnValue('url');
        const addresses = [dto, { ...dto, street: 'Rua B' }];
        const axiosResponse = {
            status: 200,
            data: addresses,
            statusText: 'OK',
            headers: {},
            config: { headers: new AxiosHeaders() },
        };
        httpService.get.mockReturnValue(of(axiosResponse));
        const result = await client.getAllAddresses(cpf);
        expect(result.status).toBe(200);
        expect(result.data).toEqual(addresses);
    });

    it('should throw BusinessException on getAllAddresses error', async () => {
        environment.getAddressUrl.mockReturnValue('url');
        httpService.get.mockReturnValue(
            throwError(() => ({ response: { status: 404, data: { message: 'not found' } } })),
        );
        await expect(client.getAllAddresses(cpf)).rejects.toBeInstanceOf(BusinessException);
    });
});

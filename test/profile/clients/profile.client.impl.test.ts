import { HttpService } from '@nestjs/axios';
import { BusinessException } from '@exceptions/business.exception';
import { IEnvironment } from '@environment/environment';
import { of, throwError } from 'rxjs';
import { ProfileClientImpl } from '@profile/clients/profile.client.impl';
import { ProfileRecordDTO } from '@profile/dtos/profile.dto';
import { AxiosHeaders, AxiosResponse } from 'axios';

describe('ProfileClientImpl', () => {
    let client: ProfileClientImpl;
    let httpService: jest.Mocked<HttpService>;
    let environment: jest.Mocked<IEnvironment>;

    const cpf = '12345678900';
    const dto: ProfileRecordDTO = {
        cpf: '12345678900',
        name: 'Test User',
        email: 'test@email.com',
        phone: '11999999999',
        addresses: [],
    };

    beforeEach(() => {
        httpService = { post: jest.fn(), get: jest.fn(), put: jest.fn(), delete: jest.fn() } as any;
        environment = { getProfileApiUrl: jest.fn() } as any;
        client = new ProfileClientImpl(httpService, environment);
        jest.clearAllMocks();
    });

    it('should create profile successfully', async () => {
        environment.getProfileApiUrl.mockReturnValue('url');
        const axiosResponse = {
            status: 201,
            data: dto,
            statusText: 'Created',
            headers: {},
            config: { headers: new AxiosHeaders() },
        };
        httpService.post.mockReturnValue(of(axiosResponse));
        const result = await client.createProfile(dto);
        expect(result.status).toBe(201);
        expect(result.data).toEqual(dto);
    });

    it('should throw BusinessException on createProfile error', async () => {
        environment.getProfileApiUrl.mockReturnValue('url');
        httpService.post.mockReturnValue(throwError(() => ({ response: { status: 400, data: { message: 'fail' } } })));
        await expect(client.createProfile({} as any)).rejects.toBeInstanceOf(BusinessException);
    });

    it('should get profile successfully', async () => {
        environment.getProfileApiUrl.mockReturnValue('url');
        const axiosResponse: AxiosResponse<ProfileRecordDTO> = {
            status: 200,
            data: dto,
            statusText: 'OK',
            headers: {},
            config: { headers: new AxiosHeaders() },
        };
        httpService.get.mockReturnValue(of(axiosResponse));
        const result = await client.getProfile(cpf);
        expect(result.status).toBe(200);
        expect(result.data).toEqual(dto);
    });

    it('should throw BusinessException on getProfile error', async () => {
        environment.getProfileApiUrl.mockReturnValue('url');
        httpService.get.mockReturnValue(
            throwError(() => ({ response: { status: 404, data: { message: 'not found' } } })),
        );
        await expect(client.getProfile(cpf)).rejects.toBeInstanceOf(BusinessException);
    });

    it('should update profile successfully', async () => {
        environment.getProfileApiUrl.mockReturnValue('url');
        const axiosResponse: AxiosResponse<ProfileRecordDTO> = {
            status: 200,
            data: dto,
            statusText: 'OK',
            headers: {},
            config: { headers: new AxiosHeaders() },
        };
        httpService.put.mockReturnValue(of(axiosResponse));
        const result = await client.updateProfile(cpf, dto);
        expect(result.status).toBe(200);
        expect(result.data).toEqual(dto);
    });

    it('should throw BusinessException on updateProfile error', async () => {
        environment.getProfileApiUrl.mockReturnValue('url');
        httpService.put.mockReturnValue(throwError(() => ({ response: { status: 400, data: { message: 'fail' } } })));
        await expect(client.updateProfile(cpf, {} as any)).rejects.toBeInstanceOf(BusinessException);
    });

    it('should delete profile successfully', async () => {
        environment.getProfileApiUrl.mockReturnValue('url');
        const axiosResponse = {
            status: 204,
            data: { message: 'deleted' },
            statusText: 'No Content',
            headers: {},
            config: { headers: new AxiosHeaders() },
        };
        httpService.delete.mockReturnValue(of(axiosResponse));
        const result = await client.deleteProfile(cpf);
        expect(result.status).toBe(204);
        expect(result.data).toEqual({ message: 'deleted' });
    });

    it('should throw BusinessException on deleteProfile error', async () => {
        environment.getProfileApiUrl.mockReturnValue('url');
        httpService.delete.mockReturnValue(
            throwError(() => ({ response: { status: 500, data: { message: 'fail' } } })),
        );
        await expect(client.deleteProfile(cpf)).rejects.toBeInstanceOf(BusinessException);
    });
});

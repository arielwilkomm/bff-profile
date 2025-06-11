import { BusinessException } from '@exceptions/business.exception';
import { ProfileServiceImpl } from '@profile/services/profile.service.impl';
import { IProfileClient } from '@profile/clients/profile.client';
import { ProfileRecordDTO } from '@profile/dtos/profile.dto';

describe('ProfileServiceImpl', () => {
    let service: ProfileServiceImpl;
    let profileClient: jest.Mocked<IProfileClient>;
    const cpf = '12345678900';
    const dto: ProfileRecordDTO = {
        cpf: '12345678900',
        name: 'Test User',
        email: 'test@email.com',
        phone: '11999999999',
        addresses: [],
    };

    beforeEach(() => {
        profileClient = {
            createProfile: jest.fn(),
            getProfile: jest.fn(),
            updateProfile: jest.fn(),
            deleteProfile: jest.fn(),
        } as any;
        service = new ProfileServiceImpl(profileClient);
        jest.clearAllMocks();
    });

    it('should create profile successfully', async () => {
        profileClient.createProfile.mockResolvedValue({ status: 201, data: { ...dto } });
        const result = await service.createProfile(dto);
        expect(result.status).toBe(201);
        expect(result.data).toMatchObject(dto);
    });

    it('should throw BusinessException on createProfile error', async () => {
        profileClient.createProfile.mockRejectedValue(new Error('fail'));
        await expect(service.createProfile({} as any)).rejects.toBeInstanceOf(BusinessException);
    });

    it('should get profile successfully', async () => {
        profileClient.getProfile.mockResolvedValue({ status: 200, data: { ...dto } });
        const result = await service.getProfile(cpf);
        expect(result.status).toBe(200);
        expect(result.data).toMatchObject(dto);
    });

    it('should throw BusinessException on getProfile error', async () => {
        profileClient.getProfile.mockRejectedValue(new Error('fail'));
        await expect(service.getProfile(cpf)).rejects.toBeInstanceOf(BusinessException);
    });

    it('should update profile successfully', async () => {
        profileClient.updateProfile.mockResolvedValue({ status: 200, data: { ...dto } });
        const result = await service.updateProfile(cpf, dto);
        expect(result.status).toBe(200);
        expect(result.data).toMatchObject(dto);
    });

    it('should throw BusinessException on updateProfile error', async () => {
        profileClient.updateProfile.mockRejectedValue(new Error('fail'));
        await expect(service.updateProfile(cpf, {} as any)).rejects.toBeInstanceOf(BusinessException);
    });

    it('should delete profile successfully', async () => {
        profileClient.deleteProfile.mockResolvedValue({ status: 204, data: { message: 'deleted' } });
        const result = await service.deleteProfile(cpf);
        expect(result.status).toBe(204);
        expect(result.data).toEqual({ message: 'deleted' });
    });

    it('should throw BusinessException on deleteProfile error', async () => {
        profileClient.deleteProfile.mockRejectedValue(new Error('fail'));
        await expect(service.deleteProfile(cpf)).rejects.toBeInstanceOf(BusinessException);
    });

    it('should get profiles successfully', async () => {
        const profiles = [dto];
        profileClient.getProfiles = jest.fn().mockResolvedValue({ status: 200, data: profiles });
        const result = await service.getProfiles();
        expect(result.status).toBe(200);
        expect(result.data).toEqual(profiles);
    });

    it('should throw BusinessException on getProfiles error', async () => {
        profileClient.getProfiles = jest.fn().mockRejectedValue(new Error('fail'));
        await expect(service.getProfiles()).rejects.toBeInstanceOf(BusinessException);
    });
});

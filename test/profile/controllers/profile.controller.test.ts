import ProfileController from '../../../src/profile/controllers/profile.controller';
import { IProfileService } from '../../../src/profile/services/profile.service';
import { ProfileRecordDTO } from '../../../src/profile/dtos/profile.dto';
import { BusinessException } from '@exceptions/business.exception';

describe('ProfileController', () => {
    let controller: ProfileController;
    let profileService: jest.Mocked<IProfileService>;
    let res: any;
    const cpf = '12345678900';
    const dto: ProfileRecordDTO = {
        cpf: '12345678900',
        name: 'Test User',
        email: 'test@email.com',
        phone: '11999999999',
        addresses: [],
    };

    const mockResponse = () => {
        const res: any = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeEach(() => {
        profileService = {
            createProfile: jest.fn(),
            getProfile: jest.fn(),
            updateProfile: jest.fn(),
            deleteProfile: jest.fn(),
        } as any;
        controller = new ProfileController(profileService);
        res = mockResponse();
        jest.clearAllMocks();
    });

    it('should create profile and return 201', async () => {
        profileService.createProfile.mockResolvedValue({ status: 201, data: dto });
        await controller.createProfile(dto, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(dto);
    });

    it('should handle error on createProfile', async () => {
        profileService.createProfile.mockRejectedValue(new BusinessException(400, 'fail'));
        await expect(controller.createProfile(dto, res)).rejects.toBeInstanceOf(BusinessException);
    });

    it('should get profile and return 200', async () => {
        profileService.getProfile.mockResolvedValue({ status: 200, data: dto });
        await controller.getProfile(cpf, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(dto);
    });

    it('should handle error on getProfile', async () => {
        profileService.getProfile.mockRejectedValue(new BusinessException(404, 'not found'));
        await expect(controller.getProfile(cpf, res)).rejects.toBeInstanceOf(BusinessException);
    });

    it('should update profile and return 200', async () => {
        profileService.updateProfile.mockResolvedValue({ status: 200, data: dto });
        await controller.updateProfile(cpf, dto, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(dto);
    });

    it('should handle error on updateProfile', async () => {
        profileService.updateProfile.mockRejectedValue(new BusinessException(400, 'fail'));
        await expect(controller.updateProfile(cpf, dto, res)).rejects.toBeInstanceOf(BusinessException);
    });

    it('should delete profile and return 204', async () => {
        profileService.deleteProfile.mockResolvedValue({ status: 204, data: { message: 'deleted' } });
        await controller.deleteProfile(cpf, res);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({ message: 'deleted' });
    });

    it('should handle error on deleteProfile', async () => {
        profileService.deleteProfile.mockRejectedValue(new BusinessException(500, 'fail'));
        await expect(controller.deleteProfile(cpf, res)).rejects.toBeInstanceOf(BusinessException);
    });

    it('should get profiles and return 200', async () => {
        const profiles = [dto];
        profileService.getProfiles = jest.fn().mockResolvedValue({ status: 200, data: profiles });
        await controller.getProfiles(res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(profiles);
    });

    it('should handle error on getProfiles', async () => {
        profileService.getProfiles = jest.fn().mockRejectedValue(new BusinessException(500, 'fail'));
        await expect(controller.getProfiles(res)).rejects.toBeInstanceOf(BusinessException);
    });
});

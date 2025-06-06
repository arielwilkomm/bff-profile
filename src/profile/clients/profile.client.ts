import { ProfileRecordDTO } from '../dtos/profile.dto';
import { BusinessException } from '@exceptions/business.exception';

export interface IProfileClient {
    createProfile(body: ProfileRecordDTO): Promise<{ status: number; data: ProfileRecordDTO | BusinessException }>;
    getProfile(cpf: string): Promise<{ status: number; data: ProfileRecordDTO | BusinessException }>;
    updateProfile(
        cpf: string,
        body: ProfileRecordDTO,
    ): Promise<{ status: number; data: ProfileRecordDTO | BusinessException }>;
    deleteProfile(cpf: string): Promise<{ status: number; data: { message: string } | BusinessException }>;
}

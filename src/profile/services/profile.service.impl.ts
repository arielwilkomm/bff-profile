import { Injectable, Inject } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ProfileRecordDTO } from '../dtos/profile.dto';
import { IProfileService } from './profile.service';
import { PROFILE_CLIENT } from '../constants/profile.constants';
import { IProfileClient } from '../clients/profile.client';
import { Logger } from '@logger';
import { BusinessException } from '@exceptions/business.exception';

@Injectable()
export class ProfileServiceImpl implements IProfileService {
    private readonly profileClient: IProfileClient;

    constructor(@Inject(PROFILE_CLIENT) profileClient: IProfileClient) {
        this.profileClient = profileClient;
    }

    async createProfile(
        body: ProfileRecordDTO,
    ): Promise<{ status: number; data: ProfileRecordDTO | BusinessException }> {
        try {
            Logger.info('Creating new profile');
            const result = await this.profileClient.createProfile(body);
            result.data = plainToInstance(ProfileRecordDTO, result.data, { excludeExtraneousValues: true });
            Logger.info('Successfully created profile');
            return result;
        } catch (error) {
            Logger.error('Error creating profile', error);
            throw new BusinessException(error.status, error.message);
        }
    }

    async getProfile(cpf: string): Promise<{ status: number; data: ProfileRecordDTO | BusinessException }> {
        try {
            Logger.info(`Retrieving profile for CPF: ${cpf}`);
            const result = await this.profileClient.getProfile(cpf);
            result.data = plainToInstance(ProfileRecordDTO, result.data, { excludeExtraneousValues: true });
            Logger.info('Successfully retrieved profile');
            return result;
        } catch (error) {
            Logger.error('Error retrieving profile', error);
            throw new BusinessException(error.status, error.message);
        }
    }

    async updateProfile(
        cpf: string,
        body: ProfileRecordDTO,
    ): Promise<{ status: number; data: ProfileRecordDTO | BusinessException }> {
        try {
            Logger.info(`Updating profile for CPF: ${cpf}`);
            const result = await this.profileClient.updateProfile(cpf, body);
            result.data = plainToInstance(ProfileRecordDTO, result.data, { excludeExtraneousValues: true });
            Logger.info('Successfully updated profile');
            return result;
        } catch (error) {
            Logger.error('Error updating profile', error);
            throw new BusinessException(error.status, error.message);
        }
    }

    async deleteProfile(cpf: string): Promise<{ status: number; data: { message: string } | BusinessException }> {
        try {
            Logger.info(`Deleting profile for CPF: ${cpf}`);
            const result = await this.profileClient.deleteProfile(cpf);
            Logger.info('Successfully deleted profile');
            return result;
        } catch (error) {
            Logger.error('Error deleting profile', error);
            throw new BusinessException(error.status, error.message);
        }
    }
}

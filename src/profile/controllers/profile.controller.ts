import { Get, Put, Delete, Body, Param, Inject, Controller, Res, SerializeOptions, Post } from '@nestjs/common';
import { Response } from 'express';
import { IProfileService } from '../services/profile.service';
import { ProfileRecordDTO } from '../dtos/profile.dto';
import { PROFILE_SERVICE } from '../constants/profile.constants';
import { Logger } from '@logger';
import { BusinessException } from '@exceptions/business.exception';

@Controller('/v1/profile')
@SerializeOptions({ strategy: 'exposeAll' })
export default class ProfileController {
    private readonly profileService: IProfileService;

    constructor(@Inject(PROFILE_SERVICE) profileService: IProfileService) {
        this.profileService = profileService;
    }

    @Post()
    async createProfile(
        @Body() body: ProfileRecordDTO,
        @Res() response: Response<ProfileRecordDTO | BusinessException>,
    ): Promise<void> {
        Logger.info('Creating new profile');
        const result = await this.profileService.createProfile(body);
        response.status(result.status).json(result.data);
        Logger.info('Successfully created profile');
    }

    @Get('/:cpf')
    async getProfile(
        @Param('cpf') cpf: string,
        @Res() response: Response<ProfileRecordDTO | BusinessException>,
    ): Promise<void> {
        Logger.info(`Retrieving profile for CPF: ${cpf}`);
        const result = await this.profileService.getProfile(cpf);
        response.status(result.status).json(result.data);
        Logger.info('Successfully retrieved profile');
    }

    @Put('/:cpf')
    async updateProfile(
        @Param('cpf') cpf: string,
        @Body() body: ProfileRecordDTO,
        @Res() response: Response<ProfileRecordDTO | BusinessException>,
    ): Promise<void> {
        Logger.info(`Updating profile for CPF: ${cpf}`);
        const result = await this.profileService.updateProfile(cpf, body);
        response.status(result.status).json(result.data);
        Logger.info('Successfully updated profile');
    }

    @Delete('/:cpf')
    async deleteProfile(
        @Param('cpf') cpf: string,
        @Res() response: Response<{ message: string } | BusinessException>,
    ): Promise<void> {
        Logger.info(`Deleting profile for CPF: ${cpf}`);
        const result = await this.profileService.deleteProfile(cpf);
        response.status(result.status).json(result.data);
        Logger.info('Successfully deleted profile');
    }

    @Get('')
    async getProfiles(@Res() response: Response<ProfileRecordDTO[] | BusinessException>): Promise<void> {
        Logger.info('Retrieving all profiles');
        const result = await this.profileService.getProfiles();
        response.status(result.status).json(result.data);
        Logger.info('Successfully retrieved all profiles');
    }
}

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import EnvironmentModule from '@environment/environment.module';
import { PROFILE_CLIENT, PROFILE_SERVICE } from './constants/profile.constants';
import ProfileController from './controllers/profile.controller';
import { ProfileServiceImpl } from './services/profile.service.impl';
import { ProfileClientImpl } from './clients/profile.client.impl';

@Module({
    imports: [HttpModule, EnvironmentModule],
    controllers: [ProfileController],
    providers: [
        { provide: PROFILE_SERVICE, useClass: ProfileServiceImpl },
        { provide: PROFILE_CLIENT, useClass: ProfileClientImpl },
    ],
})
export class ProfileModule {}

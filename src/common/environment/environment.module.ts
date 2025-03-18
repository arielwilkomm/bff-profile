import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CONFIG_SERVICE } from '@constants/app.constants';
import EnvironmentService from '@environment/environment.service';

@Module({
    imports: [ConfigModule],
    providers: [{ provide: CONFIG_SERVICE, useClass: EnvironmentService }],
    exports: [{ provide: CONFIG_SERVICE, useClass: EnvironmentService }],
})
export default class EnvironmentModule {}

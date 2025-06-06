import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import EnvironmentModule from '@environment/environment.module';
import HealthController from '@health/health.controller';
import { AddressModule } from '@address/cart.module';
import { PostalCodeModule } from '@postalcode/postalcode.module';
import { ProfileModule } from '@profile/profile.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.local`,
            isGlobal: true,
            expandVariables: true,
        }),
        TerminusModule,
        HttpModule,
        EnvironmentModule,
        AddressModule,
        PostalCodeModule,
        ProfileModule,
    ],
    controllers: [HealthController],
    providers: [{ provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor }],
})
export class AppModule {}

import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import EnvironmentModule from '@environment/environment.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import HealthController from '@health/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.local'}`,
            isGlobal: true,
            expandVariables: true,
        }),
        TerminusModule,
        EnvironmentModule,
    ],
    controllers: [HealthController],
    providers: [{ provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor }],
})
export class AppModule {}

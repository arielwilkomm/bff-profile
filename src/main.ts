import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    const config = new DocumentBuilder()
        .setTitle('BFF Profile API')
        .setDescription('Documentação da API do BFF Profile')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    const swaggerFilePath = path.join(__dirname, '../swagger', 'swagger.yaml');
    app.use('/swagger/swagger.yaml', express.static(swaggerFilePath));

    await app.listen(8090);
}

bootstrap();
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import PostalCodeController from './postalcode.controller';
import { POSTAL_CODE_SERVICE } from './constants/postalcode.constants';
import { PostalCodeServiceImpl } from './services/postalCode.service.impl';

@Module({
    imports: [HttpModule],
    controllers: [PostalCodeController],
    providers: [{ provide: POSTAL_CODE_SERVICE, useClass: PostalCodeServiceImpl }],
})
export class PostalCodeModule {}

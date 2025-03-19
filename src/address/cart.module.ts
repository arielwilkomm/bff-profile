import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import EnvironmentModule from '@environment/environment.module';
import { ADDRESS_CLIENT, ADDRESS_SERVICE } from './constants/address.constants';
import AddressController from './controllers/addressController';
import { AddressServiceImpl } from './services/address.servic.impl';
import { AddressClientImpl } from './clients/address.clien.impl';

@Module({
    imports: [HttpModule, EnvironmentModule],
    controllers: [AddressController],
    providers: [
        { provide: ADDRESS_SERVICE, useClass: AddressServiceImpl },
        { provide: ADDRESS_CLIENT, useClass: AddressClientImpl },
    ],
})
export class AddressModule {}

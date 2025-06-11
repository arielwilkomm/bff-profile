import { Get, Put, Delete, Body, Param, Inject, Controller, Res, SerializeOptions, Post } from '@nestjs/common';
import { Response } from 'express';
import { IAddressService } from '../services/address.service';
import { AddressRecordDTO } from '../dtos/address.dto';
import { ADDRESS_SERVICE } from '../constants/address.constants';
import { Logger } from '@logger';
import { BusinessException } from '@exceptions/business.exception';

@Controller('/v1/profile/:cpf/address')
@SerializeOptions({ strategy: 'exposeAll' })
export default class AddressController {
    private readonly addressService: IAddressService;

    constructor(@Inject(ADDRESS_SERVICE) addressService: IAddressService) {
        this.addressService = addressService;
    }

    @Post()
    async createAddress(
        @Param('cpf') cpf: string,
        @Body() body: AddressRecordDTO,
        @Res() response: Response<AddressRecordDTO | BusinessException>,
    ): Promise<void> {
        Logger.info(`Creating address for CPF: ${cpf}`);

        const result = await this.addressService.createAddress(cpf, body);

        response.status(result.status).json(result.data);
        Logger.info('Successfully created address');
    }

    @Get('/:addressId')
    async getAddress(
        @Param('cpf') cpf: string,
        @Param('addressId') addressId: string,
        @Res() response: Response<AddressRecordDTO | BusinessException>,
    ): Promise<void> {
        Logger.info(`Retrieving address for CPF: ${cpf}, Address ID: ${addressId}`);

        const result = await this.addressService.getAddress(cpf, addressId);

        response.status(result.status).json(result.data);
        Logger.info('Successfully retrieved address');
    }

    @Get()
    async getAllAddresses(
        @Param('cpf') cpf: string,
        @Res() response: Response<AddressRecordDTO[] | BusinessException>,
    ): Promise<void> {
        Logger.info(`Retrieving all addresses for CPF: ${cpf}`);
        const result = await this.addressService.getAllAddresses(cpf);
        response.status(result.status).json(result.data);
        Logger.info('Successfully retrieved all addresses');
    }

    @Put('/:addressId')
    async updateAddress(
        @Param('cpf') cpf: string,
        @Param('addressId') addressId: string,
        @Body() body: AddressRecordDTO,
        @Res() response: Response<AddressRecordDTO | BusinessException>,
    ): Promise<void> {
        Logger.info(`Updating address for CPF: ${cpf}, Address ID: ${addressId}`);

        const result = await this.addressService.updateAddress(cpf, addressId, body);

        response.status(result.status).json(result.data);
        Logger.info('Successfully updated address');
    }

    @Delete('/:addressId')
    async deleteAddress(
        @Param('cpf') cpf: string,
        @Param('addressId') addressId: string,
        @Res() response: Response<{ message: string } | BusinessException>,
    ): Promise<void> {
        Logger.info(`Deleting address for CPF: ${cpf}, Address ID: ${addressId}`);

        const result = await this.addressService.deleteAddress(cpf, addressId);

        response.status(result.status).json(result.data);
        Logger.info('Successfully deleted address');
    }
}

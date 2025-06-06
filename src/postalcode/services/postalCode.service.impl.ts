import { Injectable, HttpStatus } from '@nestjs/common';
import { IPostalCodeService } from './postalCode.service';
import { EnderecoDto } from '../dtos/endereco.dto';
import { BusinessException } from '@exceptions/business.exception';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Logger } from '@logger';

@Injectable()
export class PostalCodeServiceImpl implements IPostalCodeService {
    constructor(private readonly httpService: HttpService) {}

    async getPostalCode(postalCode: string): Promise<{ status: number; data: EnderecoDto | BusinessException }> {
        Logger.info(`Consulting postal code: ${postalCode}`);
        try {
            const url = `https://viacep.com.br/ws/${postalCode}/json/`;
            const response = await firstValueFrom(this.httpService.get<EnderecoDto>(url));
            if (response.data && !response.data['erro']) {
                return { status: HttpStatus.OK, data: response.data };
            } else {
                return { status: HttpStatus.NOT_FOUND, data: new BusinessException(HttpStatus.NOT_FOUND, 'Postal code not found') };
            }
        } catch (error) {
            Logger.error('Error consulting postal code', error);
            return { status: HttpStatus.INTERNAL_SERVER_ERROR, data: new BusinessException(HttpStatus.INTERNAL_SERVER_ERROR, 'Error consulting postal code') };
        }
    }
}

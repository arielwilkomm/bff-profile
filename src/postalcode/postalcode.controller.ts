import { Get, Param, Inject, Controller, Res, SerializeOptions } from '@nestjs/common';
import { Response } from 'express';
import { IPostalCodeService } from './services/postalCode.service';
import { EnderecoDto } from './dtos/endereco.dto';
import { POSTAL_CODE_SERVICE } from './constants/postalcode.constants';
import { Logger } from '@logger';
import { BusinessException } from '@exceptions/business.exception';

@Controller('/v1')
@SerializeOptions({ strategy: 'exposeAll' })
export default class PostalCodeController {
    private readonly postalCodeService: IPostalCodeService;

    constructor(@Inject(POSTAL_CODE_SERVICE) postalCodeService: IPostalCodeService) {
        this.postalCodeService = postalCodeService;
    }

    @Get('/postal-code/:postalCode')
    async getPostalCode(
        @Param('postalCode') postalCode: string,
        @Res() response: Response<EnderecoDto | BusinessException>,
    ): Promise<void> {
        Logger.info(`Retrieving postal code information for: ${postalCode}`);

        const result = await this.postalCodeService.getPostalCode(postalCode);

        response.status(result.status).json(result.data);
        Logger.info('Successfully retrieved postal code information');
    }
}

/*import {
  Get,
  Param,
  Inject,
  Controller,
  Res,
  SerializeOptions,
} from '@nestjs/common';
import { Response } from 'express';
import { PostalCodeService } from '../services/postalCode.service';
import { ExceptionResponseDTO } from '../dto/exception.dto';
import { EnderecoRecordDTO } from '../dto/endereco.dto';
import { POSTAL_CODE_SERVICE } from '../constants/service.constants';
import { Logger } from '@logger';

@Controller('/v1')
@SerializeOptions({ strategy: 'exposeAll' })
export default class ProfileController {
  private readonly postalCodeService: PostalCodeService;

  constructor(
    @Inject(POSTAL_CODE_SERVICE) postalCodeService: PostalCodeService,
  ) {
    this.postalCodeService = postalCodeService;
  }

  @Get('/postal-code/:postalCode')
  async getPostalCode(
    @Param('postalCode') postalCode: string,
    @Res() response: Response<EnderecoRecordDTO | ExceptionResponseDTO>,
  ): Promise<void> {
    Logger.info(`Retrieving postal code information for: ${postalCode}`);

    const result = await this.postalCodeService.getPostalCode(postalCode);

    response.status(result.status).json(result.data);
    Logger.info('Successfully retrieved postal code information');
  }
}*/
import { EnderecoDto } from '../dtos/endereco.dto';
import { BusinessException } from '@exceptions/business.exception';

export interface IPostalCodeService {
    getPostalCode(postalCode: string): Promise<{ status: number; data: EnderecoDto | BusinessException }>;
}

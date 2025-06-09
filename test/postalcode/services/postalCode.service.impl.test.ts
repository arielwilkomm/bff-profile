import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { PostalCodeServiceImpl } from '@postalcode/services/postalCode.service.impl';
import { EnderecoDto } from '@postalcode/dtos/endereco.dto';
import { BusinessException } from '@exceptions/business.exception';

describe('PostalCodeServiceImpl', () => {
    let service: PostalCodeServiceImpl;
    let httpService: jest.Mocked<HttpService>;
    const postalCode = '01001-000';
    const endereco: EnderecoDto = {
        cep: '01001-000',
        logradouro: 'Praça da Sé',
        bairro: 'Sé',
        localidade: 'São Paulo',
        uf: 'SP',
    };

    beforeEach(() => {
        httpService = { get: jest.fn() } as any;
        service = new PostalCodeServiceImpl(httpService);
        jest.clearAllMocks();
    });

    it('should return address data when postal code is found', async () => {
        httpService.get.mockReturnValue(of({ data: endereco, status: 200 } as any));
        const result = await service.getPostalCode(postalCode);
        expect(result.status).toBe(200);
        expect(result.data).toEqual(endereco);
    });

    it('should return not found when postal code does not exist', async () => {
        httpService.get.mockReturnValue(of({ data: { erro: true }, status: 200 } as any));
        const result = await service.getPostalCode(postalCode);
        expect(result.status).toBe(404);
        expect(result.data).toBeInstanceOf(BusinessException);
    });

    it('should return internal server error on http error', async () => {
        httpService.get.mockReturnValue(throwError(() => new Error('fail')));
        const result = await service.getPostalCode(postalCode);
        expect(result.status).toBe(500);
        expect(result.data).toBeInstanceOf(BusinessException);
    });
});

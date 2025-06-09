import PostalCodeController from '../../../src/postalcode/postalcode.controller';
import { PostalCodeServiceImpl } from '../../../src/postalcode/services/postalCode.service.impl';
import { EnderecoDto } from '../../../src/postalcode/dtos/endereco.dto';
import { BusinessException } from '@exceptions/business.exception';

describe('PostalCodeController', () => {
    let controller: PostalCodeController;
    let service: jest.Mocked<PostalCodeServiceImpl>;
    let res: any;
    const postalCode = '01001-000';
    const endereco: EnderecoDto = {
        cep: '01001-000',
        logradouro: 'Praça da Sé',
        bairro: 'Sé',
        localidade: 'São Paulo',
        uf: 'SP',
    };

    const mockResponse = () => {
        const res: any = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeEach(() => {
        service = {
            getPostalCode: jest.fn(),
        } as any;
        controller = new PostalCodeController(service);
        res = mockResponse();
        jest.clearAllMocks();
    });

    it('should return address and status 200', async () => {
        service.getPostalCode.mockResolvedValue({ status: 200, data: endereco });
        await controller.getPostalCode(postalCode, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(endereco);
    });

    it('should return 404 when not found', async () => {
        service.getPostalCode.mockResolvedValue({ status: 404, data: new BusinessException(404, 'not found') });
        await controller.getPostalCode(postalCode, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(expect.any(BusinessException));
    });

    it('should return 500 on error', async () => {
        service.getPostalCode.mockResolvedValue({ status: 500, data: new BusinessException(500, 'fail') });
        await controller.getPostalCode(postalCode, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.any(BusinessException));
    });
});

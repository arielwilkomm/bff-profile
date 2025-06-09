import AddressController from '../../../src/address/controllers/addressController';
import { IAddressService } from '../../../src/address/services/address.service';
import { AddressRecordDTO, AddressType } from '../../../src/address/dtos/address.dto';
import { BusinessException } from '@exceptions/business.exception';

describe('AddressController', () => {
    let controller: AddressController;
    let addressService: jest.Mocked<IAddressService>;
    let res: any;
    const cpf = '12345678900';
    const addressId = '1';
    const dto: AddressRecordDTO = {
        street: 'Rua A',
        city: 'Cidade B',
        state: 'Estado C',
        country: 'Pais D',
        postalCode: '00000-000',
        addressType: AddressType.RESIDENCIAL,
    };

    const mockResponse = () => {
        const res: any = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeEach(() => {
        addressService = {
            createAddress: jest.fn(),
            getAddress: jest.fn(),
            updateAddress: jest.fn(),
            deleteAddress: jest.fn(),
        } as any;
        controller = new AddressController(addressService);
        res = mockResponse();
        jest.clearAllMocks();
    });

    it('should create address and return 201', async () => {
        addressService.createAddress.mockResolvedValue({ status: 201, data: dto });
        await controller.createAddress(cpf, dto, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(dto);
    });

    it('should handle error on createAddress', async () => {
        addressService.createAddress.mockRejectedValue(new BusinessException(400, 'fail'));
        await expect(controller.createAddress(cpf, dto, res)).rejects.toBeInstanceOf(BusinessException);
    });

    it('should get address and return 200', async () => {
        addressService.getAddress.mockResolvedValue({ status: 200, data: dto });
        await controller.getAddress(cpf, addressId, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(dto);
    });

    it('should handle error on getAddress', async () => {
        addressService.getAddress.mockRejectedValue(new BusinessException(404, 'not found'));
        await expect(controller.getAddress(cpf, addressId, res)).rejects.toBeInstanceOf(BusinessException);
    });

    it('should update address and return 200', async () => {
        addressService.updateAddress.mockResolvedValue({ status: 200, data: dto });
        await controller.updateAddress(cpf, addressId, dto, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(dto);
    });

    it('should handle error on updateAddress', async () => {
        addressService.updateAddress.mockRejectedValue(new BusinessException(400, 'fail'));
        await expect(controller.updateAddress(cpf, addressId, dto, res)).rejects.toBeInstanceOf(BusinessException);
    });

    it('should delete address and return 204', async () => {
        addressService.deleteAddress.mockResolvedValue({ status: 204, data: { message: 'deleted' } });
        await controller.deleteAddress(cpf, addressId, res);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({ message: 'deleted' });
    });

    it('should handle error on deleteAddress', async () => {
        addressService.deleteAddress.mockRejectedValue(new BusinessException(500, 'fail'));
        await expect(controller.deleteAddress(cpf, addressId, res)).rejects.toBeInstanceOf(BusinessException);
    });
});

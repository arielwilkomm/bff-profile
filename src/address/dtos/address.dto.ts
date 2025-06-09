import { IsString, IsEnum, MaxLength, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';

export enum AddressType {
    RESIDENCIAL = 'RESIDENCIAL',
    COMMERCIAL = 'COMMERCIAL',
}

export class AddressRecordDTO {
    @Expose()
    @IsString()
    @MaxLength(255)
    @MinLength(1)
    street: string;

    @Expose()
    @IsString()
    @MaxLength(100)
    @MinLength(1)
    city: string;

    @Expose()
    @IsString()
    @MaxLength(100)
    @MinLength(1)
    state: string;

    @Expose()
    @IsString()
    @MaxLength(100)
    @MinLength(1)
    country: string;

    @Expose()
    @IsString()
    @MaxLength(20)
    @MinLength(1)
    postalCode: string;

    @Expose()
    @IsEnum(AddressType)
    addressType: AddressType;
}

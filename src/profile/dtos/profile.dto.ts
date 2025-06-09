import { IsString, IsEmail, IsArray, Length, MinLength, MaxLength, ValidateNested } from 'class-validator';
import { Type, Expose } from 'class-transformer';
import { AddressRecordDTO } from '@address/dtos/address.dto';

export class ProfileRecordDTO {
    @Expose()
    @IsString()
    @Length(11, 11)
    cpf: string;

    @Expose()
    @IsString()
    @MinLength(0)
    @MaxLength(120)
    name: string;

    @Expose()
    @IsEmail()
    @MinLength(0)
    @MaxLength(50)
    email: string;

    @Expose()
    @IsString()
    @MinLength(10)
    @MaxLength(13)
    phone: string;

    @Expose()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AddressRecordDTO)
    addresses: AddressRecordDTO[];
}

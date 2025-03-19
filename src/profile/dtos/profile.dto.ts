import { IsString, IsEmail, IsArray, Length, MinLength, MaxLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AddressRecordDTO } from '@address/dtos/address.dto';

export class ProfileRecordDTO {
    @IsString()
    @Length(11, 11)
    cpf: string;

    @IsString()
    @MinLength(0)
    @MaxLength(120)
    name: string;

    @IsEmail()
    @MinLength(0)
    @MaxLength(50)
    email: string;

    @IsString()
    @MinLength(10)
    @MaxLength(13)
    phone: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AddressRecordDTO)
    addresses: AddressRecordDTO[];
}

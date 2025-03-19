import { IsString, IsEnum, MaxLength, MinLength } from 'class-validator';

export enum AddressType {
  RESIDENTIAL = 'RESIDENTIAL',
  COMMERCIAL = 'COMMERCIAL',
}

export class AddressRecordDTO {
  @IsString()
  @MaxLength(255)
  @MinLength(1)
  street: string;

  @IsString()
  @MaxLength(100)
  @MinLength(1)
  city: string;

  @IsString()
  @MaxLength(100)
  @MinLength(1)
  state: string;

  @IsString()
  @MaxLength(100)
  @MinLength(1)
  country: string;

  @IsString()
  @MaxLength(20)
  @MinLength(1)
  postalCode: string;

  @IsEnum(AddressType)
  addressType: AddressType;
}
import { IsString, IsOptional } from 'class-validator';

export class EnderecoDto {
  @IsString()
  cep: string;

  @IsString()
  logradouro: string;

  @IsString()
  complemento: string;

  @IsString()
  @IsOptional()
  unidade: string;

  @IsString()
  bairro: string;

  @IsString()
  localidade: string;

  @IsString()
  uf: string;

  @IsString()
  estado: string;

  @IsString()
  regiao: string;

  @IsString()
  ibge: string;

  @IsString()
  gia: string;

  @IsString()
  ddd: string;

  @IsString()
  siafi: string;
}
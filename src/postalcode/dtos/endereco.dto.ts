import { IsString, IsOptional } from 'class-validator';

export class EnderecoDto {
    @IsString()
    @IsOptional()
    cep?: string;

    @IsString()
    @IsOptional()
    logradouro?: string;

    @IsString()
    @IsOptional()
    complemento?: string;

    @IsString()
    @IsOptional()
    unidade?: string;

    @IsString()
    @IsOptional()
    bairro?: string;

    @IsString()
    @IsOptional()
    localidade?: string;

    @IsString()
    @IsOptional()
    uf?: string;

    @IsString()
    @IsOptional()
    estado?: string;

    @IsString()
    @IsOptional()
    regiao?: string;

    @IsString()
    @IsOptional()
    ibge?: string;

    @IsString()
    @IsOptional()
    gia?: string;

    @IsString()
    @IsOptional()
    ddd?: string;

    @IsString()
    @IsOptional()
    siafi?: string;
}

export interface IEnvironment {
    getApiName(): string | undefined;

    getProfileApiUrl(): string | undefined;

    getAddressUrl(cpf: string, addressId?: string): string | undefined;
}

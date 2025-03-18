export interface IEnvironment {
    getApiName(): string | undefined;

    getProfileApiUrl(): string | undefined;
}
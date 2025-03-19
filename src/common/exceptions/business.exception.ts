/* TODO: Ajustar uso */
export class BusinessException extends Error {
    private status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }

    public getStatus(): number {
        return this.status;
    }
}

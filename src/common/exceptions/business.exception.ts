export class BusinessException extends Error {
    private readonly status: number;
    private readonly originalMessage: string | object;

    constructor(status: number, message: string | object) {
        super(typeof message === 'string' ? message : JSON.stringify(message));
        this.status = status;
        this.originalMessage = message;
    }

    public getStatus(): number {
        return this.status;
    }

    public override get message(): string {
        return typeof this.originalMessage === 'string' ? this.originalMessage : JSON.stringify(this.originalMessage);
    }

    public getRawMessage(): string | object {
        return this.originalMessage;
    }
}

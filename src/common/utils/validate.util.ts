import { ValidationError } from 'class-validator';

export const handleError = (errors: ValidationError[] = []): string => {
    return errors
        .flatMap((error) => {
            if (error.constraints) {
                return Object.values(error.constraints);
            } else {
                return handleError(error.children ?? []);
            }
        })
        .join(', ');
};

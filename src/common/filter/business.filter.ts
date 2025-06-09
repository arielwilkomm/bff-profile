import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ERROR_CODES } from '@constants/error-codes';
import { BusinessException } from '@exceptions/business.exception';

@Catch(BusinessException)
export class BusinessExceptionFilter implements ExceptionFilter {
    catch(exception: BusinessException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        let status = exception.getStatus();
        let body: any = {};
        if (typeof exception.message === 'object' && exception.message !== null) {
            body = exception.message;
        } else if (typeof exception.message === 'string') {
            try {
                body = exception.message.trim().startsWith('{') ? JSON.parse(exception.message) : {};
            } catch {
                body = {};
            }
        }
        let details = body.details || (Array.isArray(exception.message) ? exception.message : [exception.message]);
        let { code } = body;
        let { message } = body;
        if (
            !code &&
            typeof exception.message === 'string' &&
            exception.message.toLowerCase().includes('profile not found')
        ) {
            code = ERROR_CODES.PROFILE_NOT_FOUND.code;
            message = ERROR_CODES.PROFILE_NOT_FOUND.message;
            status = ERROR_CODES.PROFILE_NOT_FOUND.status;
        }
        if (!status || typeof status !== 'number' || isNaN(status)) {
            code = ERROR_CODES.INTERNAL_ERROR.code;
            message = ERROR_CODES.INTERNAL_ERROR.message;
            status = ERROR_CODES.INTERNAL_ERROR.status;
        }
        response.status(status).json({
            code: code || message,
            message: message || code,
            details,
        });
    }
}

import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { getReasonPhrase } from 'http-status-codes';
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
        const details = body.details || (Array.isArray(exception.message) ? exception.message : [exception.message]);
        let code = body.code;
        let message = body.message;
        if (!code && typeof exception.message === 'string' && exception.message.toLowerCase().includes('not found')) {
            code = 'GB001';
            message = 'PROFILE_NOT_FOUND';
            status = 404;
        }
        if (!status || typeof status !== 'number' || isNaN(status)) {
            status = 500;
        }
        response.status(status).json({
            code: code || getReasonPhrase(status),
            message: message || getReasonPhrase(status),
            details,
        });
    }
}

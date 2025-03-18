import * as dayjs from 'dayjs';
import * as winston from 'winston';

/* istanbul ignore next */
export const Logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.printf(({ level, message, stack }) =>
            JSON.stringify({
                '@timestamp': dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
                'severity': level,
                message,
                'stack_trace': stack,
            }),
        ),
    ),
    transports: [new winston.transports.File({ filename: './application.log' }), new winston.transports.Console()],
});

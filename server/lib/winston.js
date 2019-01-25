import winston from 'winston';
import appRoot from 'app-root-path';

const filename = `${appRoot}/error.log`;

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            json: true,
            level: 'info',
        }),
        new (winston.transports.File)({
            colorize: true,
            json: true,
            level: 'error',
            name: 'Error',
            filename: filename, // eslint-disable-line object-shorthand
        }),
    ],
});

export default logger;

import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { configure, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { env } from '../env';
const dailyRotateTransport = new DailyRotateFile({
    filename: 'application-%DATE%.log',
    dirname: env.app.dirs.logDir,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: env.log.rotate.ziped,
    maxSize: env.log.rotate.maxSize,
    maxFiles: env.log.rotate.maxFiles,
});
export const winstonLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    configure({
        transports: [
            new transports.Console({
                level: env.log.level,
                handleExceptions: true,
                format: env.node !== 'development'
                    ? format.combine(
                        format.json()
                    )
                    : format.combine(
                        format.colorize(),
                        format.simple()
                    ),
            }),
            dailyRotateTransport,
        ],
    });
};

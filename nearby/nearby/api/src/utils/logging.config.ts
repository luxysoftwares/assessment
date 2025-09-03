import { createLogger, format, LoggerOptions, transports } from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston'; // Custom log display format
import 'winston-daily-rotate-file';

const loggerOptions: LoggerOptions = {
  level: 'silly',
  format: format.combine(format.errors({ stack: true }), format.metadata()),
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.ms(),
        nestWinstonModuleUtilities.format.nestLike('Nearby Api', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),
    new transports.DailyRotateFile({
      level: 'error',
      dirname: 'logs/error',
      filename: `%DATE%-error.log`,
      datePattern: 'YYYY-MM-DD',
      format: format.combine(
        format.timestamp(),
        format.ms(),
        nestWinstonModuleUtilities.format.nestLike('NearBy Api', {
          prettyPrint: true,
        }),
      ),
      handleExceptions: true,
      zippedArchive: true,
      maxFiles: 90,
    }),
    new transports.DailyRotateFile({
      dirname: 'logs/combined',
      filename: `%DATE%-combined.log`,
      datePattern: 'YYYY-MM-DD',
      format: format.combine(
        format.timestamp(),
        format.ms(),
        nestWinstonModuleUtilities.format.nestLike('Nova Inventory Api', {
          prettyPrint: true,
        }),
      ),
      handleExceptions: true,
      zippedArchive: true,
      maxFiles: '10d',
    }),
  ],
};

const winstonLoggerInstance = createLogger(loggerOptions);
export default winstonLoggerInstance;

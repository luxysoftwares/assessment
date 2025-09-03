import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
@Catch(Prisma.PrismaClientKnownRequestError)
export class DatabaseFilter implements ExceptionFilter {
  logger = new Logger('DatabaseFilter');

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status: HttpStatus;
    let message: string;

    switch (exception.code) {
      case 'P2002':
        status = HttpStatus.CONFLICT;
        message = 'This record already exists. Please use a unique value.';
        break;
      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = 'The record you are looking for could not be found.';
        break;
      case 'P2003':
        status = HttpStatus.FORBIDDEN;
        message = 'The operation failed because a related record is missing.';
        break;
      case 'P2004':
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = 'The data you provided is incomplete or invalid.';
        break;
      case 'P2015':
        status = HttpStatus.TOO_MANY_REQUESTS;
        message = 'Too many requests. Please slow down and try again later.';
        break;
      case 'P2016':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Something went wrong on our end. Please try again later.';
        break;
      case 'P2023':
        status = HttpStatus.FORBIDDEN;
        message = 'The data you provided is in an invalid format.';
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'An unexpected error occurred. Please try again later.';
    }

    const errorResponse = {
      statusCode: status,
      message: message,
      error: exception.code,
    };

    this.logger.error(`Error Code: ${exception.code}, Message: ${message}`);
    response.status(status).json(errorResponse);
  }
}

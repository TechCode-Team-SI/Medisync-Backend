import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { QueryError } from 'mysql2';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: QueryFailedError<QueryError>, host: ArgumentsHost) {
    switch (exception.driverError.code) {
      case 'ER_DUP_ENTRY':
        return this.handleDuplicateEntry(exception, host);
      default:
        return this.handleQueryFailedError(exception, host);
    }
  }

  private handleDuplicateEntry(
    exception: QueryFailedError<QueryError>,
    host: ArgumentsHost,
  ) {
    const httpStatus = HttpStatus.CONFLICT;
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const duplicateEntry = this.getDuplicateEntryName(exception);

    const responseBody = {
      status: HttpStatus.CONFLICT,
      error: 'duplicate-entry',
      message: `Duplicate entry: ${duplicateEntry} is already being used`,
    };
    console.log(exception.message);

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  private handleQueryFailedError(
    exception: QueryFailedError<QueryError>,
    host: ArgumentsHost,
  ) {
    const httpStatus = HttpStatus.CONFLICT;
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const responseBody = {
      status: HttpStatus.CONFLICT,
      error: 'query-failed',
      message: 'Query failed',
    };
    console.log(exception.message);
    console.log(exception.stack);

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  private getDuplicateEntryName(exception: QueryFailedError<QueryError>) {
    const duplicateEntry = (
      exception.driverError.message.match(/Duplicate entry '(.+?)'/) || []
    ).pop();
    return duplicateEntry;
  }
}

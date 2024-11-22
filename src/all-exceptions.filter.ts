import { Catch, ArgumentsHost, HttpStatus, HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Request, Response } from 'express' 
import { WinstonLoggerService } from './winston-logger/winston-logger.service';  // Import the Winston Logger Service

type MyResponseObj = {
    statusCode: number,
    timestamp: string,
    path: string,
    response: string | object,
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly winstonLoggerService: WinstonLoggerService // Inject the Winston logger

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const myResponseObj: MyResponseObj = {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: request.url,
            response: '',
        }

        // Add more Prisma Error Types if you want
        if (exception instanceof HttpException){
                myResponseObj.statusCode = exception.getStatus()
                myResponseObj.response = exception.getResponse()
        } else {
            myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            myResponseObj.response = 'Internal Server Error'
        }

        response 
            .status(myResponseObj.statusCode) 
            .json(myResponseObj)
            
            const errorResponse = myResponseObj.response || 'No error message provided';  // Fallback if response is undefined
            //this.winstonLoggerService.logError(errorResponse);
        super.catch(exception, host)
    }
}
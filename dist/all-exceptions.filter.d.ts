import { ArgumentsHost } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
export declare class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly winstonLoggerService;
    catch(exception: unknown, host: ArgumentsHost): void;
}

import { Logger } from 'winston';
export declare class WinstonLoggerService {
    private readonly logger;
    constructor(logger: Logger);
    logInfo(message: string): void;
    logError(message: any): void;
    logDebug(message: string): void;
}

import { OnModuleInit } from '@nestjs/common';
import { WinstonLoggerService } from './winston-logger/winston-logger.service';
export declare class AppModule implements OnModuleInit {
    private readonly winstonLoggerService;
    constructor(winstonLoggerService: WinstonLoggerService);
    onModuleInit(): void;
}

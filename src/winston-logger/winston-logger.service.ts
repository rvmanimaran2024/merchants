import { Injectable, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class WinstonLoggerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger, // Inject the Winston logger
  ) {}

  logInfo(message: string) {
    this.logger.info(message);
  }

  logError(message: any) {
    this.logger.error(message);
  }

  logDebug(message: string) {
    this.logger.debug(message);
  }
}
